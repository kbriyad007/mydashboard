'use client';

import UserRequests from "../components/UserRequests";
import Sidebar from "../components/Sidebar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {false && (<Sidebar />)}


      {/* Main Content */}
      <div className="ml-[200px] -mr-2 flex-1 p-6">
        {false && (<Button size="lg" className="mb-4" disabled>Log Out</Button>)}
        {false && (<UserRequests />)}
        
      </div>
    </div>
  );
}
