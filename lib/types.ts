export interface Delivery {
  id: number;
  trackingNumber: string;
  status: string;
  pickupAddress: string;
  deliveryAddress: string;
  customerName: string;
  estimatedDelivery: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}