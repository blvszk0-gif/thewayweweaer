'use client';

type AccountHeaderProps = {
  firstName?: string;
  email?: string;
  logout: () => void;
};

export function AccountHeader({
  firstName,
  email,
  logout,
}: AccountHeaderProps) {
  return (
    <div className="flex justify-between gap-6 items-start mb-14">
      <div>
        <p className="opacity-50 font-black tracking-widest">
          The Way We Are
        </p>

        <h1 className="mt-3 text-5xl font-black italic">
          {firstName || email || 'Moje konto'}
        </h1>

        {email && (
          <p className="mt-3 opacity-60">
            {email}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={logout}
        className="border border-[color:var(--border)] px-5 py-3 rounded-full font-black uppercase tracking-widest text-sm"
      >
        Wyloguj się
      </button>
    </div>
  );
}