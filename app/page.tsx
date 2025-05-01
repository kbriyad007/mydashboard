"use client";

import UserRequests from "../components/UserRequests";
import Sidebar from "../components/Sidebar";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}


export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      
      {/* Main Content */}
      <div className="ml-[200px] -mr-2 flex-1 p-6">
        {/* 👆 ml matches sidebar width exactly (200px), mr adds small right margin */}
        <UserRequests />
      </div>
    </div>
  );
}
