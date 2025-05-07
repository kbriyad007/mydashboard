import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getTotalPrice(): Promise<number> {
  const querySnapshot = await getDocs(collection(db, 'user_request'));
  let total = 0;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const price = parseFloat(data.Price);
    if (!isNaN(price)) {
      total += price;
    }
  });

  return total;
}