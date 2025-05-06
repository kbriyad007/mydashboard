"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

type Customer = {
  name: string;
  email: string;
  phone: string;
};

const Card = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const q = query(collection(db, "user_request"), orderBy("Time", "desc"));
        const snapshot = await getDocs(q);
        const data: Customer[] = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            name: d["Customer-Name"] || "Unknown",
            email: d["User-Email"] || "N/A",
            phone: d["Phone-Number"] || "N/A",
          };
        });
        setCustomers(data.slice(0, 3)); // Show only latest 3
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="w-full p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Latest Customers
      </h2>

      <div className="space-y-3">
        {customers.map((customer, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 hover:shadow-sm transition"
          >
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {customer.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {customer.email}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {customer.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
