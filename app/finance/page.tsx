"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/CardList";
import UserRequests from "@/components/UserRequests";
import TopProducts from "@/components/TopProducts";
import Total from "@/components/total";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

type OrderData = {
  "Product-Price"?: string | number;
  Quantity: number | string;
  Time?: { seconds: number };
  ["Customer-Name"]?: string;
  Address?: string;
};

const Dashboard = () => {
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [showRequests, setShowRequests] = useState(true);
  const [showTopProducts, setShowTopProducts] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [recentData, setRecentData] = useState<OrderData[]>([]);
  const [financialData, setFinancialData] = useState<OrderData[]>([]);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const fetchFinancialData = async () => {
      setIsDataLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "user_request"));
        const data: OrderData[] = snapshot.docs.map((doc) => doc.data()) as OrderData[];

        const validOrders = data.filter((order) => {
          const price = parseFloat(order["Product-Price"] as string);
          const qty = parseInt(order.Quantity as string);
          return !isNaN(price) && !isNaN(qty);
        });

        const sortedRecent = validOrders
          .filter((order) => order.Time?.seconds)
          .sort((a, b) => (b.Time!.seconds || 0) - (a.Time!.seconds || 0))
          .slice(0, 5);

        setFinancialData(validOrders);
        setRecentData(sortedRecent);
      } catch (err) {
        console.error("Failed to fetch financial data:", err);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchFinancialData();
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
        className={`transition-all duration-300 w-full ${
          isSidebarCollapsed ? "sm:ml-20" : "sm:ml-64"
        } flex-1`}
      >
        <main className="p-4 sm:p-6 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Total Revenue", "Most Recent Revenue"].map((label, idx) => (
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
                          ? financialData.reduce((acc, curr) => {
                              const price = parseFloat(curr["Product-Price"] as string) || 0;
                              const qty = parseInt(curr.Quantity as string) || 0;
                              return acc + price * qty;
                            }, 0)
                          : recentData.length
                          ? (() => {
                              const last = recentData[0];
                              const price = parseFloat(last["Product-Price"] as string) || 0;
                              const qty = parseInt(last.Quantity as string) || 0;
                              return price * qty;
                            })()
                          : 0
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Financial Table */}
          <div className={boxStyle}>
            <h2 className="text-xl font-semibold mb-4">Order Financial Summary</h2>
            {isDataLoading ? (
              <p className="text-sm text-zinc-500">Loading financial data...</p>
            ) : financialData.length === 0 ? (
              <p className="text-sm text-zinc-500">No financial data available.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm">
                  <thead className="text-left border-b border-zinc-200 dark:border-zinc-700">
                    <tr>
                      <th className="py-2 pr-4">Customer Name</th>
                      <th className="py-2 pr-4">Price</th>
                      <th className="py-2 pr-4">Qty</th>
                      <th className="py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialData.map((order, idx) => {
                      const price = parseFloat(order["Product-Price"] as string) || 0;
                      const qty = parseInt(order.Quantity as string) || 0;
                      return (
                        <tr
                          key={idx}
                          className="border-b border-zinc-100 dark:border-zinc-800"
                        >
                          <td className="py-2 pr-4">{order["Customer-Name"] || "N/A"}</td>
                          <td className="py-2 pr-4">{price.toFixed(2)}</td>
                          <td className="py-2 pr-4">{qty}</td>
                          <td className="py-2">{(price * qty).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
          <div className={`${boxStyle} md:col-span-2 xl:col-span-3`}>
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
          <div className={boxStyle}>
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

          {/* Recent Orders Box */}
          <div className="bg-white text-zinc-800 rounded-2xl shadow-md p-6 space-y-4 border border-zinc-200">
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
