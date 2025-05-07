"use client";

import { useState } from "react"; import { Input } from "@/components/ui/input"; import { Button } from "@/components/ui/button"; import { Card, CardContent } from "@/components/ui/card"; import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AccountPage = () => { const [darkMode, setDarkMode] = useState(false);

return ( <div className="max-w-4xl mx-auto p-6 space-y-6"> <h1 className="text-2xl font-bold">Account Settings</h1>

<Tabs defaultValue="profile" className="w-full">
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="profile">Profile</TabsTrigger>
      <TabsTrigger value="security">Security</TabsTrigger>
      <TabsTrigger value="preferences">Preferences</TabsTrigger>
      <TabsTrigger value="billing">Billing</TabsTrigger>
    </TabsList>

    {/* Profile Tab */}
    <TabsContent value="profile">
      <Card>
        <CardContent className="space-y-4 p-6">
          <Input placeholder="Full Name" />
          <Input placeholder="Email Address" type="email" />
          <Input placeholder="Phone Number" type="tel" />
          <Button>Update Profile</Button>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Security Tab */}
    <TabsContent value="security">
      <Card>
        <CardContent className="space-y-4 p-6">
          <Input placeholder="Current Password" type="password" />
          <Input placeholder="New Password" type="password" />
          <Input placeholder="Confirm New Password" type="password" />
          <Button>Change Password</Button>
          <hr />
          <Button variant="outline">Enable Two-Factor Authentication</Button>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Preferences Tab */}
    <TabsContent value="preferences">
      <Card>
        <CardContent className="space-y-4 p-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Enable Dark Mode
          </label>
          <select className="border rounded px-2 py-1">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
          <Button>Save Preferences</Button>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Billing Tab */}
    <TabsContent value="billing">
      <Card>
        <CardContent className="space-y-4 p-6">
          <p className="text-sm">Current Plan: Free</p>
          <Button>Upgrade Plan</Button>
          <Button variant="outline">View Invoices</Button>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>

  <div className="border-t pt-6 text-right">
    <Button variant="destructive">Delete Account</Button>
  </div>
</div>

); };

export default AccountPage;

