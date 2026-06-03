'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import pb from '@/lib/pocketbase';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock order creation in PocketBase
      const order = await pb.collection('orders').create({
        ...form,
        total: 299,
        status: 'confirmed',
        items: [{ id: '1', name: 'Hoodie "LORE" V1', size: 'M' }]
      });

      router.push(`/order-status/${order.id}?new=true`);
    } catch (error) {
      console.error('Checkout error:', error);
      // Fallback for demo if collection doesn't exist
      router.push(`/order-status/mock-id?new=true`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="text-4xl font-black mb-12">KASA</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Dane wysyłkowe</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Imię" required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
              <Input placeholder="Nazwisko" required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
            </div>
            <Input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <Input placeholder="Adres" required value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Kod pocztowy" required value={form.zip} onChange={e => setForm({...form, zip: e.target.value})} />
              <Input placeholder="Miasto" required value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold">Płatność</h2>
            <div className="p-4 border-2 border-[var(--primary,theme(colors.purple.500))] rounded-2xl bg-[var(--primary,theme(colors.purple.500))]/5">
              <p className="font-bold">Blik / Przelewy24</p>
              <p className="text-sm text-gray-500">Zostaniesz przekierowany do bezpiecznej płatności.</p>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h2 className="text-xl font-bold mb-6">Podsumowanie</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Hoodie "LORE" V1 x1</span>
                <span>299 PLN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Dostawa</span>
                <span className="text-green-400">GRATIS</span>
              </div>
              <div className="border-t border-gray-800 pt-4 flex justify-between font-bold text-lg">
                <span>RAZEM</span>
                <span>299 PLN</span>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'PRZETWARZANIE...' : 'ZAMAWIAM I PŁACĘ'}
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
}
