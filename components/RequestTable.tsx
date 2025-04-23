// components/RequestTable.tsx

"use client"; // Add this line to mark the file as a client component

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase"; // Import Firebase configuration

// Define a TypeScript interface for the request data
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
  // Use the RequestData interface for the requests state
  const [requests, setRequests] = useState<RequestData[]>([]);

  useEffect(() => {
    // Fetch data from Firestore
    const fetchRequests = async () => {
      const querySnapshot = await db.collection("user_request").get(); // Query Firestore
      const requestsData: RequestData[] = [];
      querySnapshot.forEach((doc) => {
        requestsData.push({ id: doc.id, ...doc.data() } as RequestData); // Casting the data to RequestData
      });
      setRequests(requestsData); // Update state with fetched data
    };

    fetchRequests(); // Run fetch function on component mount
  }, []); // Empty dependency array ensures this runs only once when the component mounts

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
              <td>{request["Product-Name"].join(", ")}</td> {/* Assuming it's an array */}
              <td>{request["Quantity"]}</td>
              <td>{new Date(request["Time"].seconds * 1000).toLocaleString()}</td> {/* Convert timestamp */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;

