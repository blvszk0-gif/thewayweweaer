'use client';

export function GuestAccount() {
  return (
    <div className="text-center py-24">
      <p className="opacity-50 font-black tracking-widest mb-4">
        The Way We Are
      </p>

      <h1 className="text-5xl font-black italic">
        Witaj
      </h1>

      <p className="mt-5 opacity-60">
        Zaloguj się lub utwórz konto, aby zobaczyć swoje zamówienia.
      </p>

      <button
        type="button"
        onClick={() =>
          window.location.assign(
            `/api/auth/login?returnTo=${encodeURIComponent('/account')}`
          )
        }
        className="mt-8 bg-[color:var(--foreground)] text-[color:var(--surface)] px-8 py-4 rounded-full font-black uppercase tracking-widest"
      >
        Zaloguj się
      </button>
    </div>
  );
}