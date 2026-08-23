'use client';

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type WishlistProps = {
  items: WishlistItem[];
  removeFromWishlist: (id: string) => void;
};

export function Wishlist({
  items,
  removeFromWishlist,
}: WishlistProps) {
  return (
    <section>
      <h2 className="text-2xl font-black uppercase italic mb-8">
        Lista życzeń
      </h2>

      {items.length === 0 ? (
        <p className="opacity-50">
          Twoja lista życzeń jest pusta.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="border border-[color:var(--border)] rounded-2xl p-5 flex gap-5"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-[color:var(--surface-muted)]">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest opacity-50 font-black">
                  {item.category}
                </p>

                <h3 className="font-black text-lg mt-1">
                  {item.name}
                </h3>

                <p className="font-black mt-2">
                  {item.price} PLN
                </p>

                <button
                  type="button"
                  onClick={() => removeFromWishlist(item.id)}
                  className="mt-4 text-xs uppercase tracking-widest font-black opacity-50 hover:opacity-100"
                >
                  Usuń
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}