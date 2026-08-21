import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const cookieStore = await cookies();
  const savedState = cookieStore.get('twww_oauth_state')?.value;
  const verifier = cookieStore.get('twww_code_verifier')?.value;

  const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || '';

  if (!code || !state || state !== savedState || !verifier || !clientId) {
    console.error('OAuth Callback State or PKCE validation failed.');
    return NextResponse.redirect(new URL('/account?error=oauth_failed', req.url));
  }

  const url = new URL(req.url);
  const origin = `${url.protocol}//${url.host}`;
  const redirectUri = `${origin}/api/auth/callback`;

  try {
    const tokenRes = await fetch(`https://shopify.com/${clientId}/auth/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: redirectUri,
        code,
        code_verifier: verifier,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error('Failed to exchange authorization code for access token.');
      return NextResponse.redirect(new URL('/account?error=token_exchange_failed', req.url));
    }

    const response = NextResponse.redirect(new URL('/account', req.url));

    // Clear temp OAuth cookies and set session cookie
    response.cookies.delete('twww_oauth_state');
    response.cookies.delete('twww_code_verifier');
    response.cookies.set('twww_customer_session', tokenData.access_token, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: tokenData.expires_in || 86400,
    });

    return response;
  } catch (error) {
    console.error('OAuth Callback Exception:', error);
    return NextResponse.redirect(new URL('/account?error=oauth_exception', req.url));
  }
}
