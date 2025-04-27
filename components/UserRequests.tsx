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
  const [searchQuery, setSearchQuery] = useState(""); 

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

  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRequests = requests.filter((request) => {
    const searchLowerCase = searchQuery.toLowerCase();
    return (
      request["Customer-Name"]?.toLowerCase().includes(searchLowerCase) ||
      request["User-Email"]?.toLowerCase().includes(searchLowerCase) ||
      request["Phone-Number"]?.toLowerCase().includes(searchLowerCase) ||
      request.Courier?.toLowerCase().includes(searchLowerCase) ||
      request.Address?.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="w-full max-w-[1100px] mx-auto mt-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-teal-400 to-indigo-500 dark:from-indigo-700 dark:to-purple-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">User Requests</h2>
            <button
              onClick={toggleTheme}
              className="text-white bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>
        </div>

        {/* Search Box */}
        <div className="px-4 py-3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name, email, phone, or courier"
            className="w-full px-3 py-2 text-sm text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left font-medium text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Courier</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 border-t border-gray-100 dark:border-gray-700 transition-all ease-in-out duration-300"
                  >
                    <td className="px-4 py-3">{req["Customer-Name"]}</td>
                    <td className="px-4 py-3">{req["User-Email"]}</td>
                    <td className="px-4 py-3">{req["Phone-Number"] || "N/A"}</td>
                    <td className="px-4 py-3">{req.Courier || "N/A"}</td>
                    <td className="px-4 py-3">{req.Quantity}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => generateInvoice(req)}
                        className="text-blue-600 hover:text-blue-800 transition duration-300"
                        title="Generate Invoice"
                      >
                        📄
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      {req["Phone-Number"] ? (
                        <button
                          onClick={() =>
                            sendWhatsApp(req["Phone-Number"]!, req["Customer-Name"])
                          }
                          className="text-green-600 hover:text-green-800 transition duration-300"
                          title="Send WhatsApp Message"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-6 h-6"
                          >
                            <circle cx="16" cy="16" r="16" fill="#25D366" />
                            <path
                              fill="#FFF"
                              d="M22.5 18.7c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.8.2s-1 1-1.2 1.2c-.2.1-.4.1-.7 0-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1s0-.5.1-.7c.1-.2.2-.4.3-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.8-2-1.1-2.7-.3-.7-.5-.6-.8-.6h-.7c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.4 3.3c.2.2 2.4 3.7 5.8 5 3.4 1.3 3.4.9 4.1.8.6-.1 1.9-.8 2.1-1.5.3-.8.3-1.5.2-1.6 0 0-.3-.2-.6-.3z"
                            />
                          </svg>
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
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
