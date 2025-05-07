'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type CustomerData = {
  id: string;
  'Customer-Name': string;
  'Phone-Number': string;
  'Product-Link': string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'user_request')); // ✅ Fixed here
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<CustomerData, 'id'>),
      }));
      setCustomers(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Customer Data</h1>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Phone Number</th>
            <th className="border p-2">Product Link</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="border p-2">{customer['Customer-Name']}</td>
              <td className="border p-2">{customer['Phone-Number']}</td>
              <td className="border p-2">
                <a href={customer['Product-Link']} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                  View Product
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
