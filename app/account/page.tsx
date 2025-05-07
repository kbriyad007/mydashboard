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
              <th className="px-6 py-4 text-left">Supplier Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400 italic">
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
                            className="inline-block text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full shadow-sm transition"
                          >
                            Product Link {index + 1}
                          </a>
                        ))
                      ) : (
                        <span className="text-gray-400 italic">No links</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <select className="border border-gray-300 rounded-md text-sm px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="">Select</option>
                      <option value="have">I have</option>
                      <option value="dont-have">I don&apos;t have</option>
                    </select>
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


