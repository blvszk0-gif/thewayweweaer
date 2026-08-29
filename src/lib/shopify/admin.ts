const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const CLIENT_ID = process.env.SHOPIFY_ADMIN_CLIENT_ID!;
const CLIENT_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET!;
const ADMIN_API_VERSION = "2025-07";
const SITE_URL = process.env.SITE_URL || "https://www.thewaywewear.pl";

let cachedToken: { value: string; expiresAt: number } | null = null;

async function safeJson(res: Response, context: string): Promise<any> {
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        throw new Error(
            `[${context}] Odpowiedź nie jest poprawnym JSON-em (status ${res.status}). Pierwsze 300 znaków: ${text.slice(0, 300)}`
        );
    }
}

async function getAdminAccessToken(): Promise<string> {
    const now = Date.now();
    if (cachedToken && cachedToken.expiresAt > now + 60_000) {
        return cachedToken.value;
    }

    if (!CLIENT_ID || !CLIENT_SECRET || !SHOP_DOMAIN) {
        throw new Error(
            `Brak wymaganej zmiennej środowiskowej: SHOPIFY_ADMIN_CLIENT_ID=${!!CLIENT_ID}, SHOPIFY_WEBHOOK_SECRET=${!!CLIENT_SECRET}, SHOPIFY_STORE_DOMAIN=${!!SHOP_DOMAIN}`
        );
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

    const json = await safeJson(res, "getAdminAccessToken");

    if (!json.access_token) {
        throw new Error("Nie udało się uzyskać tokenu Admin API: " + JSON.stringify(json));
    }

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

    const json = await safeJson(res, "createProductRedirect");
    const userErrors = json?.data?.urlRedirectCreate?.userErrors;

    if (userErrors?.length) {
        console.warn("urlRedirectCreate userErrors:", userErrors);
    }
}