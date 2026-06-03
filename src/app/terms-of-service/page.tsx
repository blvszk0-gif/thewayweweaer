import React from 'react';

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-3xl">
      <h1 className="text-4xl font-black mb-8">REGULAMIN SKLEPU</h1>
      <div className="prose prose-invert">
        <p className="text-gray-400 mb-6">Ostatnia aktualizacja: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Postanowienia wstępne</h2>
        <p className="text-gray-400 mb-4">
          Sklep internetowy The Way WE Wear (TWWW) prowadzi sprzedaż odzieży premium za pośrednictwem sieci Internet.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Zamówienia</h2>
        <p className="text-gray-400 mb-4">
          Zamówienia można składać 24/7. Realizacja następuje po zaksięgowaniu wpłaty. W przypadku ubrań z własną grafiką, czas realizacji może ulec wydłużeniu do 14 dni roboczych.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Zwroty i reklamacje</h2>
        <p className="text-gray-400 mb-4">
          Klient ma prawo do odstąpienia od umowy w ciągu 30 dni bez podania przyczyny, z wyłączeniem towarów personalizowanych (własne grafiki, wymiary custom fit), które nie podlegają zwrotowi zgodnie z ustawą o prawach konsumenta.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Gwarancja jakości</h2>
        <p className="text-gray-400 mb-4">
          Wszystkie nasze produkty objęte są 2-letnią rękojmią. Każda paczka zawiera unikalny gadżet 3D jako podziękowanie za dołączenie do klanu.
        </p>
      </div>
    </div>
  );
}
