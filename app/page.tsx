"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import AppBarChart from "@/components/AppBarChart";
import Card from "@/components/CardList";
import UserRequests from "@/components/UserRequests";
import TopProducts from "@/components/TopProducts";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Button } from "@/components/ui/button";

type OrderData = {
  "Product-Price"?: string | number;
  Quantity: number | string;
  Time?: { seconds: number };
};

type TotalType = {
  day: string; // "YYYY-MM-DD" for daily, "W1", "W2" etc. for weekly
  total: number;
};

// Use local timezone for day start
const getDayStartDate = (date: Date) => {
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return local.toLocaleDateString("en-CA"); // YYYY-MM-DD
};

// Get start of the week (Monday) in local time
const getWeekStartDate = (date: Date) => {
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = local.getDay(); // 0 = Sunday
  const diff = local.getDate() - ((day + 6) % 7); // Monday as start
  local.setDate(diff);
  return local.toLocaleDateString("en-CA");
};

export default function HomePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const [showRequests, setShowRequests] = useState(true);
  const [showTopProducts, setShowTopProducts] = useState(true);
  const [dailyTotals, setDailyTotals] = useState<TotalType[]>([]);
  const [weeklyTotals, setWeeklyTotals] = useState<TotalType[]>([]);
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const snapshot = await getDocs(collection(db, "user_request"));
        const data: OrderData[] = snapshot.docs.map((doc) => doc.data()) as OrderData[];

        const dailyMap: Record<string, number> = {};
        const weeklyMap: Record<string, number> = {};

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

        const weeklySorted = Object.entries(weeklyMap)
          .sort((a, b) => (a[0] < b[0] ? -1 : 1));

        const weeklyArray: TotalType[] = weeklySorted.map(([week, total], i) => ({
          day: `W${i + 1}`,
          total,
        }));

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
              <div className="absolute top-3 right-3 flex gap-2 items-center">
                <Button
                  variant={viewMode === "daily" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("daily")}
                >
                  Daily
                </Button>
                <Button
                  variant={viewMode === "weekly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("weekly")}
                >
                  Weekly
                </Button>
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
                <AppBarChart
                  dailyTotals={viewMode === "daily" ? dailyTotals : weeklyTotals}
                />
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
}
