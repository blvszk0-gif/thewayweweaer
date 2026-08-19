import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-9xl font-black italic tracking-tighter opacity-10">404</h1>
        <div className="mt-[-4rem]">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">STRONA NIE ZOSTAŁA ODNALEZIONA</h2>
          <p className="text-[18px] font-bold opacity-50 uppercase tracking-widest mb-8">Strona, której szukasz, nie istnieje lub została przeniesiona.</p>
          <Link
            href="/"
            className="inline-block bg-[color:var(--foreground)] text-[color:var(--surface)] px-12 py-5 rounded-full font-black uppercase tracking-widest text-[18px] shadow-2xl hover:scale-105 transition-transform"
          >
            Wróć do strony głównej
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
