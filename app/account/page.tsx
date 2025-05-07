'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type CustomerData = {
  id: string;
  'Customer-Name': string;
  'Phone-Number': string;
  'Product-Links': string[];
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'user_request'));
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
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Customer Requests</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white text-sm text-left text-gray-700 border border-gray-200">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3 border-b">Customer Name</th>
              <th className="px-4 py-3 border-b">Phone Number</th>
              <th className="px-4 py-3 border-b">Product Link(s)</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 border-b font-medium">{customer['Customer-Name']}</td>
                <td className="px-4 py-3 border-b">{customer['Phone-Number']}</td>
                <td className="px-4 py-3 border-b space-x-2 space-y-2 max-w-xs flex flex-wrap">
                  {customer['Product-Links']?.length > 0 ? (
                    customer['Product-Links'].map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow hover:bg-blue-700 transition"
                      >
                        Product Link {index + 1}
                      </a>
                    ))
                  ) : (
                    <span className="text-gray-400 italic">No links</span>
                  )}
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No customer data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
