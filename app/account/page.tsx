'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';

type CustomerData = {
  id: string;
  'Customer-Name': string;
  'Phone-Number': string;
  'Product-Links': string[];
  supplierStatus?: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const docRef = doc(db, 'user_request', id);
      await updateDoc(docRef, {
        supplierStatus: newStatus,
      });

      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === id ? { ...customer, supplierStatus: newStatus } : customer
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />

      <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <h1 className="text-2xl font-semibold mb-6">Customer Requests</h1>
        <div className="overflow-x-auto rounded-xl bg-white shadow border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-4 text-left">Customer Name</th>
                <th className="px-6 py-4 text-left">Phone Number</th>
                <th className="px-6 py-4 text-left">Product Link(s)</th>
                <th className="px-6 py-4 text-left">Supplier Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4">{customer['Customer-Name']}</td>
                  <td className="px-6 py-4">{customer['Phone-Number']}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {customer['Product-Links']?.map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full"
                        >
                          Product Link {index + 1}
                        </a>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={customer.supplierStatus || ''}
                      onChange={(e) => handleStatusChange(customer.id, e.target.value)}
                      className="border border-gray-300 rounded-md text-sm px-3 py-1"
                    >
                      <option value="">Select</option>
                      <option value="have">I have</option>
                      <option value="dont-have">I don&apos;t have</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
