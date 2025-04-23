// components/RequestTable.tsx
import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase"; // Importing firebase from the shared config file

const RequestTable = () => {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    // Fetching the user request data from Firestore
    const fetchRequests = async () => {
      const querySnapshot = await db.collection("user_request").get(); // Query Firestore for documents
      const requestsData: any[] = [];
      querySnapshot.forEach((doc) => {
        requestsData.push({ id: doc.id, ...doc.data() }); // Pushing data into an array
      });
      setRequests(requestsData); // Setting state with the data
    };

    fetchRequests(); // Call the fetch function when the component mounts
  }, []); // Empty array means this will run only once when the component is mounted

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

