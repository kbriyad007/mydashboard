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
    <div className="p-4 flex justify-center">
      <div className="w-[900px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          User Requests
        </h2>
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-5 py-3 text-left">Customer</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Phone</th>
                <th className="px-5 py-3 text-left">Address</th>
                <th className="px-5 py-3 text-left">Courier</th>
                <th className="px-5 py-3 text-left">Product</th>
                <th className="px-5 py-3 text-left">Quantity</th>
                <th className="px-5 py-3 text-left">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.length > 0 ? (
                requests.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-2 whitespace-nowrap">
                      {request["Customer-Name"]}
                    </td>
                    <td className="px-5 py-2 whitespace-nowrap">
                      {request["User-Email"]}
                    </td>
                    <td className="px-5 py-2 whitespace-nowrap">
                      {request["Phone-Number"]}
                    </td>
                    <td className="px-5 py-2 whitespace-nowrap">
                      {request["Address"]}
                    </td>
                    <td className="px-5 py-2 whitespace-nowrap">
                      {request["Courier"]}
                    </td>
                    <td className="px-5 py-2 whitespace-nowrap">
                      {Array.isArray(request["Product-Name"])
                        ? request["Product-Name"].join(", ")
                        : request["Product-Name"]}
                    </td>
                    <td className="px-5 py-2 whitespace-nowrap">
                      {request["Quantity"]}
                    </td>
                    <td className="px-5 py-2 whitespace-nowrap">
                      {new Date(
                        request["Time"].seconds * 1000
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-4 text-center text-gray-400"
                  >
                    No data available
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

export default RequestTable;
