'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Upload, ChevronRight } from 'lucide-react';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { fraction } = useTheme();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [customDimensions, setCustomDimensions] = useState({ height: '', chest: '' });
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [graphic, setGraphic] = useState<File | null>(null);

  // Mock product detail
  const product = {
    id,
    name: id === '1' ? 'Hoodie "LORE" V1' : 'T-Shirt "WAIFU" Limited',
    price: id === '1' ? '299 PLN' : '149 PLN',
    description: 'Najwyższej jakości bawełna, haftowany napis 3D. Easter egg ukryty w metce.',
    image: 'https://via.placeholder.com/600x800?text=Product+Image'
  };

  return (
    <div className="container mx-auto px-6 py-24 flex flex-col lg:flex-row gap-12">
      <div className="flex-1">
        <Card className="p-0 overflow-hidden bg-gray-800 aspect-[3/4]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </Card>
      </div>

      <div className="flex-1 space-y-8">
        <header>
          <div className="flex items-center text-xs text-gray-500 mb-4 space-x-2">
            <span>SKLEP</span>
            <ChevronRight size={12} />
            <span>{fraction === 'player' ? 'GRACZ' : 'ANIME'}</span>
          </div>
          <h1 className="text-4xl font-black mb-2">{product.name}</h1>
          <p className="text-2xl font-mono text-[var(--primary,theme(colors.purple.500))] font-bold">{product.price}</p>
        </header>

        <p className="text-gray-400 leading-relaxed">
          {product.description}
        </p>

        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Wybierz rozmiar</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => { setSelectedSize(size); setUseCustomSize(false); }}
                className={`py-3 border-2 rounded-xl font-bold transition-all ${
                  selectedSize === size && !useCustomSize
                    ? 'border-[var(--primary,theme(colors.purple.500))] bg-[var(--primary,theme(colors.purple.500))]/10 text-white'
                    : 'border-gray-800 hover:border-gray-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <button
              onClick={() => setUseCustomSize(!useCustomSize)}
              className="text-sm text-[var(--primary,theme(colors.purple.500))] font-bold hover:underline"
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
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Własna grafika (Opcjonalnie)</h3>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-800 rounded-2xl cursor-pointer hover:border-[var(--primary,theme(colors.purple.500))] transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-gray-500" />
              <p className="text-sm text-gray-500">{graphic ? graphic.name : 'Kliknij, aby przesłać plik'}</p>
            </div>
            <input type="file" className="hidden" onChange={(e) => setGraphic(e.target.files?.[0] || null)} />
          </label>
        </section>

        <Button className="w-full py-6 text-xl">DODAJ DO KOSZYKA</Button>

        <div className="pt-8 border-t border-gray-800">
          <ul className="text-xs text-gray-500 space-y-2">
            <li>• Darmowa dostawa od 400 PLN</li>
            <li>• 30 dni na darmowy zwrot</li>
            <li>• Gadżet 3D w każdej paczce</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
