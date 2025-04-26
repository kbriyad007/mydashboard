"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import LoadingSpinner from "./LoadingSpinner";
import { generateInvoice } from "../utils/generateInvoice"; 
import { sendWhatsApp } from "../utils/sendWhatsApp";

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

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="w-full max-w-[1100px] mx-auto mt-10 rounded-2xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-400 to-blue-500 dark:from-blue-700 dark:to-purple-600">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">User Requests</h2>
            <button
              onClick={toggleTheme}
              className="text-white bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? "🌞" : "🌙"}
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
                    <td className="px-6 py-4">
                      {req["Phone-Number"] ? (
                        <button
                          onClick={() => sendWhatsApp(req["Phone-Number"]!, req["Customer-Name"])}
                          className="text-green-600 hover:text-green-800 transition duration-300 transform hover:scale-110"
                          title="Send WhatsApp Message"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                          >
                            <path d="M12.04 2.003c-5.522 0-10 4.477-10 10 0 1.766.459 3.475 1.331 5L2 22l5.141-1.334a9.985 9.985 0 0 0 4.899 1.237c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 1.8c4.52 0 8.2 3.68 8.2 8.2 0 4.52-3.68 8.2-8.2 8.2a8.17 8.17 0 0 1-4.14-1.124l-.297-.175-3.045.79.814-2.961-.192-.305a8.145 8.145 0 0 1-1.34-4.425c0-4.52 3.68-8.2 8.2-8.2zm4.542 11.37c-.077-.129-.28-.206-.586-.361-.305-.154-1.8-.887-2.08-.988-.28-.103-.484-.154-.688.154-.206.308-.792.987-.97 1.191-.18.206-.36.23-.665.077-.306-.154-1.29-.474-2.457-1.512-.907-.809-1.52-1.807-1.698-2.114-.18-.308-.02-.475.134-.63.138-.137.308-.36.462-.54.154-.18.206-.308.308-.514.103-.206.051-.385-.026-.54-.077-.154-.688-1.655-.944-2.278-.246-.594-.498-.514-.688-.514h-.59c-.19 0-.49.07-.747.36s-.978.956-.978 2.34c0 1.383 1.002 2.719 1.14 2.903.138.18 1.97 3.016 4.78 4.226.668.29 1.19.463 1.596.592.67.213 1.28.183 1.762.111.537-.08 1.64-.668 1.87-1.314.23-.647.23-1.202.16-1.316z" />
                          </svg>
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4">{req.Courier || "N/A"}</td>
                    <td className="px-6 py-4">{req.Quantity}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => generateInvoice(req)}
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
