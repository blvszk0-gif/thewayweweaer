'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Info,
  Droplets,
  Wind,
  Sun,
  X,
  CreditCard,
  Plus
} from 'lucide-react';

const productData = {
  id: 'twww-hoodie-01',
  name: 'OVERSIZE HOODIE // THE WAY WE STARE',
  price: 299,
  currency: 'PLN',
  colors: [
    { name: 'Pitch Black', hex: '#000000', stock: true },
    { name: 'Heather Grey', hex: '#808080', stock: true },
    { name: 'Cloud White', hex: '#FFFFFF', stock: false },
  ],
  sizes: [
    { label: 'XS', stock: true },
    { label: 'S', stock: true },
    { label: 'M', stock: true },
    { label: 'L', stock: false },
    { label: 'XL', stock: true },
    { label: 'XXL', stock: true },
  ],
  images: [
    "https://placehold.co/1200x1600/000000/FFFFFF?text=DETAL+HAFTU+1",
    "https://placehold.co/1200x1600/000000/FFFFFF?text=PACKSHOT+1",
    "https://placehold.co/1200x1600/000000/FFFFFF?text=CLIENT+VIEW",
    "https://placehold.co/1200x1600/000000/FFFFFF?text=LABEL+DETAIL",
  ],
  materials: "80% BAWEŁNA CZESANA, 20% POLIESTER RECYKLINGOWY. GRAMATURA: 340G/M2.",
  description: "NAJWYŻSZEJ JAKOŚCI BLUZA TYPU OVERSIZE Z AUTORSKIM HAFTEM KOLEKCJI 'THE WAY WE STARE'. MIĘSISTY MATERIAŁ, USZTYWNIONY KAPTUR, ŚCIĄGACZE TYPU PREMIUM.",
  extraColors: [
    { name: 'Electric Blue', fee: 40 },
    { name: 'Neon Green', fee: 40 },
    { name: 'Ruby Red', fee: 50 },
  ]
};

