"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { SearchIcon, FileTextIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "./LoadingSpinner";
import { FaCalendarAlt } from "react-icons/fa";
import { generateInvoice } from "../utils/generateInvoice";

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
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

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
            <th className="py-2 px-4 border-b text-left">Qty</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="py-6 text-center">
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
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-gray-800 hover:text-primary transition-colors duration-200 font-medium underline-offset-2 hover:underline"
                  >
                    {highlightMatch(order["Customer-Name"], searchQuery)}
                  </button>
                </td>
                <td className="py-2 px-4 border-b">{order.Quantity}</td>
                <td className="py-2 px-4 border-b">
                  <FaCalendarAlt className="mr-2 text-yellow-500 inline-block" />
                  {formatDate(order.Time)}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => generateInvoice(order)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Generate Invoice"
                  >
                    <FileTextIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-5">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">Customer Info</h3>
            <p className="mb-2">
              <strong>Name:</strong> {selectedOrder["Customer-Name"]}
            </p>
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${selectedOrder["User-Email"]}`}
                className="text-blue-600 hover:underline"
              >
                {selectedOrder["User-Email"]}
              </a>
            </p>
            <p className="mb-2">
              <strong>Phone:</strong>{" "}
              <a
                href={`tel:${selectedOrder["Phone-Number"]}`}
                className="text-blue-600 hover:underline"
              >
                {selectedOrder["Phone-Number"] || "N/A"}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
