"use client";  // This ensures the component is client-side rendered

import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/user-requests">
              <a className="text-lg hover:text-gray-300">User Requests</a>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/user-data">
              <a className="text-lg hover:text-gray-300">User Data</a>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/other-section">
              <a className="text-lg hover:text-gray-300">Other Section</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
