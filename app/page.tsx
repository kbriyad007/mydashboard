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

type OrderData = {
  "Product-Price"?: string | number;
  Quantity: number | string;
  Time?: { seconds: number };
};

type DailyTotalType = {
  day: string;
  total: number;
};

const getDayStartDate = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0); // Set to the start of the day
  return d.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

export default function HomePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const [showRequests, setShowRequests] = useState(true);
  const [showTopProducts, setShowTopProducts] = useState(true);
  const [dailyTotals, setDailyTotals] = useState<DailyTotalType[]>([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching data

  useEffect(() => {
    const fetchDailyTotals = async () => {
      setLoading(true); // Start loading
      try {
        const snapshot = await getDocs(collection(db, "user_request"));
        const data: OrderData[] = snapshot.docs.map((doc) => doc.data()) as OrderData[];

        const dailyMap: { [day: string]: number } = {};

        data.forEach((order) => {
          const price = parseFloat(order["Product-Price"] as string) || 0; // Handle missing or invalid price
          const qty = parseInt(order.Quantity as string) || 1; // Handle missing or invalid quantity

          if (order.Time?.seconds) {
            const orderDate = new Date(order.Time.seconds * 1000);
            const dayStart = getDayStartDate(orderDate);

            if (!dailyMap[dayStart]) dailyMap[dayStart] = 0;
            dailyMap[dayStart] += price * qty;
          }
        });

        const dailyArray: DailyTotalType[] = Object.entries(dailyMap)
          .map(([day, total]) => ({ day, total }))
          .sort((a, b) => (a.day < b.day ? -1 : 1));

        setDailyTotals(dailyArray); // Set the fetched totals
      } catch (error) {
        console.error("Failed to fetch daily totals:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDailyTotals();
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
              <div className="absolute top-3 right-3">
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
              {showChart && !loading ? (
                <AppBarChart dailyTotals={dailyTotals} />
              ) : (
                loading && <p>Loading chart...</p>
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
