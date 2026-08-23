'use client';

type Address = {
  id: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zip?: string;
  country?: string;
};

type AddressesProps = {
  defaultAddress?: Address;
  addresses: Address[];
};

function AddressCard({
  title,
  address,
}: {
  title?: string;
  address: Address;
}) {
  return (
    <article className="border border-[color:var(--border)] rounded-3xl p-6">
      {title && (
        <p className="text-xs uppercase tracking-widest font-black opacity-50 mb-4">
          {title}
        </p>
      )}

      <p className="font-black">
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
        {address.country}
      </p>
    </article>
  );
}

export function Addresses({
  defaultAddress,
  addresses,
}: AddressesProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black uppercase italic">
          Adresy
        </h2>

        <button
          type="button"
          className="border border-[color:var(--border)] px-5 py-3 rounded-full font-black uppercase tracking-widest text-sm"
        >
          Dodaj adres
        </button>
      </div>


      {!addresses.length && !defaultAddress && (
        <p className="opacity-50">
          Nie masz jeszcze zapisanych adresów.
        </p>
      )}


      <div className="grid md:grid-cols-2 gap-5">

        {defaultAddress && (
          <AddressCard
            title="Domyślny adres"
            address={defaultAddress}
          />
        )}

        {addresses
          .filter(
            (address) =>
              address.id !== defaultAddress?.id
          )
          .map((address) => (
            <AddressCard
              key={address.id}
              address={address}
            />
          ))}

      </div>
    </section>
  );
}