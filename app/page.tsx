"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AppBarChart from "@/components/AppBarChart";
import Card from "@/components/CardList";
import UserRequests from "@/components/UserRequests";
import TopProducts from "@/components/TopProducts";
import WeeklyTotal from "@/components/WeeklyTotal";
import { Eye, EyeOff } from "lucide-react";

export default function HomePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const [showRequests, setShowRequests] = useState(true);
  const [showTopProducts, setShowTopProducts] = useState(true);
  const [showWeeklyTotal, setShowWeeklyTotal] = useState(true);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  const iconStyle =
    "text-muted-foreground hover:text-primary transition duration-200 cursor-pointer";

  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        } flex-1 flex flex-col`}
      >
        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border col-span-1 md:col-span-2 relative">
              <div className="absolute top-3 right-3">
                {showChart ? (
                  <EyeOff size={18} className={iconStyle} onClick={() => setShowChart(false)} />
                ) : (
                  <Eye size={18} className={iconStyle} onClick={() => setShowChart(true)} />
                )}
              </div>
              {showChart && <AppBarChart />}
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border relative">
              <div className="absolute top-3 right-3">
                {showCard ? (
                  <EyeOff size={18} className={iconStyle} onClick={() => setShowCard(false)} />
                ) : (
                  <Eye size={18} className={iconStyle} onClick={() => setShowCard(true)} />
                )}
              </div>
              {showCard && <Card />}
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border col-span-1 md:col-span-3 relative">
              <div className="absolute top-3 right-3">
                {showRequests ? (
                  <EyeOff size={18} className={iconStyle} onClick={() => setShowRequests(false)} />
                ) : (
                  <Eye size={18} className={iconStyle} onClick={() => setShowRequests(true)} />
                )}
              </div>
              {showRequests && <UserRequests />}
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border col-span-1 md:col-span-2 relative">
              <div className="absolute top-3 right-3">
                {showTopProducts ? (
                  <EyeOff size={18} className={iconStyle} onClick={() => setShowTopProducts(false)} />
                ) : (
                  <Eye size={18} className={iconStyle} onClick={() => setShowTopProducts(true)} />
                )}
              </div>
              {showTopProducts && <TopProducts />}
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border relative">
              <div className="absolute top-3 right-3">
                {showWeeklyTotal ? (
                  <EyeOff size={18} className={iconStyle} onClick={() => setShowWeeklyTotal(false)} />
                ) : (
                  <Eye size={18} className={iconStyle} onClick={() => setShowWeeklyTotal(true)} />
                )}
              </div>
              {showWeeklyTotal && <WeeklyTotal />}
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border relative">
              <div className="absolute top-3 right-3">
                <Eye size={18} className={iconStyle} />
              </div>
              <p className="text-muted-foreground text-sm">Box 6</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
