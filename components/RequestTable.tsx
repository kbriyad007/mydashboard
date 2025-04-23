"use client";

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface RequestData {
  id: string;
  "Customer-Name": string;
  "User-Email": string;
  "Phone-Number": string;
  Address: string;
  Courier: string;
  "Product-Name": string[] | string;
  Quantity: string;
  Time: { seconds: number };
}

const RequestTable = () => {
  const [requests, setRequests] = useState<RequestData[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "user_request"));
      const requestsData: RequestData[] = [];
      querySnapshot.forEach((doc) => {
        requestsData.push({ id: doc.id, ...doc.data() } as RequestData);
      });
      setRequests(requestsData);
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">User Requests</h2>
      <div className="overflow-x-auto bg-white shadow rounded-2xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-1 text-left font-medium">Customer</th>
              <th className="px-2 py-1 text-left font-medium">Email</th>
              <th className="px-2 py-1 text-left font-medium">Phone</th>
              <th className="px-2 py-1 text-left font-medium">Address</th>
              <th className="px-2 py-1 text-left font-medium">Courier</th>
              <th className="px-2 py-1 text-left font-medium">Product</th>
              <th className="px-2 py-1 text-left font-medium">Quantity</th>
              <th className="px-2 py-1 text-left font-medium">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{request["Customer-Name"]}</td>
                  <td className="px-4 py-2">{request["User-Email"]}</td>
                  <td className="px-4 py-2">{request["Phone-Number"]}</td>
                  <td className="px-4 py-2">{request["Address"]}</td>
                  <td className="px-4 py-2">{request["Courier"]}</td>
                  <td className="px-4 py-2">
                    {Array.isArray(request["Product-Name"])
                      ? request["Product-Name"].join(", ")
                      : request["Product-Name"]}
                  </td>
                  <td className="px-4 py-2">{request["Quantity"]}</td>
                  <td className="px-4 py-2">
                    {new Date(request["Time"].seconds * 1000).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-400">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestTable;
