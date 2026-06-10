'use client';

import React, { useState } from 'react';
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
  Ruler
} from 'lucide-react';
import Link from 'next/link';

// International Laundry Icons (SVGs)
const WashIcon = () => (
  <svg viewBox="0 0 100 100" width="24" height="24" fill="currentColor">
    <path d="M10,40 L90,40 L80,90 L20,90 Z" fill="none" stroke="currentColor" strokeWidth="5"/>
    <path d="M30,30 Q50,20 70,30" fill="none" stroke="currentColor" strokeWidth="5"/>
  </svg>
);
const BleachIcon = () => (
  <svg viewBox="0 0 100 100" width="24" height="24" fill="currentColor">
    <path d="M10,90 L50,10 L90,90 Z" fill="none" stroke="currentColor" strokeWidth="5"/>
    <line x1="25" y1="90" x2="75" y2="90" stroke="currentColor" strokeWidth="10"/>
  </svg>
);
const TumbleIcon = () => (
  <svg viewBox="0 0 100 100" width="24" height="24" fill="currentColor">
    <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="5"/>
    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="5"/>
    <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="5"/>
  </svg>
);
const IronIcon = () => (
  <svg viewBox="0 0 100 100" width="24" height="24" fill="currentColor">
    <path d="M10,80 L90,80 L80,40 Q70,20 40,20 L10,20 Z" fill="none" stroke="currentColor" strokeWidth="5"/>
    <circle cx="25" cy="50" r="5" fill="currentColor"/>
  </svg>
);

const productData = {
  id: 'twww-hoodie-01',
  category: 'Bluzy',
  name: 'THE WAY WE STARE',
  type: 'OVERSIZE HOODIE',
  price: 299,
  currency: 'PLN',
  colors: [
    { name: 'Pitch Black', hex: '#000000', stock: true, extra: 0 },
    { name: 'Heather Grey', hex: '#808080', stock: true, extra: 0 },
    { name: 'Cloud White', hex: '#FFFFFF', stock: false, extra: 0 },
  ],
  premiumColors: [
    { name: 'Baby Blue', hex: '#89CFF0', stock: true, extra: 40 },
    { name: 'Powder Pink', hex: '#F2D2BD', stock: true, extra: 40 },
  ],
  sizes: [
    { label: 'S', stock: true },
    { label: 'M', stock: true },
    { label: 'L', stock: false },
    { label: 'XL', stock: true },
  ],
  images: [
    "https://placehold.co/1200x1600/000000/FFFFFF?text=DETAL+HAFTU+1",
    "https://placehold.co/1200x1600/000000/FFFFFF?text=PACKSHOT+1",
    "https://placehold.co/1200x1600/000000/FFFFFF?text=CLIENT+VIEW",
    "https://placehold.co/1200x1600/000000/FFFFFF?text=LABEL+DETAIL",
  ],
  materials: "80% BAWEŁNA CZESANA, 20% POLIESTER RECYKLINGOWY. GRAMATURA: 340G/M2.",
  description: "NAJWYŻSZEJ JAKOŚCI BLUZA TYPU OVERSIZE Z AUTORSKIM HAFTEM KOLEKCJI 'THE WAY WE STARE'. MIĘSISTY MATERIAŁ, USZTYWNIONY KAPTUR, ŚCIĄGACZE TYPU PREMIUM.",
};

const sizeTable = [
  { size: 'S', chest: '57 cm', length: '70 cm', sleeve: '60 cm' },
  { size: 'M', chest: '60 cm', length: '72 cm', sleeve: '62 cm' },
  { size: 'L', chest: '63 cm', length: '74 cm', sleeve: '64 cm' },
  { size: 'XL', chest: '66 cm', length: '76 cm', sleeve: '66 cm' },
];

