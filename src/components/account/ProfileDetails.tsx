'use client';

type ProfileDetailsProps = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export function ProfileDetails({
  firstName,
  lastName,
  email,
}: ProfileDetailsProps) {
  return (
    <section>
      <h2 className="text-2xl font-black uppercase italic mb-8">
        Profil
      </h2>

      <div className="grid gap-5">
        <div className="border border-[color:var(--border)] rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest opacity-50 font-black">
            Imię
          </p>

          <p className="mt-2 text-xl font-black">
            {firstName || '—'}
          </p>
        </div>

        <div className="border border-[color:var(--border)] rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest opacity-50 font-black">
            Nazwisko
          </p>

          <p className="mt-2 text-xl font-black">
            {lastName || '—'}
          </p>
        </div>

        <div className="border border-[color:var(--border)] rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest opacity-50 font-black">
            Email
          </p>

          <p className="mt-2 text-xl font-black">
            {email || '—'}
          </p>
        </div>
      </div>
    </section>
  );
}