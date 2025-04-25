"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import LoadingSpinner from "./LoadingSpinner";

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

  // Function to generate the invoice
  const handleGenerateInvoice = (request: RequestData) => {
    const invoiceWindow = window.open("", "_blank");
    if (!invoiceWindow) return;

    invoiceWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            h1, h2 { color: #333; }
            .invoice-content { margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>Invoice</h1>
          <div class="invoice-content">
            <p><strong>Customer:</strong> ${request["Customer-Name"]}</p>
            <p><strong>Email:</strong> ${request["User-Email"]}</p>
            <p><strong>Phone:</strong> ${request["Phone-Number"] || "N/A"}</p>
            <p><strong>Courier:</strong> ${request.Courier || "N/A"}</p>
            <p><strong>Quantity:</strong> ${request.Quantity}</p>
            <p><strong>Address:</strong> ${request.Address}</p>
            <p><strong>Description:</strong> ${request.Description}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

    invoiceWindow.document.close();
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 rounded-2xl bg-white shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">User Requests</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-50 text-left font-medium text-gray-700">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Courier</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Invoice</th> {/* Added invoice column */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-red-600">
                  {error}
                </td>
              </tr>
            ) : requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 border-t border-gray-100 transition">
                  <td className="px-6 py-4">{req["Customer-Name"]}</td>
                  <td className="px-6 py-4">{req["User-Email"]}</td>
                  <td className="px-6 py-4">{req["Phone-Number"] || "N/A"}</td>
                  <td className="px-6 py-4">{req.Courier || "N/A"}</td>
                  <td className="px-6 py-4">{req.Quantity}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleGenerateInvoice(req)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Generate Invoice"
                    >
                      📄
                    </button>
                  </td> {/* Invoice button */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
                  No user requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRequests;
