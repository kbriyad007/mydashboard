"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
            <Card className="bg-transparent shadow-none hover:bg-gray-700 rounded-md transition-all">
              <Link href="https://mydashboard-eight-pi.vercel.app/">
                <a className="flex items-center space-x-2 px-4 py-2 text-base text-white hover:text-gray-300 transition-all">
                  <Button variant="link" className="w-full text-left">
                    User Requests
                  </Button>
                </a>
              </Link>
            </Card>
          </li>

          {/* User Data Link */}
          <li>
            <Card className="bg-transparent shadow-none hover:bg-gray-700 rounded-md transition-all">
              <Link href="/user-data">
                <a className="flex items-center space-x-2 px-4 py-2 text-base text-white hover:text-gray-300 transition-all">
                  <Button variant="link" className="w-full text-left">
                    User Data
                  </Button>
                </a>
              </Link>
            </Card>
          </li>

          {/* Other Section Link */}
          <li>
            <Card className="bg-transparent shadow-none hover:bg-gray-700 rounded-md transition-all">
              <Link href="/other-section">
                <a className="flex items-center space-x-2 px-4 py-2 text-base text-white hover:text-gray-300 transition-all">
                  <Button variant="link" className="w-full text-left">
                    Other Section
                  </Button>
                </a>
              </Link>
            </Card>
          </li>
        </ul>
      </nav>

      {/* Optional: Add any other elements like profile info, logout button, etc. */}
      <div className="mt-6">
        <Card className="bg-transparent shadow-none hover:bg-gray-700 rounded-md transition-all">
          <Button variant="outline" className="w-full text-white hover:bg-gray-600">
            Logout
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;
