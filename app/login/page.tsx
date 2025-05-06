"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "ekia19901990"; // Strong password
const ADMIN_EMAIL = "kb.riyad007@gmail.com"; // Set your admin email here

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      router.push("/dashboard");
    } else {
      setError("Incorrect password");
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL) {
      // Simulate sending password
      console.log(`Send password: ${ADMIN_PASSWORD} to ${email}`);
      setMessage("Password has been sent to your email.");
    } else {
      setMessage("Email not recognized.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        {!showForgot ? (
          <form onSubmit={handleLogin}>
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
            <p
              onClick={() => setShowForgot(true)}
              className="text-sm text-blue-600 mt-3 text-center cursor-pointer hover:underline"
            >
              Forgot password?
            </p>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
              Recover Password
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Send Password
            </button>
            <p
              onClick={() => setShowForgot(false)}
              className="text-sm text-blue-600 mt-3 text-center cursor-pointer hover:underline"
            >
              Back to login
            </p>
            {message && (
              <p className="text-green-600 text-sm mt-2 text-center">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
