'use client';

import { Card } from "@/components/ui/card";
import { Users, UserPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Courier", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Courier", status: "On Break" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Courier", status: "On Delivery" },
  ]);

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStaff = {
      id: staff.length + 1,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      status: 'Active',
    };
    setStaff([...staff, newStaff]);
  };

  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  name="role"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  required
                >
                  <option value="Courier">Courier</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <Button type="submit">Add Staff Member</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search staff members..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6">
        {filteredStaff.map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="font-semibold">{member.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-semibold">{member.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <p className="font-semibold">{member.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="font-semibold">{member.status}</p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View Details</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Staff Member Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        <p className="font-medium">{member.name}</p>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p className="font-medium">{member.email}</p>
                      </div>
                      <div>
                        <Label>Role</Label>
                        <p className="font-medium">{member.role}</p>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <p className="font-medium">{member.status}</p>
                      </div>
                    </div>
                    <div>
                      <Label>Recent Deliveries</Label>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-muted-foreground">No recent deliveries</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}