'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Total = ({ total }: { total?: number }) => {
  const [computedTotal, setComputedTotal] = useState<number>(total || 0);

  useEffect(() => {
    if (total === undefined) {
      const fetchTotal = async () => {
        let tempTotal = 0;
        const querySnapshot = await getDocs(collection(db, 'user_request'));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const price = parseFloat(data.Price);
          if (!isNaN(price)) {
            tempTotal += price;
          }
        });
        setComputedTotal(tempTotal);
      };

      fetchTotal();
    }
  }, [total]);

  return (
    <p className="text-xl font-bold text-gray-800">
      ৳ {computedTotal.toFixed(2)}
    </p>
  );
};

export default Total;