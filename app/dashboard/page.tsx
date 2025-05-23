"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AppBarChart from "@/components/AppBarChart";
import Card from "@/components/CardList";
import UserRequests from "@/components/UserRequests";
import TopProducts from "@/components/TopProducts";
import Total from "@/components/total";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

type TotalType = {
  day: string;
  total: number;
};

type OrderData = {
  "Product-Price"?: string | number;
  Quantity: number | string;
  Time?: { seconds: number };
  ["Customer-Name"]?: string;
  Address?: string;
};

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
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [recentData, setRecentData] = useState<OrderData[]>([]);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const fetchTotals = async () => {
      setIsDataLoading(true);
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

        const sortedRecent = data
          .filter((order) => order.Time?.seconds)
          .sort((a, b) => (b.Time!.seconds || 0) - (a.Time!.seconds || 0))
          .slice(0, 5);

        setRecentData(sortedRecent);
      } catch (err) {
        console.error("Failed to fetch totals:", err);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchTotals();
  }, []);

  const iconStyle =
    "text-muted-foreground hover:text-primary transition duration-200 cursor-pointer";
  const boxStyle =
    "bg-white dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 shadow-sm p-5 rounded-2xl relative";

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-background">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div
        className={transition-all duration-300 w-full ${
          isSidebarCollapsed ? "sm:ml-20" : "sm:ml-64"
        } flex-1}
      >
        <main className="p-4 sm:p-6 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Total Price", "Recent Price"].map((label, idx) => (
              <div
                key={label}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow bg-white dark:bg-zinc-900/60 backdrop-blur"
              >
                <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-2">
                  {label}
                </h3>
                {isDataLoading ? (
                  <p className="text-sm text-zinc-500">Loading...</p>
                ) : (
                  <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                    <Total
                      total={
                        idx === 0
                          ? dailyTotals.reduce((acc, curr) => acc + curr.total, 0)
                          : dailyTotals.length
                          ? dailyTotals[dailyTotals.length - 1].total
                          : 0
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chart + Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Chart */}
            <div className={${boxStyle} xl:col-span-2}>
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setShowWeekly(!showWeekly)}
                  className="text-xs sm:text-sm bg-primary text-white px-2 py-1 rounded-lg shadow hover:bg-primary/90"
                >
                  {showWeekly ? "Show Daily" : "Show Weekly"}
                </button>
                {showChart ? (
                  <MdVisibilityOff
                    size={20}
                    className={iconStyle}
                    onClick={() => setShowChart(false)}
                  />
                ) : (
                  <MdVisibility
                    size={20}
                    className={iconStyle}
                    onClick={() => setShowChart(true)}
                  />
                )}
              </div>
              {showChart && (
                <AppBarChart
                  dailyTotals={showWeekly ? weeklyTotals : dailyTotals}
                />
              )}
            </div>

            {/* Card */}
            <div className={boxStyle}>
              <div className="absolute top-3 right-3">
                {showCard ? (
                  <MdVisibilityOff
                    size={20}
                    className={iconStyle}
                    onClick={() => setShowCard(false)}
                  />
                ) : (
                  <MdVisibility
                    size={20}
                    className={iconStyle}
                    onClick={() => setShowCard(true)}
                  />
                )}
              </div>
              {showCard && <Card />}
            </div>

            {/* User Requests */}
            <div className={${boxStyle} md:col-span-2 xl:col-span-3}>
              <div className="absolute top-3 right-3">
                {showRequests ? (
                  <MdVisibilityOff
                    size={20}
                    className={iconStyle}
                    onClick={() => setShowRequests(false)}
                  />
                ) : (
                  <MdVisibility
                    size={20}
                    className={iconStyle}
                    onClick={() => setShowRequests(true)}
                  />
                )}
              </div>
              {showRequests && <UserRequests />}
            </div>

            {/* Top Products */}
            <div className={${boxStyle} xl:col-span-2}>
              <div className="absolute top-3 right-3">
                {showTopProducts ? (
                  <MdVisibilityOff
                    size={20}
                    className={iconStyle}
                    onClick={() => setShowTopProducts(false)}
                  />
                ) : (
                  <MdVisibility
                    size={20}
                    className={iconStyle}
                    onClick={() => setShowTopProducts(true)}
                  />
                )}
              </div>
              {showTopProducts && <TopProducts />}
            </div>

            {/* Modern White Recent Orders Box */}
            <div className="bg-white text-zinc-800 rounded-2xl shadow-md p-6 space-y-4 xl:col-span-1 border border-zinc-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold tracking-tight">Recent Orders</h3>
                <MdVisibility size={20} className="text-zinc-400" />
              </div>
              {recentData.length === 0 ? (
                <p className="text-sm text-zinc-500">No recent data</p>
              ) : (
                <div className="space-y-4 text-sm font-medium">
                  {recentData.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-b border-zinc-100 pb-3 last:border-b-0"
                    >
                      <p>
                        <span className="text-zinc-500">Name:</span>{" "}
                        {item["Customer-Name"] || "N/A"}
                      </p>
                      <p>
                        <span className="text-zinc-500">Address:</span>{" "}
                        {item.Address || "N/A"}
                      </p>
                      <p>
                        <span className="text-zinc-500">Price:</span>{" "}
                        {item["Product-Price"] || "N/A"}
                      </p>
                      <p>
                        <span className="text-zinc-500">Qty:</span>{" "}
                        {item.Quantity}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
