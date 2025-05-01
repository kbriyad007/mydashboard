"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "./LoadingSpinner";
import { generateInvoice } from "../utils/generateInvoice";
import { sendWhatsApp } from "../utils/sendWhatsApp";

import { FaPhone, FaFileInvoice, FaWhatsapp } from "react-icons/fa";

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
    <div>
      <div className="max-w-[1100px] mx-auto mt-8 rounded-xl bg-white shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-teal-500 to-indigo-600">
          <h2 className="text-lg md:text-xl font-semibold text-white">User Requests</h2>
        </div>

        {/* Search Section */}
        <div className="px-5 py-4">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search name, email, phone..."
            className="w-full px-3 py-2 text-sm rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto px-5 pb-5">
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead className="uppercase bg-gray-100 text-gray-600">
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
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-3 py-2">{req["Customer-Name"]}</td>
                    <td className="px-3 py-2">{req["User-Email"]}</td>
                    <td className="px-3 py-2 flex items-center gap-2">
                      <FaPhone className="text-gray-500" />
                      {req["Phone-Number"] || "N/A"}
                    </td>
                    <td className="px-3 py-2">{req.Courier || "N/A"}</td>
                    <td className="px-3 py-2">{req.Quantity}</td>
                    <td className="px-3 py-2">
                      <Button
                        onClick={() => generateInvoice(req)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1"
                        title="Generate Invoice"
                      >
                        <FaFileInvoice />
                      </Button>
                    </td>
                    <td className="px-3 py-2">
                      {req["Phone-Number"] ? (
                        <Button
                          onClick={() =>
                            sendWhatsApp(req["Phone-Number"]!, req["Customer-Name"])
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1"
                          title="Send WhatsApp"
                        >
                          <FaWhatsapp />
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
