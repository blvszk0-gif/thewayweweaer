import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  return (
    <div className="container mx-auto px-6 py-24 text-center">
      <ShoppingBag size={64} className="mx-auto mb-6 opacity-20" />
      <h1 className="text-4xl font-black mb-4 uppercase">Twój Koszyk jest pusty</h1>
      <p className="text-gray-400 mb-8">Dodaj coś do koszyka, aby kontynuować zakupy.</p>
      <Link href="/shop">
        <Button variant="outline">WRÓĆ DO SKLEPU</Button>
      </Link>
    </div>
  );
}
