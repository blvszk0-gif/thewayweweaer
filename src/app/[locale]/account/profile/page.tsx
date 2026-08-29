"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type Customer = {
  firstName: string | null;
  lastName: string | null;
  emailAddress: { emailAddress: string } | null;
};

type FormData = {
  firstName: string;
  lastName: string;
};

const emptyForm: FormData = { firstName: "", lastName: "" };

export default function ProfilePage() {
  const router = useRouter();
  const { locale = "pl" } = useParams<{ locale: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/account/profile", { cache: "no-store" });
        if (!response.ok) throw new Error("Unable to load profile");
        const profile = await response.json();
        setCustomer(profile.customer);
        setForm({
          firstName: profile.customer?.firstName ?? "",
          lastName: profile.customer?.lastName ?? "",
        });
      } catch {
        setError("Nie udało się pobrać danych konta. Zaloguj się ponownie.");
      } finally {
        setLoading(false);
      }
    }
    void loadProfile();
  }, []);

  function updateField(field: keyof FormData, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: form.firstName.trim(), lastName: form.lastName.trim() }),
      });
      if (!response.ok) throw new Error("profile");

      setMessage("Dane zostały zapisane.");
      setShowSuccessModal(true);
      window.setTimeout(() => router.push(`/${locale}`), 1800);
    } catch {
      setError("Nie udało się zapisać danych. Spróbuj ponownie.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen text-[color:var(--foreground)] font-antonio">
      <Header />
      <section className="mx-auto max-w-2xl px-6 pb-24 pt-36">
        <p className="text-xs font-black uppercase tracking-[0.2em] opacity-50">Twoje konto</p>
        <h1 className="mt-3 text-4xl font-black uppercase italic">Uzupełnij dane</h1>
        <p className="mt-4 max-w-xl leading-relaxed opacity-70">
          Wystarczą imię i nazwisko — adres podasz przy pierwszym zamówieniu w kasie.
        </p>

        {loading ? (
          <p className="mt-10 font-bold opacity-60">Ładowanie formularza…</p>
        ) : (
          <form onSubmit={saveProfile} className="mt-10 space-y-8">
            <fieldset className="grid gap-5 md:grid-cols-2">
              <legend className="mb-4 text-lg font-black uppercase italic md:col-span-2">Dane osobowe</legend>
              <Field label="Imię" value={form.firstName} onChange={(value) => updateField("firstName", value)} />
              <Field label="Nazwisko" value={form.lastName} onChange={(value) => updateField("lastName", value)} />
              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-bold uppercase tracking-wider">E-mail</span>
                <input disabled value={customer?.emailAddress?.emailAddress ?? ""} className="w-full rounded-full border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-5 py-4 opacity-60" />
              </label>
            </fieldset>

            {error && <p role="alert" className="font-bold text-red-600">{error}</p>}
            {message && <p role="status" className="font-bold text-emerald-600">{message}</p>}
            <button disabled={saving} className="rounded-full bg-[color:var(--foreground)] px-8 py-4 font-black uppercase tracking-widest text-[color:var(--surface)] disabled:opacity-50">
              {saving ? "Zapisywanie…" : "Zapisz dane"}
            </button>
          </form>
        )}
      </section>
      <Footer />
      {showSuccessModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/45 p-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="saved-title">
          <div className="w-full max-w-md rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)] p-9 text-center shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] opacity-50">Konto gotowe</p>
            <h2 id="saved-title" className="mt-3 text-3xl font-black uppercase italic">Dane zostały zapisane</h2>
            <p className="mt-4 leading-relaxed opacity-70">Za chwilę przeniesiemy Cię na stronę główną.</p>
            <button type="button" onClick={() => router.push(`/${locale}`)} className="mt-8 rounded-full bg-[color:var(--foreground)] px-7 py-4 font-black uppercase tracking-widest text-[color:var(--surface)]">
              Przejdź teraz
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block">
    <span className="mb-2 block text-sm font-bold uppercase tracking-wider">{label}</span>
    <input required value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-full border border-[color:var(--border)] bg-transparent px-5 py-4 outline-none transition-colors focus:border-[color:var(--foreground)]" />
  </label>;
}