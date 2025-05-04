"use client";

import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Request = {
  name: string;
  product: string;
  quantity: number;
};

export default function TopProducts() {
  const [topProducts, setTopProducts] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, "user_request")); // ✅ Correct collection name here
      
      const data: Request[] = snapshot.docs.map((doc) => {
        const raw = doc.data();
        return {
          name: raw["Customer-Name"],
          product: raw["Product-Name"],
          quantity: Number(raw["Quantity"]),
        };
      });

      // Aggregate quantities per name+product combo
      const map = new Map<string, Request>();

      for (const item of data) {
        const key = `${item.name}-${item.product}`;
        if (map.has(key)) {
          const existing = map.get(key)!;
          map.set(key, {
            ...existing,
            quantity: existing.quantity + item.quantity,
          });
        } else {
          map.set(key, { ...item });
        }
      }

      const sorted = Array.from(map.values())
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5); // Top 5

      setTopProducts(sorted);
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Top 5 Products by Quantity</h2>
      {topProducts.length > 0 ? (
        <ul className="text-sm text-gray-700 space-y-1">
          {topProducts.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.name} - {item.product}</span>
              <span className="font-medium">{item.quantity}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No data available.</p>
      )}
    </div>
  );
}
