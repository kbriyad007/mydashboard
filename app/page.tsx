"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// ✅ Lucide Icons
import {
  User,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => (
  <aside className="fixed top-0 left-0 h-full w-60 bg-white border-r p-4 shadow">
    <h2 className="text-xl font-semibold mb-6">Sidebar</h2>
    {/* Add sidebar links or content here */}
  </aside>
);

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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-60 flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Content</h2>
          {/* Your main content goes here */}
        </main>
      </div>
    </div>
  );
}
