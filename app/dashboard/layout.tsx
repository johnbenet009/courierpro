'use client';

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return (
    <div className="flex h-full">
      <Sidebar className="w-64" />
      <div className="flex-1 flex flex-col min-h-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-muted/50">
          {children}
        </main>
      </div>
    </div>
  );
}