"use client";

import Sidebar from "../components/Sidebar";

export default function UserDataPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-48 p-8 flex-1">
        <h1 className="text-3xl font-bold mb-4">User Data</h1>
        <p className="text-lg">This is the User Data page content.</p>
      </div>
    </div>
  );
}

