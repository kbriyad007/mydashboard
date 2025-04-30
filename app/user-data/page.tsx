"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Sidebar from "@/components/Sidebar";

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

const predefinedCouriers = ["steadfast", "redx", "Pathao", "Paperfly", "Other"];

export default function UserDataPage() {
  const [courierCounts, setCourierCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [userRequests, setUserRequests] = useState<RequestData[]>([]);
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "user_request"));
        const requests: RequestData[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RequestData[];

        const counts: Record<string, number> = {};
        requests.forEach((request) => {
          const courier = request.Courier?.trim() || "Other";
          counts[courier] = (counts[courier] || 0) + 1;
        });

        const finalCounts: Record<string, number> = {};
        predefinedCouriers.forEach((courier) => {
          finalCounts[courier] = counts[courier] || 0;
        });

        setCourierCounts(finalCounts);
        setUserRequests(requests);
      } catch (error) {
        console.error("Failed to fetch user requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRequests = selectedCourier
    ? userRequests.filter((request) => request.Courier?.trim() === selectedCourier)
    : [];

  return (
    <div className="flex bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Sidebar />
      <main className="ml-48 p-10 w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-8">
          📦 Courier Summary
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {predefinedCouriers.map((courier) => (
              <div
                key={courier}
                onClick={() => setSelectedCourier(courier)}
                className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all"
              >
                <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2 capitalize">
                  {courier}
                </h2>
                <p className="text-3xl font-bold text-blue-600 dark:text-teal-400">
                  {courierCounts[courier]}
                </p>
              </div>
            ))}
          </section>
        )}

        {selectedCourier && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              {selectedCourier} Orders
            </h2>

            <div className="overflow-x-auto rounded-lg shadow-lg bg-white dark:bg-gray-900">
              <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
                <thead className="bg-gray-200 dark:bg-gray-700 text-sm uppercase tracking-wide text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Address</th>
                    <th className="px-6 py-4">Qty</th>
                    <th className="px-6 py-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((req) => (
                      <tr
                        key={req.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{req["Customer-Name"]}</td>
                        <td className="px-6 py-4">{req["User-Email"]}</td>
                        <td className="px-6 py-4">{req["Phone-Number"] || "N/A"}</td>
                        <td className="px-6 py-4">{req.Address}</td>
                        <td className="px-6 py-4">{req.Quantity}</td>
                        <td className="px-6 py-4">{req.Description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-400">
                        No orders found for <strong>{selectedCourier}</strong>.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
