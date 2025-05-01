"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "./LoadingSpinner";
import { generateInvoice } from "../utils/generateInvoice";
import { sendWhatsApp } from "../utils/sendWhatsApp";
import { FaFileInvoice, FaWhatsapp, FaMoon, FaSun } from "react-icons/fa"; // React Icons

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

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredRequests = requests.filter((req) => {
    const q = searchQuery.toLowerCase();
    return (
      req["Customer-Name"]?.toLowerCase().includes(q) ||
      req["User-Email"]?.toLowerCase().includes(q) ||
      req["Phone-Number"]?.toLowerCase().includes(q) ||
      req.Courier?.toLowerCase().includes(q) ||
      req.Address?.toLowerCase().includes(q)
    );
  });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="max-w-[1100px] mx-auto mt-8 rounded-xl bg-white dark:bg-gray-900 shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-teal-500 to-indigo-600 dark:from-indigo-700 dark:to-purple-700">
          <h2 className="text-lg md:text-xl font-semibold text-white">User Requests</h2>
          <Button
            onClick={toggleTheme}
            variant="outline"
            className="text-white text-sm px-3 py-2 hover:bg-gray-600 dark:hover:bg-gray-800 transition"
            title="Toggle Theme"
          >
            {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon />}
          </Button>
        </div>

        {/* Search Section */}
        <div className="px-5 py-4">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search name, email, phone..."
            className="w-full px-3 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto px-5 pb-5">
          <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-200">
            <thead className="uppercase bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-3 py-3">Customer</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Phone</th>
                <th className="px-3 py-3">Courier</th>
                <th className="px-3 py-3">Qty</th>
                <th className="px-3 py-3">Invoice</th>
                <th className="px-3 py-3">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="text-red-600 text-center py-4">{error}</td>
                </tr>
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="px-3 py-2">{req["Customer-Name"]}</td>
                    <td className="px-3 py-2">{req["User-Email"]}</td>
                    <td className="px-3 py-2">{req["Phone-Number"] || "N/A"}</td>
                    <td className="px-3 py-2">{req.Courier || "N/A"}</td>
                    <td className="px-3 py-2">{req.Quantity}</td>
                    <td className="px-3 py-2">
                      <Button
                        onClick={() => generateInvoice(req)}
                        className="text-indigo-600 hover:text-indigo-800"
                        title="Generate Invoice"
                      >
                        <FaFileInvoice className="w-4 h-4" />
                      </Button>
                    </td>
                    <td className="px-3 py-2">
                      {req["Phone-Number"] ? (
                        <Button
                          onClick={() =>
                            sendWhatsApp(req["Phone-Number"]!, req["Customer-Name"])
                          }
                          className="text-green-500 hover:text-green-700"
                          title="Send WhatsApp"
                        >
                          <FaWhatsapp className="w-4 h-4" />
                        </Button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-5">
                    No requests found.
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
