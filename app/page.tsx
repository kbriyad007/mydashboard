"use client";

import Sidebar from "@/components/Sidebar"; // ✅ This will be used
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  User,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";

const Navbar = () => (
  <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6 border-b">
    <h1 className="text-lg font-medium">Navbar</h1>

    {/* Dropdown Menu */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          My Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserCircle className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
);

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
  

      <div className="ml-60 flex-1 flex flex-col">
        <Navbar />

        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Content</h2>
        </main>
      </div>
    </div>
  );
}
