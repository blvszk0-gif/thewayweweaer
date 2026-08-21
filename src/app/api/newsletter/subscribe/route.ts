import { NextResponse } from 'next/server';
import { subscribeNewsletterAdmin } from '@/lib/shopify';

const ipRateLimitMap = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const lastRequestTime = ipRateLimitMap.get(ip) || 0;

    if (now - lastRequestTime < 2000) {
      return NextResponse.json(
        { message: 'Za dużo żądań. Spróbuj ponownie za chwilę.' },
        { status: 429 }
      );
    }
    ipRateLimitMap.set(ip, now);

    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Podaj poprawny adres e-mail.' },
        { status: 400 }
      );
    }

    const res = await subscribeNewsletterAdmin(email.trim().toLowerCase());
    const userErrors = res.data?.customerCreate?.userErrors;

    if (userErrors && userErrors.length > 0) {
      const isDuplicate = userErrors.some((e: any) =>
        e.message?.toLowerCase().includes('taken') || e.message?.toLowerCase().includes('exists')
      );

      if (isDuplicate) {
        return NextResponse.json({
          message: 'Twój e-mail jest już zarejestrowany. Sprawdź swoją skrzynkę odbiorczą, aby potwierdzić subskrypcję.',
          status: 'success'
        });
      }
    }

    return NextResponse.json({
      message: 'Na Twój adres e-mail wysłaliśmy link potwierdzający subskrypcję (Double Opt-in). Sprawdź skrzynkę odbiorczą.',
      status: 'success'
    });
  } catch {
    console.error('An error occurred during newsletter subscription processing.');
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas zapisywania. Spróbuj ponownie.' },
      { status: 500 }
    );
  }
}
