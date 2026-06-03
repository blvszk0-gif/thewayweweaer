'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Gamepad2, Sparkles, CheckCircle2 } from 'lucide-react';
import pb from '@/lib/pocketbase';

export default function Home() {
  const { fraction, setFraction } = useTheme();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pb.collection('zapisy').create({
        email,
        fraction,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Coś poszło nie tak. Spróbuj ponownie później.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--primary,theme(colors.purple.500))] opacity-10 blur-[120px] rounded-full pointer-events-none transition-colors duration-500" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10 mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          The Way <span className="text-[var(--primary,theme(colors.purple.500))] transition-colors duration-500">WE</span> Wear
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto">
          Ekskluzywny drop dla wybranych. Wybierz swoją frakcję i dołącz do klanu.
        </p>
      </motion.div>

      {!fraction ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10">
          <motion.div
            whileHover={{ y: -10 }}
            onClick={() => setFraction('player')}
            className="group cursor-pointer"
          >
            <Card className="h-full border-2 border-transparent group-hover:border-purple-500 transition-all flex flex-col items-center text-center py-12">
              <Gamepad2 size={64} className="mb-6 text-purple-400 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-bold mb-2">GRACZ</h2>
              <p className="text-gray-500">Dla tych, którzy żyją w LORE gier.</p>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            onClick={() => setFraction('anime')}
            className="group cursor-pointer"
          >
            <Card className="h-full border-2 border-transparent group-hover:border-pink-500 transition-all flex flex-col items-center text-center py-12">
              <Sparkles size={64} className="mb-6 text-pink-400 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-bold mb-2">FAN ANIME</h2>
              <p className="text-gray-500">Dla prawdziwych otaku i kolekcjonerów.</p>
            </Card>
          </motion.div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md z-10"
            >
              <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold">Zapisz się na drop</h3>
                    <p className="text-gray-400 text-sm">Zostaniesz powiadomiony, gdy kolekcja {fraction === 'player' ? 'Gamera' : 'Anime'} wystartuje.</p>
                  </div>
                  <Input
                    type="email"
                    placeholder="Wpisz swój e-mail..."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Zapisywanie...' : 'DOŁĄCZ DO SQUADU'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setFraction(null)}
                    className="w-full text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Zmień frakcję
                  </button>
                </form>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center z-10"
            >
              <CheckCircle2 size={80} className="mx-auto mb-6 text-green-500" />
              <h2 className="text-4xl font-bold mb-2">JESTEŚ W GRZE!</h2>
              <p className="text-gray-400">Sprawdź maila wkrótce. Twój kot już pakuje paczki (metaforycznie).</p>
              <Button
                variant="secondary"
                className="mt-8"
                onClick={() => setSubmitted(false)}
              >
                Wróć
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Footer link to Legal */}
      <footer className="absolute bottom-6 text-xs text-gray-600 space-x-4">
        <a href="/privacy-policy" className="hover:text-gray-400">Polityka prywatności</a>
        <a href="/terms-of-service" className="hover:text-gray-400">Regulamin</a>
      </footer>
    </main>
  );
}
