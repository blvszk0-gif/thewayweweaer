import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = `${url.protocol}//${url.host}`;

  const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || '';
  const response = NextResponse.redirect(
    clientId ? `https://shopify.com/${clientId}/auth/logout?post_logout_redirect_uri=${origin}` : `${origin}/`
  );

  response.cookies.delete('twww_customer_session');
  response.cookies.delete('twww_oauth_state');
  response.cookies.delete('twww_code_verifier');

  return response;
}
