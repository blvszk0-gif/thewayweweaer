'use client';

import { useState } from 'react';

type Props = { email?: string };

export function AccountDeletionRequest({ email }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function sendRequest() {
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'account_deletion', message }),
      });
      if (!response.ok) throw new Error();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return <section className="mt-16 border-t border-[color:var(--border)] pt-10">
    <h2 className="text-2xl font-black uppercase italic">Usunięcie konta</h2>
    <p className="mt-4 max-w-2xl leading-relaxed opacity-70">Aby złożyć wniosek o usunięcie danych konta, skontaktuj się z nami z adresu e-mail przypisanego do konta. Zweryfikujemy wniosek zgodnie z polityką prywatności.</p>
    <p className="mt-4 text-sm font-bold uppercase tracking-wider opacity-50">Subskrypcja newslettera jest zarządzana oddzielnie — nie zmienimy jej bez wyraźnej dyspozycji.</p>
    <button type="button" onClick={() => { setIsOpen(true); setStatus('idle'); }} className="mt-7 rounded-full border border-[color:var(--border)] px-6 py-3 font-black uppercase tracking-widest text-sm">Napisz do nas</button>

    {isOpen && <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="delete-account-title">
      <div className="w-full max-w-lg rounded-[32px] bg-[color:var(--surface)] p-8 shadow-2xl">
        {status === 'sent' ? <div className="text-center"><h3 id="delete-account-title" className="text-3xl font-black uppercase italic">Zgłoszenie wysłane</h3><p className="mt-4 opacity-70">Potwierdzimy wniosek, odpowiadając na adres {email || 'przypisany do konta'}.</p><button type="button" onClick={() => setIsOpen(false)} className="mt-8 rounded-full bg-[color:var(--foreground)] px-6 py-3 font-black uppercase tracking-widest text-[color:var(--surface)]">Zamknij</button></div> : <>
          <h3 id="delete-account-title" className="text-3xl font-black uppercase italic">Napisz do nas</h3>
          <p className="mt-4 opacity-70">Wyślemy zgłoszenie z adresu przypisanego do konta: {email || 'Twojego e-maila'}.</p>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={2000} placeholder="Dodatkowa wiadomość (opcjonalnie)" className="mt-6 h-32 w-full rounded-2xl border border-[color:var(--border)] bg-transparent p-4" />
          {status === 'error' && <p className="mt-3 font-bold text-red-600">Nie udało się wysłać zgłoszenia. Spróbuj ponownie.</p>}
          <div className="mt-6 flex flex-wrap gap-3"><button type="button" disabled={status === 'sending'} onClick={() => void sendRequest()} className="rounded-full bg-[color:var(--foreground)] px-6 py-3 font-black uppercase tracking-widest text-[color:var(--surface)] disabled:opacity-50">{status === 'sending' ? 'Wysyłanie…' : 'Wyślij zgłoszenie'}</button><button type="button" onClick={() => setIsOpen(false)} className="rounded-full border border-[color:var(--border)] px-6 py-3 font-black uppercase tracking-widest">Anuluj</button></div>
        </>}
      </div>
    </div>}
  </section>;
}
