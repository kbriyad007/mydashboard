"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import LoadingSpinner from "./LoadingSpinner"; // Import the LoadingSpinner component

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

const UserRequests = () => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "user_request"));
        const data: RequestData[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RequestData[];
        setRequests(data);
      } catch (error) {
        setError("Failed to fetch data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold">Customer</th>
            <th className="px-6 py-4 text-sm font-semibold">Email</th>
            <th className="px-6 py-4 text-sm font-semibold">Phone</th>
            <th className="px-6 py-4 text-sm font-semibold">Courier</th>
            <th className="px-6 py-4 text-sm font-semibold">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center">
                <LoadingSpinner />
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-red-600">
                {error}
              </td>
            </tr>
          ) : requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm">{req["Customer-Name"]}</td>
                <td className="px-6 py-4 text-sm">{req["User-Email"]}</td>
                <td className="px-6 py-4 text-sm">{req["Phone-Number"] || "N/A"}</td>
                <td className="px-6 py-4 text-sm">{req.Courier || "N/A"}</td>
                <td className="px-6 py-4 text-sm">{req.Quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                No user requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserRequests;
