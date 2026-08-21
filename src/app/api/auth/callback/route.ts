import { NextRequest, NextResponse } from 'next/server';
import { customerClientId, customerOpenIdConfiguration, CUSTOMER_TOKEN_COOKIE, PKCE_COOKIE, RETURN_TO_COOKIE } from '@/lib/shopify/customer-auth';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const pkceValue = request.cookies.get(PKCE_COOKIE)?.value;
  const returnTo = request.cookies.get(RETURN_TO_COOKIE)?.value || '/account';
  const fail = () => {
    const response = NextResponse.redirect(new URL('/login?error=authentication', request.nextUrl.origin));
    response.cookies.delete(PKCE_COOKIE); response.cookies.delete(RETURN_TO_COOKIE);
    return response;
  };
  if (!code || !state || !pkceValue) return fail();

  try {
    const pkce = JSON.parse(pkceValue) as { verifier: string; state: string };
    if (pkce.state !== state) return fail();
    const configuration = await customerOpenIdConfiguration();
    const callbackUrl = new URL('/api/auth/callback', request.nextUrl.origin).toString();
    const tokenResponse = await fetch(configuration.token_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'authorization_code', client_id: customerClientId(), code, redirect_uri: callbackUrl, code_verifier: pkce.verifier }),
      cache: 'no-store',
    });
    const token = await tokenResponse.json() as { access_token?: string; expires_in?: number };
    if (!tokenResponse.ok || !token.access_token) return fail();
    const response = NextResponse.redirect(new URL(returnTo.startsWith('/') && !returnTo.startsWith('//') ? returnTo : '/account', request.nextUrl.origin));
    response.cookies.set(CUSTOMER_TOKEN_COOKIE, token.access_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: Math.min(Number(token.expires_in) || 3600, 60 * 60 * 24) });
    response.cookies.delete(PKCE_COOKIE); response.cookies.delete(RETURN_TO_COOKIE);
    return response;
  } catch { return fail(); }
}
