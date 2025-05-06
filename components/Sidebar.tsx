"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleSignOut = () => {
    // Clear the localStorage session data (isAdmin flag)
    localStorage.removeItem("isAdmin");

    // Redirect the user to the login page after signing out
    router.push("/login");
  };

  return (
    <motion.aside
      className={`fixed top-0 left-0 h-full ${
        isCollapsed ? "w-16" : "w-56"
      } bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-r shadow-xl py-4 px-3 flex flex-col justify-between transition-all duration-300 ease-in-out rounded-r-xl`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Minimize Button */}
      <button
        className="absolute top-3 right-3 p-1 text-white hover:text-gray-200"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      <div>
        <h2
          className={`text-lg font-semibold mb-6 ${
            isCollapsed ? "hidden" : ""
          } transition-opacity duration-200`}
        >
          Dashboard
        </h2>
        <nav className="space-y-2">
          <Link href="https://mydashboard-lac.vercel.app/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm px-2 py-1.5 hover:bg-blue-700 rounded-md"
            >
              <Home className="w-4 h-4 mr-2" />
              {!isCollapsed && "Home"}
            </Button>
          </Link>
          <Link href="/account">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm px-2 py-1.5 hover:bg-blue-700 rounded-md"
            >
              <User className="w-4 h-4 mr-2" />
              {!isCollapsed && "My Account"}
            </Button>
          </Link>
          <Link href="/settings">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm px-2 py-1.5 hover:bg-blue-700 rounded-md"
            >
              <Settings className="w-4 h-4 mr-2" />
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
              className="w-full justify-between text-sm px-2 py-1.5 hover:bg-blue-700 rounded-md"
            >
              <span className="flex items-center">
                <LogOut className="w-4 h-4 mr-2" />
                {!isCollapsed && "Sign Out"}
              </span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-48 bg-white text-gray-800 rounded-lg shadow-lg"
          >
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
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
