"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Updated type to support both Name and "Customer-Name"
type Order = {
  Name?: string;
  ["Customer-Name"]?: string;
  Mobile?: string;
  Address?: string;
  Quantity?: number;
  ["Product-Price"]?: number;
  Time?: { seconds: number; nanoseconds: number };
};

const RecentData = () => {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const q = query(
          collection(db, "user_request"),
          orderBy("Time", "desc"),
          limit(5)
        );

        const querySnapshot = await getDocs(q);
        const data: Order[] = querySnapshot.docs.map((doc) => doc.data() as Order);
        setRecentOrders(data);
      } catch (err) {
        console.error("Error fetching recent orders:", err);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <ul className="space-y-3">
        {recentOrders.map((order, index) => (
          <li key={index} className="bg-gray-100 p-3 rounded shadow">
            <p><strong>Name:</strong> {order.Name || order["Customer-Name"] || "N/A"}</p>
            <p><strong>Mobile:</strong> {order.Mobile || "N/A"}</p>
            <p><strong>Address:</strong> {order.Address || "N/A"}</p>
            <p><strong>Price:</strong> {order["Product-Price"] ?? "N/A"}</p>
            <p><strong>Qty:</strong> {order.Quantity ?? "N/A"}</p>
            <p>
              <strong>Time:</strong>{" "}
              {order.Time?.seconds
                ? new Date(order.Time.seconds * 1000).toLocaleString()
                : "N/A"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentData;
