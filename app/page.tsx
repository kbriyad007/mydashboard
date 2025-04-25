"use client";

import UserRequests from "../components/UserRequests";

export default function Home() {
  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Requests</h1>
      {/* Render the UserRequests component */}
      <UserRequests />
    </div>
  );
}
