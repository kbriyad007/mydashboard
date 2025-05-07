// app/account/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const AccountPage = () => {
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      router.push("/login");
    }

    // Example: Replace with your Firebase Auth or actual user data
    const dummyUser = {
      name: "Admin User",
      email: "admin@example.com",
    };
    setUser(dummyUser);
  }, [router]);

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-muted/10">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main className={`transition-all duration-300 w-full ${isSidebarCollapsed ? "sm:ml-20" : "sm:ml-64"} p-5`}>
        <div className="bg-background dark:bg-zinc-900 p-6 rounded-xl shadow border border-muted max-w-xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>
          {user ? (
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground text-sm">Name</label>
                <p className="text-lg">{user.name}</p>
              </div>
              <div>
                <label className="text-muted-foreground text-sm">Email</label>
                <p className="text-lg">{user.email}</p>
              </div>
            </div>
          ) : (
            <p>Loading account info...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AccountPage;