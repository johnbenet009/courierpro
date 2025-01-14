'use client';

import { Card } from "@/components/ui/card";
import { Package, Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Delivery } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useReactToPrint } from 'react-to-print';

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    const fetchDeliveries = async () => {
      const response = await fetch('/api/deliveries');
      const data = await response.json();
      setDeliveries(data.deliveries);
    };

    fetchDeliveries();
  }, []);

  const handleNewDelivery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newDelivery = {
      id: deliveries.length + 1,
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      status: 'Pending',
      pickupAddress: formData.get('pickupAddress'),
      deliveryAddress: formData.get('deliveryAddress'),
      customerName: formData.get('customerName'),
      estimatedDelivery: new Date(formData.get('estimatedDelivery') as string).toISOString(),
    };

    setDeliveries([...deliveries, newDelivery]);
  };

  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Deliveries</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Delivery
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Delivery</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleNewDelivery} className="space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input id="customerName" name="customerName" required />
              </div>
              <div>
                <Label htmlFor="pickupAddress">Pickup Address</Label>
                <Input id="pickupAddress" name="pickupAddress" required />
              </div>
              <div>
                <Label htmlFor="deliveryAddress">Delivery Address</Label>
                <Input id="deliveryAddress" name="deliveryAddress" required />
              </div>
              <div>
                <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                <Input
                  id="estimatedDelivery"
                  name="estimatedDelivery"
                  type="datetime-local"
                  required
                />
              </div>
              <Button type="submit">Create Delivery</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {deliveries.map((delivery) => (
          <Card key={delivery.id} className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tracking Number</p>
                  <p className="font-semibold">{delivery.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p className="font-semibold">{delivery.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="font-semibold">{delivery.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estimated Delivery</p>
                  <p className="font-semibold">
                    {new Date(delivery.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setSelectedDelivery(delivery)}>
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Delivery Details</DialogTitle>
                  </DialogHeader>
                  <div ref={printRef} className="p-6">
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold">Delivery #{delivery.trackingNumber}</h3>
                          <p className="text-muted-foreground">Status: {delivery.status}</p>
                        </div>
                        <Button variant="outline" onClick={handlePrint}>
                          <Printer className="mr-2 h-4 w-4" />
                          Print
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Customer Information</h4>
                          <p>{delivery.customerName}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Estimated Delivery</h4>
                          <p>{new Date(delivery.estimatedDelivery).toLocaleString()}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Pickup Address</h4>
                          <p>{delivery.pickupAddress}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Delivery Address</h4>
                          <p>{delivery.deliveryAddress}</p>
                        </div>
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