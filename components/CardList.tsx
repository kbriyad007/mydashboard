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
    <div className="w-full p-5 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-muted transition-colors">
      <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Latest Customers
      </h2>

      <div className="space-y-3">
        {visibleCustomers.map((customer, index) => (
          <div
            key={index}
            className="p-3 bg-muted/20 dark:bg-muted/10 rounded-lg transition hover:bg-muted/30 dark:hover:bg-muted/20"
          >
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {customer.name}
            </p>
            <p className="text-xs text-muted-foreground">{customer.email}</p>
          </div>
        ))}
      </div>

      {visibleCount < allCustomers.length && (
        <button
          onClick={handleLoadMore}
          className="mt-5 text-sm font-medium text-primary hover:underline focus:outline-none transition"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Card;