const LaundryIcon = ({ icon: Icon, label, detail }: { icon: any, label: string, detail: string }) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="relative group">
      <button
        onClick={() => setShowDetail(!showDetail)}
        className="w-10 h-10 border border-black/10 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all"
      >
        <Icon size={20} />
      </button>
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-black text-white p-3 rounded-lg text-[10px] font-bold uppercase tracking-widest z-20 text-center"
          >
            <p className="mb-1">{label}</p>
            <p className="opacity-50">{detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProductPage() {
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isExtraColorsOpen, setIsExtraColorsOpen] = useState(false);
  const [viewers, setViewers] = useState(0);

  React.useEffect(() => {
    setViewers(Math.floor(Math.random() * 50) + 12);
  }, []);

  return (
    <main className="min-h-screen bg-[#dcdcdc] font-montserrat text-black pb-20">
      <Header />

      <div className="container mx-auto px-6 pt-32">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* LEFT SIDE: Image Slider (Cropp/Zara Style, 40% Smaller Scale) */}
          <div className="lg:w-[45%]">
            <div className="relative group">
               {/* Viewers Bubble */}
               <AnimatePresence>
                 {viewers > 0 && (
                   <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-12 left-0 z-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 flex items-center gap-2 shadow-sm"
                   >
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {viewers} OSÓB OGLĄDAŁO W OSTATNIE 48H
                    </span>
                   </motion.div>
                 )}
               </AnimatePresence>

               <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-black/5 relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImg}
                      src={productData.images[currentImg]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  <button
                    onClick={() => setCurrentImg((prev) => (prev - 1 + productData.images.length) % productData.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 p-2 rounded-full transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setCurrentImg((prev) => (prev + 1) % productData.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 p-2 rounded-full transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
               </div>

               {/* Thumbnails */}
               <div className="flex gap-4 mt-6 overflow-x-auto no-scrollbar">
                  {productData.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${currentImg === i ? 'border-black' : 'border-transparent opacity-50'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
               </div>
            </div>
          </div>

          {/* RIGHT SIDE: Controls */}
          <div className="lg:flex-1 flex flex-col">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">{productData.name}</h1>
            <p className="text-2xl font-black mb-8">{productData.price} {productData.currency}</p>

            <div className="space-y-12">
               {/* Color Selection */}
               <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-black/40">Kolor: {selectedColor.name}</h3>
                  <div className="flex gap-3">
                    {productData.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => color.stock && setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all relative ${selectedColor.name === color.name ? 'border-black scale-110' : 'border-transparent'} ${!color.stock ? 'opacity-20 cursor-not-allowed grayscale' : ''}`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {!color.stock && <div className="absolute inset-0 flex items-center justify-center text-black"><X size={20} /></div>}
                      </button>
                    ))}
                  </div>
               </div>

               {/* Size Selection */}
               <div>
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Rozmiar</h3>
                    <button className="text-[10px] font-black uppercase tracking-widest underline underline-offset-4">Tabela rozmiarów</button>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {productData.sizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => size.stock && setSelectedSize(size.label)}
                        className={`py-4 rounded-xl font-black text-xs transition-all border ${selectedSize === size.label ? 'bg-black text-white border-black' : 'bg-black/5 border-transparent hover:border-black/20'} ${!size.stock ? 'opacity-20 cursor-not-allowed line-through' : ''}`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                     <p className="text-[10px] font-bold text-black/30 uppercase italic">Możesz też wpisać własne wymiary:</p>
                     <input type="text" placeholder="NP. WZROST 180CM, WAGA 75KG..." className="w-full bg-black/5 border border-black/10 rounded-xl px-6 py-3 text-xs focus:outline-none focus:border-black" />
                  </div>
               </div>

               {/* More Colors Fee */}
               <div className="border border-black/10 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setIsExtraColorsOpen(!isExtraColorsOpen)}
                    className="w-full px-6 py-4 flex items-center justify-between font-black text-[10px] uppercase tracking-widest hover:bg-black/5 transition-all"
                  >
                    Więcej kolorów za opłatą <Plus size={16} className={`transition-transform ${isExtraColorsOpen ? 'rotate-45' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isExtraColorsOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-black/5 border-t border-black/10"
                      >
                        <div className="p-4 space-y-2">
                           {productData.extraColors.map(c => (
                             <button key={c.name} className="w-full flex justify-between items-center px-4 py-3 rounded-lg hover:bg-white transition-all text-[10px] font-bold uppercase tracking-widest">
                               <span>{c.name}</span>
                               <span className="text-green-600">+{c.fee} PLN</span>
                             </button>
                           ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               {/* Actions */}
               <div className="space-y-4">
                  <button className={`w-full py-6 rounded-full font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border-2 ${selectedSize ? 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white' : 'border-black bg-black text-white hover:bg-white hover:text-black'}`}>
                    <ShoppingBag size={20} /> Dodaj do koszyka
                  </button>
                  <button className="w-full py-6 rounded-full font-black uppercase tracking-[0.2em] border border-black/10 flex items-center justify-center gap-3 hover:bg-white transition-all">
                    <Heart size={20} /> Dodaj do wishlisty
                  </button>
               </div>

               {/* Payments */}
               <div className="pt-6 border-t border-black/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-4 text-center">Bezpieczne płatności:</p>
                  <div className="flex justify-center gap-6 opacity-40">
                     <CreditCard size={24} />
                     <div className="font-black text-xs italic">BLIK</div>
                     <div className="font-black text-xs italic">APPLE PAY</div>
                  </div>
               </div>

               {/* Details & Laundry */}
               <div className="space-y-8 pt-12">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-black/40">Opis produktu</h4>
                    <p className="text-sm font-bold leading-relaxed opacity-60 uppercase">{productData.description}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-black/40">Materiał</h4>
                    <p className="text-sm font-bold opacity-60 uppercase italic">{productData.materials}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-black/40">Pielęgnacja (kliknij ikony)</h4>
                    <div className="flex gap-4">
                       <LaundryIcon icon={Droplets} label="PRANIE" detail="PRAĆ W MAX 30°C. NIE STOSOWAĆ WYBIELACZY." />
                       <LaundryIcon icon={Sun} label="SUSZENIE" detail="NIE SUSZYĆ W SUSZARCE BĘBNOWEJ." />
                       <LaundryIcon icon={Wind} label="PRASOWANIE" detail="PRASOWAĆ NA LEWEJ STRONIE, OMIJAĆ NADRUKI." />
                       <LaundryIcon icon={Info} label="DODATKOWE" detail="PRAĆ Z PODOBNYMI KOLORAMI." />
                    </div>
                  </div>
               </div>

            </div>
          </div>

        </div>
      </div>

      <BackToTop />
      <Footer />
    </main>
  );
}
