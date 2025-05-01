// components/ui/sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Home, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r shadow p-6 space-y-6">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <nav className="space-y-4">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
        <Link href="/account">
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-4 h-4 mr-2" />
            My Account
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </nav>
       <nav className="space-y-4">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
        <Link href="/account">
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-4 h-4 mr-2" />
            My Account
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </nav>
             <nav className="space-y-4">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
        <Link href="/account">
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-4 h-4 mr-2" />
            My Account
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </nav>
             <nav className="space-y-4">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
        <Link href="/account">
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-4 h-4 mr-2" />
            My Account
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </nav>
             <nav className="space-y-4">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
        <Link href="/account">
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-4 h-4 mr-2" />
            My Account
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </nav>
    </aside>
  );
};

export default Sidebar;
