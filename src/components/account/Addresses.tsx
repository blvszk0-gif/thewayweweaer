'use client';

import { useState } from 'react';
import { AddressForm } from '@/components/account/AddressForm';


type Address = {
  id: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zip?: string;
  territoryCode?: string;
};


type AddressesProps = {
  defaultAddress?: Address;
  addresses: Address[];
};


export function Addresses({
  defaultAddress,
  addresses,
}: AddressesProps) {

  const [showForm, setShowForm] = useState(false);


  return (
    <section>

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-black uppercase italic">
          Adresy
        </h2>


        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="bg-[color:var(--foreground)] text-[color:var(--surface)] px-6 py-3 rounded-full font-black uppercase tracking-widest text-sm"
          >
            + Dodaj adres
          </button>
        )}

      </div>


      {showForm && (
        <AddressForm
          onSuccess={() => {
            setShowForm(false);
            window.location.reload();
          }}
          onCancel={() =>
            setShowForm(false)
          }
        />
      )}



      {addresses.length === 0 ? (

        !showForm && (
          <p className="opacity-50">
            Nie masz jeszcze zapisanych adresów.
          </p>
        )

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {addresses.map((address) => (

            <article
              key={address.id}
              className="border border-[color:var(--border)] rounded-3xl p-6"
            >

              {defaultAddress?.id === address.id && (
                <p className="text-xs uppercase tracking-widest font-black opacity-50 mb-4">
                  Domyślny adres
                </p>
              )}


              <p className="font-black text-lg">
                {address.firstName} {address.lastName}
              </p>


              <p className="mt-3 opacity-70">
                {address.address1}
              </p>


              {address.address2 && (
                <p className="opacity-70">
                  {address.address2}
                </p>
              )}


              <p className="opacity-70">
                {address.zip} {address.city}
              </p>


              <p className="opacity-70">
                {address.territoryCode === 'PL' ? 'Polska' : address.territoryCode}
              </p>


            </article>

          ))}

        </div>

      )}

    </section>
  );
}
