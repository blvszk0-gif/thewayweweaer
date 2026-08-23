import { NextRequest, NextResponse } from "next/server";

import {
  customerClientId,
  customerOpenIdConfiguration,
  CUSTOMER_TOKEN_COOKIE,
  PKCE_COOKIE,
  RETURN_TO_COOKIE,
} from "@/lib/shopify/customer-auth";


export async function GET(request: NextRequest) {

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  const pkceValue =
    request.cookies.get(PKCE_COOKIE)?.value;


  if (!code || !state || !pkceValue) {
    return NextResponse.redirect(
      new URL("/login?error=missing", request.url)
    );
  }


  const pkce = JSON.parse(pkceValue);


  if (pkce.state !== state) {
    return NextResponse.redirect(
      new URL("/login?error=state", request.url)
    );
  }


  const configuration =
    await customerOpenIdConfiguration();


  const callbackUrl =
    new URL(
      "/api/auth/callback",
      request.url
    ).toString();


  const tokenResponse =
    await fetch(
      configuration.token_endpoint,
      {
        method: "POST",

        headers:{
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body:
          new URLSearchParams({
            grant_type:"authorization_code",
            client_id:customerClientId(),
            code,
            redirect_uri:callbackUrl,
            code_verifier:pkce.verifier,
          }),
      }
    );


  const token =
    await tokenResponse.json();


  console.log(
    "TOKEN STATUS",
    tokenResponse.status
  );


  if(
    !tokenResponse.ok ||
    !token.access_token
  ){

    console.log(
      "TOKEN ERROR",
      token
    );

    return NextResponse.redirect(
      new URL("/login?error=token",request.url)
    );
  }



  const response =
    NextResponse.redirect(
      new URL("/pl/account", request.url)
    );



  response.cookies.set(
    CUSTOMER_TOKEN_COOKIE,
    token.access_token,
    {
      httpOnly:true,
      secure:false,
      sameSite:"lax",
      path:"/",
      maxAge:3600,
    }
  );


  response.cookies.delete(PKCE_COOKIE);
  response.cookies.delete(RETURN_TO_COOKIE);



  console.log(
    "COOKIE SET:",
    CUSTOMER_TOKEN_COOKIE
  );


  return response;
}