// components/Invoice.tsx

import React from "react";

// Define the structure of the data we expect to receive
interface InvoiceData {
  "Customer-Name": string;
  "User-Email": string;
  "Phone-Number": string;
  Address: string;
  Courier: string;
  "Product-Name": string[] | string;
  Quantity: string;
  Time: { seconds: number };
}

interface InvoiceProps {
  data: InvoiceData;  // Type the data prop with InvoiceData
  isOpen: boolean;
  onClose: () => void;
}

const Invoice: React.FC<InvoiceProps> = ({ data, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Format the time
  const formattedDate = new Date(data["Time"].seconds * 1000).toLocaleString();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg w-96 max-w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h2 className="text-2xl font-bold mb-4">Invoice</h2>
        <div className="space-y-4">
          <p><strong>Customer Name:</strong> {data["Customer-Name"]}</p>
          <p><strong>Email:</strong> {data["User-Email"]}</p>
          <p><strong>Phone:</strong> {data["Phone-Number"]}</p>
          <p><strong>Address:</strong> {data["Address"]}</p>
          <p><strong>Courier:</strong> {data["Courier"]}</p>
          <p><strong>Products:</strong> {Array.isArray(data["Product-Name"]) ? data["Product-Name"].join(", ") : data["Product-Name"]}</p>
          <p><strong>Quantity:</strong> {data["Quantity"]}</p>
          <p><strong>Date:</strong> {formattedDate}</p>
        </div>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Invoice;
