"use client";

import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-48 bg-gray-800 text-white p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      <nav className="flex-1">
        <ul className="space-y-5">
          <li>
            <Link href="https://mydashboard-eight-pi.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-base hover:text-gray-300 block">
              User Requests
            </Link>
          </li>
          <li>
            <Link href="/user-data" className="text-base hover:text-gray-300 block">
              User Data
            </Link>
          </li>
          <li>
            <Link href="/other-section" className="text-base hover:text-gray-300 block">
              Other Section
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
