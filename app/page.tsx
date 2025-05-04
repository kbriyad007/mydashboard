"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AppBarChart from "@/components/AppBarChart";
import Card from "@/components/CardList";
import UserRequests from "@/components/UserRequests";
import TopProducts from "@/components/TopProducts";
import { Eye, EyeOff } from "lucide-react";
import ReactTooltip from "react-tooltip"; // Import react-tooltip

export default function Home() {
  const [showChart, setShowChart] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const [showRequests, setShowRequests] = useState(true);
  const [showTopProducts, setShowTopProducts] = useState(true);

  const iconStyle = "text-gray-400 hover:text-gray-700 cursor-pointer";

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
                    data-tip="Hide chart" // Added tooltip
                    onClick={() => setShowChart(false)}
                  />
                ) : (
                  <Eye
                    size={16}
                    className={iconStyle}
                    data-tip="Show chart" // Added tooltip
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
                    data-tip="Hide card" // Added tooltip
                    onClick={() => setShowCard(false)}
                  />
                ) : (
                  <Eye
                    size={16}
                    className={iconStyle}
                    data-tip="Show card" // Added tooltip
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
                    data-tip="Hide requests" // Added tooltip
                    onClick={() => setShowRequests(false)}
                  />
                ) : (
                  <Eye
                    size={16}
                    className={iconStyle}
                    data-tip="Show requests" // Added tooltip
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
                    data-tip="Hide top products" // Added tooltip
                    onClick={() => setShowTopProducts(false)}
                  />
                ) : (
                  <Eye
                    size={16}
                    className={iconStyle}
                    data-tip="Show top products" // Added tooltip
                    onClick={() => setShowTopProducts(true)}
                  />
                )}
              </div>
              {showTopProducts && <TopProducts />}
            </div>

            {/* Box 5 */}
            <div className="bg-white p-4 rounded shadow relative">
              <div className="absolute top-2 right-2">
                <Eye
                  size={16}
                  className={iconStyle}
                  data-tip="Box 5" // Added tooltip
                />
              </div>
              Box 5
            </div>

            {/* Box 6 */}
            <div className="bg-white p-4 rounded shadow relative">
              <div className="absolute top-2 right-2">
                <Eye
                  size={16}
                  className={iconStyle}
                  data-tip="Box 6" // Added tooltip
                />
              </div>
              Box 6
            </div>
          </div>
        </main>
      </div>

      <ReactTooltip /> {/* Tooltip container */}
    </div>
  );
}
