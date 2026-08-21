import { NextRequest, NextResponse } from 'next/server';
import { adminFetch } from '@/lib/shopify/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const entry = attempts.get(ip);
    if (entry?.resetAt && entry.resetAt > now && entry.count >= 5) {
      return NextResponse.json({ error: 'Spróbuj ponownie za kilka minut.' }, { status: 429 });
    }
    attempts.set(ip, { count: entry?.resetAt && entry.resetAt > now ? entry.count + 1 : 1, resetAt: now + 10 * 60 * 1000 });

    const { email, consent } = await request.json() as { email?: string; consent?: boolean };
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
      return NextResponse.json({ error: 'Podaj poprawny adres e-mail.' }, { status: 400 });
    }
    if (consent !== true) {
      return NextResponse.json({ error: 'Potwierdź zgodę na otrzymywanie newslettera.' }, { status: 400 });
    }

    const lookup = await adminFetch<{ customers: { nodes: Array<{ id: string }> } }>(
      `query FindCustomer($query: String!) { customers(first: 1, query: $query) { nodes { id } } }`,
      { query: `email:${normalizedEmail}` },
    );
    const customerId = lookup.customers.nodes[0]?.id;
    const mutation = customerId
      ? `mutation CustomerUpdate($input: CustomerInput!) { customerUpdate(input: $input) { customer { id } userErrors { message } } }`
      : `mutation CustomerCreate($input: CustomerInput!) { customerCreate(input: $input) { customer { id } userErrors { message } } }`;
    const result = await adminFetch<{ customerCreate?: { userErrors: Array<{ message: string }> }; customerUpdate?: { userErrors: Array<{ message: string }> } }>(
      mutation,
      { input: { ...(customerId ? { id: customerId } : { email: normalizedEmail }), emailMarketingConsent: { marketingState: 'SUBSCRIBED', marketingOptInLevel: 'SINGLE_OPT_IN' } } },
    );
    const userErrors = result.customerCreate?.userErrors || result.customerUpdate?.userErrors || [];
    if (userErrors.length) throw new Error('Shopify rejected the subscription request.');

    return NextResponse.json({ ok: true, message: 'Zapis do newslettera został potwierdzony.' });
  } catch (error) {
    console.error('Newsletter subscription failed:', error);
    return NextResponse.json({ error: 'Nie udało się zapisać do newslettera. Spróbuj ponownie później.' }, { status: 502 });
  }
}
