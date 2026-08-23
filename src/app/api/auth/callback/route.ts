import { NextRequest, NextResponse } from "next/server";

import {
  customerClientId,
  customerOpenIdConfiguration,
  CUSTOMER_TOKEN_COOKIE,
  PKCE_COOKIE,
  RETURN_TO_COOKIE,
} from "@/lib/shopify/customer-auth";


export async function GET(request: NextRequest) {

  console.log(
    "CALLBACK URL:",
    request.url
  );

  console.log(
    "CALLBACK COOKIES:",
    request.cookies.getAll()
  );

  console.log(
    "CALLBACK CODE:",
    request.nextUrl.searchParams.get("code")
  );

  console.log(
    "CALLBACK STATE:",
    request.nextUrl.searchParams.get("state")
  );


  const code =
    request.nextUrl.searchParams.get("code");

  const state =
    request.nextUrl.searchParams.get("state");


  const pkceValue =
    request.cookies.get(PKCE_COOKIE)?.value;


  console.log(
    "PKCE COOKIE VALUE:",
    pkceValue
  );


  if (!code || !state || !pkceValue) {

    console.log(
      "MISSING DATA:",
      {
        hasCode: !!code,
        hasState: !!state,
        hasPkce: !!pkceValue,
      }
    );

    return NextResponse.redirect(
      new URL(
        "/login?error=missing",
        request.url
      )
    );
  }


  let pkce;

  try {

    pkce = JSON.parse(pkceValue);

  } catch(error) {

    console.log(
      "PKCE JSON ERROR:",
      error
    );

    return NextResponse.redirect(
      new URL(
        "/login?error=pkce",
        request.url
      )
    );
  }


  if (pkce.state !== state) {

    console.log(
      "STATE MISMATCH:",
      {
        cookieState: pkce.state,
        requestState: state,
      }
    );

    return NextResponse.redirect(
      new URL(
        "/login?error=state",
        request.url
      )
    );
  }


  const configuration =
    await customerOpenIdConfiguration();


  const callbackUrl =
    process.env.SHOPIFY_REDIRECT_URI;


  if (!callbackUrl) {

    throw new Error(
      "Missing SHOPIFY_REDIRECT_URI"
    );

  }


  const tokenResponse =
    await fetch(
      configuration.token_endpoint,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body:
          new URLSearchParams({

            grant_type:
              "authorization_code",

            client_id:
              customerClientId(),

            code,

            redirect_uri:
              callbackUrl,

            code_verifier:
              pkce.verifier,

          }),

      }
    );


  const token =
    await tokenResponse.json();


  console.log(
    "TOKEN STATUS:",
    tokenResponse.status
  );


  console.log(
    "TOKEN RESPONSE:",
    token
  );


  if (
    !tokenResponse.ok ||
    !token.access_token
  ) {

    return NextResponse.redirect(
      new URL(
        "/login?error=token",
        request.url
      )
    );

  }


  const response =
    NextResponse.redirect(
      new URL(
        "/pl/account",
        request.url
      )
    );


  response.cookies.set(
    CUSTOMER_TOKEN_COOKIE,
    token.access_token,
    {
      httpOnly: true,

      secure:
        process.env.NODE_ENV === "production",

      sameSite: "lax",

      path: "/",

      maxAge: 3600,
    }
  );


  response.cookies.delete(
    PKCE_COOKIE
  );


  response.cookies.delete(
    RETURN_TO_COOKIE
  );


  console.log(
    "COOKIE SET:",
    CUSTOMER_TOKEN_COOKIE
  );


  return response;

}