import { NextRequest, NextResponse } from 'next/server';
import { customerApiFetch, CUSTOMER_TOKEN_COOKIE } from '@/lib/shopify/customer-auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(CUSTOMER_TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      { customer: null },
      { status: 401 }
    );
  }

  try {
    const data = await customerApiFetch<{ customer: unknown }>(
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
            country
          }

          addresses(first: 10) {
            nodes {
              id
              firstName
              lastName
              address1
              address2
              city
              zip
              country
            }
          }

          orders(
            first: 20,
            sortKey: PROCESSED_AT,
            reverse: true
          ) {
            nodes {
              id
              number
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }`
    );

    return NextResponse.json(data);

  } catch {
    const response = NextResponse.json(
      { customer: null },
      { status: 401 }
    );

    response.cookies.delete(CUSTOMER_TOKEN_COOKIE);

    return response;
  }
}