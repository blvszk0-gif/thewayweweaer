'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MapPin } from 'lucide-react';

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

const inpostLockers = [
  { id: 'WAW-102A', name: 'Paczkomat WAW102A', address: 'ul. Marszałkowska 126, Warszawa' },
  { id: 'WAW-405B', name: 'Paczkomat WAW405B', address: 'ul. Aleje Jerozolimskie 54, Warszawa' },
  { id: 'KRA-881M', name: 'Paczkomat KRA881M', address: 'ul. Floriańska 15, Kraków' },
  { id: 'GDN-021C', name: 'Paczkomat GDN021C', address: 'ul. Długa 4, Gdańsk' },
];

export const LoginForm = () => {
  const tForms = useTranslations('forms');
  const tAccount = useTranslations('account');
  const tHome = useTranslations('home');

  const [isLogin, setIsLogin] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [voivodeship, setVoivodeship] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'InPost' | 'Kurier'>('InPost');
  const [selectedLocker, setSelectedLocker] = useState(inpostLockers[0].id);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [actionType, setActionType] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

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
      if (!email || !postalCode || !city || !street || !buildingNumber || !password || (deliveryMethod === 'InPost' && !selectedLocker) || !termsConsent) {
        return;
      }

      const fullAddress = `${street.trim()} ${buildingNumber.trim()}${apartmentNumber.trim() ? '/' + apartmentNumber.trim() : ''}, ${postalCode.trim()} ${city.trim()}${voivodeship.trim() ? ', ' + voivodeship.trim() : ''}`;

      const userProfile = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        address: fullAddress,
        postalCode: postalCode.trim(),
        city: city.trim(),
        voivodeship: voivodeship.trim(),
        street: street.trim(),
        buildingNumber: buildingNumber.trim(),
        apartmentNumber: apartmentNumber.trim(),
        deliveryMethod,
        inpostLocker: deliveryMethod === 'InPost' ? selectedLocker : '',
        newsletter: newsletterConsent,
      };

      localStorage.setItem('twww-auth', 'true');
      localStorage.setItem('twww-user-email', email.trim());
      localStorage.setItem('twww-user-profile', JSON.stringify(userProfile));

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
              {tForms('pomyślnie_zalogowano_przekierowujemy_cię')}
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
                <>
                  <InputField
                    type="email"
                    placeholder={tHome('twojapocztacom')}
                    value={email}
                    onChange={setEmail}
                  />
                  <InputField
                    type="password"
                    placeholder={tAccount('hasło')}
                    value={password}
                    onChange={setPassword}
                  />
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      className="text-[12px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity text-[color:var(--foreground)]"
                    >
                      {tForms('zapomniałeś_hasła')}
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      placeholder={tAccount('imię')}
                      value={firstName}
                      onChange={setFirstName}
                    />
                    <InputField
                      placeholder={tAccount('nazwisko')}
                      value={lastName}
                      onChange={setLastName}
                    />
                  </div>

                  <InputField
                    type="email"
                    placeholder={tHome('twojapocztacom')}
                    value={email}
                    onChange={setEmail}
                  />

                  <div className="pt-2 border-t border-[color:var(--border)]">
                    <p className="text-[12px] font-black uppercase opacity-40 tracking-widest mb-2 ml-1">
                      Adres dostawy:
                    </p>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <InputField
                          placeholder="Kod pocztowy (np. 00-001)"
                          value={postalCode}
                          onChange={setPostalCode}
                        />
                        <InputField
                          placeholder="Miasto"
                          value={city}
                          onChange={setCity}
                        />
                      </div>

                      <InputField
                        placeholder="Województwo (opcjonalnie)"
                        value={voivodeship}
                        onChange={setVoivodeship}
                        required={false}
                      />

                      <InputField
                        placeholder="Ulica"
                        value={street}
                        onChange={setStreet}
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <InputField
                          placeholder="Nr budynku"
                          value={buildingNumber}
                          onChange={setBuildingNumber}
                        />
                        <InputField
                          placeholder="Nr lokalu (opcjonalnie)"
                          value={apartmentNumber}
                          onChange={setApartmentNumber}
                          required={false}
                        />
                      </div>
                    </div>
                  </div>

                  <InputField
                    type="password"
                    placeholder={tAccount('hasło')}
                    value={password}
                    onChange={setPassword}
                  />

                  <div className="pt-2">
                    <p className="text-[12px] font-black uppercase opacity-40 tracking-widest mb-2 ml-1">
                      {tAccount('preferowana_metoda_dostawy')}:
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
                        {tAccount('paczkomat_inpost')}
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
                        {tAccount('kurier_do_domu')}
                      </button>
                    </div>
                  </div>

                  {deliveryMethod === 'InPost' && (
                    <div className="p-4 bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-2xl space-y-3 mt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-[color:var(--foreground)]" />
                          <span className="text-[12px] font-black uppercase tracking-widest">InPost:</span>
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
                        {inpostLockers.map((locker) => (
                          <option key={locker.id} value={locker.id}>
                            {locker.name} ({locker.address})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="space-y-2 pt-2 text-[11px] font-bold uppercase tracking-wider">
                    <label className="flex items-center gap-3 cursor-pointer opacity-80 hover:opacity-100">
                      <input
                        type="checkbox"
                        checked={newsletterConsent}
                        onChange={(e) => setNewsletterConsent(e.target.checked)}
                        className="w-4 h-4 rounded border-[color:var(--border)] accent-[color:var(--foreground)] cursor-pointer"
                      />
                      <span>{tForms('zgadzam_się_na_przetwarzanie_moich_danyc')}</span>
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

              <button
                type="submit"
                className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:opacity-90 transition-all mt-4"
              >
                {isLogin ? 'Zaloguj się' : 'Zarejestruj'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
