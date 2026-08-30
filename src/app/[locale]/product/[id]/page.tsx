'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useStore } from '@/context/StoreContext';
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { BackInStockForm } from '@/components/shop/BackInStockForm';
import { RecommendedProducts } from '@/components/shop/RecommendedProducts';
import { ViewerCount } from '@/components/shop/ViewerCount';



type Variant = { id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string }; image: { url: string } | null; selectedOptions: Array<{ name: string; value: string }> };
type Product = { id: string; handle: string; title: string; description: string; availableForSale: boolean; productType: string | null; featuredImage: { url: string; altText: string | null } | null; images: { nodes: Array<{ url: string; altText: string | null }> }; variants: { nodes: Variant[] } };

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const { addToCart, isCartLoading, cartError, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => { setLoading(true); setError(false); fetch(`/api/shopify/products/${encodeURIComponent(params.id)}`).then(async (response) => { if (!response.ok) throw new Error(); return response.json() as Promise<{ product: Product }>; }).then(({ product: received }) => { setProduct(received); setSelected(Object.fromEntries(received.variants.nodes[0]?.selectedOptions.map((option) => [option.name, option.value]) || [])); }).catch(() => setError(true)).finally(() => setLoading(false)); }, [params.id]);
  const variant = useMemo(() => product?.variants.nodes.find((item) => item.selectedOptions.every((option) => selected[option.name] === option.value)) || product?.variants.nodes[0], [product, selected]);
  const options = useMemo(() => product ? Array.from(new Set(product.variants.nodes.flatMap((item) => item.selectedOptions.map((option) => option.name)))).map((name) => [name, Array.from(new Set(product.variants.nodes.flatMap((item) => item.selectedOptions.filter((option) => option.name === name).map((option) => option.value))))] as const) : [], [product]);
  const images = product ? (product.images.nodes.length ? product.images.nodes : product.featuredImage ? [product.featuredImage] : []) : [];
  const liked = product ? isInWishlist(product.handle) : false;
  const handleWishlist = () => {
    if (!product || !variant) return;
    if (liked) {
      removeFromWishlist(product.handle);
    } else {
      addToWishlist({
        id: product.handle,
        name: product.title,
        price: Number(variant.price.amount),
        image: product.featuredImage?.url ?? images[0]?.url ?? '',
        category: product.productType ?? '',
        variantId: variant.id,
        availableForSale: variant.availableForSale,
      });
    }
  };
  if (loading) return <main className="min-h-screen "><Header /><p className="pt-40 text-center font-black uppercase tracking-widest">Ładowanie produktu…</p></main>;
  if (error || !product || !variant) return <main className="min-h-screen "><Header /><p className="pt-40 text-center font-black uppercase tracking-widest">Nie znaleziono produktu.</p><Footer /></main>;
  return <main className="min-h-screen text-[color:var(--foreground)] font-antonio"><Header /><div className="container mx-auto px-6 pt-32 pb-24"><div className="grid lg:grid-cols-2 gap-16">
    <section>
      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[color:var(--surface-muted)] relative">
        {images[imageIndex] ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 flex items-center justify-center cursor-zoom-in"
            aria-label={`Powiększ zdjęcie produktu ${product.title}`}
          >
            <img
              src={images[imageIndex].url}
              alt={images[imageIndex].altText || product.title}
              className="w-full h-full object-contain transition-transform duration-500 ease-out hover:scale-105"
            />
          </button>
        ) : (
          <div className="h-full grid place-items-center opacity-40">
            Brak zdjęcia
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Poprzednie zdjęcie"
              onClick={() =>
                setImageIndex(
                  (current) => (current - 1 + images.length) % images.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 text-black hover:bg-white transition"
            >
              <ChevronLeft />
            </button>

            <button
              type="button"
              aria-label="Następne zdjęcie"
              onClick={() =>
                setImageIndex((current) => (current + 1) % images.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 text-black hover:bg-white transition"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 justify-center">
          {images.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setImageIndex(index)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${imageIndex === index
                ? 'border-[color:var(--foreground)]'
                : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              aria-label={`Wybierz zdjęcie ${index + 1}`}
            >
              <img
                src={image.url}
                alt={image.altText || `${product.title} ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </section>
    <section><p className="font-black uppercase tracking-[.3em] opacity-40">Project: TWWW</p><h1 className="mt-3 text-5xl font-black uppercase italic tracking-tighter">{product.title}</h1><p className="mt-6 text-3xl font-black">{variant.price.amount} {variant.price.currencyCode}</p><div className="mt-4"><ViewerCount productId={product.id} /></div><p className="mt-8 whitespace-pre-line leading-relaxed opacity-70">{product.description}</p>
      <div className="mt-10 space-y-7">{options.map(([name, values]) => <fieldset key={name}><legend className="font-black uppercase tracking-widest text-sm mb-3">{name}</legend><div className="flex flex-wrap gap-3">{values.map((value) => <button key={value} onClick={() => setSelected((previous) => ({ ...previous, [name]: value }))} className={`border rounded-full px-5 py-3 font-black uppercase text-sm ${selected[name] === value ? 'bg-[color:var(--foreground)] text-[color:var(--surface)]' : 'border-[color:var(--border)]'}`}>{value}</button>)}</div></fieldset>)}</div>
      <div className="mt-10 flex gap-4">
        <div className="flex items-center border border-[color:var(--border)] rounded-full">
          <button aria-label="Zmniejsz ilość" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="p-4"><Minus size={16} /></button>
          <span className="font-black w-8 text-center">{quantity}</span>
          <button aria-label="Zwiększ ilość" onClick={() => setQuantity((current) => current + 1)} className="p-4"><Plus size={16} /></button>
        </div>
        {variant.availableForSale ? (
          <button disabled={isCartLoading} onClick={() => addToCart({ merchandiseId: variant.id, quantity })} className="flex-1 bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest disabled:opacity-30">
            <ShoppingBag className="inline mr-2" size={18} />Dodaj do koszyka
          </button>
        ) : (
          <BackInStockForm variantId={variant.id} />
        )}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={liked ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
          className={`shrink-0 w-16 rounded-full border flex items-center justify-center transition-colors ${liked ? 'bg-red-500 border-red-500 text-white' : 'border-[color:var(--border)] hover:bg-[color:var(--surface-muted)]'}`}
        >
          <Heart size={22} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>
      {cartError && <p role="alert" className="mt-4 text-red-500 font-bold">{cartError}</p>}
    </section></div>
  </div>{lightboxOpen && images[imageIndex] && (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Galeria zdjęć produktu"
    >
      {/* Zamknięcie */}
      <button
        type="button"
        onClick={() => setLightboxOpen(false)}
        aria-label="Zamknij galerię"
        className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-white/90 text-black text-2xl flex items-center justify-center hover:bg-white transition"
      >
        ×
      </button>

      {/* Licznik */}
      <div className="absolute top-6 left-6 z-20 text-white font-black tracking-widest">
        {imageIndex + 1} / {images.length}
      </div>

      {/* Główne zdjęcie */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={images[imageIndex].url}
          alt={images[imageIndex].altText || product.title}
          className="max-w-full max-h-[78vh] object-contain select-none"
        />

        {images.length > 1 && (
          <>
            {/* Poprzednie */}
            <button
              type="button"
              aria-label="Poprzednie zdjęcie"
              onClick={() =>
                setImageIndex(
                  (current) =>
                    (current - 1 + images.length) % images.length
                )
              }
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white transition"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Następne */}
            <button
              type="button"
              aria-label="Następne zdjęcie"
              onClick={() =>
                setImageIndex(
                  (current) => (current + 1) % images.length
                )
              }
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Miniatury */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 max-w-[90vw] overflow-x-auto px-2">
          {images.map((image, index) => (
            <button
              key={`lightbox-${image.url}-${index}`}
              type="button"
              onClick={() => setImageIndex(index)}
              className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 bg-white transition ${imageIndex === index
                ? 'border-white'
                : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              aria-label={`Wybierz zdjęcie ${index + 1}`}
            >
              <img
                src={image.url}
                alt={image.altText || `${product.title} ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )}<RecommendedProducts productId={product.id} /><Footer /></main>;
}
