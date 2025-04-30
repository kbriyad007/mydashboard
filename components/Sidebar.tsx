"use client";

import Link from "next/link";
import { FiUser, FiDatabase, FiGrid } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-48 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg p-5 flex flex-col">
      {/* Sidebar Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-wide text-center text-teal-400">Dashboard</h2>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 space-y-2">
        <ul className="space-y-1">
          <li>
            <Link
              href="https://mydashboard-eight-pi.vercel.app/"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 hover:text-teal-300 transition-colors text-sm"
            >
              <FiUser className="text-lg" />
              <span>User Requests</span>
            </Link>
          </li>

          <li>
            <Link
              href="/user-data"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 hover:text-teal-300 transition-colors text-sm"
            >
              <FiDatabase className="text-lg" />
              <span>User Data</span>
            </Link>
          </li>

          <li>
            <Link
              href="/other-section"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 hover:text-teal-300 transition-colors text-sm"
            >
              <FiGrid className="text-lg" />
              <span>Other Section</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
