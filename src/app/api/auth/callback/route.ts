import { NextRequest, NextResponse } from "next/server";

import {
  customerClientId,
  customerApiFetch,
  customerOpenIdConfiguration,
  customerRedirectUri,
  CUSTOMER_TOKEN_COOKIE,
  PKCE_COOKIE,
  RETURN_TO_COOKIE,
} from "@/lib/shopify/customer-auth";

const loginError = (request: NextRequest, reason: string) =>
  NextResponse.redirect(new URL(`/pl/login?error=${reason}`, request.url));

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const pkceValue = request.cookies.get(PKCE_COOKIE)?.value;

  if (!code || !state || !pkceValue) {
    return loginError(request, "missing");
  }

  let pkce: { verifier: string; state: string };
  try {
    pkce = JSON.parse(pkceValue);
  } catch {
    return loginError(request, "pkce");
  }

  if (pkce.state !== state) {
    return loginError(request, "state");
  }

  try {
    const configuration = await customerOpenIdConfiguration();
    const redirectUri = customerRedirectUri();
    const tokenResponse = await fetch(configuration.token_endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: customerClientId(),
        code,
        redirect_uri: redirectUri,
        code_verifier: pkce.verifier,
      }),
      cache: "no-store",
    });
    const token = (await tokenResponse.json()) as {
      access_token?: string;
      expires_in?: number;
    };

    if (!tokenResponse.ok || !token.access_token) {
      return loginError(request, "token");
    }

    const returnTo = request.cookies.get(RETURN_TO_COOKIE)?.value;
    const safeReturnTo = returnTo?.startsWith("/") && !returnTo.startsWith("//")
      ? returnTo
      : "/pl/account";
    const locale = safeReturnTo.match(/^\/(pl|en|uk)(?:\/|$)/)?.[1] ?? "pl";
    const account = await customerApiFetch<{
      customer: {
        firstName: string | null;
        lastName: string | null;
        defaultAddress: {
          address1: string | null;
          city: string | null;
          zip: string | null;
          zoneCode: string | null;
        } | null;
      } | null;
    }>(
      token.access_token,
      `query CustomerSetupStatus {
        customer {
          firstName
          lastName
          defaultAddress {
            address1
            city
            zip
            zoneCode
          }
        }
      }`
    );
    const customer = account.customer;
    const profileIncomplete = !customer?.firstName || !customer.lastName ||
      !customer.defaultAddress?.address1 || !customer.defaultAddress?.city ||
      !customer.defaultAddress?.zip || !customer.defaultAddress?.zoneCode;
    const destination = profileIncomplete
      ? `/${locale}/account/profile?setup=1`
      : safeReturnTo;
    const response = NextResponse.redirect(new URL(destination, request.url));

    response.cookies.set(CUSTOMER_TOKEN_COOKIE, token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: typeof token.expires_in === "number" ? token.expires_in : 60 * 60,
    });
    response.cookies.delete(PKCE_COOKIE);
    response.cookies.delete(RETURN_TO_COOKIE);

    return response;
  } catch (error) {
    console.error("Customer token exchange failed.", error);
    return loginError(request, "token");
  }
}
