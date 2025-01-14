'use client';

import { Card } from "@/components/ui/card";
import { Map, Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TrackingPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Package Tracking</h1>
      </div>

      <Card className="p-6">
        <div className="flex gap-4">
          <Input placeholder="Enter tracking number" className="flex-1" />
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Track Package
          </Button>
        </div>
      </Card>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">TRK123456</h2>
                <p className="text-sm text-muted-foreground">In Transit</p>
              </div>
              <Map className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="relative after:absolute after:top-[1.75rem] after:left-[0.6875rem] after:h-full after:w-px after:bg-border">
                {[
                  { status: "Package Picked Up", time: "10:00 AM", date: "Today" },
                  { status: "In Transit", time: "12:30 PM", date: "Today" },
                  { status: "Out for Delivery", time: "2:00 PM", date: "Today" },
                ].map((event, i) => (
                  <div key={i} className="flex gap-4 pb-8 last:pb-0">
                    <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.time} - {event.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}