import { NextRequest, NextResponse } from "next/server";

import {
  customerClientId,
  customerOpenIdConfiguration,
  customerRedirectUri,
  generatePkce,
  PKCE_COOKIE,
  RETURN_TO_COOKIE,
} from "@/lib/shopify/customer-auth";

export async function GET(request: NextRequest) {
  try {
    const { verifier, challenge, state } = generatePkce();
    const configuration = await customerOpenIdConfiguration();
    const callbackUrl = customerRedirectUri();
    const authorizationUrl = new URL(configuration.authorization_endpoint);

    authorizationUrl.searchParams.set("client_id", customerClientId());
    authorizationUrl.searchParams.set("response_type", "code");
    authorizationUrl.searchParams.set("redirect_uri", callbackUrl);
    authorizationUrl.searchParams.set("scope", "openid email customer-account-api:full");
    authorizationUrl.searchParams.set("state", state);
    authorizationUrl.searchParams.set("code_challenge", challenge);
    authorizationUrl.searchParams.set("code_challenge_method", "S256");

    const requestedReturnTo = request.nextUrl.searchParams.get("returnTo") || "/pl/account";
    const returnTo = requestedReturnTo.startsWith("/") && !requestedReturnTo.startsWith("//")
      ? requestedReturnTo
      : "/pl/account";
    const response = NextResponse.redirect(authorizationUrl);

    response.cookies.set(PKCE_COOKIE, JSON.stringify({ verifier, state }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });
    response.cookies.set(RETURN_TO_COOKIE, returnTo, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });

    return response;
  } catch (error) {
    console.error("Customer login could not be started.", error);
    return NextResponse.json({ error: "Unable to start customer login." }, { status: 500 });
  }
}
