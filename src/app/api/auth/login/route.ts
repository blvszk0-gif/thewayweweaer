import { NextRequest, NextResponse } from "next/server";

import {
  customerClientId,
  customerOpenIdConfiguration,
  generatePkce,
  PKCE_COOKIE,
  RETURN_TO_COOKIE,
} from "@/lib/shopify/customer-auth";


export async function GET(request: NextRequest) {

  try {

    const {
      verifier,
      challenge,
      state,
    } = generatePkce();


    const configuration =
      await customerOpenIdConfiguration();


    console.log(
      "SHOPIFY OPENID CONFIG",
      configuration
    );


    const callbackUrl =
      process.env.SHOPIFY_REDIRECT_URI;


    console.log(
      "REDIRECT URI FROM ENV:",
      callbackUrl
    );


    if (!callbackUrl) {
      throw new Error(
        "Missing SHOPIFY_REDIRECT_URI"
      );
    }


    const authorizationUrl =
      new URL(
        configuration.authorization_endpoint
      );


    console.log(
      "CLIENT ID USED:",
      customerClientId()
    );


    authorizationUrl.searchParams.set(
      "client_id",
      customerClientId()
    );


    authorizationUrl.searchParams.set(
      "response_type",
      "code"
    );


    authorizationUrl.searchParams.set(
      "redirect_uri",
      callbackUrl
    );


    authorizationUrl.searchParams.set(
      "scope",
      "openid email customer-account-api:full"
    );


    authorizationUrl.searchParams.set(
      "state",
      state
    );


    authorizationUrl.searchParams.set(
      "code_challenge",
      challenge
    );


    authorizationUrl.searchParams.set(
      "code_challenge_method",
      "S256"
    );


    console.log(
      "FINAL AUTH URL:",
      authorizationUrl.toString()
    );


    const returnTo =
      request.nextUrl.searchParams.get(
        "returnTo"
      ) || "/account";


    const response =
      NextResponse.redirect(
        authorizationUrl
      );


    response.cookies.set(
      PKCE_COOKIE,
      JSON.stringify({
        verifier,
        state,
      }),
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 600,
      }
    );


    response.cookies.set(
      RETURN_TO_COOKIE,
      returnTo.startsWith("/") &&
      !returnTo.startsWith("//")
        ? returnTo
        : "/account",
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 600,
      }
    );


    return response;


  } catch(error) {

    console.error(
      "CUSTOMER LOGIN ERROR FULL:",
      error
    );


    return NextResponse.json(
      {
        error: String(error),
        stack:
          error instanceof Error
            ? error.stack
            : null,
      },
      {
        status: 500,
      }
    );

  }

}