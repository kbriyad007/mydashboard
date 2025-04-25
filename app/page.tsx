"use client";

import UserRequests from "../components/UserRequests";
import Sidebar from "../components/Sidebar"; // Ensure the correct import

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <UserRequests />
      </div>
    </div>
  );
}
