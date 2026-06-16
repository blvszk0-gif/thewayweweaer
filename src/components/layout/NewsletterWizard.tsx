'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface NewsletterWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterWizard = ({ isOpen, onClose }: NewsletterWizardProps) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleNext = () => {
    if (step === 1 && email) setStep(2);
    else if (step === 2) {
       // Submit logic here
       setStep(3);
    }
  };

  const handleReset = () => {
    setStep(1);
    setEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-[#1a1a1a] text-white w-full max-w-xl rounded-[40px] overflow-hidden border border-white/10 shadow-2xl font-antonio"
          >
            <button
              onClick={handleReset}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-12">
               {step === 1 && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center mb-4">
                       <Mail size={32} />
                    </div>
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter">Dołącz do Squadu</h2>
                    <p className="text-lg font-bold opacity-40 uppercase tracking-widest leading-relaxed">Zostaw swój e-mail, aby otrzymywać powiadomienia o nowych dropach i ekskluzywne kody.</p>
                    <div className="space-y-4">
                       <input
                         type="email"
                         placeholder="TWÓJ@EMAIL.COM"
                         value={email}
                         onChange={(e) => setEmail(e.target.value.toUpperCase())}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-xl font-black uppercase focus:outline-none focus:border-white transition-colors"
                       />
                       <button
                        onClick={handleNext}
                        disabled={!email}
                        className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-widest text-xl flex items-center justify-center gap-4 disabled:opacity-20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                       >
                         Dalej <ArrowRight size={24} />
                       </button>
                    </div>
                 </motion.div>
               )}

               {step === 2 && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter">Zgody Marketingowe</h2>
                    <div className="space-y-6">
                       <div className="flex gap-4 items-start bg-white/5 p-6 rounded-2xl border border-white/10">
                          <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/10 bg-transparent" defaultChecked />
                          <p className="text-sm font-bold uppercase tracking-widest opacity-60 leading-relaxed">
                             Zgadzam się na przetwarzanie moich danych osobowych w celu przesyłania newslettera.
                          </p>
                       </div>
                       <button
                        onClick={handleNext}
                        className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-widest text-xl shadow-xl"
                       >
                         Zapisz się!
                       </button>
                    </div>
                 </motion.div>
               )}

               {step === 3 && (
                 <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8 py-12">
                    <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                       <CheckCircle2 size={48} />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4 leading-tight">Dziękuję za zapisanie się, od teraz będziesz otrzymywał od nas wiadomości na temat marki</h2>
                       <p className="text-lg font-bold opacity-40 uppercase tracking-widest mt-6">Wypisać się możesz zawsze z poziomu konta</p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="w-full bg-white/10 border border-white/10 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xl hover:bg-white/20 transition-all"
                    >
                      Zamknij
                    </button>
                 </motion.div>
               )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
