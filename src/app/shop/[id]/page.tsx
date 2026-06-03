'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Share2, Ruler, ChevronLeft, Upload, X, ShieldCheck, MapPin, Scissors, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { OrderButton } from '@/components/ui/OrderButton';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const product = {
  id: 'hoodie-001',
  name: 'Oversize Hoodie "SQUAD" V1',
  price: '349 PLN',
  description: 'Najwyższej jakości bawełna 480g, haftowany napis 3D. Krój boxy, obniżone ramiona. Idealna dla graczy i fanów anime.',
  images: [
    'https://placehold.co/600x800?text=SQUAD+V1+Front',
    'https://placehold.co/600x800?text=SQUAD+V1+Back'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Black', hex: '#000000' },
    { name: 'Slate', hex: '#383e42' },
    { name: 'White', hex: '#ffffff' }
  ]
};

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [graphic, setGraphic] = useState<File | null>(null);
  const [embroideryLocation, setEmbroideryLocation] = useState('Front');

  return (
    <div className="container mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[4/5] bg-black/20 rounded-3xl overflow-hidden relative group">
             <img
               src={product.images[0]}
               alt={product.name}
               className="w-full h-full object-cover grayscale"
             />
             <div className="absolute top-6 left-6 bg-white text-[#383e42] px-4 py-1 rounded-full text-xs font-black tracking-widest">NEW DROP</div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="aspect-[4/5] bg-black/20 rounded-3xl overflow-hidden">
              <img src={product.images[1]} alt="Back" className="w-full h-full object-cover grayscale opacity-50 hover:opacity-100 transition-opacity" />
            </div>
            <div className="aspect-[4/5] bg-white/5 rounded-3xl border border-dashed border-white/20 flex items-center justify-center p-8 text-center">
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Zbliżenie na haft 3D</p>
            </div>
          </div>
        </div>

        {/* Right: Info & Customization */}
        <div className="lg:col-span-5 space-y-12">
          <header>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-4 tracking-widest">
              <span>SKLEP</span>
              <ChevronLeft size={12} className="rotate-180" />
              <span>BLUZY</span>
            </div>
            <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">{product.name}</h1>
            <p className="text-2xl font-black text-white/60">{product.price}</p>
          </header>

          <p className="text-gray-300 leading-relaxed">
            {product.description}
          </p>

          {/* Personalization Sections */}
          <div className="space-y-8 border-y border-white/10 py-8">
            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Kolor: {selectedColor.name}</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor.name === color.name ? 'border-white scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Wybierz rozmiar</h3>
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-xs font-bold border-b border-white hover:text-white/60 hover:border-white/60 transition-colors"
                >
                  TABELA ROZMIARÓW
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setUseCustomSize(false); }}
                    className={`py-3 border-2 rounded-xl font-bold transition-all ${
                      selectedSize === size && !useCustomSize
                        ? 'border-white bg-white/10 text-white'
                        : 'border-white/10 hover:border-white/30 text-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setUseCustomSize(!useCustomSize)}
                className={`flex items-center gap-2 text-sm font-bold transition-colors ${useCustomSize ? 'text-white' : 'text-white/40 hover:text-white'}`}
              >
                <Scissors size={14} /> Wpisz własne wymiary (Custom Fit)
              </button>

              <AnimatePresence>
                {useCustomSize && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="grid grid-cols-2 gap-4 overflow-hidden pt-2"
                  >
                    <Input label="Wzrost (cm)" placeholder="180" type="number" />
                    <Input label="Waga (kg)" placeholder="75" type="number" />
                    <Input label="Szerokość klatki (cm)" placeholder="55" type="number" />
                    <Input label="Długość całkowita (cm)" placeholder="72" type="number" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Embroidery Location (Haftlab inspired) */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={14} /> Umiejscowienie haftu
              </h3>
              <div className="flex gap-2">
                {['Front', 'Back', 'Sleeve'].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setEmbroideryLocation(loc)}
                    className={`flex-1 py-2 border-2 rounded-lg text-xs font-bold transition-all ${
                      embroideryLocation === loc
                        ? 'border-white bg-white text-[#383e42]'
                        : 'border-white/10 text-gray-500 hover:border-white/30'
                    }`}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Graphic */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Upload size={14} /> Własna grafika / Zdjęcie
              </h3>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-white/60 transition-all bg-white/5">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="text-xs text-gray-400 font-medium">{graphic ? graphic.name : 'Prześlij projekt (AI, PNG, JPG)'}</p>
                </div>
                <input type="file" className="hidden" onChange={(e) => setGraphic(e.target.files?.[0] || null)} />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <OrderButton className="w-full flex items-center gap-4">
              <ShoppingCart size={20} /> DODAJ DO KOSZYKA
            </OrderButton>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Heart size={18} /> DO ULUBIONYCH
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 size={18} /> UDOSTĘPNIJ
              </Button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="flex justify-between items-center px-4 py-6 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck size={20} className="text-gray-400" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Najwyższa jakość</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Zap size={20} className="text-gray-400" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Szybka produkcja</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <MapPin size={20} className="text-gray-400" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Made in Poland</span>
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      <AnimatePresence>
        {showSizeChart && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeChart(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#383e42] border border-white/10 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
            >
              <button onClick={() => setShowSizeChart(false)} className="absolute top-6 right-6 hover:text-white/60 transition-colors">
                <X size={24} />
              </button>
              <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Tabela Rozmiarów</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Rozmiar</th>
                      <th className="py-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Szerokość</th>
                      <th className="py-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Długość</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s, i) => (
                      <tr key={s} className="border-b border-white/5">
                        <td className="py-4 font-black">{s}</td>
                        <td className="py-4 text-gray-400">{50 + i * 2} cm</td>
                        <td className="py-4 text-gray-400">{65 + i * 3} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-8 text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose">
                * Wymiary mogą się różnić o +/- 2cm. <br />
                * Jeśli potrzebujesz innych wymiarów, skorzystaj z opcji Custom Fit.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
