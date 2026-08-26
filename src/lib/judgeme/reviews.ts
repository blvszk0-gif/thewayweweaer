export interface StoreReview {
    id: number;
    rating: number;
    title: string | null;
    body: string;
    reviewerName: string;
    pictureUrl: string | null;
}

const JUDGEME_API_TOKEN = process.env.JUDGEME_API_TOKEN!;
const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;

export async function getStoreReviewsWithPhotos(
    limit: number = 6
): Promise<StoreReview[]> {
    const url = new URL("https://api.judge.me/api/v1/reviews");
    url.searchParams.set("api_token", JUDGEME_API_TOKEN);
    url.searchParams.set("shop_domain", SHOP_DOMAIN);
    url.searchParams.set("per_page", "50");

    const res = await fetch(url.toString(), {
        next: { revalidate: 300 }, // 5 min cache
    });

    if (!res.ok) {
        console.error("Judge.me API error", res.status);
        return [];
    }

    const json = await res.json();

    // UWAGA: dokładne nazwy pól (np. "pictures", "reviewer") zweryfikuj
    // na żywej odpowiedzi po podłączeniu tokenu — poniżej najbardziej
    // prawdopodobny kształt wg dokumentacji Judge.me.
    const reviews = (json.reviews ?? []) as any[];

    return reviews
        .filter((r) => r.published && Array.isArray(r.pictures) && r.pictures.length > 0)
        .slice(0, limit)
        .map((r) => ({
            id: r.id,
            rating: r.rating,
            title: r.title ?? null,
            body: r.body,
            reviewerName: r.reviewer?.name ?? "Klient",
            pictureUrl: r.pictures?.[0]?.urls?.original ?? r.pictures?.[0]?.url ?? null,
        }));
}