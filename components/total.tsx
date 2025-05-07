'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TotalPage() {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'user_request'));
      let sum = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const price = parseFloat(data.Price);
        if (!isNaN(price)) {
          sum += price;
        }
      });

      setTotalPrice(sum);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All User Requests</h1>
      <div className="mb-6 text-lg text-gray-800">
        ✅ <strong>Total Price of All Orders:</strong> ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
}