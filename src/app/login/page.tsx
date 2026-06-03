import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-md">
      <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter text-center">Logowanie</h1>
      <div className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
        <Input label="Email" placeholder="twoj@email.com" />
        <Input label="Hasło" type="password" placeholder="••••••••" />
        <Button className="w-full">ZALOGUJ SIĘ</Button>
        <div className="text-center text-sm text-gray-500">
          Nie masz konta? <span className="text-white cursor-pointer hover:underline">Zarejestruj się</span>
        </div>
      </div>
    </div>
  );
}
