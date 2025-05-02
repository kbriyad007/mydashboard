"use client";

import { useEffect, useState } from "react";
import UserDropdown from "@/components/UserDropdown";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-BD", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      setCurrentTime(formatted);
    };

    updateTime(); // initial run
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6 border-b">
      <div>
        <h1 className="text-lg font-medium">Dashboard</h1>
        <p className="text-sm text-gray-500">{currentTime}</p>
      </div>
      <UserDropdown />
    </header>
  );
};

export default Navbar;
