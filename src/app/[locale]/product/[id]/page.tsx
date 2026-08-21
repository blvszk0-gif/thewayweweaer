'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useStore } from '@/context/StoreContext';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag } from 'lucide-react';

type Variant = { id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string }; image: { url: string } | null; selectedOptions: Array<{ name: string; value: string }> };
type Product = { handle: string; title: string; description: string; availableForSale: boolean; featuredImage: { url: string; altText: string | null } | null; images: { nodes: Array<{ url: string; altText: string | null }> }; variants: { nodes: Variant[] } };

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const { addToCart, isCartLoading, cartError } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => { setLoading(true); setError(false); fetch(`/api/shopify/products/${encodeURIComponent(params.id)}`).then(async (response) => { if (!response.ok) throw new Error(); return response.json() as Promise<{ product: Product }>; }).then(({ product: received }) => { setProduct(received); setSelected(Object.fromEntries(received.variants.nodes[0]?.selectedOptions.map((option) => [option.name, option.value]) || [])); }).catch(() => setError(true)).finally(() => setLoading(false)); }, [params.id]);
  const variant = useMemo(() => product?.variants.nodes.find((item) => item.selectedOptions.every((option) => selected[option.name] === option.value)) || product?.variants.nodes[0], [product, selected]);
  const options = useMemo(() => product ? Array.from(new Set(product.variants.nodes.flatMap((item) => item.selectedOptions.map((option) => option.name)))).map((name) => [name, Array.from(new Set(product.variants.nodes.flatMap((item) => item.selectedOptions.filter((option) => option.name === name).map((option) => option.value))))] as const) : [], [product]);
  const images = product ? (product.images.nodes.length ? product.images.nodes : product.featuredImage ? [product.featuredImage] : []) : [];
  if (loading) return <main className="min-h-screen bg-[color:var(--surface)]"><Header /><p className="pt-40 text-center font-black uppercase tracking-widest">Ładowanie produktu…</p></main>;
  if (error || !product || !variant) return <main className="min-h-screen bg-[color:var(--surface)]"><Header /><p className="pt-40 text-center font-black uppercase tracking-widest">Nie znaleziono produktu.</p><Footer /></main>;
  return <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio"><Header /><div className="container mx-auto px-6 pt-32 pb-24"><div className="grid lg:grid-cols-2 gap-16">
    <section><div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[color:var(--surface-muted)] relative">{images[imageIndex] ? <img src={images[imageIndex].url} alt={images[imageIndex].altText || product.title} className="w-full h-full object-cover" /> : <div className="h-full grid place-items-center opacity-40">Brak zdjęcia</div>}{images.length > 1 && <><button aria-label="Poprzednie zdjęcie" onClick={() => setImageIndex((current) => (current - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 text-black"><ChevronLeft /></button><button aria-label="Następne zdjęcie" onClick={() => setImageIndex((current) => (current + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 text-black"><ChevronRight /></button></>}</div></section>
    <section><p className="font-black uppercase tracking-[.3em] opacity-40">Project: TWWW</p><h1 className="mt-3 text-5xl font-black uppercase italic tracking-tighter">{product.title}</h1><p className="mt-6 text-3xl font-black">{variant.price.amount} {variant.price.currencyCode}</p><p className="mt-8 whitespace-pre-line leading-relaxed opacity-70">{product.description}</p>
      <div className="mt-10 space-y-7">{options.map(([name, values]) => <fieldset key={name}><legend className="font-black uppercase tracking-widest text-sm mb-3">{name}</legend><div className="flex flex-wrap gap-3">{values.map((value) => <button key={value} onClick={() => setSelected((previous) => ({ ...previous, [name]: value }))} className={`border rounded-full px-5 py-3 font-black uppercase text-sm ${selected[name] === value ? 'bg-[color:var(--foreground)] text-[color:var(--surface)]' : 'border-[color:var(--border)]'}`}>{value}</button>)}</div></fieldset>)}</div>
      <div className="mt-10 flex gap-4"><div className="flex items-center border border-[color:var(--border)] rounded-full"><button aria-label="Zmniejsz ilość" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="p-4"><Minus size={16} /></button><span className="font-black w-8 text-center">{quantity}</span><button aria-label="Zwiększ ilość" onClick={() => setQuantity((current) => current + 1)} className="p-4"><Plus size={16} /></button></div><button disabled={!variant.availableForSale || isCartLoading} onClick={() => addToCart({ merchandiseId: variant.id, quantity })} className="flex-1 bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest disabled:opacity-30"><ShoppingBag className="inline mr-2" size={18} />{variant.availableForSale ? 'Dodaj do koszyka' : 'Niedostępne'}</button></div>{cartError && <p role="alert" className="mt-4 text-red-500 font-bold">{cartError}</p>}</section>
  </div></div><Footer /></main>;
}
