'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  X,
  Ruler,
  Loader2
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useStore } from '@/context/StoreContext';
import { getProductByHandle, ShopifyProduct, ShopifyProductVariant } from '@/lib/shopify';

const sizeTable = [
  { size: 'XS', chest: '54 cm', length: '68 cm', sleeve: '58 cm' },
  { size: 'S', chest: '57 cm', length: '70 cm', sleeve: '60 cm' },
  { size: 'M', chest: '60 cm', length: '72 cm', sleeve: '62 cm' },
  { size: 'L', chest: '63 cm', length: '74 cm', sleeve: '64 cm' },
  { size: 'XL', chest: '66 cm', length: '76 cm', sleeve: '66 cm' },
  { size: '2XL', chest: '69 cm', length: '78 cm', sleeve: '68 cm' },
  { size: '3XL', chest: '72 cm', length: '80 cm', sleeve: '70 cm' },
];

export default function ProductPage() {
  const tCatalogPdp = useTranslations('catalog_pdp');
  const tCartWishlist = useTranslations('cart_wishlist');
  const params = useParams();
  const productHandle = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(null);
  const [currentImg, setCurrentImg] = useState(0);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isSizeTableOpen, setIsSizeTableOpen] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [notifySize, setNotifySize] = useState<string | null>(null);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isNotifySuccess, setIsNotifySuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [viewers, setViewers] = useState(0);

  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useStore();

  useEffect(() => {
    setViewers(Math.floor(Math.random() * 30) + 12);
  }, []);

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      const data = await getProductByHandle(productHandle);
      if (data) {
        setProduct(data);
        const firstVariant = data.variants.edges[0]?.node || null;
        setSelectedVariant(firstVariant);

        // Set default selected options
        const defaultSize = firstVariant?.selectedOptions.find(o => o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'rozmiar')?.value || null;
        const defaultColor = firstVariant?.selectedOptions.find(o => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'kolor')?.value || null;
        setSelectedSize(defaultSize);
        setSelectedColor(defaultColor);
      }
      setIsLoading(false);
    }
    loadProduct();
  }, [productHandle]);

  // Update selected variant when size or color changes
  useEffect(() => {
    if (!product) return;
    const found = product.variants.edges.find(({ node }) => {
      const matchSize = selectedSize
        ? node.selectedOptions.some(o => (o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'rozmiar') && o.value === selectedSize)
        : true;
      const matchColor = selectedColor
        ? node.selectedOptions.some(o => (o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'kolor') && o.value === selectedColor)
        : true;
      return matchSize && matchColor;
    });

    if (found) {
      setSelectedVariant(found.node);
    }
  }, [selectedSize, selectedColor, product]);

  const images = product?.images.edges.map(e => e.node.url) || [
    'https://placehold.co/1200x1600/000000/FFFFFF?text=TWWW+PACKSHOT',
  ];

  const sizeOptions = product?.options.find(o => o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'rozmiar')?.values || ['S', 'M', 'L', 'XL', '2XL'];
  const colorOptions = product?.options.find(o => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'kolor')?.values || [];

  const priceAmount = selectedVariant ? parseFloat(selectedVariant.price.amount) : product ? parseFloat(product.priceRange.minVariantPrice.amount) : 299;

  const isLiked = product ? isInWishlist(product.id) : false;

  const handleWishlist = () => {
    if (!product) return;
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.title,
        price: priceAmount,
        image: images[0],
        category: 'Apparel',
      });
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      variantId: selectedVariant?.id,
      name: product.title,
      price: priceAmount,
      image: images[0],
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });
  };

  // Helper for metafield values
  const getMetafieldValue = (key: string) => {
    return product?.metafields?.find(m => m?.key === key)?.value || null;
  };

  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio text-[color:var(--foreground)] relative overflow-x-hidden">
      <Header />

      {isLoading ? (
        <div className="pt-40 pb-40 flex items-center justify-center gap-3">
          <Loader2 className="animate-spin" size={32} />
          <span className="font-black uppercase tracking-widest text-lg">Ładowanie produktu...</span>
        </div>
      ) : !product ? (
        <div className="pt-40 pb-40 container mx-auto px-6 text-center space-y-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">Produkt nie został znaleziony</h1>
          <Link
            href="/shop/all"
            className="inline-block bg-[color:var(--foreground)] text-[color:var(--surface)] px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm"
          >
            Wróć do sklepu
          </Link>
        </div>
      ) : (
        <div className="container mx-auto px-6 pt-32 relative z-10 pb-20">
          <Link
            href="/shop/all"
            className="inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity mb-8"
          >
            ← Wróć do kolekcji
          </Link>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left: Images */}
            <div className="lg:w-[45%]">
              <div className="relative group">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[color:var(--surface-muted)] relative shadow-2xl border border-[color:var(--border)]">
                  {viewers > 0 && (
                    <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-xl">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-white">
                        {tCatalogPdp('count_osób_oglądało_w_ostatnich_48_h', { count: viewers })}
                      </span>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImg}
                      src={images[currentImg]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      alt={product.title}
                    />
                  </AnimatePresence>

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImg((prev) => (prev - 1 + images.length) % images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[color:var(--surface)]/20 hover:bg-[color:var(--surface)]/80 p-2 rounded-full transition-all text-[color:var(--foreground)]"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={() => setCurrentImg((prev) => (prev + 1) % images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[color:var(--surface)]/20 hover:bg-[color:var(--surface)]/80 p-2 rounded-full transition-all text-[color:var(--foreground)]"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex gap-4 mt-6 overflow-x-auto no-scrollbar">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImg(i)}
                        className={`w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                          currentImg === i ? 'border-[color:var(--foreground)]' : 'border-transparent opacity-50'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover grayscale" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="lg:flex-1 flex flex-col">
              <div className="mb-8">
                <span className="text-[13px] font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/30 block mb-2">
                  Project: TWWW // Handle: {product.handle}
                </span>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
                  {product.title}
                </h1>
              </div>

              <p className="text-3xl font-black mb-12 tracking-tighter">
                {priceAmount.toFixed(2)} PLN
              </p>

              <div className="space-y-12">
                {/* Colors if present */}
                {colorOptions.length > 0 && (
                  <div>
                    <h3 className="text-[13px] font-black uppercase tracking-[0.3em] mb-4 opacity-50 italic">
                      Kolor: {selectedColor || 'Wybierz kolor'}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {colorOptions.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`px-6 py-3 rounded-xl border font-black uppercase text-xs tracking-wider transition-all ${
                            selectedColor === c
                              ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] border-[color:var(--foreground)]'
                              : 'bg-[color:var(--surface-muted)] border-[color:var(--border)]'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-[13px] font-black uppercase tracking-[0.3em] opacity-50 italic">Rozmiar</h3>
                    <button
                      onClick={() => setIsSizeTableOpen(true)}
                      className="text-[13px] font-black uppercase tracking-widest underline underline-offset-4 flex items-center gap-2"
                    >
                      <Ruler size={12} /> {tCatalogPdp('tabela_rozmiarów')}
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6">
                    {sizeOptions.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-4 rounded-xl font-black text-base transition-all border ${
                          selectedSize === sz
                            ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] border-[color:var(--foreground)] shadow-lg'
                            : 'bg-[color:var(--surface-muted)] border-transparent hover:border-[color:var(--border)]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 items-stretch">
                  <div className="flex items-center bg-[color:var(--surface)] border border-[color:var(--border)] rounded-full px-6 gap-6 shadow-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="opacity-40 hover:opacity-100 transition-opacity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-[18px] font-black w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="opacity-40 hover:opacity-100 transition-opacity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-6 rounded-full font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border-2 border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--surface)] shadow-2xl hover:opacity-90"
                  >
                    <ShoppingBag size={20} /> {tCartWishlist('dodaj_do_koszyka')}
                  </button>
                </div>

                <button
                  onClick={handleWishlist}
                  className={`w-full py-6 rounded-full font-black uppercase tracking-[0.2em] border border-[color:var(--border)] flex items-center justify-center gap-3 hover:bg-[color:var(--surface-muted)] transition-all shadow-md ${
                    isLiked ? 'text-red-500 border-red-500/30' : ''
                  }`}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  {isLiked ? tCatalogPdp('usuń_z_wishlisty') : tCatalogPdp('dodaj_do_wishlisty')}
                </button>

                {/* Product Metafields / Descriptions */}
                <div className="space-y-8 pt-8 border-t border-[color:var(--border)]">
                  {product.descriptionHtml ? (
                    <div>
                      <h4 className="text-[13px] font-black uppercase tracking-[0.3em] mb-4 opacity-50 italic">
                        Opis produktu
                      </h4>
                      <div
                        className="prose prose-invert max-w-none text-base font-bold uppercase tracking-widest opacity-80"
                        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                      />
                    </div>
                  ) : null}

                  {getMetafieldValue('composition') && (
                    <div>
                      <h4 className="text-[13px] font-black uppercase tracking-[0.3em] mb-2 opacity-50 italic">
                        Skład
                      </h4>
                      <p className="text-base font-bold opacity-80 uppercase tracking-widest">
                        {getMetafieldValue('composition')}
                      </p>
                    </div>
                  )}

                  {getMetafieldValue('fit') && (
                    <div>
                      <h4 className="text-[13px] font-black uppercase tracking-[0.3em] mb-2 opacity-50 italic">
                        Krój i Fit
                      </h4>
                      <p className="text-base font-bold opacity-80 uppercase tracking-widest">
                        {getMetafieldValue('fit')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Size Chart Modal */}
      <AnimatePresence>
        {isSizeTableOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeTableOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[color:var(--surface)] rounded-[40px] shadow-2xl p-12 overflow-hidden border border-[color:var(--border)]"
            >
              <button
                onClick={() => setIsSizeTableOpen(false)}
                className="absolute top-8 right-8 text-[color:var(--foreground)]/20 hover:text-[color:var(--foreground)] transition-colors"
              >
                <X size={32} />
              </button>
              <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-12 text-[color:var(--foreground)]">
                {tCatalogPdp('tabela_rozmiarów')}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-black uppercase text-base tracking-widest text-[color:var(--foreground)]">
                  <thead className="border-b border-[color:var(--border)]">
                    <tr>
                      <th className="py-4">{tCatalogPdp('rozmiar')}</th>
                      <th className="py-4">{tCatalogPdp('klatka')}</th>
                      <th className="py-4">{tCatalogPdp('długość')}</th>
                      <th className="py-4">{tCatalogPdp('rękaw')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color:var(--border)]/5">
                    {sizeTable.map((s) => (
                      <tr key={s.size}>
                        <td className="py-4 font-black">{s.size}</td>
                        <td className="py-4 opacity-40">{s.chest}</td>
                        <td className="py-4 opacity-40">{s.length}</td>
                        <td className="py-4 opacity-40">{s.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
