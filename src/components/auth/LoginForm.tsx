'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

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
          className={`w-full bg-black/5 border rounded-2xl px-8 py-5 font-black uppercase text-xs focus:outline-none transition-all ${isEmpty ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'border-black/10 focus:border-black'}`}
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[40px] p-12 text-center shadow-2xl border border-black/5"
          >
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Check size={40} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Witaj w Squadzie!</h2>
            <p className="text-[10px] font-bold uppercase opacity-40 tracking-widest leading-relaxed">Pomyślnie zalogowano. Przekierowujemy Cię do bazy...</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[40px] p-12 shadow-2xl border border-black/5"
          >
            <div className="flex gap-8 mb-12">
              <button
                onClick={() => setIsLogin(true)}
                className={`text-2xl font-black uppercase tracking-tighter italic transition-all ${isLogin ? 'opacity-100 scale-110' : 'opacity-20'}`}
              >
                Logowanie
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`text-2xl font-black uppercase tracking-tighter italic transition-all ${!isLogin ? 'opacity-100 scale-110' : 'opacity-20'}`}
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
                className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black/80 transition-all mt-4"
              >
                {isLogin ? 'Zaloguj się' : 'Dołącz do squadu'}
              </button>

              <div className="text-center pt-4">
                 <button type="button" className="text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">
                   Zapomniałeś hasła?
                 </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
