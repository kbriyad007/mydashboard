"use client";

import React from "react";

interface SidebarProps {
  onSelect: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed top-0 left-0 h-screen p-4 shadow-sm flex flex-col z-10">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Dashboard</h2>
      <nav className="flex flex-col gap-2 flex-grow">
        <button
          onClick={() => onSelect("requests")}
          className="text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          Requests
        </button>
        <button
          onClick={() => onSelect("analytics")}
          className="text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          Analytics
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
