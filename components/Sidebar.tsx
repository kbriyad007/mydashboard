"use client";

import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-full w-full p-6">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
      </div>
      <nav>
        <ul className="space-y-6">
          <li>
            <Link href="/user-requests" className="text-lg hover:text-gray-300 block">
              User Requests
            </Link>
          </li>
          <li>
            <Link href="/user-data" className="text-lg hover:text-gray-300 block">
              User Data
            </Link>
          </li>
          <li>
            <Link href="/other-section" className="text-lg hover:text-gray-300 block">
              Other Section
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