const LaundryIcon = ({ icon: Icon, label, detail, active, onToggle }: { icon: any, label: string, detail: string, active: boolean, onToggle: () => void }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`w-12 h-12 border rounded-xl flex items-center justify-center transition-all ${active ? 'bg-black text-white border-black shadow-xl scale-110' : 'bg-white text-black/40 border-black/10 hover:border-black'}`}
      >
        <Icon />
      </button>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-56 bg-black text-white p-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] z-20 text-center shadow-2xl"
          >
            <p className="mb-2 text-white/50">{label}</p>
            <p className="leading-relaxed">{detail}</p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rotate-45" />
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
  const [isSizeTableOpen, setIsSizeTableOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [viewers, setViewers] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  React.useEffect(() => {
    setViewers(Math.floor(Math.random() * 50) + 12);
  }, []);

  const totalPrice = productData.price + (selectedColor.extra || 0);

  const handleToggleTooltip = (id: string) => {
    setActiveTooltip(activeTooltip === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[#dcdcdc] font-abel text-black shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] relative overflow-x-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat" />
      <Header />

      <div className="container mx-auto px-6 pt-32 relative z-10">
        {/* Breadcrumb */}
        <Link
            href={`/shop/${productData.category.toLowerCase()}`}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity mb-8"
        >
            ← Powrót do Project: TWWW // Subject: {productData.category}
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">

          <div className="lg:w-[45%]">
            <div className="relative group">
               <AnimatePresence>
                 {viewers > 0 && (
                   <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-12 left-0 z-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 flex items-center gap-2 shadow-sm"
                   >
                    <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{viewers} OSÓB OGLĄDAŁO W OSTATNIE 48H</span>
                   </motion.div>
                 )}
               </AnimatePresence>

               <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-black/5 relative shadow-2xl border border-white/20">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImg} src={productData.images[currentImg]}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </AnimatePresence>
                  <button onClick={() => setCurrentImg((prev) => (prev - 1 + productData.images.length) % productData.images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 p-2 rounded-full transition-all shadow-xl"><ChevronLeft size={24} /></button>
                  <button onClick={() => setCurrentImg((prev) => (prev + 1) % productData.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 p-2 rounded-full transition-all shadow-xl"><ChevronRight size={24} /></button>
               </div>

               <div className="flex gap-4 mt-6 overflow-x-auto no-scrollbar">
                  {productData.images.map((img, i) => (
                    <button key={i} onClick={() => setCurrentImg(i)} className={`w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${currentImg === i ? 'border-black' : 'border-transparent opacity-50'}`}><img src={img} alt="" className="w-full h-full object-cover" /></button>
                  ))}
               </div>
            </div>
          </div>

          <div className="lg:flex-1 flex flex-col">
            <div className="mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 block mb-2">Project: TWWW // Subject: {productData.type} //</span>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">{productData.name}</h1>
            </div>

            <p className="text-3xl font-black mb-12 tracking-tighter">{totalPrice} {productData.currency}</p>

            <div className="space-y-12">
               <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-black/48 italic">Wybierz Kolor: {selectedColor.name}</h3>
                  <div className="space-y-6">
                      <div className="flex gap-3">
                        {productData.colors.map((color) => (
                          <button
                            key={color.name} onClick={() => { if (color.stock) setSelectedColor(color); }}
                            className={`w-12 h-12 rounded-full border-2 transition-all relative ${selectedColor.name === color.name ? 'border-black scale-110 shadow-xl' : 'border-transparent'} ${!color.stock ? 'opacity-20 cursor-not-allowed grayscale' : ''}`}
                            style={{ backgroundColor: color.hex }}
                          >
                            {!color.stock && <div className="absolute inset-0 flex items-center justify-center text-black"><X size={20} /></div>}
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-col gap-2">
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-20 italic">Premium Colors (+40 PLN):</p>
                        <div className="flex gap-3">
                            {productData.premiumColors.map((color) => (
                                <button
                                    key={color.name} onClick={() => { if (color.stock) setSelectedColor(color); }}
                                    className={`w-12 h-12 rounded-full border-2 transition-all relative flex items-center justify-center ${selectedColor.name === color.name ? 'border-black scale-110 shadow-xl' : 'border-transparent'} ${!color.stock ? 'opacity-20 cursor-not-allowed grayscale' : ''}`}
                                    style={{ backgroundColor: color.hex }}
                                >
                                    {!color.stock && <div className="absolute inset-0 flex items-center justify-center text-black"><X size={20} /></div>}
                                </button>
                            ))}
                        </div>
                      </div>
                  </div>
               </div>

               <div>
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/48 italic">Rozmiar</h3>
                    <button onClick={() => setIsSizeTableOpen(true)} className="text-[10px] font-black uppercase tracking-widest underline underline-offset-4 flex items-center gap-2"><Ruler size={12} /> Tabela rozmiarów</button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {productData.sizes.map((size) => (
                      <button
                        key={size.label} onClick={() => { if (size.stock) setSelectedSize(size.label); }}
                        className={`py-4 rounded-xl font-black text-xs transition-all border ${selectedSize === size.label ? 'bg-black text-white border-black shadow-lg scale-[1.02]' : 'bg-black/5 border-transparent hover:border-black/20'} ${!size.stock ? 'opacity-20 cursor-not-allowed line-through' : ''}`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
               </div>

               <div className="flex gap-4 items-stretch">
                  <div className="flex items-center bg-white border border-black/10 rounded-full px-6 gap-6 shadow-lg">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="opacity-40 hover:opacity-100 transition-opacity"><Minus size={16}/></button>
                    <span className="text-sm font-black w-4 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="opacity-40 hover:opacity-100 transition-opacity"><Plus size={16}/></button>
                  </div>
                  <button className={`flex-1 py-6 rounded-full font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border-2 ${selectedSize ? 'border-black bg-black text-white shadow-2xl hover:scale-[1.02]' : 'border-black/20 bg-transparent text-black/20 cursor-not-allowed'}`}>
                    <ShoppingBag size={20} /> Dodaj do koszyka
                  </button>
               </div>

               <button className="w-full py-6 rounded-full font-black uppercase tracking-[0.2em] border border-black/10 flex items-center justify-center gap-3 hover:bg-white transition-all shadow-md"><Heart size={20} /> Dodaj do wishlisty</button>

               <div className="pt-6 border-t border-black/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-4 text-center">Bezpieczne płatności:</p>
                  <div className="flex justify-center gap-6 opacity-40 italic font-black text-[10px] tracking-widest"><span>BLIK</span><span>APPLE PAY</span><span>VISA</span><span>MASTERCARD</span></div>
               </div>

               <div className="space-y-12 pt-12">
                  <div><h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-black/48 italic">Opis produktu</h4><p className="text-xs font-bold leading-relaxed opacity-60 uppercase tracking-widest">{productData.description}</p></div>
                  <div><h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-black/48 italic">Materiał</h4><p className="text-xs font-bold opacity-60 uppercase italic tracking-widest">{productData.materials}</p></div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-black/48 italic">Pielęgnacja</h4>
                    <div className="flex gap-4">
                        <LaundryIcon
                            icon={WashIcon} label="PRANIE" detail="PRAĆ W MAX 30°C. NIE STOSOWAĆ WYBIELACZY."
                            active={activeTooltip === 'wash'} onToggle={() => handleToggleTooltip('wash')}
                        />
                        <LaundryIcon
                            icon={BleachIcon} label="WYBIELANIE" detail="NIE STOSOWAĆ WYBIELACZY I CHLORU."
                            active={activeTooltip === 'bleach'} onToggle={() => handleToggleTooltip('bleach')}
                        />
                        <LaundryIcon
                            icon={TumbleIcon} label="SUSZENIE" detail="NIE SUSZYĆ W SUSZARCE BĘBNOWEJ."
                            active={activeTooltip === 'dry'} onToggle={() => handleToggleTooltip('dry')}
                        />
                        <LaundryIcon
                            icon={IronIcon} label="PRASOWANIE" detail="PRASOWAĆ NA LEWEJ STRONIE (MAX 110°C)."
                            active={activeTooltip === 'iron'} onToggle={() => handleToggleTooltip('iron')}
                        />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSizeTableOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSizeTableOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl p-12 overflow-hidden"
            >
              <button onClick={() => setIsSizeTableOpen(false)} className="absolute top-8 right-8 text-black/20 hover:text-black transition-colors"><X size={32} /></button>
              <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-12">Tabela Rozmiarów</h2>
              <div className="overflow-x-auto">
                 <table className="w-full text-left font-black uppercase text-xs tracking-widest">
                    <thead className="border-b border-black/10"><tr><th className="py-4">Rozmiar</th><th className="py-4">Klatka</th><th className="py-4">Długość</th><th className="py-4">Rękaw</th></tr></thead>
                    <tbody className="divide-y divide-black/5">{sizeTable.map(s => (<tr key={s.size}><td className="py-4 font-black">{s.size}</td><td className="py-4 opacity-40">{s.chest}</td><td className="py-4 opacity-40">{s.length}</td><td className="py-4 opacity-40">{s.sleeve}</td></tr>))}</tbody>
                 </table>
              </div>
              <p className="mt-8 text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">*WYMIARY MIERZONE NA PŁASKO. TOLERANCJA +/- 2CM.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
