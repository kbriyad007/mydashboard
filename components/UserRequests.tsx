"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import LoadingSpinner from "./LoadingSpinner";
import { generateInvoice } from "../utils/generateInvoice"; // Import the generateInvoice function

type RequestData = {
  id: string;
  "Customer-Name": string;
  "User-Email": string;
  "Phone-Number"?: string;
  Address: string;
  Description: string;
  Courier?: string;
  Quantity: number;
  Time?: { seconds: number; nanoseconds: number };
  "Product-Links"?: string[];
};

const UserRequests = () => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "user_request"));
        const data: RequestData[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RequestData[];
        setRequests(data);
      } catch (error) {
        setError("Failed to fetch data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle dark mode
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}> {/* Toggle dark mode class */}
      <div className="w-full max-w-[1200px] mx-auto mt-10 rounded-2xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-400 to-blue-500 dark:from-blue-700 dark:to-purple-600">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">User Requests</h2>
            <button
              onClick={toggleTheme}
              className="text-white bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? "🌞" : "🌙"} {/* Sun for light mode, Moon for dark mode */}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left font-medium text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Courier</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : requests.length > 0 ? (
                requests.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 border-t border-gray-100 dark:border-gray-700 transition-all ease-in-out duration-300"
                  >
                    <td className="px-6 py-4">{req["Customer-Name"]}</td>
                    <td className="px-6 py-4">{req["User-Email"]}</td>
                    <td className="px-6 py-4">{req["Phone-Number"] || "N/A"}</td>
                    <td className="px-6 py-4">{req.Courier || "N/A"}</td>
                    <td className="px-6 py-4">{req.Quantity}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => generateInvoice(req)} // Call the imported function
                        className="text-blue-600 hover:text-blue-800 transition duration-300 transform hover:scale-105"
                        title="Generate Invoice"
                      >
                        📄
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-center text-gray-500 dark:text-gray-400">
                    No user requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserRequests;
