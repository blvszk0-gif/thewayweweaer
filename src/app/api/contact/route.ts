import { NextRequest, NextResponse } from 'next/server';
import { CUSTOMER_TOKEN_COOKIE, customerApiFetch } from '@/lib/shopify/customer-auth';

const RECIPIENT = 'zamowienia@thewaywewear.pl';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(CUSTOMER_TOKEN_COOKIE)?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return NextResponse.json({ error: 'Contact email is not configured.' }, { status: 503 });

  try {
    const body = await request.json() as { type?: string; message?: string };
    if (body.type !== 'account_deletion' || typeof body.message !== 'string' || body.message.length > 2000) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }
    const data = await customerApiFetch<{ customer: { emailAddress: { emailAddress: string } | null } | null }>(
      token,
      `query ContactCustomer { customer { emailAddress { emailAddress } } }`
    );
    const customerEmail = data.customer?.emailAddress?.emailAddress;
    if (!customerEmail) return NextResponse.json({ error: 'Customer email unavailable.' }, { status: 400 });

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: customerEmail,
        subject: `Wniosek o usunięcie konta — ${customerEmail}`,
        text: `Wniosek o usunięcie konta\n\nAdres konta: ${customerEmail}\n\nWiadomość klienta:\n${body.message.trim() || '(brak dodatkowej wiadomości)'}`,
      }),
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Email provider failed');
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Account deletion request could not be sent.', error);
    return NextResponse.json({ error: 'Unable to send request.' }, { status: 502 });
  }
}
