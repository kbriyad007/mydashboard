"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "your-secure-password"; // Change this to a strong password

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      router.push("/dashboard"); // change to your protected route
    } else {
      setError("Incorrect password");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Admin Login
        </h2>
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
