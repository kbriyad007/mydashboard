"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Mail, Phone, User } from "lucide-react";

type Customer = {
  name: string;
  email: string;
  phone: string;
};

const Card = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

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
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleToggle = () => {
    if (visibleCount < customers.length) {
      setVisibleCount((prev) => prev + 3);
    } else {
      setVisibleCount(3); // Reset to initial count
    }
  };

  const isShowLess = visibleCount >= customers.length;

  return (
    <div className="w-full p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Latest Customers
      </h2>

      <div className="space-y-2">
        {customers.slice(0, visibleCount).map((customer, index) => (
          <div
            key={index}
            className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 hover:shadow-sm transition"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-white">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              {customer.name}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
              <Mail className="w-3.5 h-3.5" />
              {customer.email}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              <Phone className="w-3.5 h-3.5" />
              {customer.phone}
            </div>
          </div>
        ))}
      </div>

      {customers.length > 3 && (
        <button
          onClick={handleToggle}
          className="mt-3 text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          {isShowLess ? "Show Less" : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Card;
