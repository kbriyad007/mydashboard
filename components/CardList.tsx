// components/Card.tsx

import React from 'react';

// Sample customer data
const customerData = [
  { name: "John Doe", email: "johndoe@example.com", phone: "123-456-7890" },
  { name: "Jane Smith", email: "janesmith@example.com", phone: "234-567-8901" },
  { name: "Alice Johnson", email: "alicej@example.com", phone: "345-678-9012" },
  { name: "Bob Brown", email: "bobbrown@example.com", phone: "456-789-0123" },
  { name: "Charlie Lee", email: "charliel@example.com", phone: "567-890-1234" },
  { name: "David Wilson", email: "davidw@example.com", phone: "678-901-2345" },
  { name: "Eve White", email: "evew@example.com", phone: "789-012-3456" },
  { name: "Frank Black", email: "frankb@example.com", phone: "890-123-4567" },
  { name: "Grace Green", email: "graceg@example.com", phone: "901-234-5678" },
  { name: "Hannah Blue", email: "hannahb@example.com", phone: "012-345-6789" }
];

// Card component that displays the latest 8 customer names
const Card = () => {
  // Take the first 8 customers from the list
  const latestCustomers = customerData.slice(0, 8);

  return (
    <div className="w-full p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Latest Customers</h2>
      <div className="space-y-2">
        {latestCustomers.map((customer, index) => (
          <div key={index} className="p-3 border-b">
            <p className="font-medium">{customer.name}</p>
            <p className="text-sm text-gray-600">{customer.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
