import { NextRequest, NextResponse } from "next/server";

import {
  customerApiFetch,
  CUSTOMER_TOKEN_COOKIE,
} from "@/lib/shopify/customer-auth";

type CustomerResponse = {
  customer: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    emailAddress: { emailAddress: string } | null;
    defaultAddress: {
      id: string;
      firstName: string | null;
      lastName: string | null;
      address1: string | null;
      address2: string | null;
      city: string | null;
      zip: string | null;
      zoneCode: string | null;
      territoryCode: string | null;
      province: string | null;
    } | null;
  } | null;
};

export async function GET(request: NextRequest) {
  const token = request.cookies.get(CUSTOMER_TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ customer: null }, { status: 401 });
  }

  try {
    const data = await customerApiFetch<CustomerResponse>(
      token,
      `query Customer {
        customer {
          id
          firstName
          lastName
          emailAddress {
            emailAddress
          }
          defaultAddress {
            id
            firstName
            lastName
            address1
            address2
            city
            zip
            zoneCode
            territoryCode
            province
          }
        }
      }`
    );

    return NextResponse.json(data, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    console.error("Unable to load customer account.", error);

    const response = NextResponse.json({ customer: null }, { status: 401 });
    response.cookies.delete(CUSTOMER_TOKEN_COOKIE);
    return response;
  }
}
