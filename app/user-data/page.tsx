"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Sidebar from "@/components/Sidebar";

type RequestData = {
  Courier?: string;
};

// Define the couriers you want to always show
const predefinedCouriers = ["steadfast", "Red X", "Pathao", "Paperfly", "Other"];

export default function UserDataPage() {
  const [courierCounts, setCourierCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "user_request"));
        const counts: Record<string, number> = {};

        snapshot.docs.forEach((doc) => {
          const data = doc.data() as RequestData;
          const courier = data.Courier?.trim() || "Other"; // default to "Other" if empty
          counts[courier] = (counts[courier] || 0) + 1;
        });

        // Make sure predefined couriers exist in counts, if not, set 0
        predefinedCouriers.forEach((courier) => {
          if (!(courier in counts)) {
            counts[courier] = 0;
          }
        });

        setCourierCounts(counts);
      } catch (error) {
        console.error("Failed to fetch user requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-48 p-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Courier Summary</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {predefinedCouriers.map((courier) => (
              <div
                key={courier}
                className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-all"
              >
                <h2 className="text-lg font-semibold">{courier}</h2>
                <p className="text-2xl font-bold">{courierCounts[courier]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
