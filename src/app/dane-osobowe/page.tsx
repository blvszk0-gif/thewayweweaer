import PolicyLayout from '@/components/layout/PolicyLayout';

export default function PersonalData() {
  return (
    <PolicyLayout title="Ochrona Danych Osobowych">
      <section>
        <h2 className="text-black font-black mb-4">Twoje Prawa</h2>
        <p>Masz prawo do wglądu w swoje dane, ich poprawiania, żądania usunięcia oraz przenoszenia danych.</p>
      </section>
    </PolicyLayout>
  );
}
