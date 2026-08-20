'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
  CheckCircle2,
  Clock,
  Truck,
  Box,
  XCircle,
  RefreshCcw,
  Lock
} from 'lucide-react';

const mockOrders = [
  { id: 'TWWW-0042', date: '10 Cze 2026', total: 299, status: 'Opłacone', icon: CheckCircle2 },
  { id: 'TWWW-0012', date: '12 Maj 2026', total: 448, status: 'Zamówienie odebrane', icon: Box },
];

const prizes = [
  { label: '1', color: '#000000', text: 'Darmowa dostawa' },
  { label: '2', color: '#1a1a1a', text: '5% rabatu na kolejne zamówienie' },
  { label: '3', color: '#333333', text: 'Dodatkowa naklejka przy następnym zamówieniu' },
  { label: '4', color: '#000000', text: 'Dodatkowa słodkość przy następnym zamówieniu' },
  { label: '5', color: '#1a1a1a', text: '50 zł PaySafeCard' },
  { label: '6', color: '#333333', text: 'Darmowa dostawa' },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profil');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<string | null>(null);
  const [accessCode, setAccessCode] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('InPost');
  const [isDeliveryConfirmed, setIsDeliveryConfirmed] = useState(false);

  // UseEffect to check login (mocked)
  useEffect(() => {
    const saved = localStorage.getItem('twww-auth');
    if (saved) setIsLoggedIn(true);

    // Check if coming from a tab link
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'orders') setActiveTab('zamowienia');
  }, []);

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

  const [userProfile, setUserProfile] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    deliveryMethod: string;
    inpostLocker?: string;
  }>({
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'zamowieniathewaywewear@gmail.com',
    address: 'ul. Modowa 13/37, 00-001 Warszawa',
    deliveryMethod: 'InPost',
  });
  const [isNewAccount, setIsNewAccount] = useState(false);

  useEffect(() => {
    const storedProfileStr = localStorage.getItem('twww-user-profile');
    const storedEmail = localStorage.getItem('twww-user-email');
    const isNew = localStorage.getItem('twww-user-is-new') === 'true';

    setIsNewAccount(isNew);

    if (storedProfileStr) {
      try {
        const parsed = JSON.parse(storedProfileStr);
        setUserProfile((prev) => ({
          ...prev,
          ...parsed,
          email: parsed.email || storedEmail || prev.email,
        }));
      } catch (e) {
        // ignore JSON parse error
      }
    } else if (storedEmail) {
      setUserProfile((prev) => ({ ...prev, email: storedEmail }));
    }
  }, []);

  const tabs = [
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'zamowienia', label: 'Zamówienia', icon: Package },
    { id: 'faktury', label: 'Moje faktury', icon: FileText },
    { id: 'rabaty', label: 'Moje rabaty', icon: Ticket },
    { id: 'kolo', label: 'Koło Fortuny', icon: RefreshCcw },
    { id: 'ustawienia', label: 'Ustawienia', icon: Settings },
    { id: 'logout', label: 'Wyloguj się', icon: LogOut, color: 'text-red-500' },
  ];

  if (!isLoggedIn) {
     return (
        <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio flex items-center justify-center p-6">
           <Header />
           <div className="text-center space-y-8 max-w-md">
              <div className="w-24 h-24 bg-[color:var(--surface-muted)] rounded-full flex items-center justify-center mx-auto border border-[color:var(--border)] shadow-xl">
                 <User size={40} className="opacity-20" />
              </div>
              <h1 className="text-4xl font-black uppercase italic tracking-tighter">Strefa Klienta</h1>
              <p className="text-[22px] font-bold opacity-50 uppercase leading-relaxed">Zaloguj się, aby uzyskać dostęp do swojego konta, zamówień i nagród.</p>
              <button
                onClick={() => { localStorage.setItem('twww-auth', 'true'); window.location.reload(); }}
                className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-6 rounded-full font-black uppercase tracking-widest text-[22px] shadow-2xl hover:scale-[1.02] transition-transform"
              >
                 Zaloguj / Zarejestruj się
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

          {/* Tabs Sidebar */}
          <div className="lg:w-80 w-full shrink-0 space-y-4 lg:sticky lg:top-32">
             <div className="bg-[color:var(--surface)] p-4 rounded-[30px] border border-[color:var(--border)] space-y-2 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => tab.id === 'logout' ? (localStorage.removeItem('twww-auth'), localStorage.removeItem('twww-user-email'), window.location.reload()) : setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${activeTab === tab.id ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] shadow-lg' : 'hover:bg-[color:var(--surface-muted)]'}`}
                  >
                     <div className="flex items-center gap-4">
                        <tab.icon size={24} className={`${activeTab === tab.id ? 'opacity-100' : 'opacity-40'} group-hover:opacity-100 ${tab.color || ''}`} />
                        <span className={`font-black uppercase tracking-widest text-lg ${tab.color || ''}`}>{tab.label}</span>
                     </div>
                     <ChevronRight size={16} className={`transition-all ${activeTab === tab.id ? 'opacity-100 translate-x-1' : 'opacity-0'}`} />
                  </button>
                ))}
             </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 w-full min-h-[600px]">
             <AnimatePresence mode="wait">
                {activeTab === 'profil' && (
                  <motion.div
                    key="profil" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-[color:var(--surface-muted)] p-10 rounded-[50px] border border-[color:var(--border)] shadow-xl space-y-12"
                  >
                     <h3 className="text-4xl font-black uppercase italic tracking-tighter">Ustawienia Profilu</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                          { label: 'Imię', val: userProfile.firstName },
                          { label: 'Nazwisko', val: userProfile.lastName },
                          { label: 'E-mail', val: userProfile.email },
                          { label: 'Adres Dostawy', val: userProfile.address },
                          { label: 'Hasło', val: '••••••••••••', type: 'password' },
                        ].map((field, i) => (
                          <div key={i} className="space-y-3">
                             <p className="text-[17px] font-black uppercase opacity-40 ml-4">{field.label}</p>
                             <div className="relative">
                               <input
                                value={field.val} onChange={(e) => {
                                  const newVal = e.target.value;
                                  if (field.label === 'Imię') setUserProfile(p => ({ ...p, firstName: newVal }));
                                  if (field.label === 'Nazwisko') setUserProfile(p => ({ ...p, lastName: newVal }));
                                  if (field.label === 'E-mail') setUserProfile(p => ({ ...p, email: newVal }));
                                  if (field.label === 'Adres Dostawy') setUserProfile(p => ({ ...p, address: newVal }));
                                }} type={field.type || 'text'}
                                className="w-full bg-[color:var(--surface)] px-6 py-4 rounded-2xl border border-[color:var(--border)] font-black uppercase text-lg focus:outline-none focus:border-[color:var(--foreground)]"
                               />
                               <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Zmień</button>
                             </div>
                          </div>
                        ))}
                     </div>
                     <div className="space-y-6 pt-6 border-t border-[color:var(--border)]">
                        <p className="text-[17px] font-black uppercase opacity-40 ml-4">Preferowana metoda dostawy</p>
                        <div className="flex flex-col gap-4">
                           <div className="flex gap-4">
                              <button
                                onClick={() => { setDeliveryMethod('InPost'); setIsDeliveryConfirmed(false); }}
                                className={`flex-1 py-5 rounded-2xl font-black uppercase text-lg transition-all border ${deliveryMethod === 'InPost' ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] border-[color:var(--foreground)] shadow-xl scale-105' : 'bg-[color:var(--surface)] border-[color:var(--border)] hover:bg-[color:var(--surface-muted)]'}`}
                              >
                                Paczkomat InPost
                              </button>
                              <button
                                onClick={() => { setDeliveryMethod('Kurier'); setIsDeliveryConfirmed(false); }}
                                className={`flex-1 py-5 rounded-2xl font-black uppercase text-lg transition-all border ${deliveryMethod === 'Kurier' ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] border-[color:var(--foreground)] shadow-xl scale-105' : 'bg-[color:var(--surface)] border-[color:var(--border)] hover:bg-[color:var(--surface-muted)]'}`}
                              >
                                Kurier do domu
                              </button>
                           </div>
                           <AnimatePresence>
                             {(!isDeliveryConfirmed || deliveryMethod !== 'InPost') && ( // Simple logic for demo
                               <motion.button
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                onClick={() => setIsDeliveryConfirmed(true)}
                                className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[13px] transition-all border bg-[color:var(--foreground)] text-[color:var(--surface)] border-[color:var(--foreground)] hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                               >
                                 POTWIERDŹ WYBÓR
                               </motion.button>
                             )}
                             {isDeliveryConfirmed && (
                               <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[13px] text-center text-green-500 border border-green-500/20"
                               >
                                 METODA POTWIERDZONA ✓
                               </motion.div>
                             )}
                           </AnimatePresence>
                        </div>
                     </div>
                  </motion.div>
                )}

                {activeTab === 'zamowienia' && (
                  <motion.div
                    key="zamowienia" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                     {isNewAccount ? (
                       <div className="bg-[color:var(--surface-muted)] p-12 rounded-[50px] border border-[color:var(--border)] text-center py-24 space-y-4">
                          <Package size={48} className="mx-auto opacity-20" />
                          <h4 className="text-2xl font-black uppercase italic">Brak złożonych zamówień</h4>
                          <p className="text-[15px] font-bold opacity-40 uppercase tracking-widest">Twoja historia zamówień jest obecnie pusta. Złóż swoje pierwsze zamówienie!</p>
                       </div>
                     ) : (
                       mockOrders.map((order) => (
                         <div key={order.id} className="bg-[color:var(--surface)] p-8 rounded-[40px] border border-[color:var(--border)] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:scale-[1.01] transition-transform">
                            <div className="flex items-center gap-6">
                               <div className="w-16 h-16 bg-[color:var(--surface-muted)] rounded-2xl flex items-center justify-center text-[color:var(--foreground)]">
                                  <order.icon size={32} />
                               </div>
                               <div>
                                  <h4 className="text-xl font-black italic uppercase tracking-tighter">{order.id}</h4>
                                  <p className="text-[17px] font-bold opacity-40 uppercase tracking-widest">{order.date}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-10">
                               <div className="text-right">
                                  <p className="text-2xl font-black">{order.total} PLN</p>
                                  <p className="text-[16px] font-bold text-green-500 uppercase tracking-[0.2em]">{order.status}</p>
                               </div>
                               <Link
                                  href={`/status/${order.id}`}
                                  className="w-14 h-14 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                               >
                                  <ChevronRight size={24} />
                               </Link>
                            </div>
                         </div>
                       ))
                     )}
                  </motion.div>
                )}

                {activeTab === 'faktury' && (
                  <motion.div
                    key="faktury" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-[color:var(--surface-muted)] p-10 rounded-[50px] border border-[color:var(--border)] text-center py-32"
                  >
                     <FileText size={48} className="mx-auto mb-6 opacity-10" />
                     <p className="text-xl font-black uppercase tracking-tighter opacity-40 italic">Brak faktur do pobrania</p>
                  </motion.div>
                )}

                {activeTab === 'rabaty' && (
                  <motion.div
                    key="rabaty" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                     <div className="bg-black text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700"><Ticket size={100} /></div>
                        <p className="text-[16px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">Twój aktywny rabat</p>
                        <h3 className="text-5xl font-black italic tracking-tighter mb-8">-15% TWWW CLUB</h3>
                        <div className="bg-white/10 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                           <span className="font-mono font-bold text-lg">WELCOME15</span>
                           <button className="text-[13px] font-black uppercase border-b border-white">Kopiuj</button>
                        </div>
                     </div>
                  </motion.div>
                )}

                {activeTab === 'kolo' && (
                  <motion.div
                    key="kolo" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-[color:var(--surface)] rounded-[50px] p-8 md:p-12 border border-[color:var(--border)] shadow-2xl flex flex-col items-center"
                  >
                    {!hasAccess ? (
                      <div className="text-center py-20 max-w-sm">
                         <div className="w-20 h-20 bg-[color:var(--surface-muted)] rounded-full flex items-center justify-center mx-auto mb-8 border border-[color:var(--border)]">
                            <Lock size={32} className="opacity-20" />
                         </div>
                         <h3 className="text-3xl font-black uppercase italic mb-6">Wymagane Zamówienie</h3>
                         <p className="text-[17px] font-bold opacity-50 uppercase tracking-widest mb-8 leading-relaxed">Aby zakręcić kołem, wpisz 6-cyfrowy kod ze swojego ostatniego zamówienia.</p>
                         <input
                          type="text"
                          placeholder="ABC123"
                          maxLength={6}
                          value={accessCode}
                          onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                          className="w-full bg-[color:var(--surface-muted)] px-8 py-5 rounded-full border border-[color:var(--border)] font-black uppercase text-center text-lg focus:outline-none focus:border-[color:var(--foreground)] mb-6"
                         />
                         <button
                          onClick={() => { if (accessCode === 'ABC123') setHasAccess(true); }}
                          className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest text-lg shadow-xl"
                         >
                            Aktywuj
                         </button>
                      </div>
                    ) : (
                      <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
                        <div className="flex-1 flex flex-col items-center">
                          <h3 className="text-3xl font-black uppercase italic mb-12">Zakręć i wygraj jedną z wielu nagród!</h3>
                          <div className="relative w-72 h-72 md:w-80 md:h-80 mb-12">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-10 bg-[color:var(--foreground)]" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
                            <motion.div className="w-full h-full rounded-full border-[8px] border-[color:var(--foreground)] relative overflow-hidden" animate={{ rotate: rotation }} transition={{ duration: 4, ease: [0.1, 0, 0, 1] }}>
                              {prizes.map((p, i) => (
                                <div key={i} className="absolute top-0 left-0 w-full h-full origin-center" style={{ transform: `rotate(${i * 60}deg)`, backgroundColor: p.color, clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 93.3% 25%)' }}>
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
                               WYGRANA: {wonPrize}. {prizes.find(p => p.label === wonPrize)?.text}
                            </div>
                          ) : (
                            <button
                              onClick={spin}
                              disabled={isSpinning}
                              className="w-full max-w-sm bg-[color:var(--foreground)] text-[color:var(--surface)] py-6 rounded-full font-black uppercase tracking-widest text-[22px] shadow-xl hover:scale-105 transition-all"
                            >
                              Zakręć!
                            </button>
                          )}
                        </div>

                        <div className="w-full lg:w-80">
                           <div className="bg-[color:var(--surface-muted)] rounded-3xl p-8 border border-[color:var(--border)]">
                              <h4 className="text-[17px] font-black uppercase tracking-tighter italic mb-6 leading-tight">Nagrody do zdobycia, które otrzymasz mailem:</h4>
                              <table className="w-full text-left font-bold uppercase tracking-widest text-[11px]">
                                 <thead>
                                    <tr className="border-b border-[color:var(--border)] opacity-30"><th className="pb-3">Lp.</th><th className="pb-3">Nagroda</th></tr>
                                 </thead>
                                 <tbody className="divide-y divide-[color:var(--border)]/5">
                                    {prizes.slice(0, 5).map((p, i) => (
                                       <tr key={i}><td className="py-3 opacity-30">{i + 1}.</td><td className="py-3">{p.text}</td></tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'ustawienia' && (
                  <motion.div
                    key="ustawienia" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-[color:var(--surface-muted)] p-10 rounded-[50px] border border-[color:var(--border)] space-y-10"
                  >
                     <h3 className="text-4xl font-black uppercase italic tracking-tighter">Opcje Konta</h3>
                     <div className="flex flex-wrap gap-6">
                        <button className="flex items-center gap-4 bg-[color:var(--surface)] border border-[color:var(--border)] px-10 py-6 rounded-[30px] hover:bg-red-500 hover:text-white transition-all group shadow-sm">
                           <Trash2 size={24} className="text-red-500 group-hover:text-white" />
                           <div className="text-left">
                              <p className="font-black uppercase text-lg">Usuń moje konto</p>
                              <p className="text-[13px] font-bold opacity-40 uppercase tracking-widest group-hover:text-white/60">Bezpowrotne usunięcie danych</p>
                           </div>
                        </button>
                        <button className="flex items-center gap-4 bg-[color:var(--surface)] border border-[color:var(--border)] px-10 py-6 rounded-[30px] hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)] transition-all group shadow-sm">
                           <BellOff size={24} className="opacity-40 group-hover:opacity-100 group-hover:text-[color:var(--surface)]" />
                           <div className="text-left">
                              <p className="font-black uppercase text-lg">Wypisz z newslettera</p>
                              <p className="text-[13px] font-bold opacity-40 uppercase tracking-widest group-hover:text-[color:var(--surface)]/60">Przestań otrzymywać powiadomienia</p>
                           </div>
                        </button>
                     </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
