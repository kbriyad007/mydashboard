"use client";

import React, { useState } from "react";
import RequestTable from "../components/RequestTable";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
  const [activeView, setActiveView] = useState("requests");

  const renderContent = () => {
    switch (activeView) {
      case "requests":
        return <RequestTable />;
      default:
        return <div className="p-6 text-gray-600">Select a view</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onSelect={setActiveView} />
      <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
    </div>
  );
};

export default DashboardPage;


