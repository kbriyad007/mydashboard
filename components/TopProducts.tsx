"use client";

import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { HiOutlineShoppingCart } from "react-icons/hi"; // Shopping cart icon

type Request = {
  name: string;
  product: string;
  quantity: number;
};

export default function TopProducts() {
  const [topProducts, setTopProducts] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, "user_request"));

      const data: Request[] = snapshot.docs.map((doc) => {
        const raw = doc.data();
        return {
          name: raw["Customer-Name"],
          product: raw["Product-Name"],
          quantity: Number(raw["Quantity"]),
        };
      });

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
        .slice(0, 5);

      setTopProducts(sorted);
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top 5 Products by Quantity</h2>

      {topProducts.length > 0 ? (
        <div className="space-y-4">
          {topProducts.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center space-x-4">
                <HiOutlineShoppingCart className="text-xl text-blue-500" />
                <div className="text-lg font-semibold text-gray-700">{item.product}</div>
              </div>
              <div className="font-medium text-gray-900">{item.quantity}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No data available.</p>
      )}
    </div>
  );
}
