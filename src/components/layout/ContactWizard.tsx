'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Send, CheckCircle2, MessageSquare, AlertCircle, HelpCircle } from 'lucide-react';

interface ContactWizardProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export const ContactWizard = ({ isOpen, onClose, userEmail = "TWOJA@POCZTA.COM" }: ContactWizardProps) => {
  const [step, setStep] = useState(1);
  const [mainType, setMainType] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const reset = () => {
    setStep(1);
    setMainType(null);
    setReason(null);
    setMessage('');
    setIsSuccess(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleSend = () => {
    setIsSuccess(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[color:var(--foreground)]/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-[color:var(--surface)] rounded-[40px] shadow-2xl p-8 md:p-16 overflow-hidden border border-[color:var(--border)] font-antonio text-[color:var(--foreground)]"
          >
            <button onClick={handleClose} className="absolute top-8 right-8 text-[color:var(--foreground)]/20 hover:text-[color:var(--foreground)] transition-colors">
              <X size={32} />
            </button>

            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-4">Zgłoszenie wysłane!</h2>
                <p className="text-[18px] font-bold opacity-50 uppercase tracking-widest leading-relaxed">Dziękujemy za kontakt. Odpowiemy w ciągu 14 dni roboczych.</p>
                <button onClick={handleClose} className="mt-12 bg-[color:var(--foreground)] text-[color:var(--surface)] px-12 py-5 rounded-full font-black uppercase tracking-widest text-lg shadow-xl">Zamknij</button>
              </div>
            ) : (
              <>
                <div className="mb-12">
                   <p className="text-[13px] font-black uppercase tracking-[0.4em] opacity-30 mb-2 italic">Project: TWWW // Subject: Kontakt</p>
                   <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">Jak możemy pomóc?</h2>
                </div>

                <div className="space-y-8">
                  {step === 1 && (
                    <div className="grid grid-cols-1 gap-4">
                      <button
                        onClick={() => { setMainType('Problem z zamówieniem'); setStep(2); }}
                        className="flex items-center justify-between p-8 rounded-3xl border border-[color:var(--border)] hover:bg-[color:var(--surface-muted)] transition-all group"
                      >
                         <div className="flex items-center gap-6">
                            <AlertCircle size={32} className="opacity-30 group-hover:opacity-100" />
                            <span className="text-2xl font-black uppercase tracking-tighter">Problem z zamówieniem</span>
                         </div>
                         <ChevronRight size={24} className="opacity-20 group-hover:translate-x-2 transition-all" />
                      </button>
                      <button
                        onClick={() => { setMainType('Zapytanie o ofertę'); setStep(3); }}
                        className="flex items-center justify-between p-8 rounded-3xl border border-[color:var(--border)] hover:bg-[color:var(--surface-muted)] transition-all group"
                      >
                         <div className="flex items-center gap-6">
                            <HelpCircle size={32} className="opacity-30 group-hover:opacity-100" />
                            <span className="text-2xl font-black uppercase tracking-tighter">Zapytanie o ofertę</span>
                         </div>
                         <ChevronRight size={24} className="opacity-20 group-hover:translate-x-2 transition-all" />
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                       <p className="text-[17px] font-black uppercase opacity-40 ml-4">Wybierz powód zgłoszenia:</p>
                       <div className="grid grid-cols-1 gap-3">
                          {['Problem z dostawą', 'Problem z rozmiarem', 'Problem z kolorem'].map((r) => (
                            <button
                              key={r} onClick={() => { setReason(r); setStep(3); }}
                              className="w-full text-left p-6 rounded-2xl bg-[color:var(--surface-muted)] border border-transparent hover:border-[color:var(--foreground)] font-black uppercase tracking-widest text-lg transition-all"
                            >
                              {r}
                            </button>
                          ))}
                       </div>
                       <button onClick={() => setStep(1)} className="text-[13px] font-black uppercase tracking-widest opacity-30 hover:opacity-100">← Wróć do wyboru typu</button>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                       <p className="text-[17px] font-black uppercase opacity-40 ml-4">Twoja wiadomość:</p>
                       <textarea
                          maxLength={5000}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Opisz swój problem lub zapytanie..."
                          className="w-full h-48 bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-[30px] p-8 text-lg font-bold uppercase tracking-widest focus:outline-none focus:border-[color:var(--foreground)] resize-none"
                       />
                       <div className="flex justify-between items-center px-4">
                          <span className="text-[13px] font-black uppercase tracking-widest opacity-30">{message.length} / 5000</span>
                          <span className="text-[13px] font-black uppercase tracking-widest opacity-20 italic">Wysyłanie plików tymczasowo wyłączone</span>
                       </div>

                       <div className="pt-6 border-t border-[color:var(--border)]">
                          <p className="text-[13px] font-bold uppercase opacity-40 leading-relaxed mb-8">
                            Dokładamy wszelkich starań, aby Twoje zgłoszenie zostało rozwiązane jak najszybciej. Zgodnie z art. 43g ust. 1 ustawy o prawach konsumenta, na każdą reklamację odpowiadamy w terminie do 14 dni od momentu jej otrzymania. Informację o sposobie rozpatrzenia zgłoszenia otrzymasz bezpośrednio na swój adres e-mail.
                          </p>
                          <div className="flex flex-col md:flex-row gap-4">
                             <div className="flex-1 bg-[color:var(--surface-muted)] px-8 py-5 rounded-full border border-[color:var(--border)] font-black uppercase text-center text-lg opacity-60">
                                {userEmail}
                             </div>
                             <button
                              onClick={handleSend}
                              disabled={!message}
                              className="bg-[color:var(--foreground)] text-[color:var(--surface)] px-12 py-5 rounded-full font-black uppercase tracking-widest text-lg shadow-xl hover:scale-105 transition-all disabled:opacity-20"
                             >
                                Wyślij
                             </button>
                          </div>
                       </div>
                       <button onClick={() => setStep(mainType === 'Zapytanie o ofertę' ? 1 : 2)} className="text-[13px] font-black uppercase tracking-widest opacity-30 hover:opacity-100">← Wróć</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
