import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function DeleteAccountPage() {
  return <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio"><Header />
    <section className="container mx-auto px-6 pt-36 pb-24 max-w-3xl"><h1 className="text-5xl font-black uppercase italic">Usunięcie konta</h1><p className="mt-8 text-lg leading-relaxed opacity-70">Aby złożyć wniosek o usunięcie danych konta, skontaktuj się z nami z adresu e-mail przypisanego do konta. Zweryfikujemy wniosek zgodnie z polityką prywatności.</p><p className="mt-6 text-sm uppercase tracking-widest opacity-50">Subskrypcja newslettera jest zarządzana oddzielnie — nie zmienimy jej bez wyraźnej dyspozycji.</p><a href="mailto:zamowienia@thewaywewear.pl?subject=Usunięcie%20konta" className="inline-block mt-10 bg-[color:var(--foreground)] text-[color:var(--surface)] px-7 py-4 rounded-full font-black uppercase tracking-widest">Napisz do nas</a></section><Footer />
  </main>;
}
