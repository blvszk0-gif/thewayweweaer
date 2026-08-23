import { NextRequest, NextResponse } from 'next/server';
import {
  customerApiFetch,
  CUSTOMER_TOKEN_COOKIE,
} from '@/lib/shopify/customer-auth';


export async function POST(request: NextRequest) {
  const token = request.cookies.get(CUSTOMER_TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const data = await customerApiFetch(token, `
      mutation CustomerAddressCreate(
        $address: CustomerAddressInput!
      ) {
        customerAddressCreate(
          address: $address
        ) {
          customerAddress {
            id
            firstName
            lastName
            address1
            address2
            city
            zip
            country
          }

          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      address: body,
    });

    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Unable to create address'
      },
      {
        status: 500
      }
    );
  }
}