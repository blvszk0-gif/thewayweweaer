import React from 'react';

const faqs = [
  { q: 'Jaki jest czas realizacji zamówienia?', a: 'Standardowy czas realizacji to 3-5 dni roboczych.' },
  { q: 'Czy mogę zwrócić produkt?', a: 'Tak, masz 14 dni na zwrot nieużywanego towaru.' },
  { q: 'Jak dobrać rozmiar?', a: 'Sprawdź tabelę rozmiarów dostępną na stronie każdego produktu lub skorzystaj z opcji Custom Fit.' },
  { q: 'Skąd wysyłacie paczki?', a: 'Wszystkie paczki wysyłamy z naszej pracowni w Polsce.' },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-2xl">
      <h1 className="text-4xl font-black mb-12 uppercase tracking-tighter text-center">FAQ</h1>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-2">{f.q}</h3>
            <p className="text-gray-400">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
