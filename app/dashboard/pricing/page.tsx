'use client';

import { Card } from "@/components/ui/card";
import { Calculator, Package, Settings } from "lucide-react";
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

interface Rate {
  type: string;
  basePrice: number;
  pricePerKg: number;
  pricePerKm: number;
  time: string;
}

export default function PricingPage() {
  const [rates, setRates] = useState<Rate[]>([
    { type: "Standard Delivery", basePrice: 10, pricePerKg: 2, pricePerKm: 0.5, time: "2-3 days" },
    { type: "Express Delivery", basePrice: 15, pricePerKg: 3, pricePerKm: 0.75, time: "1-2 days" },
    { type: "Same Day Delivery", basePrice: 25, pricePerKg: 5, pricePerKm: 1, time: "Same day" },
  ]);

  const [weight, setWeight] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>("Standard Delivery");
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    const rate = rates.find(r => r.type === selectedType);
    if (rate && weight && distance) {
      const price = rate.basePrice + (weight * rate.pricePerKg) + (distance * rate.pricePerKm);
      setCalculatedPrice(parseFloat(price.toFixed(2)));
    }
  };

  const handleRateUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedRates = rates.map(rate => {
      if (rate.type === formData.get('type')) {
        return {
          ...rate,
          basePrice: Number(formData.get('basePrice')),
          pricePerKg: Number(formData.get('pricePerKg')),
          pricePerKm: Number(formData.get('pricePerKm')),
        };
      }
      return rate;
    });
    setRates(updatedRates);
  };

  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pricing Calculator</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              Manage Rates
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Delivery Rates</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRateUpdate} className="space-y-4">
              <div>
                <Label>Delivery Type</Label>
                <select
                  name="type"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  {rates.map(rate => (
                    <option key={rate.type} value={rate.type}>{rate.type}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Base Price ($)</Label>
                  <Input
                    type="number"
                    name="basePrice"
                    step="0.01"
                    defaultValue={rates[0].basePrice}
                  />
                </div>
                <div>
                  <Label>Price per kg ($)</Label>
                  <Input
                    type="number"
                    name="pricePerKg"
                    step="0.01"
                    defaultValue={rates[0].pricePerKg}
                  />
                </div>
                <div>
                  <Label>Price per km ($)</Label>
                  <Input
                    type="number"
                    name="pricePerKm"
                    step="0.01"
                    defaultValue={rates[0].pricePerKm}
                  />
                </div>
              </div>
              <Button type="submit">Update Rates</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Calculate Price</h2>
          <div className="space-y-4">
            <div>
              <Label>Package Weight (kg)</Label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <Label>Distance ( <Label>Distance (km)</Label>
              <Input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <Label>Service Type</Label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {rates.map(rate => (
                  <option key={rate.type} value={rate.type}>{rate.type}</option>
                ))}
              </select>
            </div>
            <Button onClick={calculatePrice} className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Price
            </Button>
            {calculatedPrice !== null && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-lg font-semibold">Estimated Price: ${calculatedPrice}</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Standard Rates</h2>
          <div className="space-y-4">
            {rates.map((rate) => (
              <div key={rate.type} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <Package className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <h3 className="font-medium">{rate.type}</h3>
                  <p className="text-sm text-muted-foreground">{rate.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">From ${rate.basePrice}</p>
                  <p className="text-sm text-muted-foreground">
                    +${rate.pricePerKg}/kg, +${rate.pricePerKm}/km
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