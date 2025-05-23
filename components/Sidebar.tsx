"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Settings2,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Home",
    icon: LayoutDashboard,
    href: "https://mydashboard-lac.vercel.app/dashboard",
  },
  {
    label: "My Account",
    icon: User,
    href: "/account",
  },
  {
    label: "Finance",
    icon: Settings2,
    href: "/finance",
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const handleSignOut = () => {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 h-full ${
        isCollapsed ? "w-16" : "w-64"
      } bg-gradient-to-br from-indigo-700 to-blue-700 text-white shadow-xl z-50 flex flex-col justify-between px-3 py-6 transition-all duration-300 ease-in-out rounded-r-2xl`}
    >
      {/* Toggle Button */}
      <button
        className="absolute top-4 right-[-12px] bg-blue-700 hover:bg-blue-800 text-white p-1 rounded-full shadow-md transition"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>

      {/* Header */}
      <div>
        {!isCollapsed && (
          <h1 className="text-2xl font-semibold mb-10 text-center tracking-tight">
            Dashboard
          </h1>
        )}

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link href={href} key={label}>
              <Button
                variant="ghost"
                className="w-full justify-start px-2 py-2 text-sm font-medium hover:bg-blue-800 rounded-xl transition-all"
              >
                <Icon className="w-5 h-5 mr-2" />
                {!isCollapsed && <span>{label}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer - Dropdown */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between items-center px-2 py-2 text-sm hover:bg-blue-800 rounded-xl transition-all"
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
            className="w-48 bg-white text-gray-900 rounded-xl shadow-xl"
          >
            <DropdownMenuItem className="hover:bg-gray-100">
              <Settings2 className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-red-600 hover:bg-red-100"
            >
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
