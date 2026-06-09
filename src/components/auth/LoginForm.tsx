'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Globe, Apple } from 'lucide-react';

interface FormInputProps {
  label: string;
  type?: string;
  placeholder: string;
}

const FormInput = ({ label, type = 'text', placeholder }: FormInputProps) => {
  const [isTouched, setIsTouched] = useState(false);
  const [value, setValue] = useState('');
  const showError = isTouched && value.trim() === '';

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] ml-4">{label}</label>
      <motion.div
        animate={showError ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setIsTouched(true)}
          placeholder={placeholder}
          className={`w-full bg-black/5 border rounded-full px-8 py-4 focus:outline-none transition-colors ${showError ? 'border-red-500 bg-red-500/5' : 'border-black/10 focus:border-black'}`}
        />
        <AnimatePresence>
          {showError && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-red-500 uppercase tracking-widest"
            >
              Pole jest wymagane
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const LoginForm = () => {
  return (
    <div className="py-32 container mx-auto px-6 max-w-xl">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-12 text-center italic">Logowanie</h1>

      <div className="space-y-6">
        <FormInput label="E-mail" placeholder="TWOJA@POCZTA.COM" />
        <FormInput label="Hasło" type="password" placeholder="••••••••" />

        <button className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-black/90 transition-all mt-4 text-lg">
          ZALOGUJ SIĘ
        </button>

        <div className="flex flex-col gap-4 mt-8">
           <button className="flex items-center justify-center gap-4 bg-black/5 border border-black/10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/10 transition-colors">
             <Globe size={20} /> Zaloguj przez Google
           </button>
           <button className="flex items-center justify-center gap-4 bg-black/5 border border-black/10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/10 transition-colors">
             <Apple size={20} /> Zaloguj przez Apple
           </button>
        </div>

        <div className="text-center mt-12">
          <p className="text-black/30 text-xs font-bold uppercase tracking-widest mb-4">Nie masz konta?</p>
          <button className="text-black font-black uppercase tracking-widest underline underline-offset-8">Zarejestruj się</button>
        </div>
      </div>
    </div>
  );
};
