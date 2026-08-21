import { NextResponse } from 'next/server';
import crypto from 'crypto';

function base64UrlEncode(str: Buffer) {
  return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export async function GET(req: Request) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN || '';
  const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || '';
  const shopifyStore = domain.replace(/^https?:\/\//, '');

  if (!clientId || !shopifyStore) {
    return NextResponse.json(
      { error: 'Shopify Customer Account API Client ID is not configured.' },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const origin = `${url.protocol}//${url.host}`;
  const redirectUri = `${origin}/api/auth/callback`;

  // Generate PKCE code_verifier and code_challenge
  const verifier = base64UrlEncode(crypto.randomBytes(32));
  const challenge = base64UrlEncode(crypto.createHash('sha256').update(verifier).digest());
  const state = base64UrlEncode(crypto.randomBytes(16));

  const authUrl = new URL(`https://shopify.com/${clientId}/auth/oauth/authorize`);
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', 'openid email https://api.shopify.com/auth/customer.read-orders');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', challenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  const response = NextResponse.redirect(authUrl.toString());

  // Set cookies for PKCE verification
  response.cookies.set('twww_oauth_state', state, { httpOnly: true, secure: true, path: '/', maxAge: 600 });
  response.cookies.set('twww_code_verifier', verifier, { httpOnly: true, secure: true, path: '/', maxAge: 600 });

  return response;
}
