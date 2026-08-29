'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Check, Camera } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1] ?? '');
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setName('');
    setEmail('');
    setProduct('');
    setRating(5);
    setMessage('');
    setPhoto(null);
    setStatus('idle');
    setError(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 4 * 1024 * 1024) {
      setError('Zdjęcie jest za duże (max 4 MB).');
      return;
    }
    setError(null);
    setPhoto(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    try {
      const photoBase64 = photo ? await readAsBase64(photo) : undefined;
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          product,
          rating,
          message,
          photoBase64,
          photoName: photo?.name,
          photoType: photo?.type,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Coś poszło nie tak, spróbuj ponownie.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[color:var(--foreground)]/15 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-lg pointer-events-auto relative bg-[color:var(--surface)] text-[color:var(--foreground)] rounded-[40px] p-10 shadow-2xl border border-[color:var(--border)] max-h-[90vh] overflow-y-auto">
              <button
                onClick={handleClose}
                className="absolute top-8 right-8 text-[color:var(--foreground)]/40 hover:text-[color:var(--foreground)] transition-colors"
                aria-label="Zamknij"
              >
                <X size={24} />
              </button>

              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3">Dziękujemy!</h3>
                  <p className="opacity-60 font-bold uppercase tracking-widest text-sm">
                    Twoja opinia do nas dotarła — sprawdzimy ją wkrótce.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Dodaj swoją opinię</h3>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        aria-label={`Ocena ${n} na 5`}
                        className="text-yellow-500"
                      >
                        <Star size={28} fill={n <= rating ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>

                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Imię"
                    maxLength={100}
                    className="w-full border border-[color:var(--border)] rounded-2xl px-5 py-4 bg-transparent font-bold focus:outline-none focus:border-[color:var(--foreground)]"
                  />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Twój adres e-mail"
                    className="w-full border border-[color:var(--border)] rounded-2xl px-5 py-4 bg-transparent font-bold focus:outline-none focus:border-[color:var(--foreground)]"
                  />
                  <input
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="Nazwa produktu (opcjonalnie)"
                    maxLength={200}
                    className="w-full border border-[color:var(--border)] rounded-2xl px-5 py-4 bg-transparent font-bold focus:outline-none focus:border-[color:var(--foreground)]"
                  />
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Twoja opinia..."
                    rows={4}
                    maxLength={2000}
                    className="w-full border border-[color:var(--border)] rounded-2xl px-5 py-4 bg-transparent font-bold focus:outline-none focus:border-[color:var(--foreground)] resize-none"
                  />

                  <label className="flex items-center gap-3 border border-dashed border-[color:var(--border)] rounded-2xl px-5 py-4 cursor-pointer hover:bg-[color:var(--surface-muted)] transition-colors">
                    <Camera size={20} className="opacity-50 shrink-0" />
                    <span className="font-bold text-sm opacity-70 truncate">
                      {photo ? photo.name : 'Dodaj zdjęcie (opcjonalnie)'}
                    </span>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </label>

                  {error && (
                    <p role="alert" className="text-red-500 text-sm font-bold text-center">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest shadow-xl disabled:opacity-50"
                  >
                    {status === 'loading' ? '...' : 'Wyślij opinię'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
