"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Load dark mode preference or set based on time
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
    } else {
      const hour = new Date().getHours();
      const isNight = hour < 6 || hour >= 18;
      setDarkMode(isNight);
      localStorage.setItem("theme", isNight ? "dark" : "light");
    }
  }, []);

  // Apply dark/light mode class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Load sidebar collapsed state from localStorage
  useEffect(() => {
    const storedSidebar = localStorage.getItem("sidebar-collapsed");
    if (storedSidebar !== null) {
      setIsCollapsed(storedSidebar === "true");
    }
  }, []);

  // Save collapsed state when it changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1 min-h-screen">
        <header className="bg-emerald-600 text-white py-4 shadow-md">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold">User Request Dashboard</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-white text-emerald-600 px-3 py-1 rounded shadow hover:bg-gray-100 transition"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 flex-1">{children}</main>

        <footer className="bg-white dark:bg-gray-800 border-t mt-8 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </footer>
      </div>
    </div>
  );
}