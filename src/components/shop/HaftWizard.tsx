'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Check, AlertCircle, Loader2, ArrowRight, User } from 'lucide-react';

interface HaftWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HaftWizard = ({ isOpen, onClose }: HaftWizardProps) => {
  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('twww-auth');
      setIsLoggedIn(!!saved);
    }
  }, [isOpen]);
  const [isAccepted, setIsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    garment: '',
    color: 'Czarny',
    file: null as File | null,
    email: 'user@example.com'
  });

  const resetWizard = () => {
    setStep(1);
    setIsAccepted(false);
    setFormData({
      garment: '',
      color: 'Czarny',
      file: null as File | null,
      email: 'user@example.com'
    });
    setFileError(null);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 font-antonio">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[color:var(--foreground)]/15 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-[color:var(--surface)] rounded-[40px] shadow-2xl overflow-hidden text-[color:var(--foreground)] p-12 border border-[color:var(--border)]"
        >
          <button onClick={onClose} className="absolute top-8 right-8 text-[color:var(--foreground)]/40 hover:text-[color:var(--foreground)] transition-colors z-20">
            <X size={32} />
          </button>

          {!isLoggedIn ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8 py-12">
              <div className="w-24 h-24 bg-[color:var(--foreground)]/10 rounded-full flex items-center justify-center mx-auto text-[color:var(--foreground)]">
                <User size={40} />
              </div>
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-4">Wymagane logowanie</h3>
                <p className="text-[18px] font-bold opacity-50 uppercase px-12 leading-relaxed">Ta opcja jest dostępna tylko dla członków Squadu. Zaloguj się, aby kontynuować projektowanie haftu.</p>
              </div>
              <div className="space-y-4 max-w-xs mx-auto">
                <button
                  onClick={() => {
                    localStorage.setItem('twww-auth', 'true');
                    setIsLoggedIn(true);
                  }}
                  className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-6 rounded-full font-black uppercase tracking-widest text-[18px] shadow-xl hover:scale-105 transition-transform"
                >
                  Logowanie / Rejestracja
                </button>
                <button onClick={onClose} className="w-full py-2 font-black uppercase tracking-widest text-[13px] opacity-40 hover:opacity-100 transition-opacity">Anuluj i wróć</button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="mb-12">
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-[color:var(--foreground)]' : 'bg-[color:var(--foreground)]/10'}`} />
                  ))}
                </div>
                <p className="text-[13px] font-black uppercase tracking-[0.3em] text-[color:var(--foreground)]/40 italic">Haft na zamówienie // Krok 0{step}</p>
              </div>

              <div className="min-h-[350px]">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-8 text-center">Wybierz bazę</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                      {[
                        { id: 'hoodie', name: 'Bluza Oversize', desc: '300g/m2' },
                        { id: 'tshirt', name: 'Koszulka Premium', desc: '200g/m2' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => { setFormData({...formData, garment: item.id}); nextStep(); }}
                          className={`flex-1 p-10 rounded-3xl border-2 transition-all text-center group min-w-[240px] ${formData.garment === item.id ? 'border-[color:var(--foreground)] bg-[color:var(--surface-muted)] shadow-xl' : 'border-[color:var(--border)] bg-[color:var(--surface-muted)] hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]'}`}
                        >
                          <h4 className="text-2xl font-black uppercase italic mb-2">{item.name}</h4>
                          <p className={`text-base font-bold uppercase transition-colors ${formData.garment === item.id ? 'opacity-40' : 'opacity-40 group-hover:text-[color:var(--surface)] group-hover:opacity-60'}`}>{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-8">Wybierz kolor</h3>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {[
                        { name: 'Czarny', extra: 0, color: '#000000' },
                        { name: 'Biały', extra: 0, color: '#FFFFFF' },
                        { name: 'Szary', extra: 0, color: '#808080' },
                        { name: 'Powder Pink', extra: 40, color: '#FFD1DC' },
                        { name: 'Baby Blue', extra: 40, color: '#89CFF0' },
                      ].map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setFormData({...formData, color: c.name})}
                          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.color === c.name ? 'border-[color:var(--foreground)] bg-[color:var(--surface)] shadow-xl scale-105' : 'border-transparent bg-[color:var(--foreground)]/10 opacity-60 hover:opacity-100'}`}
                        >
                          <div className="w-8 h-8 rounded-full border border-[color:var(--border)] shadow-inner" style={{ backgroundColor: c.color }} />
                          <span className="text-[17px] font-black uppercase tracking-tighter">{c.name}</span>
                          {c.extra > 0 && <span className="text-[15px] font-bold text-[color:var(--foreground)]/40">+ {c.extra} PLN</span>}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-4">
                       <button onClick={prevStep} className="flex-1 py-5 font-black uppercase tracking-widest text-base border border-[color:var(--border)] rounded-full hover:bg-[color:var(--surface-muted)] transition-all">Wróć</button>
                       <button onClick={nextStep} className="flex-[2] bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest text-[18px] shadow-xl hover:scale-[1.02] transition-transform">Kontynuuj</button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-8">Prześlij projekt</h3>
                    <div className={`bg-[color:var(--surface-muted)] border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center gap-6 relative transition-all ${fileError ? 'border-red-500 bg-red-50' : 'border-[color:var(--border)]'}`}>
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${fileError ? 'bg-red-100 text-red-500' : 'bg-[color:var(--foreground)]/10'}`}>
                        <Upload size={32} />
                      </div>
                      <div className="text-center">
                        <p className="font-black uppercase text-lg mb-2">Kliknij aby przesłać plik</p>
                        <p className="text-[17px] font-bold opacity-30 uppercase">PNG, SVG LUB TIFF (MAX 10MB)</p>
                      </div>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const ext = file.name.split('.').pop()?.toLowerCase();
                          if (['png', 'svg', 'tiff', 'tif'].includes(ext || '')) {
                            setFileError(null);
                            setFormData({...formData, file: file});
                            nextStep();
                          } else {
                            setFileError('Nie obsługiwany format');
                          }
                        }
                      }} />
                    </div>
                    {fileError && <p className="text-red-500 text-[13px] font-black uppercase tracking-widest mt-4 text-center">{fileError}</p>}
                    <div className="mt-8 flex justify-center">
                       <button onClick={prevStep} className="py-2 px-8 font-black uppercase tracking-widest text-[13px] opacity-40 hover:opacity-100 transition-opacity">Wróć</button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-8">Ważne informacje</h3>
                    <div className="space-y-6">
                      <div className="flex gap-4 p-6 bg-[color:var(--surface-muted)] rounded-2xl border border-[color:var(--border)]">
                        <AlertCircle className="shrink-0" />
                        <div>
                          <p className="text-xl font-black uppercase mb-1">Zwroty</p>
                          <p className="text-[17px] font-bold opacity-50 uppercase leading-relaxed text-justify">Artykuły z haftem na zamówienie są tworzone według Twojej indywidualnej specyfikacji. Zgodnie z art. 38 ust. 1 pkt 3 ustawy o prawach konsumenta, produkty personalizowane nie podlegają zwrotowi ani wymianie z tytułu rezygnacji. Prosimy o dokładne sprawdzenie przesłanego projektu oraz tabeli rozmiarów przed sfinalizowaniem zamówienia.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-6 bg-[color:var(--surface-muted)] rounded-2xl border border-[color:var(--border)]">
                        <Loader2 className="shrink-0 animate-spin" />
                        <div>
                          <p className="text-xl font-black uppercase mb-1">Czas realizacji</p>
                          <p className="text-[17px] font-bold opacity-50 uppercase leading-relaxed text-justify">Dopieszczamy każdy detal! Ze względu na indywidualny proces projektowy i programowania maszyn haftujących, czas realizacji zamówienia wynosi do 30 dni roboczych.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button onClick={prevStep} className="flex-1 py-5 font-black uppercase tracking-widest text-lg border border-[color:var(--border)] rounded-full hover:bg-[color:var(--surface-muted)] transition-all">Wróć</button>
                        <button
                          onClick={() => setIsAccepted(!isAccepted)}
                          className={`flex-[2] py-5 rounded-full font-black uppercase tracking-widest text-[15px] flex items-center justify-center gap-2 shadow-xl transition-all leading-tight px-6 ${isAccepted ? 'bg-green-500 text-white border-green-600' : 'bg-[color:var(--foreground)] text-[color:var(--surface)] hover:scale-[1.02]'}`}
                        >
                          Akceptuję regulamin sklepu oraz przyjmuję do wiadomości, że produkt jest personalizowany i nie podlega zwrotowi, a czas jego realizacji wynosi do 30 dni roboczych.
                        </button>
                      </div>
                      {isAccepted && (
                         <motion.button
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          onClick={nextStep}
                          className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest text-[18px] shadow-xl"
                         >
                            Potwierdź i przejdź dalej
                         </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="space-y-8">
                      <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-4">Potwierdź dane</h3>
                      <div className="bg-[color:var(--surface-muted)] p-8 rounded-3xl space-y-6 shadow-xl border border-[color:var(--border)]">
                        <div>
                          <p className="text-[17px] font-black uppercase text-[color:var(--foreground)]/30 mb-2">Twój e-mail kontaktowy:</p>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-[color:var(--surface)] px-6 py-4 rounded-xl border border-[color:var(--border)] font-black uppercase text-[22px] focus:outline-none focus:border-[color:var(--foreground)] transition-all text-[color:var(--foreground)]"
                          />
                        </div>
                        <div className="flex justify-between items-center text-[17px] font-black uppercase">
                           <span className="opacity-30">Wybrany kolor:</span>
                           <span>{formData.color}</span>
                        </div>
                        <p className="text-[17px] font-bold opacity-40 uppercase leading-relaxed">Na ten adres prześlemy informację o akceptacji projektu oraz wycenę końcową.</p>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={prevStep} className="flex-1 py-5 font-black uppercase tracking-widest text-base border border-[color:var(--border)] rounded-full hover:bg-[color:var(--surface-muted)] transition-all">Wróć</button>
                        <button onClick={nextStep} className="flex-[2] bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest text-[18px] shadow-xl hover:scale-[1.02] transition-transform">Potwierdzam, wyślij</button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8 py-12">
                    <div className="w-24 h-24 bg-[color:var(--foreground)] rounded-full flex items-center justify-center mx-auto text-[color:var(--surface)] shadow-2xl">
                      <Check size={48} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-4">Zlecenie wysłane!</h3>
                      <p className="text-xl font-bold opacity-50 uppercase px-12 leading-relaxed">
                        Dziękujemy! Twój projekt trafił do naszych designerów. Otrzymasz maila z informacją czy podejmiemy się realizacji Twojego haftu.
                      </p>
                    </div>
                    <div className="flex flex-col gap-4 max-w-xs mx-auto">
                      <button
                        onClick={() => resetWizard()}
                        className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest text-[18px] shadow-xl hover:scale-105 transition-transform"
                      >
                        Kolejne zamówienie
                      </button>
                      <button
                        onClick={onClose}
                        className="w-full py-2 font-black uppercase tracking-widest text-[13px] opacity-40 hover:opacity-100 transition-opacity"
                      >
                        Zamknij
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
