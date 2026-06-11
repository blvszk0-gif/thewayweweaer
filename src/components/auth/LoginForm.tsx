'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const AppleIcon = () => (
  <svg viewBox="0 0 384 512" width="20" height="20" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 488 512" width="20" height="20" fill="currentColor">
    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
  </svg>
);

const InputField = ({ type, placeholder, value, onChange }: { type: string, placeholder: string, value: string, onChange: (val: string) => void }) => {
  const [touched, setTouched] = useState(false);
  const isEmpty = touched && !value;

  return (
    <div className="relative">
      <motion.div
        animate={isEmpty ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onBlur={() => setTouched(true)}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-[color:var(--surface-muted)] border rounded-2xl px-8 py-5 font-black uppercase text-xs focus:outline-none transition-all ${isEmpty ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'border-[color:var(--border)] focus:border-[color:var(--foreground)] text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/30'}`}
        />
      </motion.div>
      <AnimatePresence>
        {isEmpty && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-4"
          >
            Pole jest wymagane
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto font-antonio">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[color:var(--surface)] rounded-[40px] p-12 text-center shadow-2xl border border-[color:var(--border)]"
          >
            <div className="w-20 h-20 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Check size={40} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4 text-[color:var(--foreground)]">Witaj w Squadzie!</h2>
            <p className="text-[10px] font-bold uppercase opacity-40 tracking-widest leading-relaxed text-[color:var(--foreground)]">Pomyślnie zalogowano. Przekierowujemy Cię do bazy...</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[color:var(--surface)] rounded-[40px] p-12 shadow-2xl border border-[color:var(--border)]"
          >
            <div className="flex gap-8 mb-12">
              <button
                onClick={() => setIsLogin(true)}
                className={`text-2xl font-black uppercase tracking-tighter italic transition-all ${isLogin ? 'text-[color:var(--foreground)] scale-110' : 'text-[color:var(--foreground)]/20'}`}
              >
                Logowanie
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`text-2xl font-black uppercase tracking-tighter italic transition-all ${!isLogin ? 'text-[color:var(--foreground)] scale-110' : 'text-[color:var(--foreground)]/20'}`}
              >
                Rejestracja
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                type="email"
                placeholder="TWOJA@POCZTA.COM"
                value={email}
                onChange={setEmail}
              />
              <InputField
                type="password"
                placeholder="HASŁO"
                value={password}
                onChange={setPassword}
              />
              <button
                type="submit"
                className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-6 rounded-full font-black uppercase tracking-[0.2em] shadow-xl hover:opacity-90 transition-all mt-4"
              >
                {isLogin ? 'Zaloguj się' : 'Dołącz do squadu'}
              </button>

              <div className="flex flex-col items-center gap-4 pt-4">
                 <button type="button" className="text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity text-[color:var(--foreground)]">
                   Zapomniałeś hasła?
                 </button>
                 {isLogin && (
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-[10px] font-black uppercase tracking-widest text-[color:var(--foreground)]/60 hover:text-[color:var(--foreground)] transition-colors"
                    >
                      Nie masz konta? Zarejestruj je tutaj
                    </button>
                 )}
              </div>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[color:var(--border)]"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-[color:var(--foreground)]/20"><span className="bg-[color:var(--surface)] px-4">LUB</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black/80 transition-all shadow-lg border border-white/5">
                <AppleIcon /> Apple
              </button>
              <button className="flex items-center justify-center gap-3 bg-white text-black border border-black/10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black/5 transition-all shadow-lg">
                <GoogleIcon /> Google
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
