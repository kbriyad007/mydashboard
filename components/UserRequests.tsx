"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  Search,
  FileText,
  Mail,
  Phone,
  UserRound,
  CalendarDays,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "./LoadingSpinner";
import { generateInvoice } from "../utils/generateInvoice";

type OrderData = {
  id: string;
  "Customer-Name": string;
  "User-Email": string;
  "Phone-Number"?: string;
  "Product-Name"?: string;
  "Product-Price"?: string | number;
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
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Search className="text-gray-500 dark:text-gray-300" size={18} />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name, email, phone..."
          className="w-full max-w-md border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        🧾 Order Details
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm table-auto border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Invoice</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-6 text-center">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-3">
                    {highlightMatch(order["Product-Name"] || "N/A", searchQuery)}
                  </td>
                  <td className="px-4 py-3">
                    {order["Product-Price"]
                      ? `৳${order["Product-Price"]}`
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 dark:text-blue-300 hover:underline"
                    >
                      {highlightMatch(order["Customer-Name"], searchQuery)}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {highlightMatch(order["Phone-Number"] || "N/A", searchQuery)}
                  </td>
                  <td className="px-4 py-3">
                    {highlightMatch(order["User-Email"], searchQuery)}
                  </td>
                  <td className="px-4 py-3">{order.Quantity}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-yellow-500" />
                    {formatDate(order.Time)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => generateInvoice(order)}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Generate Invoice"
                    >
                      <FileText className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-4 py-2 border rounded ${
                pageNum === currentPage
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
          <div className="relative bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl max-w-sm w-full border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-white transition"
              title="Close"
            >
              <XCircle className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 p-2 rounded-full">
                <UserRound className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Customer Info</h3>
            </div>

            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <UserRound size={16} className="text-gray-400" />
                <span className="font-medium text-gray-500 dark:text-gray-400">Name:</span>
                <span>{selectedOrder["Customer-Name"]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <span className="font-medium text-gray-500 dark:text-gray-400">Email:</span>
                <a
                  href={`mailto:${selectedOrder["User-Email"]}`}
                  className="text-blue-600 dark:text-blue-300 hover:underline"
                >
                  {selectedOrder["User-Email"]}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <span className="font-medium text-gray-500 dark:text-gray-400">Phone:</span>
                <a
                  href={`tel:${selectedOrder["Phone-Number"]}`}
                  className="text-blue-600 dark:text-blue-300 hover:underline"
                >
                  {selectedOrder["Phone-Number"] || "N/A"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
