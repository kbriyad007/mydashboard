// components/Sidebar.tsx
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

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isCollapsed, toggleSidebar }: SidebarProps) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full ${
        isCollapsed ? "w-20" : "w-64"
      } bg-white border-r shadow p-6 flex flex-col justify-between transition-all duration-300`}
    >
      {/* Minimize Button */}
      <Button
        variant="ghost"
        className="absolute top-4 right-4"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </Button>

      <div>
        <h2 className={`text-xl font-bold mb-6 ${isCollapsed ? "hidden" : ""}`}>
          Dashboard
        </h2>
        <nav className="space-y-4">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="w-4 h-4 mr-2" />
              {!isCollapsed && "Home"}
            </Button>
          </Link>
          <Link href="/account">
            <Button variant="ghost" className="w-full justify-start">
              <User className="w-4 h-4 mr-2" />
              {!isCollapsed && "My Account"}
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start">
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
            <Button variant="ghost" className="w-full justify-between">
              <span className="flex items-center">
                <LogOut className="w-4 h-4 mr-2" />
                {!isCollapsed && "Sign Out"}
              </span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-56">
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
    </aside>
  );
};

export default Sidebar;
