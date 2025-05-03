"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "./LoadingSpinner";

type OrderData = {
  id: string;
  "Customer-Name": string;
  "User-Email": string;
  "Phone-Number"?: string;
  "Product-Name"?: string;
  Quantity: number | string;
  Time?: { seconds: number; nanoseconds: number };
  Courier?: string;
  Address?: string;
};

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-500 rounded px-1">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const formatDate = (timestamp?: { seconds: number }) => {
  if (!timestamp?.seconds) return "N/A";
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString("en-GB");
};

const OrderTable = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, "user_request"));
        const data: OrderData[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as OrderData[];
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const q = searchQuery.toLowerCase();
    return (
      order["Customer-Name"]?.toLowerCase().includes(q) ||
      order["User-Email"]?.toLowerCase().includes(q) ||
      order["Phone-Number"]?.toLowerCase().includes(q) ||
      order["Product-Name"]?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="overflow-x-auto bg-white p-4 rounded shadow max-w-6xl mx-auto mt-8">
      <div className="flex items-center gap-2 mb-4">
        <SearchIcon className="text-gray-500" size={18} />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name, email, phone..."
          className="w-full max-w-md"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      <table className="min-w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Product</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Phone</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Qty</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="py-6 text-center">
                <LoadingSpinner />
              </td>
            </tr>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 border-t">
                <td className="py-2 px-4 border-b">
                  {highlightMatch(order["Product-Name"] || "N/A", searchQuery)}
                </td>
                <td className="py-2 px-4 border-b">
                  {highlightMatch(order["Customer-Name"], searchQuery)}
                </td>
                <td className="py-2 px-4 border-b">
                  <FaPhoneAlt className="mr-2 text-blue-500 inline-block" />
                  {highlightMatch(order["Phone-Number"] || "N/A", searchQuery)}
                </td>
                <td className="py-2 px-4 border-b">
                  {highlightMatch(order["User-Email"], searchQuery)}
                </td>
                <td className="py-2 px-4 border-b">{order.Quantity}</td>
                <td className="py-2 px-4 border-b">
                  <FaCalendarAlt className="mr-2 text-yellow-500 inline-block" />
                  {formatDate(order.Time)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 py-5">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
