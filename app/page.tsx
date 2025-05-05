"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AppBarChart from "@/components/AppBarChart";
import Card from "@/components/CardList";
import UserRequests from "@/components/UserRequests";
import TopProducts from "@/components/TopProducts";
import WeeklyTotal from "@/components/WeeklyTotal";
import { Eye, EyeOff } from "lucide-react";

export default function Home() {
  const [showChart, setShowChart] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const [showRequests, setShowRequests] = useState(true);
  const [showTopProducts, setShowTopProducts] = useState(true);
  const [showWeeklyTotal, setShowWeeklyTotal] = useState(true);

  const iconStyle = "text-gray-400 hover:text-gray-700 cursor-pointer";

  // Mock request data (replace with actual data)
  const requests = [
    { date: "2025-05-01T00:00:00Z", amount: 120 },
    { date: "2025-05-02T00:00:00Z", amount: 150 },
    { date: "2025-05-03T00:00:00Z", amount: 80 },
    { date: "2025-05-04T00:00:00Z", amount: 200 },
    { date: "2025-05-05T00:00:00Z", amount: 95 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

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
              {showWeeklyTotal && <WeeklyTotal requests={requests} />}
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
