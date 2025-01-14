import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    token: 'demo-token',
    user: {
      id: 1,
      name: 'Demo User',
      email: 'demo@example.com',
      role: 'courier'
    }
  });
}