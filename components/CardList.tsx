"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

type Customer = {
  name: string;
  email: string;
  phone: string;
  item: string;
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
            item: data["Product-Name"] || "N/A",
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
    <div className="w-full p-4 bg-white dark:bg-zinc-900 rounded-xl shadow border border-muted">
      <h2 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Latest Customers
      </h2>

      <div className="space-y-2">
        {visibleCustomers.map((customer, index) => (
          <div
            key={index}
            className="p-3 bg-muted/10 dark:bg-muted/5 rounded-lg flex flex-col gap-1 hover:bg-muted/20 dark:hover:bg-muted/10 transition"
          >
            <p className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</p>
            <p className="text-xs text-muted-foreground">{customer.email}</p>
            <p className="text-xs text-muted-foreground">📦 {customer.item}</p>
            <p className="text-xs text-muted-foreground">📞 {customer.phone}</p>
          </div>
        ))}
      </div>

      {visibleCount < allCustomers.length && (
        <button
          onClick={handleLoadMore}
          className="mt-4 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400 transition"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Card;
