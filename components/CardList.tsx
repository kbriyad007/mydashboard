// components/Card.tsx
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
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const q = query(collection(db, "user_request"), orderBy("Time", "desc"));
        const snapshot = await getDocs(q);
        const customers: Customer[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data["Customer-Name"] || "Unknown",
            email: data["User-Email"] || "N/A",
            phone: data["Phone-Number"] || "N/A",
          };
        });
        setAllCustomers(customers);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const visibleCustomers = allCustomers.slice(0, visibleCount);

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Latest Customers</h2>
      <div className="space-y-2">
        {visibleCustomers.map((customer, index) => (
          <div key={index} className="p-2 border-b last:border-none">
            <p className="text-sm font-medium text-gray-900">{customer.name}</p>
            <p className="text-xs text-gray-600">{customer.email}</p>
          </div>
        ))}
      </div>

      {visibleCount < allCustomers.length && (
        <button
          onClick={handleLoadMore}
          className="mt-4 text-sm text-blue-600 hover:underline focus:outline-none"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Card;
