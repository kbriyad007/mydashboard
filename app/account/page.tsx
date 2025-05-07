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
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Customer Requests</h1>
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Customer Name</th>
              <th className="px-6 py-4 text-left">Phone Number</th>
              <th className="px-6 py-4 text-left">Product Link(s)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-400 italic">
                  No customer data found.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-5 align-top font-medium text-gray-900 whitespace-nowrap">
                    {customer['Customer-Name']}
                  </td>
                  <td className="px-6 py-5 align-top text-gray-700 whitespace-nowrap">
                    {customer['Phone-Number']}
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex flex-col gap-2">
                      {customer['Product-Links']?.length > 0 ? (
                        customer['Product-Links'].map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full shadow transition duration-150 ease-in-out"
                          >
                            Product Link {index + 1}
                          </a>
                        ))
                      ) : (
                        <span className="text-gray-400 italic">No links</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
