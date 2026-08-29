'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';

// react-pageflip dotyka document/window – ładujemy tylko w przeglądarce.
const Flipbook = dynamic(
    () => import('@/components/lookbook/Flipbook').then((m) => m.Flipbook),
    { ssr: false, loading: () => <p className="py-20 text-center opacity-50">Ładowanie gazetki…</p> }
);

type Field = { key: string; value: string | null; references: { nodes: Array<{ image?: { url: string; altText: string | null } | null }> } | null };
type LookbookEntry = { id: string; handle: string; fields: Field[] };

const value = (entry: LookbookEntry, key: string) => entry.fields.find((f) => f.key === key)?.value || '';
const images = (entry: LookbookEntry) =>
    entry.fields.find((f) => f.key === 'images')?.references?.nodes
        .map((n) => n.image)
        .filter((img): img is { url: string; altText: string | null } => !!img) || [];

export default function LookbookEditionPage() {
    const params = useParams<{ handle: string }>();
    const [entry, setEntry] = useState<LookbookEntry | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('/api/shopify/metaobjects?type=lookbook')
            .then(async (res) => { if (!res.ok) throw new Error(); return res.json() as Promise<{ metaobjects: LookbookEntry[] }>; })
            .then((data) => {
                const found = data.metaobjects.find((m) => m.handle === params.handle);
                if (!found) throw new Error();
                setEntry(found);
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [params.handle]);

    return (
        <main className="min-h-screen text-[color:var(--foreground)] font-antonio">
            <Header />
            <section className="container mx-auto px-6 pt-36 pb-24">
                <Link
                    href="/lookbook"
                    className="inline-block mb-8 text-xs font-black uppercase tracking-widest border border-[color:var(--border)] px-4 py-2 rounded-full hover:bg-[color:var(--surface-muted)] transition-all"
                >
                    ← Wszystkie edycje
                </Link>

                {loading && <p className="py-20 text-center opacity-50">Ładowanie gazetki…</p>}
                {error && <p className="py-20 text-center text-red-500">Nie udało się pobrać tej edycji.</p>}

                {entry && (
                    <>
                        <p className="text-center font-black uppercase tracking-[.35em] opacity-40">The Way We Wear</p>
                        <h1 className="mt-3 mb-2 text-center text-5xl font-black uppercase italic tracking-tighter">
                            {value(entry, 'title')}
                        </h1>
                        {value(entry, 'season') && (
                            <p className="mb-10 text-center opacity-40 uppercase tracking-widest">{value(entry, 'season')}</p>
                        )}

                        <Flipbook pages={images(entry)} />
                    </>
                )}
            </section>
            <Footer />
        </main>
    );
}