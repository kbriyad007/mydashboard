// components/Card.tsx
"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";

type Customer = {
  name: string;
  email: string;
  phone: string;
};

const Card = () => {
  const [latestCustomers, setLatestCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchLatestCustomers = async () => {
      try {
        const q = query(
          collection(db, "user_request"),
          orderBy("Time", "desc"),
          limit(10) // Increased limit from 5 to 10
        );
        const snapshot = await getDocs(q);
        const customers: Customer[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data["Customer-Name"] || "Unknown",
            email: data["User-Email"] || "N/A",
            phone: data["Phone-Number"] || "N/A",
          };
        });
        setLatestCustomers(customers);
      } catch (error) {
        console.error("Failed to fetch latest customers:", error);
      }
    };

    fetchLatestCustomers();
  }, []);

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Latest Customers</h2>
      <div className="space-y-2">
        {latestCustomers.map((customer, index) => (
          <div key={index} className="p-2 border-b last:border-none">
            <p className="text-sm font-medium text-gray-900">{customer.name}</p>
            <p className="text-xs text-gray-600">{customer.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
