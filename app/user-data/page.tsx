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

const predefinedCouriers = ["steadfast", "Red X", "Pathao", "Paperfly", "Other"];

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

        // Count the occurrences of each courier
        const counts: Record<string, number> = {};
        requests.forEach((request) => {
          const courier = request.Courier?.trim() || "Other";
          counts[courier] = (counts[courier] || 0) + 1;
        });

        // Make sure predefined couriers exist in counts, if not, set 0
        const finalCounts: Record<string, number> = {};
        predefinedCouriers.forEach((courier) => {
          finalCounts[courier] = counts[courier] || 0;
        });

        setCourierCounts(finalCounts);
        setUserRequests(requests); // Store all requests
      } catch (error) {
        console.error("Failed to fetch user requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered data based on selected courier
  const filteredRequests = selectedCourier
    ? userRequests.filter((request) => request.Courier?.trim() === selectedCourier)
    : [];

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Sidebar />
      <div className="ml-48 p-8 flex-1 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6 text-indigo-600">Courier Summary</h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {predefinedCouriers.map((courier) => (
              <div
                key={courier}
                className="p-6 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                onClick={() => setSelectedCourier(courier)}
              >
                <h2 className="text-2xl font-semibold">{courier}</h2>
                <p className="text-3xl font-bold">{courierCounts[courier]}</p>
              </div>
            ))}
          </div>
        )}

        {/* Show table only if a courier is selected */}
        {selectedCourier && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">{selectedCourier} Orders</h2>
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
                <thead className="bg-gray-100 dark:bg-gray-700 text-left font-medium text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Address</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((req) => (
                      <tr
                        key={req.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-600 border-t border-gray-100 dark:border-gray-700 transition-all ease-in-out duration-300"
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
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        No orders found for {selectedCourier}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
