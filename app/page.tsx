// pages/index.tsx or pages/dashboard.tsx (depending on where you want this page)

import React from "react";
import RequestTable from "../components/RequestTable"; // Import the RequestTable component

const DashboardPage = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <RequestTable /> {/* This renders the RequestTable component */}
    </div>
  );
};

export default DashboardPage;

