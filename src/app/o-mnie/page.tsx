import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-3xl">
      <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">O Mnie</h1>
      <div className="prose prose-invert text-gray-300 space-y-6 text-lg">
        <p>
          The Way WE Wear to nie tylko marka odzieżowa. To społeczność, którą budujemy razem.
          Nazywam się [Twoje Imię] i stworzyłem to miejsce dla wszystkich tych, którzy tak jak ja,
          kochają gaming, anime i kulturę geekowską.
        </p>
        <p>
          Stawiamy na jakość premium i unikalny design, który zawiera w sobie setki ukrytych
          smaczków (Easter Eggów) dla prawdziwych fanów danych uniwersów.
        </p>
        <p className="font-bold text-white italic">
          Wear the way WE live.
        </p>
      </div>
    </div>
  );
}
