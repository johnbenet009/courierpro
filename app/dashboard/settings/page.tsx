'use client';

import { Card } from "@/components/ui/card";
import { Bell, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <Button variant="outline">Change Avatar</Button>
            </div>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input defaultValue="Demo User" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="demo@example.com" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Lock className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">Change your password</p>
              </div>
              <Button variant="outline">Update</Button>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">Manage notification settings</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}