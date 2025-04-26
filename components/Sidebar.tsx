"use client";

import UserRequests from "../components/UserRequests";
import Sidebar from "../components/sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-36 flex-1 p-6"> {/* Push content after fixed sidebar */}
        <UserRequests />
      </div>
    </div>
  );
}

