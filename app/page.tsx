"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AppBarChart from "@/components/AppBarChart";
import Card from "@/components/Card"; // Import the Card component

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-60 flex-1 flex flex-col">
        <Navbar />

        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Content</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow col-span-2">
              <AppBarChart />
            </div>
            <div className="bg-white p-4 rounded shadow">
              {/* Add the Card component inside Box 2 */}
              <Card />
            </div>
            <div className="bg-white p-4 rounded shadow">Box 3</div>
            <div className="bg-white p-4 rounded shadow">Box 4</div>
            <div className="bg-white p-4 rounded shadow">Box 5</div>
            <div className="bg-white p-4 rounded shadow">Box 6</div>
          </div>
        </main>
      </div>
    </div>
  );
}
