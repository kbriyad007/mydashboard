// components/OrderTable.tsx

import React from "react";
import { FaPhoneAlt, FaCalendarAlt } from "react-icons/fa"; // Import necessary icons

// Sample order data with more product names
const orders = [
  { name: "John Doe", phone: "01711-123456", price: 150, quantity: 2, date: "2025-05-01", product: "Laptop"},
  { name: "Jane Smith", phone: "01811-234567", price: 200, quantity: 1, date: "2025-04-28", product: "Smartphone"},
  { name: "Alice Johnson", phone: "01911-345678", price: 120, quantity: 3, date: "2025-04-20", product: "Headphones"},
  { name: "Bob Brown", phone: "01721-456789", price: 180, quantity: 4, date: "2025-04-22", product: "Tablet"},
  { name: "Charlie Lee", phone: "01821-567890", price: 220, quantity: 1, date: "2025-05-02", product: "Smartwatch"},
  { name: "David Wilson", phone: "01921-678901", price: 160, quantity: 5, date: "2025-04-30", product: "Keyboard"},
  { name: "Eve White", phone: "01731-789012", price: 140, quantity: 2, date: "2025-04-25", product: "Mouse"},
  { name: "Frank Black", phone: "01831-890123", price: 190, quantity: 3, date: "2025-05-03", product: "Monitor"},
  { name: "George King", phone: "01931-901234", price: 250, quantity: 2, date: "2025-05-04", product: "Camera"},
  { name: "Hannah Scott", phone: "01741-012345", price: 320, quantity: 1, date: "2025-05-05", product: "Laptop"},
  { name: "Olivia Brown", phone: "01941-123456", price: 220, quantity: 2, date: "2025-05-06", product: "Smartphone"},
  { name: "Sophia Lee", phone: "01751-234567", price: 180, quantity: 3, date: "2025-05-07", product: "Headphones"},
  { name: "James Wilson", phone: "01851-345678", price: 250, quantity: 1, date: "2025-05-08", product: "Tablet"},
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
                <FaDollarSign className="mr-2 text-green-500 inline-block" /> ৳{order.price}
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
