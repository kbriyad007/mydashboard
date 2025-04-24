// components/Invoice.tsx
import React from 'react';

interface InvoiceProps {
  data: any; // Adjust the type for your data
}

const Invoice: React.FC<InvoiceProps> = ({ data }) => {
  return (
    <div className="invoice-container p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Invoice</h2>

      <div className="invoice-header mb-6">
        <div className="text-left">
          <p className="text-lg font-semibold">Customer: {data.customerName}</p>
          <p className="text-sm text-gray-600">Email: {data.customerEmail}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">Invoice Date: {data.date}</p>
          <p className="text-sm text-gray-600">Due Date: {data.dueDate}</p>
        </div>
      </div>

      <div className="invoice-items mb-6">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-sm font-medium text-gray-700">Item</th>
              <th className="py-2 px-4 border-b text-sm font-medium text-gray-700">Quantity</th>
              <th className="py-2 px-4 border-b text-sm font-medium text-gray-700">Price</th>
              <th className="py-2 px-4 border-b text-sm font-medium text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item: any, index: number) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{item.name}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">{item.quantity}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">${item.price}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-700">${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="invoice-footer flex justify-between items-center">
        <p className="text-lg font-semibold">Total: ${data.total}</p>
      </div>
    </div>
  );
};

export default Invoice;
