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
import { PackageSearch, User2Icon, MailIcon, PhoneIcon, MapPin, ClipboardList } from "lucide-react";

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
    <div className="flex bg-[#f9fafb] min-h-screen">
      <Sidebar />
      <main className="ml-48 p-8 w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 flex items-center gap-2">
          <PackageSearch className="text-indigo-600" /> Courier Dashboard
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {predefinedCouriers.map((courier) => (
              <Card
                key={courier}
                onClick={() => setSelectedCourier(courier)}
                className="cursor-pointer transition-transform hover:scale-105 bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-700 capitalize">
                    {courier}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-indigo-600">
                    {courierCounts[courier]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {selectedCourier && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 capitalize mb-6">
              {selectedCourier} Orders
            </h2>

            <div className="overflow-x-auto rounded-lg border bg-white shadow">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left"><User2Icon className="inline w-4 h-4 mr-1" /> Customer</th>
                    <th className="px-6 py-3 text-left"><MailIcon className="inline w-4 h-4 mr-1" /> Email</th>
                    <th className="px-6 py-3 text-left"><PhoneIcon className="inline w-4 h-4 mr-1" /> Phone</th>
                    <th className="px-6 py-3 text-left"><MapPin className="inline w-4 h-4 mr-1" /> Address</th>
                    <th className="px-6 py-3 text-left"><ClipboardList className="inline w-4 h-4 mr-1" /> Qty</th>
                    <th className="px-6 py-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((req) => (
                      <tr
                        key={req.id}
                        className="border-t hover:bg-gray-50 transition"
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
                      <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
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
