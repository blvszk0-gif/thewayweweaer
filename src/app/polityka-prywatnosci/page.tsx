import PolicyLayout from '@/components/layout/PolicyLayout';

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Polityka Prywatności">
      <section>
        <h2 className="text-[color:var(--foreground)] font-black mb-4">1. Administrator Danych</h2>
        <p>Administratorem Twoich danych osobowych jest THE WAY WE WEAR S.A. z siedzibą w Warszawie. Dbamy o bezpieczeństwo Twoich danych zgodnie z RODO.</p>
      </section>
      <section>
        <h2 className="text-[color:var(--foreground)] font-black mb-4">2. Zakres Zbieranych Danych</h2>
        <p>Zbieramy dane niezbędne do realizacji zamówienia: imię, nazwisko, adres dostawy, numer telefonu oraz adres e-mail.</p>
      </section>
    </PolicyLayout>
  );
}
