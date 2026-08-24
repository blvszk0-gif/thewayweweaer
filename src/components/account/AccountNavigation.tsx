'use client';

type AccountNavigationProps = {
  active: string;
  onChange: (tab: string) => void;
};

export function AccountNavigation({
  active,
  onChange,
}: AccountNavigationProps) {
  const items = [
    {
      id: 'profile',
      label: 'Profil',
    },
    {
      id: 'orders',
      label: 'Zamówienia',
    },
    {
      id: 'addresses',
      label: 'Adresy',
    },
  ];

  return (
    <nav className="mb-12">
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`
              px-6 py-3 rounded-full
              font-black uppercase tracking-widest text-sm
              border transition-all
              ${
                active === item.id
                  ? 'bg-[color:var(--foreground)] text-[color:var(--surface)]'
                  : 'border-[color:var(--border)]'
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
