import { NextRequest, NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const attempts = new Map<string, { count: number; resetAt: number }>();
const apiVersion = process.env.SHOPIFY_API_VERSION || '2026-07';

function getShopDomain() {
  const rawDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  if (!rawDomain) throw new Error('Brak konfiguracji SHOPIFY_STORE_DOMAIN.');
  const url = new URL(rawDomain.startsWith('http') ? rawDomain : `https://${rawDomain}`);
  return url.hostname;
}

function getAdminToken() {
  const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN?.trim();
  if (!token) throw new Error('Brak konfiguracji SHOPIFY_ADMIN_ACCESS_TOKEN.');
  return token;
}

async function readJsonSafely(response: Response) {
  const raw = await response.text();
  try {
    return JSON.parse(raw) as {
      data?: { customerCreate?: { userErrors?: Array<{ message: string }> } };
      errors?: Array<{ message: string }>;
    };
  } catch {
    throw new Error(`Shopify zwrócił nieprawidłową odpowiedź (HTTP ${response.status}).`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const attempt = attempts.get(ip);
    if (attempt && attempt.resetAt > now && attempt.count >= 5) {
      return NextResponse.json({ error: 'Spróbuj ponownie za kilka minut.' }, { status: 429 });
    }
    attempts.set(ip, { count: attempt && attempt.resetAt > now ? attempt.count + 1 : 1, resetAt: now + 10 * 60 * 1000 });

    const { email, consent } = await request.json() as { email?: string; consent?: boolean };
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
      return NextResponse.json({ error: 'Podaj poprawny adres e-mail.' }, { status: 400 });
    }
    if (consent !== true) {
      return NextResponse.json({ error: 'Potwierdź zgodę na otrzymywanie newslettera.' }, { status: 400 });
    }

    const response = await fetch(`https://${getShopDomain()}/admin/api/${apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Shopify-Access-Token': getAdminToken(),
      },
      body: JSON.stringify({
        query: `mutation CustomerCreate($input: CustomerInput!) {
          customerCreate(input: $input) {
            customer { id email emailMarketingConsent { marketingState } }
            userErrors { field message }
          }
        }`,
        variables: {
          input: {
            email: normalizedEmail,
            emailMarketingConsent: { marketingState: 'SUBSCRIBED', marketingOptInLevel: 'SINGLE_OPT_IN' },
          },
        },
      }),
      cache: 'no-store',
    });

    const result = await readJsonSafely(response);
    const apiError = result.errors?.map((item) => item.message).join(', ');
    const userErrors = result.data?.customerCreate?.userErrors || [];
    if (!response.ok || apiError) throw new Error(apiError || `Shopify API zwróciło HTTP ${response.status}.`);
    if (userErrors.length) {
      const duplicate = userErrors.some(({ message }) => /email.*(taken|exists|already)/i.test(message));
      if (duplicate) return NextResponse.json({ ok: true, message: 'Ten adres jest już zapisany do newslettera.' });
      return NextResponse.json({ error: userErrors[0].message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, message: 'Zapis do newslettera został potwierdzony.' });
  } catch (error) {
    console.error('Newsletter subscription failed:', error);
    const reason = error instanceof Error ? error.message : 'Nieznany błąd newslettera.';
    return NextResponse.json({
      error: 'Nie udało się zapisać do newslettera. Spróbuj ponownie później.',
      ...(process.env.VERCEL_ENV === 'preview' ? { debug: reason } : {}),
    }, { status: 502 });
  }
}
