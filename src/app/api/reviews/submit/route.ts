import { NextRequest, NextResponse } from 'next/server';
import { submitReviewToJudgeMe } from '@/lib/judgeme/submitReview';
import { uploadReviewPhoto } from '@/lib/shopify/uploadReviewPhoto';

const RECIPIENT = 'zamowienia@thewaywewear.pl';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

export async function POST(request: NextRequest) {
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

    if (body.photoBase64) {
      const approxBytes = (body.photoBase64.length * 3) / 4;
      if (approxBytes > MAX_PHOTO_BYTES) {
        return NextResponse.json({ error: 'Photo too large.' }, { status: 400 });
      }
    }

    // Preferred path: land the review straight in Judge.me's moderation
    // queue, next to every other review this shop already manages there.
    let photoUrl: string | null = null;
    if (body.photoBase64) {
      photoUrl = await uploadReviewPhoto(
        body.photoBase64,
        body.photoName ?? 'zdjecie.jpg',
        body.photoType ?? 'image/jpeg'
      );
    }

    const submittedToJudgeMe = await submitReviewToJudgeMe({
      name,
      email,
      rating,
      title: product || undefined,
      body: message,
      pictureUrls: photoUrl ? [photoUrl] : undefined,
    });

    if (submittedToJudgeMe) {
      return NextResponse.json({ ok: true, via: 'judgeme' });
    }

    // Fallback: Judge.me isn't configured or the submission failed for some
    // reason — email the review so it's never silently lost.
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !from) return NextResponse.json({ error: 'Contact email is not configured.' }, { status: 503 });

    const attachments = body.photoBase64
      ? [
        {
          filename: (body.photoName ?? 'zdjecie.jpg').slice(0, 100),
          content: body.photoBase64,
          content_type: body.photoType,
        },
      ]
      : undefined;

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
    return NextResponse.json({ ok: true, via: 'email' });
  } catch (error) {
    console.error('Review submission could not be sent.', error);
    return NextResponse.json({ error: 'Unable to send review.' }, { status: 502 });
  }
}
