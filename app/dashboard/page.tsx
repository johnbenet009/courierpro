'use client';

import { Card } from "@/components/ui/card";
import { Package, Truck, MapPin, User, TrendingUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Delivery } from "@/lib/types";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", deliveries: 4 },
  { name: "Tue", deliveries: 3 },
  { name: "Wed", deliveries: 7 },
  { name: "Thu", deliveries: 5 },
  { name: "Fri", deliveries: 6 },
  { name: "Sat", deliveries: 4 },
  { name: "Sun", deliveries: 2 },
];

export default function Dashboard() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      const response = await fetch('/api/deliveries');
      const data = await response.json();
      setDeliveries(data.deliveries);
    };

    fetchDeliveries();
  }, []);

  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Deliveries</p>
              <p className="text-2xl font-semibold">{deliveries.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <Truck className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">In Transit</p>
              <p className="text-2xl font-semibold">
                {deliveries.filter(d => d.status === 'In Transit').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold">
                {deliveries.filter(d => d.status === 'Pending').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <User className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Active Couriers</p>
              <p className="text-2xl font-semibold">1</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Delivery Performance</h2>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <text
                  x={0}
                  y={0}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  className="fill-muted-foreground text-sm"
                >
                  Days
                </text>
                <text
                  x={0}
                  y={0}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  className="fill-muted-foreground text-sm"
                  transform="rotate(-90)"
                >
                  Deliveries
                </text>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="deliveries"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                  activeDot={{
                    r: 6,
                    fill: "hsl(var(--primary))",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Deliveries</h2>
          </div>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{delivery.customerName}</p>
                  <p className="text-sm text-muted-foreground">{delivery.trackingNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{delivery.status}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(delivery.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}