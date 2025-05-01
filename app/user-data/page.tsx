"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Sidebar from "@/components/Sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

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
    <div className="flex bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Sidebar />
      <main className="ml-48 p-10 w-full">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10">
          🚚 Courier Dashboard
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {predefinedCouriers.map((courier) => (
              <Card
                key={courier}
                onClick={() => setSelectedCourier(courier)}
                className="cursor-pointer transition-all hover:scale-105 transform bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 rounded-2xl shadow-lg hover:shadow-2xl relative overflow-hidden"
              >
                {/* Blurred Background Logo */}
                <img
                  src={`/logo.png`}
                  alt={`${courier} logo`}
                  className="absolute inset-0 w-full h-full object-contain opacity-10 blur-md pointer-events-none"
                />

                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl text-white font-semibold capitalize">
                    {courier}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10">
                  <p className="text-4xl font-bold text-white">
                    {courierCounts[courier]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {selectedCourier && (
          <section className="mt-16">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 capitalize">
              {selectedCourier} Orders
            </h2>

            <div className="overflow-x-auto rounded-xl shadow-2xl backdrop-blur-md bg-white/60 dark:bg-gray-800/50">
              <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
                <thead className="bg-gray-100 dark:bg-gray-700 text-left uppercase tracking-wider text-gray-600 dark:text-gray-300 text-xs">
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
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700 transition"
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
                      <td colSpan={6} className="px-6 py-6 text-center text-gray-500 dark:text-gray-400">
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
