'use client';
import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';
import * as Sentry from '@sentry/nextjs';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
        Sentry.captureException(error);
    }, [error]);

    return (
        <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio flex flex-col">
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-32">
                <p className="font-black uppercase tracking-[.35em] opacity-40">The Way We Wear</p>
                <h1 className="mt-4 text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
                    Coś poszło nie tak
                </h1>
                <p className="mt-4 opacity-60 max-w-md">
                    Napotkaliśmy nieoczekiwany błąd. Spróbuj ponownie — jeśli problem się powtórzy, daj nam znać.
                </p>
                <div className="mt-10 flex gap-4">
                    <button
                        onClick={reset}
                        className="px-6 py-3 rounded-full bg-[color:var(--foreground)] text-[color:var(--surface)] font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all"
                    >
                        Spróbuj ponownie
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-full border border-[color:var(--border)] font-black uppercase tracking-widest text-sm hover:bg-[color:var(--surface-muted)] transition-all"
                    >
                        Strona główna
                    </Link>
                </div>
            </div>
            <Footer />
        </main>
    );
}