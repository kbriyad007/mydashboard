"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Home,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isCollapsed, toggleSidebar }: SidebarProps) => {
  return (
    <motion.aside
      className={`fixed top-0 left-0 h-full ${
        isCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-r shadow-xl p-6 flex flex-col justify-between transition-all duration-300 ease-in-out rounded-r-xl`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Minimize Button */}
      <Button
        variant="ghost"
        className="absolute top-4 right-4 text-white hover:text-gray-200"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </Button>

      <div>
        <h2
          className={`text-xl font-semibold mb-6 ${
            isCollapsed ? "hidden" : ""
          } transition-opacity duration-200`}
        >
          Dashboard
        </h2>
        <nav className="space-y-4">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start hover:bg-blue-700 rounded-lg">
              <Home className="w-5 h-5 mr-2" />
              {!isCollapsed && "Home"}
            </Button>
          </Link>
          <Link href="/account">
            <Button variant="ghost" className="w-full justify-start hover:bg-blue-700 rounded-lg">
              <User className="w-5 h-5 mr-2" />
              {!isCollapsed && "My Account"}
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start hover:bg-blue-700 rounded-lg">
              <Settings className="w-5 h-5 mr-2" />
              {!isCollapsed && "Settings"}
            </Button>
          </Link>
        </nav>
      </div>

      {/* Dropdown at bottom */}
      <div className="mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between hover:bg-blue-700 rounded-lg"
            >
              <span className="flex items-center">
                <LogOut className="w-5 h-5 mr-2" />
                {!isCollapsed && "Sign Out"}
              </span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-56 bg-white text-gray-800 rounded-lg shadow-lg">
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
