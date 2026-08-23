'use client';

import { useState } from 'react';

type AddressFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function AddressForm({
  onSuccess,
  onCancel,
}: AddressFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    country: 'Poland',
  });


  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };


  const submit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });


      if (!response.ok) {
        throw new Error();
      }

      onSuccess();

    } catch {
      setError(
        'Nie udało się zapisać adresu.'
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="border border-[color:var(--border)] rounded-3xl p-8 mb-10">

      <h3 className="text-2xl font-black uppercase italic mb-8">
        Nowy adres
      </h3>


      <div className="grid md:grid-cols-2 gap-5">

        <input
          placeholder="Imię"
          value={form.firstName}
          onChange={(e) =>
            updateField(
              'firstName',
              e.target.value
            )
          }
          className="border border-[color:var(--border)] rounded-full px-6 py-4 bg-transparent"
        />


        <input
          placeholder="Nazwisko"
          value={form.lastName}
          onChange={(e) =>
            updateField(
              'lastName',
              e.target.value
            )
          }
          className="border border-[color:var(--border)] rounded-full px-6 py-4 bg-transparent"
        />


        <input
          placeholder="Adres"
          value={form.address1}
          onChange={(e) =>
            updateField(
              'address1',
              e.target.value
            )
          }
          className="md:col-span-2 border border-[color:var(--border)] rounded-full px-6 py-4 bg-transparent"
        />


        <input
          placeholder="Mieszkanie / dodatkowe informacje"
          value={form.address2}
          onChange={(e) =>
            updateField(
              'address2',
              e.target.value
            )
          }
          className="md:col-span-2 border border-[color:var(--border)] rounded-full px-6 py-4 bg-transparent"
        />


        <input
          placeholder="Miasto"
          value={form.city}
          onChange={(e) =>
            updateField(
              'city',
              e.target.value
            )
          }
          className="border border-[color:var(--border)] rounded-full px-6 py-4 bg-transparent"
        />


        <input
          placeholder="Kod pocztowy"
          value={form.zip}
          onChange={(e) =>
            updateField(
              'zip',
              e.target.value
            )
          }
          className="border border-[color:var(--border)] rounded-full px-6 py-4 bg-transparent"
        />

      </div>


      {error && (
        <p className="mt-5 text-red-500 font-bold">
          {error}
        </p>
      )}


      <div className="flex gap-4 mt-8">

        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="bg-[color:var(--foreground)] text-[color:var(--surface)] px-8 py-4 rounded-full font-black uppercase tracking-widest"
        >
          {loading ? 'Zapisywanie...' : 'Zapisz adres'}
        </button>


        <button
          type="button"
          onClick={onCancel}
          className="border border-[color:var(--border)] px-8 py-4 rounded-full font-black uppercase tracking-widest"
        >
          Anuluj
        </button>

      </div>

    </section>
  );
}