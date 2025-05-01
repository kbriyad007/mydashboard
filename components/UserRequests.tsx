"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon, FileTextIcon, MessageCircleIcon, PhoneIcon } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { generateInvoice } from "../utils/generateInvoice";
import { sendWhatsApp } from "../utils/sendWhatsApp";

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

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-500 rounded px-1">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const UserRequests = () => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredRequests = requests.filter((req) => {
    const q = searchQuery.toLowerCase();
    return (
      req["Customer-Name"]?.toLowerCase().includes(q) ||
      req["User-Email"]?.toLowerCase().includes(q) ||
      req["Phone-Number"]?.toLowerCase().includes(q) ||
      req.Courier?.toLowerCase().includes(q) ||
      req.Address?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Card>
        <CardHeader className="flex items-center justify-between border-b">
          <CardTitle className="text-xl font-semibold">User Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <SearchIcon className="text-gray-500" size={18} />
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search name, email, phone..."
              className="w-full max-w-md"
            />
          </div>

          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Courier</th>
                  <th className="px-4 py-2">Qty</th>
                  <th className="px-4 py-2">Invoice</th>
                  <th className="px-4 py-2">WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center">
                      <LoadingSpinner />
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="text-red-600 text-center py-4">{error}</td>
                  </tr>
                ) : filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => {
                    const query = searchQuery.trim();
                    return (
                      <tr key={req.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{highlightMatch(req["Customer-Name"], query)}</td>
                        <td className="px-4 py-2">{highlightMatch(req["User-Email"], query)}</td>
                        <td className="px-4 py-2 flex items-center gap-1">
                          <PhoneIcon className="w-4 h-4 text-gray-500" />
                          {highlightMatch(req["Phone-Number"] || "N/A", query)}
                        </td>
                        <td className="px-4 py-2">{highlightMatch(req.Courier || "N/A", query)}</td>
                        <td className="px-4 py-2">{req.Quantity}</td>
                        <td className="px-4 py-2">
                          <Button
                            onClick={() => generateInvoice(req)}
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FileTextIcon className="w-5 h-5" />
                          </Button>
                        </td>
                        <td className="px-4 py-2">
                          {req["Phone-Number"] ? (
                            <Button
                              onClick={() =>
                                sendWhatsApp(req["Phone-Number"]!, req["Customer-Name"])
                              }
                              variant="ghost"
                              className="text-green-600 hover:text-green-800"
                            >
                              <MessageCircleIcon className="w-5 h-5" />
                            </Button>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-gray-500 py-5">
                      No requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRequests;
