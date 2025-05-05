"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar"; // Import Sidebar component
import AppBarChart from "@/components/AppBarChart";
import Card from "@/components/CardList";
import UserRequests from "@/components/UserRequests";
import TopProducts from "@/components/TopProducts";
import WeeklyTotal from "@/components/WeeklyTotal";
import { Eye, EyeOff } from "lucide-react";

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const [showRequests, setShowRequests] = useState(true);
  const [showTopProducts, setShowTopProducts] = useState(true);
  const [showWeeklyTotal, setShowWeeklyTotal] = useState(true);

  const iconStyle = "text-gray-400 hover:text-gray-700 cursor-pointer";

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Pass the collapsed state and toggle function to Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      <div className="ml-60 flex-1 flex flex-col">
        <main className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {/* Box 1 - Chart */}
            <div className="bg-white p-4 rounded shadow col-span-2 relative">
              <div className="absolute top-2 right-2">
                {showChart ? (
                  <EyeOff
                    size={16}
                    className={iconStyle}
                    onClick={() => setShowChart(false)}
                  />
                ) : (
                  <Eye
                    size={16}
                    className={iconStyle}
                    onClick={() => setShowChart(true)}
                  />
                )}
              </div>
              {showChart && <AppBarChart />}
            </div>

            {/* Box 2 - Card */}
            <div className="bg-white p-4 rounded shadow relative">
              <div className="absolute top-2 right-2">
                {showCard ? (
                  <EyeOff
                    size={16}
                    className={iconStyle}
                    onClick={() => setShowCard(false)}
                  />
                ) : (
                  <Eye
                    size={16}
                    className={iconStyle}
                    onClick={() => setShowCard(true)}
                  />
                )}
              </div>
              {showCard && <Card />}
            </div>

            {/* Box 3 - User Requests */}
            <div className="bg-white p-4 rounded shadow col-span-3 relative">
              <div className="absolute top-2 right-2">
                {showRequests ? (
                  <EyeOff
                    size={16}
                    className={iconStyle}
                    onClick={() => setShowRequests(false)}
                  />
                ) : (
                  <Eye
                    size={16}
                    className={iconStyle}
                    onClick={() => setShowRequests(true)}
                  />
                )}
              </div>
              {showRequests && <UserRequests />}
            </div>

            {/* Box 4 - Top Products */}
            <div className="bg-white p-4 rounded shadow col-span-2 relative">
              <div className="absolute top-2 right-2">
                {showTopProducts ? (
                  <EyeOff
                    size={16}
                    className={iconStyle}
                    onClick={() => setShowTopProducts(false)}
                  />
                ) : (
                  <Eye
                    size={16}
                    className={iconStyle}
                    onClick={() => setShowTopProducts(true)}
                  />
                )}
              </div>
              {showTopProducts && <TopProducts />}
            </div>

            {/* Box 5 - Weekly Total */}
            <div className="bg-white p-4 rounded shadow relative">
              <div className="absolute top-2 right-2">
                {showWeeklyTotal ? (
                  <EyeOff
                    size={16}
                    className={iconStyle}
                    onClick={() => setShowWeeklyTotal(false)}
                  />
                ) : (
                  <Eye
                    size={16}
                    className={iconStyle}
                    onClick={() => setShowWeeklyTotal(true)}
                  />
                )}
              </div>
              {showWeeklyTotal && <WeeklyTotal />}
            </div>

            {/* Box 6 - Placeholder */}
            <div className="bg-white p-4 rounded shadow relative">
              <div className="absolute top-2 right-2">
                <Eye size={16} className={iconStyle} />
              </div>
              Box 6
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
