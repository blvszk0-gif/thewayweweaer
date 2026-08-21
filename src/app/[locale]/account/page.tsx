'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import {
  User,
  Package,
  FileText,
  Ticket,
  Settings,
  LogOut,
  ChevronRight,
  Trash2,
  BellOff,
  RefreshCcw,
  Lock,
  AlertTriangle,
  Check,
  Loader2
} from 'lucide-react';

interface OrderItem {
  id: string;
  date: string;
  total: number;
  status: string;
}

const prizes = [
  { label: '1', color: '#000000', textKey: 'Darmowa dostawa' },
  { label: '2', color: '#1a1a1a', textKey: '5% rabatu na kolejne zamówienie' },
  { label: '3', color: '#333333', textKey: 'Dodatkowa naklejka przy następnym zamówieniu' },
  { label: '4', color: '#000000', textKey: 'Dodatkowa słodkość przy następnym zamówieniu' },
  { label: '5', color: '#1a1a1a', textKey: 'Brelok TWWW' },
  { label: '6', color: '#333333', textKey: 'Darmowa dostawa' },
];

export default function AccountPage() {
  const tAccount = useTranslations('account');
  const [activeTab, setActiveTab] = useState('profil');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userProfile, setUserProfile] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const [orders, setOrders] = useState<OrderItem[]>([]);

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<string | null>(null);
  const [accessCode, setAccessCode] = useState('');
  const [hasAccess, setHasAccess] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalSuccessMessage, setModalSuccessMessage] = useState<string | null>(null);

  // Fetch live customer session and profile from Shopify Customer Account API `/api/auth/me`
  useEffect(() => {
    async function checkAuth() {
      setIsCheckingAuth(true);
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.loggedIn && data.profile) {
          setIsLoggedIn(true);
          setUserProfile(data.profile);
          setOrders(data.orders || []);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error('Failed to query Customer Account session:', err);
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  const handleLoginRedirect = () => {
    window.location.href = '/api/auth/login';
  };

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const randomStop = Math.floor(Math.random() * 360);
    const newRotation = rotation + (extraSpins * 360) + randomStop;
    setRotation(newRotation);
    setTimeout(() => {
      setIsSpinning(false);
      const sliceSize = 360 / prizes.length;
      const prizeIndex = Math.floor((360 - (newRotation % 360)) / sliceSize) % prizes.length;
      setWonPrize(prizes[prizeIndex].label);
    }, 4000);
  };

  const tabs = [
    { id: 'profil', labelKey: 'profil', icon: User },
    { id: 'zamówienia', labelKey: 'zamówienia', icon: Package },
    { id: 'faktury', labelKey: 'moje_faktury', icon: FileText },
    { id: 'rabaty', labelKey: 'moje_rabaty', icon: Ticket },
    { id: 'kolo', labelKey: 'koło_fortuny', icon: RefreshCcw },
    { id: 'ustawienia', labelKey: 'ustawienia', icon: Settings },
    { id: 'logout', labelKey: 'wyloguj_się', icon: LogOut, color: 'text-red-500' },
  ];

  if (isCheckingAuth) {
    return (
      <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio flex items-center justify-center p-6">
        <Header />
        <div className="flex items-center gap-3">
          <Loader2 className="animate-spin" size={32} />
          <span className="font-black uppercase tracking-widest text-lg">Weryfikacja konta Shopify...</span>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio flex items-center justify-center p-6">
        <Header />
        <div className="text-center space-y-8 max-w-md">
          <div className="w-24 h-24 bg-[color:var(--surface-muted)] rounded-full flex items-center justify-center mx-auto border border-[color:var(--border)] shadow-xl">
            <User size={40} className="opacity-20" />
          </div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">{tAccount('strefa_klienta')}</h1>
          <p className="text-[22px] font-bold opacity-50 uppercase leading-relaxed">
            {tAccount('zaloguj_się_aby_uzyskać_dostęp_do_swojeg')}
          </p>
          <button
            onClick={handleLoginRedirect}
            className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-6 rounded-full font-black uppercase tracking-widest text-[22px] shadow-2xl hover:scale-[1.02] transition-transform"
          >
            Zaloguj przez Shopify
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          <div className="lg:w-80 w-full shrink-0 space-y-4 lg:sticky lg:top-32">
            <div className="bg-[color:var(--surface)] p-4 rounded-[30px] border border-[color:var(--border)] space-y-2 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => tab.id === 'logout' ? handleLogout() : setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                    activeTab === tab.id
                      ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] shadow-lg'
                      : 'hover:bg-[color:var(--surface-muted)]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <tab.icon
                      size={24}
                      className={`${activeTab === tab.id ? 'opacity-100' : 'opacity-40'} group-hover:opacity-100 ${
                        tab.color || ''
                      }`}
                    />
                    <span className={`font-black uppercase tracking-widest text-lg ${tab.color || ''}`}>
                      {tAccount(tab.labelKey as any)}
                    </span>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`transition-all ${activeTab === tab.id ? 'opacity-100 translate-x-1' : 'opacity-0'}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeTab === 'profil' && (
                <motion.div
                  key="profil"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[color:var(--surface-muted)] p-10 rounded-[50px] border border-[color:var(--border)] shadow-xl space-y-12"
                >
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter">Dane Klienta Shopify</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <p className="text-[17px] font-black uppercase opacity-40 ml-4">Imię</p>
                      <input
                        value={userProfile.firstName || 'Brak danych'}
                        disabled
                        className="w-full bg-[color:var(--surface)] px-6 py-4 rounded-2xl border border-[color:var(--border)] font-black uppercase text-lg opacity-80"
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="text-[17px] font-black uppercase opacity-40 ml-4">Nazwisko</p>
                      <input
                        value={userProfile.lastName || 'Brak danych'}
                        disabled
                        className="w-full bg-[color:var(--surface)] px-6 py-4 rounded-2xl border border-[color:var(--border)] font-black uppercase text-lg opacity-80"
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="text-[17px] font-black uppercase opacity-40 ml-4">Adres E-mail</p>
                      <input
                        value={userProfile.email || 'Brak danych'}
                        disabled
                        className="w-full bg-[color:var(--surface)] px-6 py-4 rounded-2xl border border-[color:var(--border)] font-black uppercase text-lg opacity-80"
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="text-[17px] font-black uppercase opacity-40 ml-4">Domyślny Adres Dostawy</p>
                      <input
                        value={userProfile.address || 'Nie podano adresu w Shopify'}
                        disabled
                        className="w-full bg-[color:var(--surface)] px-6 py-4 rounded-2xl border border-[color:var(--border)] font-black uppercase text-lg opacity-80"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'zamówienia' && (
                <motion.div
                  key="zamówienia"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {orders.length === 0 ? (
                    <div className="bg-[color:var(--surface-muted)] p-12 rounded-[50px] border border-[color:var(--border)] text-center py-24 space-y-4">
                      <Package size={48} className="mx-auto opacity-20" />
                      <h4 className="text-2xl font-black uppercase italic">Brak złożonych zamówień w Shopify</h4>
                      <p className="text-[15px] font-bold opacity-40 uppercase tracking-widest">
                        Twoja historia zamówień w sklepie jest obecnie pusta.
                      </p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-[color:var(--surface)] p-8 rounded-[40px] border border-[color:var(--border)] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-[color:var(--surface-muted)] rounded-2xl flex items-center justify-center text-[color:var(--foreground)]">
                            <Package size={32} />
                          </div>
                          <div>
                            <h4 className="text-xl font-black italic uppercase tracking-tighter">{order.id}</h4>
                            <p className="text-[17px] font-bold opacity-40 uppercase tracking-widest">{order.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="text-right">
                            <p className="text-2xl font-black">{order.total.toFixed(2)} PLN</p>
                            <p className="text-[16px] font-bold text-green-500 uppercase tracking-[0.2em]">
                              {order.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'faktury' && (
                <motion.div
                  key="faktury"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[color:var(--surface-muted)] p-10 rounded-[50px] border border-[color:var(--border)] text-center py-32"
                >
                  <FileText size={48} className="mx-auto mb-6 opacity-10" />
                  <p className="text-xl font-black uppercase tracking-tighter opacity-40 italic">
                    {tAccount('brak_faktur_do_pobrania')}
                  </p>
                </motion.div>
              )}

              {activeTab === 'rabaty' && (
                <motion.div
                  key="rabaty"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="bg-black text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                      <Ticket size={100} />
                    </div>
                    <p className="text-[16px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">
                      {tAccount('twój_aktywny_rabat')}
                    </p>
                    <h3 className="text-5xl font-black italic tracking-tighter mb-8">-15% TWWW CLUB</h3>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                      <span className="font-mono font-bold text-lg">WELCOME15</span>
                      <button className="text-[13px] font-black uppercase border-b border-white">
                        {tAccount('kopiuj')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'kolo' && (
                <motion.div
                  key="kolo"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[color:var(--surface)] rounded-[50px] p-8 md:p-12 border border-[color:var(--border)] shadow-2xl flex flex-col items-center"
                >
                  {!hasAccess ? (
                    <div className="text-center py-20 max-w-sm">
                      <div className="w-20 h-20 bg-[color:var(--surface-muted)] rounded-full flex items-center justify-center mx-auto mb-8 border border-[color:var(--border)]">
                        <Lock size={32} className="opacity-20" />
                      </div>
                      <h3 className="text-3xl font-black uppercase italic mb-6">{tAccount('wymagane_zamówienie')}</h3>
                      <p className="text-[17px] font-bold opacity-50 uppercase tracking-widest mb-8 leading-relaxed">
                        {tAccount('aby_zakręcić_kołem_wpisz_6-cyfrowy_kod_z')}
                      </p>
                      <input
                        type="text"
                        placeholder="ABC123"
                        maxLength={6}
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                        className="w-full bg-[color:var(--surface-muted)] px-8 py-5 rounded-full border border-[color:var(--border)] font-black uppercase text-center text-lg focus:outline-none focus:border-[color:var(--foreground)] mb-6"
                      />
                      <button
                        onClick={() => {
                          if (accessCode === 'ABC123') setHasAccess(true);
                        }}
                        className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest text-lg shadow-xl"
                      >
                        {tAccount('aktywuj')}
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
                      <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-3xl font-black uppercase italic mb-12">
                          {tAccount('zakręć_i_wygraj_jedną_z_wielu_nagród')}
                        </h3>
                        <div className="relative w-72 h-72 md:w-80 md:h-80 mb-12">
                          <div
                            className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-10 bg-[color:var(--foreground)]"
                            style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
                          />
                          <motion.div
                            className="w-full h-full rounded-full border-[8px] border-[color:var(--foreground)] relative overflow-hidden"
                            animate={{ rotate: rotation }}
                            transition={{ duration: 4, ease: [0.1, 0, 0, 1] }}
                          >
                            {prizes.map((p, i) => (
                              <div
                                key={i}
                                className="absolute top-0 left-0 w-full h-full origin-center"
                                style={{
                                  transform: `rotate(${i * 60}deg)`,
                                  backgroundColor: p.color,
                                  clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 93.3% 25%)',
                                }}
                              >
                                <span
                                  className="absolute top-[18%] left-[65%] -translate-x-1/2 -translate-y-1/2 text-white font-black uppercase text-3xl tracking-tighter text-center leading-none"
                                  style={{ transform: `rotate(30deg)` }}
                                >
                                  {p.label}
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        </div>

                        {wonPrize ? (
                          <div className="text-center animate-bounce bg-[color:var(--foreground)] text-[color:var(--surface)] px-10 py-5 rounded-full font-black uppercase tracking-widest text-[18px] sm:text-[22px]">
                            WYGRANA: {wonPrize}.
                          </div>
                        ) : (
                          <button
                            onClick={spin}
                            disabled={isSpinning}
                            className="w-full max-w-sm bg-[color:var(--foreground)] text-[color:var(--surface)] py-6 rounded-full font-black uppercase tracking-widest text-[22px] shadow-xl hover:scale-105 transition-all"
                          >
                            {tAccount('zakręć')}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'ustawienia' && (
                <motion.div
                  key="ustawienia"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[color:var(--surface-muted)] p-10 rounded-[50px] border border-[color:var(--border)] space-y-10"
                >
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter">{tAccount('ustawienia')}</h3>
                  <div className="flex flex-wrap gap-6">
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="flex items-center gap-4 bg-[color:var(--surface)] border border-[color:var(--border)] px-10 py-6 rounded-[30px] hover:bg-red-500 hover:text-white transition-all group shadow-sm"
                    >
                      <Trash2 size={24} className="text-red-500 group-hover:text-white" />
                      <div className="text-left">
                        <p className="font-black uppercase text-lg">{tAccount('usuń_moje_konto')}</p>
                        <p className="text-[13px] font-bold opacity-40 uppercase tracking-widest group-hover:text-white/60">
                          {tAccount('bezpowrotne_usunięcie_danych')}
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={() => setShowUnsubscribeModal(true)}
                      className="flex items-center gap-4 bg-[color:var(--surface)] border border-[color:var(--border)] px-10 py-6 rounded-[30px] hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)] transition-all group shadow-sm"
                    >
                      <BellOff size={24} className="opacity-40 group-hover:opacity-100 group-hover:text-[color:var(--surface)]" />
                      <div className="text-left">
                        <p className="font-black uppercase text-lg">Wypisz z newslettera</p>
                        <p className="text-[13px] font-bold opacity-40 uppercase tracking-widest group-hover:text-[color:var(--surface)]/60">
                          {tAccount('przestań_otrzymywać_powiadomienia')}
                        </p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Account Deletion Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[color:var(--surface)] border border-[color:var(--border)] rounded-[40px] p-8 sm:p-10 max-w-md w-full text-center space-y-6 shadow-2xl"
            >
              {modalSuccessMessage ? (
                <div className="space-y-4 py-6">
                  <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic">{modalSuccessMessage}</h3>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
                    <AlertTriangle size={32} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic">Czy na pewno chcesz się wylogować i usunąć sesję?</h3>
                  <p className="text-xs font-bold opacity-60 uppercase tracking-widest leading-relaxed">
                    Instrukcja usunięcia konta znajduje się w polityce prywatności Shopify. Kliknięcie usuwa bieżącą sesję na tym urządzeniu.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowDeleteModal(false)}
                      disabled={isProcessing}
                      className="py-4 rounded-2xl font-black uppercase text-xs tracking-wider border border-[color:var(--border)] hover:bg-[color:var(--surface-muted)] transition-all"
                    >
                      Anuluj
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isProcessing}
                      className="py-4 rounded-2xl font-black uppercase text-xs tracking-wider bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg"
                    >
                      Wyloguj sesję
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
