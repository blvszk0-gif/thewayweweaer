import PolicyLayout from '@/components/layout/PolicyLayout';

export default function Cookies() {
  return (
    <PolicyLayout title="Pliki Cookie">
      <section>
        <h2 className="text-black font-black mb-4">Czym są cookies?</h2>
        <p>To małe pliki tekstowe zapisywane na Twoim urządzeniu, które pomagają nam usprawnić działanie strony.</p>
      </section>
    </PolicyLayout>
  );
}
