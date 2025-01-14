'use client';

import { Card } from "@/components/ui/card";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MessagesPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Messages</h1>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            {[1, 2, 3].map((message) => (
              <div key={message} className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">Support Team</h3>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                  <p className="text-sm">Delivery update for package #TRK{message}123</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <Input placeholder="Type your message..." />
            <Button>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}