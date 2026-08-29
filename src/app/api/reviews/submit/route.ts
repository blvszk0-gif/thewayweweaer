import { NextRequest, NextResponse } from 'next/server';

const RECIPIENT = 'zamowienia@thewaywewear.pl';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return NextResponse.json({ error: 'Contact email is not configured.' }, { status: 503 });

  try {
    const body = await request.json() as {
      name?: string;
      email?: string;
      product?: string;
      rating?: number;
      message?: string;
      photoBase64?: string;
      photoName?: string;
      photoType?: string;
    };

    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim();
    const product = (body.product ?? '').trim();
    const message = (body.message ?? '').trim();
    const rating = Number(body.rating);

    if (!name || name.length > 100) return NextResponse.json({ error: 'Invalid name.' }, { status: 400 });
    if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return NextResponse.json({ error: 'Invalid rating.' }, { status: 400 });
    if (!message || message.length > 2000) return NextResponse.json({ error: 'Invalid message.' }, { status: 400 });
    if (product.length > 200) return NextResponse.json({ error: 'Invalid product.' }, { status: 400 });

    let attachments: Array<{ filename: string; content: string; content_type?: string }> | undefined;
    if (body.photoBase64) {
      const approxBytes = (body.photoBase64.length * 3) / 4;
      if (approxBytes > MAX_PHOTO_BYTES) {
        return NextResponse.json({ error: 'Photo too large.' }, { status: 400 });
      }
      attachments = [
        {
          filename: (body.photoName ?? 'zdjecie.jpg').slice(0, 100),
          content: body.photoBase64,
          content_type: body.photoType,
        },
      ];
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: email,
        subject: `Nowa opinia klienta — ${name}`,
        text: `Nowa opinia klienta ze strony\n\nImię: ${name}\nE-mail: ${email}\nProdukt: ${product || '(nie podano)'}\nOcena: ${rating}/5\n\nTreść:\n${message}`,
        attachments,
      }),
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Email provider failed');
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Review submission could not be sent.', error);
    return NextResponse.json({ error: 'Unable to send review.' }, { status: 502 });
  }
}
