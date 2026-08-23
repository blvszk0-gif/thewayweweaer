import { NextRequest, NextResponse } from 'next/server';
import { customerClientId, customerOpenIdConfiguration, generatePkce, PKCE_COOKIE, RETURN_TO_COOKIE } from '@/lib/shopify/customer-auth';

export async function GET(request: NextRequest) {
  try {
    const { verifier, challenge, state } = generatePkce();
    const configuration = await customerOpenIdConfiguration();
    console.log('SHOPIFY OPENID CONFIG', configuration);
    const callbackUrl = new URL('/api/auth/callback', request.nextUrl.origin).toString();
    const authorizationUrl = new URL(configuration.authorization_endpoint);
    console.log( "CLIENT ID USED:", customerClientId());
    authorizationUrl.searchParams.set('client_id', customerClientId());
    authorizationUrl.searchParams.set('response_type', 'code');
    authorizationUrl.searchParams.set('redirect_uri', callbackUrl);
    authorizationUrl.searchParams.set('scope',   'openid email');
    authorizationUrl.searchParams.set('audience', configuration.graphql_api || '');
    authorizationUrl.searchParams.set('state', state);
    authorizationUrl.searchParams.set('code_challenge', challenge);
    authorizationUrl.searchParams.set('code_challenge_method', 'S256');
    const returnTo = request.nextUrl.searchParams.get('returnTo') || '/account';
    const response = NextResponse.redirect(authorizationUrl);
    response.cookies.set(PKCE_COOKIE, JSON.stringify({ verifier, state }), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 600 });
    response.cookies.set(RETURN_TO_COOKIE, returnTo.startsWith('/') && !returnTo.startsWith('//') ? returnTo : '/account', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 600 });
    return response;
  } catch {
    return NextResponse.redirect(new URL('/login?error=configuration', request.nextUrl.origin));
  }
}