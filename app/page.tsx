"use client";

import UserRequests from "../components/UserRequests";

export default function Home() {
  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen space-y-6">
      {/* Render the UserRequests component */}
      <UserRequests />
    </div>
  );
}
