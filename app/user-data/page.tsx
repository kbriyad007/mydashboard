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

const predefinedCouriers = ["Steadfast", "Red X", "Pathao", "Paperfly", "Other"];

export default function UserDataPage() {
  const [courierCounts, setCourierCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [userRequests, setUserRequests] = useState<RequestData[]>([]);
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);
  const [mostOrderedCustomer, setMostOrderedCustomer] = useState<RequestData | null>(null);

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

        // Calculate the most ordered customer
        const customerOrderCounts: Record<string, number> = {};
        requests.forEach((request) => {
          const customerEmail = request["User-Email"];
          customerOrderCounts[customerEmail] = (customerOrderCounts[customerEmail] || 0) + 1;
        });

        const mostOrderedCustomerEmail = Object.keys(customerOrderCounts).reduce((a, b) =>
          customerOrderCounts[a] > customerOrderCounts[b] ? a : b
        );

        const mostOrderedCustomerData = requests.find((req) => req["User-Email"] === mostOrderedCustomerEmail);
        setMostOrderedCustomer(mostOrderedCustomerData || null); // Set the most ordered customer data
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
    <div className="flex">
      <Sidebar />
      <div className="ml-48 p-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Courier Summary</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {/* Button to show Most Ordered Customer details */}
            <div className="mb-6">
              <button
                onClick={() => setMostOrderedCustomer((prev) => (prev ? null : mostOrderedCustomer))}
                className="p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                {mostOrderedCustomer ? "Hide Most Ordered Customer" : "Show Most Ordered Customer"}
              </button>
            </div>

            {/* Show Most Ordered Customer details */}
            {mostOrderedCustomer && (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Most Ordered Customer</h2>
                <p><strong>Customer Name:</strong> {mostOrderedCustomer["Customer-Name"]}</p>
                <p><strong>Email:</strong> {mostOrderedCustomer["User-Email"]}</p>
                <p><strong>Phone Number:</strong> {mostOrderedCustomer["Phone-Number"] || "N/A"}</p>
                <p><strong>Address:</strong> {mostOrderedCustomer.Address}</p>
                <p><strong>Orders Quantity:</strong> {customerOrderCounts[mostOrderedCustomer["User-Email"]]}</p>
                <p><strong>Description:</strong> {mostOrderedCustomer.Description}</p>
              </div>
            )}

            {/* Displaying Courier Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              {predefinedCouriers.map((courier) => (
                <div
                  key={courier}
                  className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedCourier(courier)}
                >
                  <h2 className="text-lg font-semibold">{courier}</h2>
                  <p className="text-2xl font-bold">{courierCounts[courier]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show table only if a courier is selected */}
        {selectedCourier && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedCourier} Orders</h2>
            <div className="overflow-x-auto">
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
