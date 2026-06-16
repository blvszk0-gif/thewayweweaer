import PolicyLayout from '@/components/layout/PolicyLayout';

export default function Terms() {
  return (
    <PolicyLayout title="Warunki Zakupów">
      <section>
        <h2 className="text-[color:var(--foreground)] font-black mb-4">1. Postanowienia Ogólne</h2>
        <p>Niniejszy regulamin określa zasady korzystania ze sklepu internetowego THE WAY WE WEAR.</p>
      </section>
      <section>
        <h2 className="text-[color:var(--foreground)] font-black mb-4">2. Zwroty</h2>
        <p>Klient ma 14 dni na odstąpienie od umowy bez podania przyczyny, z wyjątkiem produktów personalizowanych.</p>
      </section>
    </PolicyLayout>
  );
}
