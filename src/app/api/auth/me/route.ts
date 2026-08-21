import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('twww_customer_session')?.value;

  if (!sessionToken) {
    return NextResponse.json({ loggedIn: false });
  }

  const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || '';

  try {
    const gqlQuery = `
      query GetCustomerProfile {
        customer {
          id
          firstName
          lastName
          emailAddress {
            emailAddress
          }
          defaultAddress {
            formatted
            address1
            address2
            city
            zip
          }
          orders(first: 20) {
            edges {
              node {
                id
                name
                processedAt
                totalPrice {
                  amount
                  currencyCode
                }
                fulfillmentStatus
              }
            }
          }
        }
      }
    `;

    const res = await fetch(`https://shopify.com/${clientId}/account/customer/api/2026-07/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionToken,
      },
      body: JSON.stringify({ query: gqlQuery }),
      cache: 'no-store',
    });

    const json = await res.json();
    const customer = json.data?.customer;

    if (!res.ok || !customer) {
      return NextResponse.json({ loggedIn: false });
    }

    const mappedOrders = (customer.orders?.edges || []).map(({ node }: any) => ({
      id: node.name || node.id,
      date: new Date(node.processedAt).toLocaleDateString('pl-PL'),
      total: parseFloat(node.totalPrice?.amount || '0'),
      status: node.fulfillmentStatus || 'W REALIZACJI',
    }));

    return NextResponse.json({
      loggedIn: true,
      profile: {
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.emailAddress?.emailAddress || '',
        address: customer.defaultAddress?.formatted?.join(', ') || customer.defaultAddress?.address1 || '',
      },
      orders: mappedOrders,
    });
  } catch (error) {
    console.error('Customer Account Profile Query error:', error);
    return NextResponse.json({ loggedIn: false });
  }
}
