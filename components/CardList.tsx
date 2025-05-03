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
          limit(5)
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
    <div className="w-full p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Latest Customers</h2>
      <div className="space-y-2">
        {latestCustomers.map((customer, index) => (
          <div key={index} className="p-3 border-b">
            <p className="font-medium">{customer.name}</p>
            <p className="text-sm text-gray-600">{customer.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
