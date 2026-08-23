'use client';

import { useEffect, useState } from 'react';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { GuestAccount } from '@/components/account/GuestAccount';
import { AccountHeader } from '@/components/account/AccountHeader';
import { AccountNavigation } from '@/components/account/AccountNavigation';
import { OrderHistory } from '@/components/account/OrderHistory';
import { ProfileDetails } from '@/components/account/ProfileDetails';
import { Wishlist } from '@/components/account/Wishlist';
import { Addresses } from '@/components/account/Addresses';
import { useStore } from '@/context/StoreContext';

type Customer = {
  firstName?: string;
  lastName?: string;

  emailAddress?: {
    emailAddress?: string;
  };

  orders?: {
    nodes: Array<{
      id: string;
      number?: string;
      processedAt?: string;
      financialStatus?: string;
      fulfillmentStatus?: string;
      totalPrice?: {
        amount: string;
        currencyCode: string;
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
      country?: string;
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
    country?: string;
  };
};


export default function AccountPage() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  const {
    wishlist,
    removeFromWishlist,
  } = useStore();


  useEffect(() => {
    fetch('/api/auth/me')
      .then((response) =>
        response.ok
          ? response.json()
          : { customer: null }
      )
      .then((data) =>
        setCustomer(data.customer)
      )
      .finally(() =>
        setLoading(false)
      );
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



            {activeTab === 'wishlist' && (
              <Wishlist
                items={wishlist}
                removeFromWishlist={removeFromWishlist}
              />
            )}



            {activeTab === 'addresses' && (
              <Addresses
                defaultAddress={customer.defaultAddress}
                addresses={customer.addresses?.nodes || []}
              />
            )}


          </>
        )}


      </section>


      <Footer />

    </main>
  );
}