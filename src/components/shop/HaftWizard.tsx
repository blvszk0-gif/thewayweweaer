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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock
  const [fileError, setFileError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    garment: '',
    color: 'Czarny',
    file: null as File | null,
    email: 'user@example.com'
  });

  const resetWizard = () => {
    setStep(1);
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
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-[#dcdcdc] rounded-[40px] shadow-2xl overflow-hidden text-black p-12 border border-white/20"
        >
          <button onClick={onClose} className="absolute top-8 right-8 text-black/40 hover:text-black transition-colors z-20">
            <X size={32} />
          </button>

          {!isLoggedIn ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8 py-12">
              <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mx-auto">
                <User size={40} />
              </div>
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-4">Wymagane logowanie</h3>
                <p className="text-sm font-bold opacity-50 uppercase px-12 leading-relaxed">Ta opcja jest dostępna tylko dla członków Squadu. Zaloguj się, aby kontynuować projektowanie haftu.</p>
              </div>
              <div className="space-y-4 max-w-xs mx-auto">
                <button onClick={() => setIsLoggedIn(true)} className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform">Logowanie / Rejestracja</button>
                <button onClick={onClose} className="w-full py-2 font-black uppercase tracking-widest text-[10px] opacity-40 hover:opacity-100 transition-opacity">Anuluj i wróć</button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="mb-12">
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-black' : 'bg-black/10'}`} />
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 italic">Haft na zamówienie // Krok 0{step}</p>
              </div>

              <div className="min-h-[350px]">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-8">Wybierz bazę</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'hoodie', name: 'Bluza Oversize', desc: '300g/m2' },
                        { id: 'tshirt', name: 'Koszulka Premium', desc: '200g/m2' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => { setFormData({...formData, garment: item.id}); nextStep(); }}
                          className={`p-8 rounded-3xl border-2 transition-all text-left group ${formData.garment === item.id ? 'border-black bg-white shadow-xl' : 'border-transparent bg-white hover:border-black/20'}`}
                        >
                          <h4 className="text-xl font-black uppercase italic mb-2">{item.name}</h4>
                          <p className="text-[10px] font-bold opacity-40 uppercase">{item.desc}</p>
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
                          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.color === c.name ? 'border-black bg-white shadow-xl scale-105' : 'border-transparent bg-black/5 opacity-60 hover:opacity-100'}`}
                        >
                          <div className="w-8 h-8 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: c.color }} />
                          <span className="text-[10px] font-black uppercase tracking-tighter">{c.name}</span>
                          {c.extra > 0 && <span className="text-[8px] font-bold text-black/40">+ {c.extra} PLN</span>}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-4">
                       <button onClick={prevStep} className="flex-1 py-5 font-black uppercase tracking-widest text-xs border border-black/10 rounded-full hover:bg-white transition-all">Wróć</button>
                       <button onClick={nextStep} className="flex-[2] bg-black text-white py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:scale-[1.02] transition-transform">Kontynuuj</button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-8">Prześlij projekt</h3>
                    <div className={`bg-white border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center gap-6 relative transition-all ${fileError ? 'border-red-500 bg-red-50' : 'border-black/10'}`}>
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${fileError ? 'bg-red-100 text-red-500' : 'bg-black/5'}`}>
                        <Upload size={32} />
                      </div>
                      <div className="text-center">
                        <p className="font-black uppercase text-xs mb-2">Kliknij aby przesłać plik</p>
                        <p className="text-[10px] font-bold opacity-30 uppercase">PNG, SVG LUB TIFF (MAX 10MB)</p>
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
                    {fileError && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-4 text-center">{fileError}</p>}
                    <div className="mt-8 flex justify-center">
                       <button onClick={prevStep} className="py-2 px-8 font-black uppercase tracking-widest text-[10px] opacity-40 hover:opacity-100 transition-opacity">Wróć</button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-8">Ważne informacje</h3>
                    <div className="space-y-6">
                      <div className="flex gap-4 p-6 bg-white rounded-2xl">
                        <AlertCircle className="shrink-0" />
                        <div>
                          <p className="text-xs font-black uppercase mb-1">Brak zwrotów</p>
                          <p className="text-[10px] font-bold opacity-50 uppercase leading-relaxed">Artykuły z haftem na zamówienie są personalizowane i nie podlegają zwrotowi.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-6 bg-white rounded-2xl">
                        <Loader2 className="shrink-0 animate-spin" />
                        <div>
                          <p className="text-xs font-black uppercase mb-1">Czas realizacji</p>
                          <p className="text-[10px] font-bold opacity-50 uppercase leading-relaxed">Ze względu na proces projektowy, czas realizacji wynosi do 30 dni roboczych.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button onClick={prevStep} className="flex-1 py-5 font-black uppercase tracking-widest text-xs border border-black/10 rounded-full hover:bg-white transition-all">Wróć</button>
                        <button
                          onClick={nextStep}
                          className="flex-[2] bg-black text-white py-5 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-transform"
                        >
                          Rozumiem, kontynuuj <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="space-y-8">
                      <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-4">Potwierdź dane</h3>
                      <div className="bg-white p-8 rounded-3xl space-y-6 shadow-xl">
                        <div>
                          <p className="text-[10px] font-black uppercase text-black/30 mb-2">Twój e-mail kontaktowy:</p>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-black/5 px-6 py-4 rounded-xl border border-black/10 font-black uppercase text-sm focus:outline-none focus:border-black transition-all"
                          />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase">
                           <span className="opacity-30">Wybrany kolor:</span>
                           <span>{formData.color}</span>
                        </div>
                        <p className="text-[10px] font-bold opacity-40 uppercase leading-relaxed">Na ten adres prześlemy informację o akceptacji projektu oraz wycenę końcową.</p>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={prevStep} className="flex-1 py-5 font-black uppercase tracking-widest text-xs border border-black/10 rounded-full hover:bg-white transition-all">Wróć</button>
                        <button onClick={nextStep} className="flex-[2] bg-black text-white py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:scale-[1.02] transition-transform">Potwierdzam, wyślij</button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8 py-12">
                    <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto text-white shadow-2xl">
                      <Check size={48} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-4">Zlecenie wysłane!</h3>
                      <p className="text-xs font-bold opacity-50 uppercase px-12 leading-relaxed">
                        Dziękujemy! Twój projekt trafił do naszych designerów. Otrzymasz maila z informacją czy podejmiemy się realizacji Twojego haftu.
                      </p>
                    </div>
                    <div className="flex flex-col gap-4 max-w-xs mx-auto">
                      <button
                        onClick={() => resetWizard()}
                        className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform"
                      >
                        Kolejne zamówienie
                      </button>
                      <button
                        onClick={onClose}
                        className="w-full py-2 font-black uppercase tracking-widest text-[10px] opacity-40 hover:opacity-100 transition-opacity"
                      >
                        Zamknij wizard
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
