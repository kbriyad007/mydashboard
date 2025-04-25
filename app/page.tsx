"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

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

export default function Home() {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error handling

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
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">User Requests</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-gray-700">Customer</th>
                <th className="px-4 py-2 text-gray-700">Email</th>
                <th className="px-4 py-2 text-gray-700">Phone</th>
                <th className="px-4 py-2 text-gray-700">Courier</th>
                <th className="px-4 py-2 text-gray-700">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{req["Customer-Name"]}</td>
                  <td className="px-4 py-2">{req["User-Email"]}</td>
                  <td className="px-4 py-2">{req["Phone-Number"]}</td>
                  <td className="px-4 py-2">{req.Courier}</td>
                  <td className="px-4 py-2">{req.Quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
