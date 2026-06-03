import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-3xl">
      <h1 className="text-4xl font-black mb-8">POLITYKA PRYWATNOŚCI</h1>
      <div className="prose prose-invert">
        <p className="text-gray-400 mb-6">Ostatnia aktualizacja: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Informacje ogólne</h2>
        <p className="text-gray-400 mb-4">
          Niniejsza polityka dotyczy serwisu The Way WE Wear (TWWW), dostępnego pod adresem thewaywewear.pl oraz powiązanych domenach. Administratorem Twoich danych osobowych jest TWWW S.A.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Jakie dane zbieramy?</h2>
        <p className="text-gray-400 mb-4">
          Zbieramy dane niezbędne do realizacji zamówień: Imię, nazwisko, adres e-mail, adres dostawy, numer telefonu oraz opcjonalnie wymiary sylwetki dla personalizowanych zamówień.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Cel przetwarzania danych</h2>
        <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
          <li>Realizacja zamówienia i wysyłka towaru.</li>
          <li>Personalizacja treści i ofert handlowych.</li>
          <li>Komunikacja w sprawie statusu zamówienia.</li>
          <li>Cele marketingowe (jeśli wyrażono zgodę).</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Twoje prawa</h2>
        <p className="text-gray-400 mb-4">
          Masz prawo do dostępu do swoich danych, ich sprostowania, usunięcia ("prawo do bycia zapomnianym") oraz ograniczenia ich przetwarzania.
        </p>
      </div>
    </div>
  );
}
