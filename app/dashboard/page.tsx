"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AppBarChart from "@/components/AppBarChart";
import Card from "@/components/CardList";
import UserRequests from "@/components/UserRequests";
import TopProducts from "@/components/TopProducts";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// Types
type TotalType = {
  day: string;
  total: number;
};

type OrderData = {
  "Product-Price"?: string | number;
  Quantity: number | string;
  Time?: { seconds: number };
};

// Helper functions
const getDayStartDate = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0];
};

const getWeekStartDate = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const weekStart = new Date(d.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart.toISOString().split("T")[0];
};

const Dashboard = () => {
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const [showRequests, setShowRequests] = useState(true);
  const [showTopProducts, setShowTopProducts] = useState(true);
  const [dailyTotals, setDailyTotals] = useState<TotalType[]>([]);
  const [weeklyTotals, setWeeklyTotals] = useState<TotalType[]>([]);
  const [showWeekly, setShowWeekly] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const snapshot = await getDocs(collection(db, "user_request"));
        const data: OrderData[] = snapshot.docs.map((doc) => doc.data()) as OrderData[];

        const dailyMap: { [day: string]: number } = {};
        const weeklyMap: { [week: string]: number } = {};

        data.forEach((order) => {
          const price = parseFloat(order["Product-Price"] as string) || 0;
          const qty = parseInt(order.Quantity as string) || 1;
          if (order.Time?.seconds) {
            const orderDate = new Date(order.Time.seconds * 1000);
            const dayKey = getDayStartDate(orderDate);
            const weekKey = getWeekStartDate(orderDate);
            dailyMap[dayKey] = (dailyMap[dayKey] || 0) + price * qty;
            weeklyMap[weekKey] = (weeklyMap[weekKey] || 0) + price * qty;
          }
        });

        const dailyArray = Object.entries(dailyMap).map(([day, total]) => ({ day, total }));
        const weeklyArray = Object.entries(weeklyMap).map(([day, total]) => ({ day, total }));

        setDailyTotals(dailyArray.sort((a, b) => a.day.localeCompare(b.day)));
        setWeeklyTotals(weeklyArray.sort((a, b) => a.day.localeCompare(b.day)));
      } catch (err) {
        console.error("Failed to fetch totals:", err);
      }
    };

    fetchTotals();
  }, []);

  const iconStyle =
    "text-muted-foreground hover:text-primary transition duration-200 cursor-pointer";
  const boxStyle =
    "bg-background dark:bg-zinc-900 p-4 sm:p-5 rounded-xl shadow border border-muted relative";

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/50">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className={`transition-all duration-300 w-full ${isSidebarCollapsed ? "sm:ml-20" : "sm:ml-64"} flex-1`}>
        <main className="p-3 sm:p-5 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Chart */}
            <div className={`${boxStyle} xl:col-span-2`}>
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setShowWeekly(!showWeekly)}
                  className="text-xs sm:text-sm bg-primary text-white px-2 py-1 rounded-lg shadow hover:bg-primary/90"
                >
                  {showWeekly ? "Show Daily" : "Show Weekly"}
                </button>
                {showChart ? (
                  <MdVisibilityOff size={20} className={iconStyle} onClick={() => setShowChart(false)} />
                ) : (
                  <MdVisibility size={20} className={iconStyle} onClick={() => setShowChart(true)} />
                )}
              </div>
              {showChart && (
                <AppBarChart dailyTotals={showWeekly ? weeklyTotals : dailyTotals} />
              )}
            </div>

            {/* Card */}
            <div className={boxStyle}>
              <div className="absolute top-3 right-3">
                {showCard ? (
                  <MdVisibilityOff size={20} className={iconStyle} onClick={() => setShowCard(false)} />
                ) : (
                  <MdVisibility size={20} className={iconStyle} onClick={() => setShowCard(true)} />
                )}
              </div>
              {showCard && <Card />}
            </div>

            {/* User Requests */}
            <div className={`${boxStyle} md:col-span-2 xl:col-span-3`}>
              <div className="absolute top-3 right-3">
                {showRequests ? (
                  <MdVisibilityOff size={20} className={iconStyle} onClick={() => setShowRequests(false)} />
                ) : (
                  <MdVisibility size={20} className={iconStyle} onClick={() => setShowRequests(true)} />
                )}
              </div>
              {showRequests && <UserRequests />}
            </div>

            {/* Top Products */}
            <div className={`${boxStyle} xl:col-span-2`}>
              <div className="absolute top-3 right-3">
                {showTopProducts ? (
                  <MdVisibilityOff size={20} className={iconStyle} onClick={() => setShowTopProducts(false)} />
                ) : (
                  <MdVisibility size={20} className={iconStyle} onClick={() => setShowTopProducts(true)} />
                )}
              </div>
              {showTopProducts && <TopProducts />}
            </div>

            {/* Extra Box */}
            <div className={boxStyle}>
              <div className="absolute top-3 right-3">
                <MdVisibility size={20} className={iconStyle} />
              </div>
              <p className="text-muted-foreground text-sm">Box 6</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;