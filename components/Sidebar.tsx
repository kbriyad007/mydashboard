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
  LayoutDashboard,
  User,
  Settings2,
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
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  return (
    <motion.aside
      className={`fixed top-0 left-0 h-full ${
        isCollapsed ? "w-16" : "w-60"
      } bg-gradient-to-br from-indigo-600 to-blue-600 text-white border-r shadow-lg py-5 px-4 flex flex-col justify-between transition-all duration-300 ease-in-out rounded-r-xl`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="absolute top-4 right-0.5 z-10 text-white hover:text-gray-200"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>

      <div>
        <h2
          className={`text-xl font-bold mb-8 tracking-tight ${
            isCollapsed ? "hidden" : "block"
          } transition-opacity duration-200`}
        >
          Dashboard
        </h2>
        <nav className="space-y-3">
          <Link href="https://mydashboard-lac.vercel.app/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm px-2 py-2 hover:bg-blue-700 rounded-lg transition-all"
            >
              <LayoutDashboard className="w-5 h-5 mr-2" />
              {!isCollapsed && <span>Home</span>}
            </Button>
          </Link>
          <Link href="/account">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm px-2 py-2 hover:bg-blue-700 rounded-lg transition-all"
            >
              <User className="w-5 h-5 mr-2" />
              {!isCollapsed && <span>My Account</span>}
            </Button>
          </Link>
          <Link href="/finance">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm px-2 py-2 hover:bg-blue-700 rounded-lg transition-all"
            >
              <Settings2 className="w-5 h-5 mr-2" />
              {!isCollapsed && <span>Finance</span>}
            </Button>
          </Link>
        </nav>
      </div>

      <div className="mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between items-center text-sm px-2 py-2 hover:bg-blue-700 rounded-lg transition-all"
            >
              <span className="flex items-center">
                <LogOut className="w-5 h-5 mr-2" />
                {!isCollapsed && "Sign Out"}
              </span>
              {!isCollapsed && <ChevronDown className="w-4 h-4 ml-auto" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-48 bg-white text-gray-800 rounded-lg shadow-lg"
          >
            <DropdownMenuItem>
              <Settings2 className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2 text-red-600" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
