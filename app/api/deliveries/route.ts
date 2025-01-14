import { NextResponse } from 'next/server';

export async function GET() {
  const deliveries = [
    {
      id: 1,
      trackingNumber: 'TRK123456',
      status: 'In Transit',
      pickupAddress: '123 Main St, City',
      deliveryAddress: '456 Oak Ave, Town',
      customerName: 'John Doe',
      estimatedDelivery: '2024-03-25T14:30:00Z'
    },
    {
      id: 2,
      trackingNumber: 'TRK789012',
      status: 'Pending',
      pickupAddress: '789 Pine St, Village',
      deliveryAddress: '321 Elm St, Borough',
      customerName: 'Jane Smith',
      estimatedDelivery: '2024-03-26T10:00:00Z'
    },
    {
      id: 3,
      trackingNumber: 'TRK345678',
      status: 'In Transit',
      pickupAddress: '567 Maple Dr, County',
      deliveryAddress: '890 Cedar Ln, District',
      customerName: 'Alice Johnson',
      estimatedDelivery: '2024-03-25T16:45:00Z'
    },
    {
      id: 4,
      trackingNumber: 'TRK901234',
      status: 'Pending',
      pickupAddress: '432 Birch St, Metro',
      deliveryAddress: '765 Willow Ave, Suburb',
      customerName: 'Bob Wilson',
      estimatedDelivery: '2024-03-26T11:15:00Z'
    }
  ];

  return NextResponse.json({ deliveries });
}