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
  Plus,
  Ruler
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
    { name: 'Baby Blue', hex: '#89CFF0', stock: true },
    { name: 'Powder Pink', hex: '#F2D2BD', stock: true },
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
  const [isSizeTableOpen, setIsSizeTableOpen] = useState(false);
  const [viewers, setViewers] = useState(0);

  React.useEffect(() => {
    setViewers(Math.floor(Math.random() * 50) + 12);
  }, []);

  return (
    <main className="min-h-screen bg-[#dcdcdc] font-abel text-black pb-20 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat" />
      <Header />

      <div className="container mx-auto px-6 pt-32 relative z-10">
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
                  <button onClick={() => setCurrentImg((prev) => (prev - 1 + productData.images.length) % productData.images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 p-2 rounded-full transition-all"><ChevronLeft size={24} /></button>
                  <button onClick={() => setCurrentImg((prev) => (prev + 1) % productData.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 p-2 rounded-full transition-all"><ChevronRight size={24} /></button>
               </div>

               <div className="flex gap-4 mt-6 overflow-x-auto no-scrollbar">
                  {productData.images.map((img, i) => (
                    <button key={i} onClick={() => setCurrentImg(i)} className={`w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${currentImg === i ? 'border-black' : 'border-transparent opacity-50'}`}><img src={img} alt="" className="w-full h-full object-cover" /></button>
                  ))}
               </div>
            </div>
          </div>

          <div className="lg:flex-1 flex flex-col">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">{productData.name}</h1>
            <p className="text-2xl font-black mb-8">{productData.price} {productData.currency}</p>

            <div className="space-y-12">
               <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-black/48">Kolor: {selectedColor.name}</h3>
                  <div className="flex gap-3">
                    {productData.colors.map((color) => (
                      <button
                        key={color.name} onClick={() => { if (color.stock) setSelectedColor(color); }}
                        className={`w-10 h-10 rounded-full border-2 transition-all relative ${selectedColor.name === color.name ? 'border-black scale-110' : 'border-transparent'} ${!color.stock ? 'opacity-20 cursor-not-allowed grayscale' : ''}`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {!color.stock && <div className="absolute inset-0 flex items-center justify-center text-black"><X size={20} /></div>}
                      </button>
                    ))}
                  </div>
               </div>

               <div>
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/48">Rozmiar</h3>
                    <button onClick={() => setIsSizeTableOpen(true)} className="text-[10px] font-black uppercase tracking-widest underline underline-offset-4 flex items-center gap-2"><Ruler size={12} /> Tabela rozmiarów</button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {productData.sizes.map((size) => (
                      <button
                        key={size.label} onClick={() => { if (size.stock) setSelectedSize(size.label); }}
                        className={`py-4 rounded-xl font-black text-xs transition-all border ${selectedSize === size.label ? 'bg-black text-white border-black shadow-lg' : 'bg-black/5 border-transparent hover:border-black/20'} ${!size.stock ? 'opacity-20 cursor-not-allowed line-through' : ''}`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
               </div>

               <div className="space-y-4">
                  <button className={`w-full py-6 rounded-full font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border-2 ${selectedSize ? 'border-black bg-black text-white shadow-2xl hover:scale-[1.02]' : 'border-black/20 bg-transparent text-black/20 cursor-not-allowed'}`}>
                    <ShoppingBag size={20} /> Dodaj do koszyka
                  </button>
                  <button className="w-full py-6 rounded-full font-black uppercase tracking-[0.2em] border border-black/10 flex items-center justify-center gap-3 hover:bg-white transition-all"><Heart size={20} /> Dodaj do wishlisty</button>
               </div>

               <div className="pt-6 border-t border-black/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-4 text-center">Bezpieczne płatności:</p>
                  <div className="flex justify-center gap-6 opacity-40 italic font-black text-xs"><span>BLIK</span><span>APPLE PAY</span><span>VISA</span><span>MASTERCARD</span></div>
               </div>

               <div className="space-y-8 pt-12">
                  <div><h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-black/48">Opis produktu</h4><p className="text-sm font-bold leading-relaxed opacity-60 uppercase">{productData.description}</p></div>
                  <div><h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-black/48">Materiał</h4><p className="text-sm font-bold opacity-60 uppercase italic">{productData.materials}</p></div>
                  <div><h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-black/48">Pielęgnacja</h4><div className="flex gap-4"><LaundryIcon icon={Droplets} label="PRANIE" detail="PRAĆ W MAX 30°C. NIE STOSOWAĆ WYBIELACZY." /><LaundryIcon icon={Sun} label="SUSZENIE" detail="NIE SUSZYĆ W SUSZARCE BĘBNOWEJ." /><LaundryIcon icon={Wind} label="PRASOWANIE" detail="PRASOWAĆ NA LEWEJ STRONIE." /><LaundryIcon icon={Info} label="DODATKOWE" detail="PRAĆ Z PODOBNYMI KOLORAMI." /></div></div>
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

      <BackToTop />
      <Footer />
    </main>
  );
}
