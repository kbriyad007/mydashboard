"use client";

import Link from "next/link";
import { LayoutDashboard, Users, Database, Grid3X3 } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-48 bg-white border-r shadow-sm p-5 flex flex-col">
      {/* Sidebar Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-wide text-center text-indigo-600">Dashboard</h2>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 space-y-2">
        <ul className="space-y-1">
          <li>
            <Link
              href="https://mydashboard-eight-pi.vercel.app/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>User Requests</span>
            </Link>
          </li>

          <li>
            <Link
              href="/user-data"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <Database className="w-4 h-4" />
              <span>User Data</span>
            </Link>
          </li>

          <li>
            <Link
              href="/other-section"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <Grid3X3 className="w-4 h-4" />
              <span>Other Section</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
