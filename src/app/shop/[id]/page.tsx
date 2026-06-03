'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { OrderButton } from '@/components/ui/OrderButton';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Upload, ChevronRight, X } from 'lucide-react';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Zalando-style table
const sizeTable = [
  { size: 'XS', height: '160-165', chest: '80-84', waist: '66-70' },
  { size: 'S', height: '165-172', chest: '88-92', waist: '76-80' },
  { size: 'M', height: '170-178', chest: '96-100', waist: '84-88' },
  { size: 'L', height: '175-184', chest: '104-108', waist: '92-96' },
  { size: 'XL', height: '180-190', chest: '112-116', waist: '100-104' },
  { size: 'XXL', height: '185-195', chest: '120-124', waist: '108-112' },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [customDimensions, setCustomDimensions] = useState({ height: '', chest: '' });
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [graphic, setGraphic] = useState<File | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);

  // Specific Hoodie SKU
  const product = {
    id: id || 'hoodie-001',
    name: 'Oversize Hoodie "SQUAD" V1',
    price: '349 PLN',
    description: 'Najwyższej jakości bawełna 480g, haftowany napis 3D. Krój boxy, obniżone ramiona. Idealna dla graczy i fanów anime.',
    image: 'https://placehold.co/600x800?text=Oversize+Hoodie'
  };

  return (
    <div className="container mx-auto px-6 py-24 flex flex-col lg:flex-row gap-12">
      <div className="flex-1">
        <Card className="p-0 overflow-hidden bg-[#2d3236] aspect-[3/4]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </Card>
      </div>

      <div className="flex-1 space-y-8">
        <header>
          <div className="flex items-center text-xs text-gray-400 mb-4 space-x-2">
            <span>SKLEP</span>
            <ChevronRight size={12} />
            <span>BLUZY</span>
          </div>
          <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">{product.name}</h1>
          <p className="text-2xl font-black text-white/60">{product.price}</p>
        </header>

        <p className="text-gray-300 leading-relaxed">
          {product.description}
        </p>

        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Wybierz rozmiar</h3>
            <button
              onClick={() => setShowSizeChart(true)}
              className="text-xs font-bold border-b border-white hover:text-white/60 hover:border-white/60 transition-colors"
            >
              TABELA ROZMIARÓW
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => { setSelectedSize(size); setUseCustomSize(false); }}
                className={`py-3 border-2 rounded-xl font-bold transition-all ${
                  selectedSize === size && !useCustomSize
                    ? 'border-white bg-white/10 text-white'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <button
              onClick={() => setUseCustomSize(!useCustomSize)}
              className="text-sm text-white/60 font-bold hover:underline"
            >
              Wpisz własne wymiary (Custom Fit)
            </button>

            {useCustomSize && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4 mt-4">
                <Input
                  placeholder="Wzrost (cm)"
                  value={customDimensions.height}
                  onChange={(e) => setCustomDimensions({ ...customDimensions, height: e.target.value })}
                />
                <Input
                  placeholder="Klatka (cm)"
                  value={customDimensions.chest}
                  onChange={(e) => setCustomDimensions({ ...customDimensions, chest: e.target.value })}
                />
              </motion.div>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Własna grafika (Opcjonalnie)</h3>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-white/60 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-gray-400" />
              <p className="text-sm text-gray-400">{graphic ? graphic.name : 'Kliknij, aby przesłać plik'}</p>
            </div>
            <input type="file" className="hidden" onChange={(e) => setGraphic(e.target.files?.[0] || null)} />
          </label>
        </section>

        <OrderButton className="w-full">DODAJ DO KOSZYKA</OrderButton>

        <div className="pt-8 border-t border-white/10">
          <ul className="text-xs text-gray-400 space-y-2">
            <li>• Darmowa dostawa od 400 PLN</li>
            <li>• 30 dni na darmowy zwrot</li>
            <li>• Gadżet 3D w każdej paczce</li>
          </ul>
        </div>
      </div>

      {/* Size Chart Modal */}
      <AnimatePresence>
        {showSizeChart && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeChart(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
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
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 font-black">ROZMIAR</th>
                      <th className="py-4 font-black">WZROST (cm)</th>
                      <th className="py-4 font-black">KLATKA (cm)</th>
                      <th className="py-4 font-black">TALIA (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {sizeTable.map((row) => (
                      <tr key={row.size} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 font-black text-white">{row.size}</td>
                        <td className="py-4">{row.height}</td>
                        <td className="py-4">{row.chest}</td>
                        <td className="py-4">{row.waist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-8 text-xs text-gray-500 italic">
                * Wymiary podane w centymetrach. Jeśli wahasz się między dwoma rozmiarami, wybierz większy dla efektu oversize.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
