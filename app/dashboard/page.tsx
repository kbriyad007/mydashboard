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
import { db } from "../firebase";

// Other helper functions and types

const Dashboard = () => {
  const router = useRouter();

  // Admin check
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.push("/login");
    }
  }, []);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const [showRequests, setShowRequests] = useState(true);
  const [showTopProducts, setShowTopProducts] = useState(true);
  const [dailyTotals, setDailyTotals] = useState<TotalType[]>([]);
  const [weeklyTotals, setWeeklyTotals] = useState<TotalType[]>([]);
  const [showWeekly, setShowWeekly] = useState(false);

  // Fetch data
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

        const dailyArray: TotalType[] = Object.entries(dailyMap)
          .map(([day, total]) => ({ day, total }))
          .sort((a, b) => (a.day < b.day ? -1 : 1));

        const weeklyArray: TotalType[] = Object.entries(weeklyMap)
          .map(([day, total]) => ({ day, total }))
          .sort((a, b) => (a.day < b.day ? -1 : 1));

        setDailyTotals(dailyArray);
        setWeeklyTotals(weeklyArray);
      } catch (error) {
        console.error("Failed to fetch totals:", error);
      }
    };

    fetchTotals();
  }, []);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  const iconStyle =
    "text-muted-foreground hover:text-primary transition duration-200 cursor-pointer";

  const boxStyle =
    "bg-background dark:bg-zinc-900 p-5 md:p-6 rounded-2xl shadow-md border border-muted relative";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/50">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        } flex-1 flex flex-col`}
      >
        <main className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Chart */}
            <div className={`${boxStyle} col-span-1 md:col-span-2`}>
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setShowWeekly((prev) => !prev)}
                  className="text-sm bg-primary text-white px-3 py-1 rounded-lg shadow hover:bg-primary/90 transition"
                >
                  {showWeekly ? "Show Daily" : "Show Weekly"}
                </button>
                {showChart ? (
                  <MdVisibilityOff
                    size={22}
                    className={iconStyle}
                    onClick={() => setShowChart(false)}
                  />
                ) : (
                  <MdVisibility
                    size={22}
                    className={iconStyle}
                    onClick={() => setShowChart(true)}
                  />
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
                  <MdVisibilityOff
                    size={22}
                    className={iconStyle}
                    onClick={() => setShowCard(false)}
                  />
                ) : (
                  <MdVisibility
                    size={22}
                    className={iconStyle}
                    onClick={() => setShowCard(true)}
                  />
                )}
              </div>
              {showCard && <Card />}
            </div>

            {/* User Requests */}
            <div className={`${boxStyle} col-span-1 md:col-span-3`}>
              <div className="absolute top-3 right-3">
                {showRequests ? (
                  <MdVisibilityOff
                    size={22}
                    className={iconStyle}
                    onClick={() => setShowRequests(false)}
                  />
                ) : (
                  <MdVisibility
                    size={22}
                    className={iconStyle}
                    onClick={() => setShowRequests(true)}
                  />
                )}
              </div>
              {showRequests && <UserRequests />}
            </div>

            {/* Top Products */}
            <div className={`${boxStyle} col-span-1 md:col-span-2`}>
              <div className="absolute top-3 right-3">
                {showTopProducts ? (
                  <MdVisibilityOff
                    size={22}
                    className={iconStyle}
                    onClick={() => setShowTopProducts(false)}
                  />
                ) : (
                  <MdVisibility
                    size={22}
                    className={iconStyle}
                    onClick={() => setShowTopProducts(true)}
                  />
                )}
              </div>
              {showTopProducts && <TopProducts />}
            </div>

            {/* Extra Box */}
            <div className={boxStyle}>
              <div className="absolute top-3 right-3">
                <MdVisibility size={22} className={iconStyle} />
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
