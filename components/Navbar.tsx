"use client";

import UserDropdown from "@/components/UserDropdown";

const Navbar = () => (
  <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6 border-b">
    <h1 className="text-lg font-medium">Navbar</h1>
    <UserDropdown />
  </header>
);

export default Navbar;
