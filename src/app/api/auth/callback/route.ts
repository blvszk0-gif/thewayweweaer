import { NextRequest, NextResponse } from "next/server";

import {
  customerClientId,
  customerOpenIdConfiguration,
  CUSTOMER_TOKEN_COOKIE,
  PKCE_COOKIE,
  RETURN_TO_COOKIE,
} from "@/lib/shopify/customer-auth";


export async function GET(request: NextRequest) {

  console.log("🔥 CALLBACK HIT");

  console.log(
    "CALLBACK URL:",
    request.url
  );


  console.log(
    "CALLBACK COOKIES:",
    request.cookies.getAll()
  );


  const code =
    request.nextUrl.searchParams.get("code");

  const state =
    request.nextUrl.searchParams.get("state");


  console.log(
    "CALLBACK CODE EXISTS:",
    !!code
  );

  console.log(
    "CALLBACK STATE EXISTS:",
    !!state
  );


  const pkceValue =
    request.cookies.get(PKCE_COOKIE)?.value;


  console.log(
    "PKCE COOKIE:",
    pkceValue
  );


  if (!code || !state || !pkceValue) {

    console.log(
      "MISSING DATA",
      {
        code: !!code,
        state: !!state,
        pkce: !!pkceValue,
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
      "PKCE PARSE ERROR",
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
      "STATE ERROR",
      {
        cookieState: pkce.state,
        urlState: state,
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



  const redirectUri =
    process.env.SHOPIFY_REDIRECT_URI;



  if (!redirectUri) {

    throw new Error(
      "Missing SHOPIFY_REDIRECT_URI"
    );
  }



  console.log(
    "TOKEN ENDPOINT:",
    configuration.token_endpoint
  );


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
              redirectUri,

            code_verifier:
              pkce.verifier,

          }),

      }
    );



  const rawToken =
    await tokenResponse.text();



  console.log(
    "TOKEN STATUS:",
    tokenResponse.status
  );


  console.log(
    "TOKEN CONTENT TYPE:",
    tokenResponse.headers.get(
      "content-type"
    )
  );


  console.log(
    "TOKEN RAW RESPONSE:",
    rawToken.slice(0,500)
  );



  let token;


  try {

    token =
      JSON.parse(rawToken);

  } catch(error) {


    console.log(
      "TOKEN JSON ERROR",
      error
    );


    return NextResponse.redirect(
      new URL(
        "/login?error=token-json",
        request.url
      )
    );
  }



  console.log(
    "TOKEN OBJECT:",
    token
  );



  if (
    !tokenResponse.ok ||
    !token.access_token
  ) {


    console.log(
      "TOKEN FAILED",
      token
    );


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

      sameSite:
        "lax",

      path:
        "/",

      maxAge:
        60 * 60,

    }
  );



  console.log(
    "CUSTOMER TOKEN COOKIE SET:",
    CUSTOMER_TOKEN_COOKIE
  );



  response.cookies.delete(
    PKCE_COOKIE
  );


  response.cookies.delete(
    RETURN_TO_COOKIE
  );



  console.log(
    "SET COOKIE HEADER:",
    response.headers.get(
      "set-cookie"
    )
  );



  return response;

}