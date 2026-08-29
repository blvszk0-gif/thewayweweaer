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
    orders: {
      nodes: Array<{
        id: string;
        name: string;
        number: number;
        processedAt: string;
        financialStatus: string | null;
        fulfillmentStatus: string;
        totalPrice: { amount: string; currencyCode: string };
        shippingAddress: {
          name: string | null;
          address1: string | null;
          address2: string | null;
          city: string | null;
          zip: string | null;
          territoryCode: string | null;
        } | null;
        fulfillments: {
          nodes: Array<{
            status: string | null;
            latestShipmentStatus: string | null;
            estimatedDeliveryAt: string | null;
            trackingInformation: Array<{ company: string | null; number: string | null; url: string | null }>;
          }>;
        };
      }>;
    };
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
          orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
            nodes {
              id
              name
              number
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
              shippingAddress {
                name
                address1
                address2
                city
                zip
                territoryCode
              }
              fulfillments(first: 5) {
                nodes {
                  status
                  latestShipmentStatus
                  estimatedDeliveryAt
                  trackingInformation {
                    company
                    number
                    url
                  }
                }
              }
            }
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
