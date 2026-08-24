import "server-only";

import { createHash, randomBytes } from "crypto";


type OpenIdConfiguration = {
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint?: string;
};



function shopDomain() {

  const domain =
    process.env.SHOPIFY_STORE_DOMAIN
      ?.replace(/^https?:\/\//, "")
      .replace(/\/$/, "");


  if (!domain) {
    throw new Error(
      "Missing SHOPIFY_STORE_DOMAIN."
    );
  }


  return domain;

}





export async function customerOpenIdConfiguration(): Promise<OpenIdConfiguration> {

  const response =
    await fetch(
      `https://${shopDomain()}/.well-known/openid-configuration`,
      {
        cache: "no-store",
      }
    );


  if (!response.ok) {
    throw new Error(
      "Unable to load Shopify OpenID configuration."
    );
  }


  return response.json();

}





export function generatePkce() {

  const verifier =
    randomBytes(48)
      .toString("base64url");


  return {

    verifier,


    challenge:
      createHash("sha256")
        .update(verifier)
        .digest("base64url"),


    state:
      randomBytes(24)
        .toString("base64url"),

  };

}





export function customerClientId() {

  const clientId =
    process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID;


  if (!clientId) {

    throw new Error(
      "Missing SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID."
    );

  }


  return clientId;

}

export function customerRedirectUri() {
  const redirectUri = process.env.SHOPIFY_REDIRECT_URI;

  if (!redirectUri) {
    throw new Error("Missing SHOPIFY_REDIRECT_URI.");
  }

  return redirectUri;
}





export async function customerApiFetch<T>(
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {


  const shop =
    shopDomain();



  const discoveryResponse =
    await fetch(
      `https://${shop}/.well-known/customer-account-api`,
      {
        cache: "no-store",
      }
    );



  if (!discoveryResponse.ok) {

    throw new Error(
      "Customer Account API discovery failed."
    );

  }



  const discovery =
    await discoveryResponse.json();



  const endpoint =
    discovery.graphql_api;



  if (!endpoint) {

    throw new Error(
      "Missing graphql_api endpoint."
    );

  }



  const response =
    await fetch(
      endpoint,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            accessToken,
        },


        body:
          JSON.stringify({
            query,
            variables,
          }),


        cache:
          "no-store",
      }
    );



  const text =
    await response.text();



  let json;


  try {

    json =
      JSON.parse(text);

  } catch {

    throw new Error(
      `Customer API returned non JSON: ${text.substring(0,200)}`
    );

  }



  if (
    !response.ok ||
    json.errors
  ) {

    throw new Error(
      JSON.stringify(json.errors)
    );

  }



  return json.data;

}





export const CUSTOMER_TOKEN_COOKIE =
  "twww_customer_access_token";


export const PKCE_COOKIE =
  "twww_customer_pkce";


export const RETURN_TO_COOKIE =
  "twww_customer_return_to";
