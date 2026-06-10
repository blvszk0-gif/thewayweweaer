'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)]">
      <Header />
      <LoginForm />
      <Footer />
    </main>
  );
}
