const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const CLIENT_ID = process.env.SHOPIFY_ADMIN_CLIENT_ID!;
const CLIENT_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET!; // to samo "Klucz tajny" co przy webhookach
const ADMIN_API_VERSION = "2025-07";
const SITE_URL = process.env.SITE_URL || "https://www.thewaywewear.pl";

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAdminAccessToken(): Promise<string> {
    const now = Date.now();
    if (cachedToken && cachedToken.expiresAt > now + 60_000) {
        return cachedToken.value;
    }

    const res = await fetch(`https://${SHOP_DOMAIN}/admin/oauth/access_token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }),
    });

    const json = await res.json();
    if (!json.access_token) {
        throw new Error("Nie udało się uzyskać tokenu Admin API: " + JSON.stringify(json));
    }

    // Token client_credentials jest ważny 24h - odświeżamy odrobinę wcześniej
    cachedToken = {
        value: json.access_token,
        expiresAt: now + 23 * 60 * 60 * 1000,
    };

    return cachedToken.value;
}

export async function createProductRedirect(handle: string): Promise<void> {
    const token = await getAdminAccessToken();

    const mutation = `
    mutation CreateRedirect($path: String!, $target: String!) {
      urlRedirectCreate(urlRedirect: { path: $path, target: $target }) {
        urlRedirect { id }
        userErrors { field message }
      }
    }
  `;

    const res = await fetch(`https://${SHOP_DOMAIN}/admin/api/${ADMIN_API_VERSION}/graphql.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": token,
        },
        body: JSON.stringify({
            query: mutation,
            variables: {
                path: `/products/${handle}`,
                target: `${SITE_URL}/product/${handle}`,
            },
        }),
    });

    const json = await res.json();
    const userErrors = json?.data?.urlRedirectCreate?.userErrors;

    if (userErrors?.length) {
        // np. "Path has already been taken" przy powtórnym dostarczeniu tego samego webhooka - nieszkodliwe
        console.warn("urlRedirectCreate userErrors:", userErrors);
    }
}