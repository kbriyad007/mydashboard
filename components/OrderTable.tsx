// components/OrderTable.tsx

import React from "react";
import { FaPhoneAlt, FaDollarSign, FaCalendarAlt } from "react-icons/fa"; // Import necessary icons

// Sample order data
const orders = [
  { name: "John Doe", phone: "123-456-7890", price: 150, quantity: 2, date: "2025-05-01", product: "Laptop" },
  { name: "Jane Smith", phone: "234-567-8901", price: 200, quantity: 1, date: "2025-04-28", product: "Smartphone" },
  { name: "Alice Johnson", phone: "345-678-9012", price: 120, quantity: 3, date: "2025-04-20", product: "Headphones" },
  { name: "Bob Brown", phone: "456-789-0123", price: 180, quantity: 4, date: "2025-04-22", product: "Tablet" },
  { name: "Charlie Lee", phone: "567-890-1234", price: 220, quantity: 1, date: "2025-05-02", product: "Smartwatch" },
  { name: "David Wilson", phone: "678-901-2345", price: 160, quantity: 5, date: "2025-04-30", product: "Keyboard" },
  { name: "Eve White", phone: "789-012-3456", price: 140, quantity: 2, date: "2025-04-25", product: "Mouse" },
  { name: "Frank Black", phone: "890-123-4567", price: 190, quantity: 3, date: "2025-05-03", product: "Monitor" },
  { name: "George King", phone: "901-234-5678", price: 250, quantity: 2, date: "2025-05-04", product: "Camera" },
  { name: "Hannah Scott", phone: "012-345-6789", price: 320, quantity: 1, date: "2025-05-05", product: "Laptop" },
];

// OrderTable component
const OrderTable = () => {
  return (
    <div className="overflow-x-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Product</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Phone</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left">Quantity</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{order.product}</td>
              <td className="py-2 px-4 border-b">{order.name}</td>
              <td className="py-2 px-4 border-b">
                <FaPhoneAlt className="mr-2 text-blue-500 inline-block" /> {order.phone}
              </td>
              <td className="py-2 px-4 border-b">
                <FaDollarSign className="mr-2 text-green-500 inline-block" /> ${order.price}
              </td>
              <td className="py-2 px-4 border-b">{order.quantity}</td>
              <td className="py-2 px-4 border-b">
                <FaCalendarAlt className="mr-2 text-yellow-500 inline-block" /> {order.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

