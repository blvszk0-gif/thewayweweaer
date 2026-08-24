const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiVersion = "2025-07";

export async function storefrontFetch<T>(
    query: string,
    variables: Record<string, unknown> = {}
): Promise<T> {
    const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": token,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 60 }, // ISR: odśwież co 60s, żeby nowe wpisy pojawiały się bez redeploya
    });

    if (!res.ok) {
        throw new Error(`Storefront API HTTP error: ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
        throw new Error(`Storefront API GraphQL error: ${JSON.stringify(json.errors)}`);
    }

    return json.data as T;
}