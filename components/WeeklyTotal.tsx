"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

type OrderData = {
  "Product-Price"?: string | number;
  Quantity: number | string;
  Time?: { seconds: number };
};

type WeeklyTotal = {
  weekStart: string;
  total: number;
};

const getWeekStartDate = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay(); // Sunday = 0, Monday = 1
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
};

const WeeklyTotal = () => {
  const [weeklyTotals, setWeeklyTotals] = useState<WeeklyTotal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, "user_request"));
        const data: OrderData[] = snapshot.docs.map((doc) => doc.data()) as OrderData[];

        const weeklyMap: { [week: string]: number } = {};

        data.forEach((order) => {
          const price = parseFloat(order["Product-Price"] as string) || 0;
          const qty = parseInt(order.Quantity as string) || 1;

          if (order.Time?.seconds) {
            const orderDate = new Date(order.Time.seconds * 1000);
            const weekStart = getWeekStartDate(orderDate);

            if (!weeklyMap[weekStart]) weeklyMap[weekStart] = 0;
            weeklyMap[weekStart] += price * qty;
          }
        });

        const weeklyArray: WeeklyTotal[] = Object.entries(weeklyMap)
          .map(([weekStart, total]) => ({ weekStart, total }))
          .sort((a, b) => (a.weekStart < b.weekStart ? -1 : 1));

        setWeeklyTotals(weeklyArray);
      } catch (error) {
        console.error("Failed to calculate weekly totals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-gray-600 text-sm">
        Loading weekly totals...
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Weekly Ordered Total</h2>
      <ul className="text-sm text-gray-800 space-y-2">
        {weeklyTotals.length > 0 ? (
          weeklyTotals.map(({ weekStart, total }) => (
            <li key={weekStart} className="flex justify-between">
              <span>{weekStart}</span>
              <span className="font-medium text-blue-600">৳{total.toLocaleString()}</span>
            </li>
          ))
        ) : (
          <li>No data available.</li>
        )}
      </ul>
    </div>
  );
};

export default WeeklyTotal;
