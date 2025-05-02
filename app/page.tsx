"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-60 flex-1 flex flex-col">
        <Navbar />

        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Content</h2>
          <div className="grid grid-cols-3 gap-4">
             <div className="bg-white p-4 rounded shadow">Box 1</div>
             <div className="bg-white p-4 rounded shadow">Box 2</div>
             <div className="bg-white p-4 rounded shadow">Box 3</div>
             <div className="bg-white p-4 rounded shadow">Box 1</div>
             <div className="bg-white p-4 rounded shadow">Box 2</div>
             <div className="bg-white p-4 rounded shadow">Box 3</div>
  </div>
        </main>
      </div>
    </div>
  );
}

