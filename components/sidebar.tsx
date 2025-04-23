"use client";

import React from "react";

interface SidebarProps {
  onSelect: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div className="h-screen w-60 bg-gray-800 text-white p-4 flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <button
        onClick={() => onSelect("requests")}
        className="text-left px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        📦 Requests
      </button>
      {/* Add more buttons here for other sections */}
    </div>
  );
};

export default Sidebar;
