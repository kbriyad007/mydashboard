"use client";

import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-gray-800 text-white p-6 flex flex-col">
      {/* Sidebar Header */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 space-y-4">
        <ul>
          {/* User Requests Link */}
          <li>
            <div className="hover:bg-gray-700 rounded-md transition-all">
              <Link href="https://mydashboard-eight-pi.vercel.app/" className="block px-4 py-2 text-base text-white hover:text-gray-300">
                User Requests
              </Link>
            </div>
          </li>

          {/* User Data Link */}
          <li>
            <div className="hover:bg-gray-700 rounded-md transition-all">
              <Link href="/user-data" className="block px-4 py-2 text-base text-white hover:text-gray-300">
                User Data
              </Link>
            </div>
          </li>

          {/* Other Section Link */}
          <li>
            <div className="hover:bg-gray-700 rounded-md transition-all">
              <Link href="/other-section" className="block px-4 py-2 text-base text-white hover:text-gray-300">
                Other Section
              </Link>
            </div>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-6">
        <button className="w-full py-2 px-4 border border-white text-white rounded-md hover:bg-gray-600 transition-all">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
