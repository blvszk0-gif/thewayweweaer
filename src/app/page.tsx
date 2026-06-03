'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChevronRight, Zap, Palette, ShoppingCart, Info } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl z-10"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
            The Way WE Wear
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
            Premium streetwear dla prawdziwych wyjadaczy gamingu i anime.
            Odkryj ukryte Lore w każdym projekcie.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="xl" className="px-12">WEJDŹ DO SKLEPU</Button>
            </Link>
            <Link href="/shop?cat=hoodie">
              <Button size="xl" variant="outline" className="px-12">ZOBACZ BLUZY</Button>
            </Link>
          </div>
        </motion.div>

        {/* Background Lore Elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-20 left-20 text-9xl font-black">SQUAD</div>
          <div className="absolute bottom-40 right-20 text-9xl font-black italic">CLAN</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black opacity-10">TWWW</div>
        </div>
      </section>

      {/* How it works (Haftlab inspired) */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-16 uppercase tracking-tighter">Jak to działa?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "1", title: "Wybierz wzór", desc: "Wybierz bazę z naszej stałej oferty lub prześlij własną grafikę.", icon: <Palette size={32} /> },
              { step: "2", title: "Personalizuj", desc: "Wybierz rozmiar (standard lub Custom Fit) oraz dodatki i haft.", icon: <Zap size={32} /> },
              { step: "3", title: "Gotowe!", desc: "Ciesz się unikalnym produktem premium z Twoim ulubionym Lore.", icon: <ShoppingCart size={32} /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center p-8 bg-[#383e42] rounded-3xl border border-white/10"
              >
                <div className="text-5xl font-black text-white/10 mb-4">{item.step}</div>
                <div className="p-4 bg-white text-[#383e42] rounded-2xl mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Drop */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <Card className="aspect-[4/5] relative overflow-hidden group">
              <img
                src="https://placehold.co/800x1000?text=Oversize+Hoodie+SQUAD"
                alt="Featured Drop"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </Card>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Polecany Drop</p>
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">OVERSIZE HOODIE "SQUAD" V1</h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Limitowana edycja bluzy z haftem 3D. Każdy detal nawiązuje do korzeni naszej społeczności.
              Wykonana z najwyższej jakości bawełny 480g.
            </p>
            <Link href="/shop/hoodie-001">
              <Button size="xl" className="group">
                SPRAWDŹ DETALE <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission (Haftlab inspired) */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <div className="inline-block p-2 px-4 bg-white/5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">Nasza Misja</div>
           <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter italic">Personalizacja na wyższym poziomie</h2>
           <p className="text-xl text-gray-400 leading-relaxed">
             The Way WE Wear to nie tylko odzież, to Twoja artystyczna dusza wyrażona przez Lore Twoich ulubionych gier i anime.
             Wspólnie tworzymy unikalne projekty, które uwieczniają Twoje pasje.
             Projektujemy i wykonujemy wszystko w Polsce, dbając o każdy najmniejszy Easter Egg.
           </p>
           <Link href="/o-mnie" className="inline-flex items-center gap-2 mt-12 text-white font-bold hover:underline">
             POZNAJ NAS LEPIEJ <Info size={18} />
           </Link>
        </div>
      </section>

      {/* Bestsellers Grid */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Bestsellery</h2>
            <Link href="/shop" className="text-sm font-bold border-b border-white hover:text-gray-400 transition-colors">ZOBACZ WSZYSTKIE</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { id: 'hoodie-001', name: 'Bluza "SQUAD" V1', price: '349 PLN', img: 'https://placehold.co/400x500?text=SQUAD+V1' },
              { id: '2', name: 'T-Shirt "WAIFU"', price: '149 PLN', img: 'https://placehold.co/400x500?text=WAIFU' },
              { id: '3', name: 'Joggers "SQUAD"', price: '249 PLN', img: 'https://placehold.co/400x500?text=JOGGERS' },
              { id: '4', name: 'Oversize "MANGAKA"', price: '199 PLN', img: 'https://placehold.co/400x500?text=MANGAKA' }
            ].map((product) => (
              <motion.div key={product.id} whileHover={{ y: -5 }}>
                <Card className="group cursor-pointer">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl relative bg-black/20">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale"
                    />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link href={`/shop/${product.id}`} className="bg-white text-[#383e42] px-6 py-2 rounded-full font-black">ZOBACZ</Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold uppercase text-sm mb-2">{product.name}</h3>
                    <p className="text-gray-400 font-bold">{product.price}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Newsletter */}
      <footer className="py-24 border-t border-white/10 bg-[#2d3236]">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase">The Way WE Wear</h3>
            <p className="text-gray-400 mb-8 max-w-sm">Zapisz się do squadu i otrzymuj informacje o limitowanych dropach i sekretnych kodach.</p>
            <div className="flex gap-2 max-w-md">
              <input
                type="email"
                placeholder="E-mail"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 focus:outline-none focus:border-white transition-all"
              />
              <Button>DOŁĄCZ</Button>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6 text-gray-500">Kategorie</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/shop" className="hover:text-gray-400">Bluzy</Link></li>
              <li><Link href="/shop" className="hover:text-gray-400">Koszulki</Link></li>
              <li><Link href="/shop" className="hover:text-gray-400">Akcesoria</Link></li>
              <li><Link href="/shop" className="hover:text-gray-400">Kolekcje</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6 text-gray-500">Pomoc</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/faq" className="hover:text-gray-400">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-gray-400">Kontakt</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-gray-400">Polityka prywatności</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-gray-400">Regulamin</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <p>© 2025 THE WAY WE WEAR. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">TikTok</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
