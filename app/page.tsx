"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AppBarChart from "@/components/AppBarChart";
import Card from "@/components/CardList";
import UserRequests from "@/components/UserRequests";
import TopProducts from "@/components/TopProducts";
import { Button } from "@/components/ui/button"; // Assuming ShadCN UI is installed

export default function Home() {
  const [showTopProducts, setShowTopProducts] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-60 flex-1 flex flex-col">
        <main className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow col-span-2">
              <AppBarChart />
            </div>

            <div className="bg-white p-4 rounded shadow">
              <Card />
            </div>

            <div className="bg-white p-4 rounded shadow col-span-3">
              <UserRequests />
            </div>

            {/* Toggle Button for Top Products */}
            <div className="col-span-3 flex justify-end">
              <Button
                variant="outline"
                className="mb-2"
                onClick={() => setShowTopProducts(!showTopProducts)}
              >
                {showTopProducts ? "Hide Top Products" : "Show Top Products"}
              </Button>
            </div>

            {/* Conditional Top Products Box */}
            {showTopProducts && (
              <div className="bg-white p-4 rounded shadow col-span-2">
                <TopProducts />
              </div>
            )}

            <div className="bg-white p-4 rounded shadow">Box 5</div>
            <div className="bg-white p-4 rounded shadow">Box 6</div>
          </div>
        </main>
      </div>
    </div>
  );
}
