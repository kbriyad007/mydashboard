// components/RequestTable.tsx

"use client"; // Mark this file as a client component

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase"; // Import the Firestore instance
import { collection, getDocs } from "firebase/firestore"; // Firestore modular methods

// TypeScript interface for the request data
interface RequestData {
  id: string;
  "Customer-Name": string;
  "User-Email": string;
  "Phone-Number": string;
  Address: string;
  Courier: string;
  "Product-Name": string[];
  Quantity: string;
  Time: { seconds: number };
}

const RequestTable = () => {
  const [requests, setRequests] = useState<RequestData[]>([]);

  useEffect(() => {
    // Fetch data from Firestore
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "user_request")); // Firestore query to fetch all documents in 'user_request'
      const requestsData: RequestData[] = [];
      querySnapshot.forEach((doc) => {
        requestsData.push({ id: doc.id, ...doc.data() } as RequestData); // Adding Firestore data to the array with proper type
      });
      setRequests(requestsData); // Updating state with fetched data
    };

    fetchRequests(); // Fetch data on component mount
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <div>
      <h2>Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Courier</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request["Customer-Name"]}</td>
              <td>{request["User-Email"]}</td>
              <td>{request["Phone-Number"]}</td>
              <td>{request["Address"]}</td>
              <td>{request["Courier"]}</td>
              <td>{request["Product-Name"].join(", ")}</td> {/* Assuming "Product-Name" is an array */}
              <td>{request["Quantity"]}</td>
              <td>{new Date(request["Time"].seconds * 1000).toLocaleString()}</td> {/* Convert Firestore timestamp */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
