'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Package, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleDemoLogin = async () => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    login(data.token, data.user);
    router.push('/dashboard');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    login(data.token, data.user);
    router.push('/dashboard');
  };

  const handleTrackPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      router.push(`/dashboard/tracking?number=${trackingNumber}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <Card className="p-8">
            <div className="text-center space-y-2 mb-8">
              <Package className="mx-auto h-12 w-12 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight">CourierPro</h2>
              <p className="text-sm text-muted-foreground">Sign in to your account</p>
            </div>

            <form onSubmit={handleTrackPackage} className="space-y-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button type="submit" className="w-full" variant="secondary">
                Track Package
              </Button>
            </form>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or sign in</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              onClick={handleDemoLogin}
              variant="outline"
              className="w-full"
            >
              Demo Login
            </Button>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}