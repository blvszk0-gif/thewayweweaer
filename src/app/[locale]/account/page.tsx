'use client';

import { useEffect, useState } from 'react';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { GuestAccount } from '@/components/account/GuestAccount';
import { AccountHeader } from '@/components/account/AccountHeader';
import { AccountNavigation } from '@/components/account/AccountNavigation';
import { OrderHistory } from '@/components/account/OrderHistory';
import { ProfileDetails } from '@/components/account/ProfileDetails';
import { Addresses } from '@/components/account/Addresses';
import { AccountDeletionRequest } from '@/components/account/AccountDeletionRequest';

type Customer = {
  firstName?: string;
  lastName?: string;

  emailAddress?: {
    emailAddress?: string;
  };

  orders?: {
    nodes: Array<{
      id: string;
      number?: number;
      processedAt?: string;
      financialStatus?: string;
      fulfillmentStatus?: string;
      totalPrice?: {
        amount: string;
        currencyCode: string;
      };
      fulfillments?: {
        nodes: Array<{
          latestShipmentStatus: string | null;
        }>;
      };
    }>;
  };

  addresses?: {
    nodes: Array<{
      id: string;
      firstName?: string;
      lastName?: string;
      address1?: string;
      address2?: string;
      city?: string;
      zip?: string;
      territoryCode?: string;
    }>;
  };

  defaultAddress?: {
    id: string;
    firstName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    city?: string;
    zip?: string;
    territoryCode?: string;
  };
};


export default function AccountPage() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    Promise.all([fetch('/api/auth/me'), fetch('/api/account/adresses')])
      .then(async ([customerResponse, addressesResponse]) => {
        if (!customerResponse.ok) return { customer: null };
        const data = await customerResponse.json() as { customer: Customer };
        const addresses = addressesResponse.ok ? await addressesResponse.json() : [];
        return { customer: data.customer ? { ...data.customer, addresses: { nodes: addresses } } : null };
      })
      .then((data) => setCustomer(data.customer))
      .finally(() => setLoading(false));
  }, []);


  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    window.location.assign('/');
  };


  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio">

      <Header />


      <section className="container mx-auto px-6 pt-36 pb-24 max-w-5xl">


        {loading && (
          <p className="font-black uppercase tracking-widest opacity-50">
            Ładowanie konta…
          </p>
        )}



        {!loading && !customer && (
          <GuestAccount />
        )}



        {!loading && customer && (
          <>

            <AccountHeader
              firstName={customer.firstName}
              email={customer.emailAddress?.emailAddress}
              logout={logout}
            />


            <AccountNavigation
              active={activeTab}
            onChange={setActiveTab}
            />



            {activeTab === 'orders' && (
              <OrderHistory
                orders={customer.orders?.nodes || []}
              />
            )}



            {activeTab === 'profile' && (
              <ProfileDetails
                firstName={customer.firstName}
                lastName={customer.lastName}
                email={customer.emailAddress?.emailAddress}
              />
            )}



            {activeTab === 'addresses' && (
              <Addresses
                defaultAddress={customer.defaultAddress}
                addresses={customer.addresses?.nodes || []}
              />
            )}

            <AccountDeletionRequest email={customer.emailAddress?.emailAddress} />


          </>
        )}


      </section>


      <Footer />

    </main>
  );
}
