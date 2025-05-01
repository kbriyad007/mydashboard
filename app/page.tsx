'use client';

import UserRequests from "../components/UserRequests";
import Sidebar from "../components/Sidebar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Button size="lg" className="mb-4">Log Out</Button> // Large
        <UserRequests />
      </div>
    </div>
  );
}
