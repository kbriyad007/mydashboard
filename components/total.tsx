'use client';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getTotalPrice(): Promise<number> {
  let total = 0;
  const querySnapshot = await getDocs(collection(db, 'user_request'));

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const price = parseFloat(data.Price);
    if (!isNaN(price)) {
      total += price;
    }
  });

  return total;
}