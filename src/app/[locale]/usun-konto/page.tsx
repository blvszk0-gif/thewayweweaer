'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertTriangle, Check, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import pb from '@/lib/pocketbase';

export default function DeleteAccountPage() {
  const tAccount = useTranslations('account');
  const tNav = useTranslations('nav');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      if (pb.authStore.isValid && pb.authStore.model?.id) {
        await pb.collection('users').delete(pb.authStore.model.id);
        pb.authStore.clear();
      }
    } catch (err) {
      console.warn('PocketBase deletion note:', err);
    }

    localStorage.removeItem('twww-auth');
    localStorage.removeItem('twww-user-email');
    localStorage.removeItem('twww-user-profile');
    localStorage.removeItem('twww-user-is-new');

    setIsDeleting(false);
    setIsSuccess(true);

    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio flex flex-col justify-between">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-xl">
        <Link href="/account" className="inline-flex items-center gap-2 text-sm font-black uppercase opacity-50 hover:opacity-100 transition-opacity mb-8">
          <ArrowLeft size={16} /> {tNav('moje_konto')}
        </Link>

        <div className="bg-[color:var(--surface-muted)] p-10 rounded-[40px] border border-[color:var(--border)] shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
            <Trash2 size={36} />
          </div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">{tNav('usuń_swoje_konto')}</h1>
          <p className="text-sm font-bold opacity-60 uppercase tracking-widest leading-relaxed">
            {tAccount('bezpowrotne_usunięcie_danych')}
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-red-500 text-white py-5 rounded-full font-black uppercase tracking-[0.2em] shadow-xl hover:bg-red-600 transition-all text-sm"
          >
            {tAccount('usuń_moje_konto')}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              {isSuccess ? (
                <div className="space-y-4 py-6">
                  <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic">{tNav('usuń_swoje_konto')}</h3>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
                    <AlertTriangle size={32} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic">{tAccount('usuń_moje_konto')}?</h3>
                  <p className="text-xs font-bold opacity-60 uppercase tracking-widest leading-relaxed">
                    {tAccount('bezpowrotne_usunięcie_danych')}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      disabled={isDeleting}
                      className="py-4 rounded-2xl font-black uppercase text-xs tracking-wider border border-[color:var(--border)] hover:bg-[color:var(--surface-muted)] transition-all"
                    >
                      Anuluj
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="py-4 rounded-2xl font-black uppercase text-xs tracking-wider bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg"
                    >
                      {isDeleting ? 'Usuwanie...' : 'Tak, usuń'}
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
