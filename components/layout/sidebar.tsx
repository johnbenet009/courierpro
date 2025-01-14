'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, Users, MessageSquare, Calculator, Map, Settings, ChevronLeft, BarChart, Bell, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn("relative flex flex-col h-full border-r bg-background", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 z-20 rounded-full border shadow-md"
        onClick={() => setCollapsed(!collapsed)}
      >
        <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
      </Button>
      
      <div className={cn("p-6", collapsed && "p-4")}>
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Truck className="h-6 w-6 text-primary" />
          {!collapsed && <span className="text-xl font-bold">CourierPro</span>}
        </Link>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          <Button variant="ghost" className={cn("w-full justify-start", collapsed && "justify-center")} asChild>
            <Link href="/dashboard">
              <BarChart className="h-5 w-5 mr-2" />
              {!collapsed && "Dashboard"}
            </Link>
          </Button>
          <Button variant="ghost" className={cn("w-full justify-start", collapsed && "justify-center")} asChild>
            <Link href="/dashboard/deliveries">
              <Package className="h-5 w-5 mr-2" />
              {!collapsed && "Deliveries"}
            </Link>
          </Button>
          <Button variant="ghost" className={cn("w-full justify-start", collapsed && "justify-center")} asChild>
            <Link href="/dashboard/staff">
              <Users className="h-5 w-5 mr-2" />
              {!collapsed && "Staff"}
            </Link>
          </Button>
          <Button variant="ghost" className={cn("w-full justify-start", collapsed && "justify-center")} asChild>
            <Link href="/dashboard/messages">
              <MessageSquare className="h-5 w-5 mr-2" />
              {!collapsed && "Messages"}
            </Link>
          </Button>
          <Button variant="ghost" className={cn("w-full justify-start", collapsed && "justify-center")} asChild>
            <Link href="/dashboard/pricing">
              <Calculator className="h-5 w-5 mr-2" />
              {!collapsed && "Pricing"}
            </Link>
          </Button>
          <Button variant="ghost" className={cn("w-full justify-start", collapsed && "justify-center")} asChild>
            <Link href="/dashboard/tracking">
              <Map className="h-5 w-5 mr-2" />
              {!collapsed && "Tracking"}
            </Link>
          </Button>
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button variant="ghost" className={cn("w-full justify-start", collapsed && "justify-center")} asChild>
          <Link href="/dashboard/settings">
            <Settings className="h-5 w-5 mr-2" />
            {!collapsed && "Settings"}
          </Link>
        </Button>
      </div>
    </div>
  );
}