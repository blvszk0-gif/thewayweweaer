'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MapPin, Search } from 'lucide-react';

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

const InputField = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = true
}: {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  required?: boolean;
}) => {
  const [touched, setTouched] = useState(false);
  const isEmpty = touched && required && !value;

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
          disabled={disabled}
          onBlur={() => setTouched(true)}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-[color:var(--surface-muted)] border rounded-2xl px-6 py-4 font-black uppercase text-sm focus:outline-none transition-all ${
            disabled ? 'opacity-60 cursor-not-allowed' : ''
          } ${
            isEmpty
              ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              : 'border-[color:var(--border)] focus:border-[color:var(--foreground)] text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/30'
          }`}
        />
      </motion.div>
      <AnimatePresence>
        {isEmpty && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-[11px] font-black uppercase tracking-widest mt-1 ml-4"
          >
            Pole jest wymagane
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const mockInpostLockers = [
  { id: 'WAW-102A', name: 'Paczkomat WAW102A', address: 'ul. Marszałkowska 126, Warszawa' },
  { id: 'WAW-405B', name: 'Paczkomat WAW405B', address: 'ul. Aleje Jerozolimskie 54, Warszawa' },
  { id: 'KRA-881M', name: 'Paczkomat KRA881M', address: 'ul. Floriańska 15, Kraków' },
  { id: 'GDN-021C', name: 'Paczkomat GDN021C', address: 'ul. Długa 4, Gdańsk' },
];

export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'InPost' | 'Kurier'>('InPost');
  const [selectedLocker, setSelectedLocker] = useState(mockInpostLockers[0].id);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(false);

  // Status & Google SSO states
  const [isGoogleMode, setIsGoogleMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [actionType, setActionType] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleGoogleLogin = () => {
    // Google SSO simulation: provides email and name
    setIsLogin(false);
    setIsGoogleMode(true);
    setEmail('google.user@gmail.com');
    setFirstName('Jan');
    setLastName('Kowalski');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      if (email && password) {
        localStorage.setItem('twww-auth', 'true');
        localStorage.setItem('twww-user-email', email.trim());
        setActionType('login');
        setIsSuccess(true);
      }
    } else {
      // Registration validation
      if (!email || !address || !password || (deliveryMethod === 'InPost' && !selectedLocker) || !termsConsent) {
        alert('Wypełnij wszystkie wymagane pola oraz zaakceptuj regulamin.');
        return;
      }

      const userProfile = {
        firstName: firstName || 'Użytkownik',
        lastName: lastName || 'TWWW',
        email: email.trim(),
        address: address.trim(),
        deliveryMethod,
        inpostLocker: deliveryMethod === 'InPost' ? selectedLocker : '',
        newsletter: newsletterConsent,
      };

      localStorage.setItem('twww-auth', 'true');
      localStorage.setItem('twww-user-email', email.trim());
      localStorage.setItem('twww-user-profile', JSON.stringify(userProfile));
      localStorage.setItem('twww-user-is-new', 'true');

      setActionType('register');
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
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4 text-[color:var(--foreground)]">
              {actionType === 'login' ? 'Logowanie..' : 'Rejestrowanie..'}
            </h2>
            <p className="text-[13px] font-bold uppercase opacity-40 tracking-widest leading-relaxed text-[color:var(--foreground)]">
              Przekierowywanie do Twojego konta...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[color:var(--surface)] rounded-[40px] p-8 sm:p-10 shadow-2xl border border-[color:var(--border)]"
          >
            {/* Header Tabs */}
            <div className="flex gap-8 mb-8 border-b border-[color:var(--border)] pb-4">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setIsGoogleMode(false);
                }}
                className={`text-2xl font-black uppercase tracking-tighter italic transition-all ${
                  isLogin ? 'text-[color:var(--foreground)] scale-105 border-b-2 border-[color:var(--foreground)] pb-1' : 'text-[color:var(--foreground)]/30'
                }`}
              >
                Logowanie
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                }}
                className={`text-2xl font-black uppercase tracking-tighter italic transition-all ${
                  !isLogin ? 'text-[color:var(--foreground)] scale-105 border-b-2 border-[color:var(--foreground)] pb-1' : 'text-[color:var(--foreground)]/30'
                }`}
              >
                Rejestracja
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isLogin ? (
                /* LOGIN FORM */
                <>
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
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      className="text-[12px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity text-[color:var(--foreground)]"
                    >
                      Zapomniałeś hasła?
                    </button>
                  </div>
                </>
              ) : (
                /* REGISTRATION FORM */
                <div className="space-y-3">
                  {isGoogleMode && (
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-2xl text-[12px] font-black uppercase tracking-widest text-green-600 text-center">
                      Zalogowano przez Google. Uzupełnij pozostałe dane delivery.
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      placeholder="IMIĘ"
                      value={firstName}
                      onChange={setFirstName}
                      required={!isGoogleMode}
                    />
                    <InputField
                      placeholder="NAZWISKO"
                      value={lastName}
                      onChange={setLastName}
                      required={!isGoogleMode}
                    />
                  </div>

                  <InputField
                    type="email"
                    placeholder="E-MAIL"
                    value={email}
                    onChange={setEmail}
                    disabled={isGoogleMode}
                  />

                  <InputField
                    placeholder="ADRES DOSTAWY (ULICA, NUMER, MIASTO)"
                    value={address}
                    onChange={setAddress}
                  />

                  <InputField
                    type="password"
                    placeholder="HASŁO"
                    value={password}
                    onChange={setPassword}
                  />

                  {/* Delivery Method Selection */}
                  <div className="pt-2">
                    <p className="text-[12px] font-black uppercase opacity-40 tracking-widest mb-2 ml-1">
                      Preferowana metoda dostawy:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('InPost')}
                        className={`py-3 px-4 rounded-xl font-black uppercase text-xs tracking-wider border transition-all ${
                          deliveryMethod === 'InPost'
                            ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] border-[color:var(--foreground)] shadow-md'
                            : 'bg-[color:var(--surface-muted)] border-[color:var(--border)] text-[color:var(--foreground)]'
                        }`}
                      >
                        Paczkomat InPost
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('Kurier')}
                        className={`py-3 px-4 rounded-xl font-black uppercase text-xs tracking-wider border transition-all ${
                          deliveryMethod === 'Kurier'
                            ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] border-[color:var(--foreground)] shadow-md'
                            : 'bg-[color:var(--surface-muted)] border-[color:var(--border)] text-[color:var(--foreground)]'
                        }`}
                      >
                        Kurier do domu
                      </button>
                    </div>
                  </div>

                  {/* InPost Locker Picker */}
                  {deliveryMethod === 'InPost' && (
                    <div className="p-4 bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-2xl space-y-3 mt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-[color:var(--foreground)]" />
                          <span className="text-[12px] font-black uppercase tracking-widest">Wybierz Paczkomat:</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsMapOpen(!isMapOpen)}
                          className="text-[11px] font-black uppercase underline tracking-wider opacity-70 hover:opacity-100"
                        >
                          {isMapOpen ? 'Zamknij mapę' : 'Mapa InPost'}
                        </button>
                      </div>

                      <select
                        value={selectedLocker}
                        onChange={(e) => setSelectedLocker(e.target.value)}
                        className="w-full bg-[color:var(--surface)] border border-[color:var(--border)] rounded-xl px-4 py-3 text-xs font-black uppercase focus:outline-none"
                      >
                        {mockInpostLockers.map((locker) => (
                          <option key={locker.id} value={locker.id}>
                            {locker.name} ({locker.address})
                          </option>
                        ))}
                      </select>

                      {/* Interactive InPost Map Mock */}
                      <AnimatePresence>
                        {isMapOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-[color:var(--surface)] p-4 rounded-xl border border-[color:var(--border)] space-y-3"
                          >
                            <div className="flex items-center gap-2 bg-[color:var(--surface-muted)] px-3 py-2 rounded-lg border border-[color:var(--border)] text-xs">
                              <Search size={14} className="opacity-40" />
                              <span className="opacity-50 uppercase font-bold text-[11px]">Szukaj miasta lub adresu...</span>
                            </div>

                            <div className="h-32 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex flex-col items-center justify-center text-center p-2">
                              <MapPin size={24} className="text-yellow-600 mb-1 animate-bounce" />
                              <span className="text-[11px] font-black uppercase tracking-widest text-yellow-700">
                                Mapa Punktów InPost
                              </span>
                              <span className="text-[9px] font-bold uppercase opacity-60">
                                Kliknij punkt na mapie, aby przypisać do konta
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {mockInpostLockers.map((locker) => (
                                <button
                                  key={locker.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedLocker(locker.id);
                                    setIsMapOpen(false);
                                  }}
                                  className={`p-2 rounded-lg text-left text-[10px] font-black uppercase border transition-all ${
                                    selectedLocker === locker.id
                                      ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] border-[color:var(--foreground)]'
                                      : 'bg-[color:var(--surface-muted)] border-[color:var(--border)]'
                                  }`}
                                >
                                  <p className="font-bold">{locker.id}</p>
                                  <p className="opacity-70 truncate">{locker.address}</p>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Consents */}
                  <div className="space-y-2 pt-2 text-[11px] font-bold uppercase tracking-wider">
                    <label className="flex items-center gap-3 cursor-pointer opacity-80 hover:opacity-100">
                      <input
                        type="checkbox"
                        checked={newsletterConsent}
                        onChange={(e) => setNewsletterConsent(e.target.checked)}
                        className="w-4 h-4 rounded border-[color:var(--border)] accent-[color:var(--foreground)] cursor-pointer"
                      />
                      <span>Chcę otrzymywać Newsletter z promodropami</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer opacity-80 hover:opacity-100">
                      <input
                        type="checkbox"
                        checked={termsConsent}
                        onChange={(e) => setTermsConsent(e.target.checked)}
                        required
                        className="w-4 h-4 rounded border-[color:var(--border)] accent-[color:var(--foreground)] cursor-pointer"
                      />
                      <span>Akceptuję regulamin sklepu *</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:opacity-90 transition-all mt-4"
              >
                {isLogin ? 'Zaloguj się' : 'Zarejestruj'}
              </button>
            </form>

            {/* Social Logins */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[color:var(--border)]"></div>
              </div>
              <div className="relative flex justify-center text-[12px] font-black uppercase tracking-widest text-[color:var(--foreground)]/30">
                <span className="bg-[color:var(--surface)] px-4">LUB</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-2xl font-black uppercase text-[12px] tracking-widest hover:bg-black/80 transition-all shadow-md border border-white/5"
              >
                <AppleIcon /> Apple
              </button>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 bg-white text-black border border-black/10 py-3.5 rounded-2xl font-black uppercase text-[12px] tracking-widest hover:bg-black/5 transition-all shadow-md"
              >
                <GoogleIcon /> Google
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
