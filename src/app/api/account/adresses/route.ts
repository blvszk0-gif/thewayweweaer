import { NextRequest, NextResponse } from "next/server";
import { CUSTOMER_TOKEN_COOKIE, customerApiFetch } from "@/lib/shopify/customer-auth";

type CustomerAddressInput = {
  firstName?: string | null;
  lastName?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  zip?: string | null;
  zoneCode?: string | null;
  territoryCode?: string | null;
};

function customerToken(request: NextRequest) {
  return request.cookies.get(CUSTOMER_TOKEN_COOKIE)?.value;
}

function addressInput(body: CustomerAddressInput): CustomerAddressInput {
  return {
    firstName: body.firstName?.trim() || null,
    lastName: body.lastName?.trim() || null,
    address1: body.address1?.trim() || null,
    address2: body.address2?.trim() || null,
    city: body.city?.trim() || null,
    zip: body.zip?.trim() || null,
    zoneCode: body.zoneCode?.trim() || null,
    territoryCode: body.territoryCode || "PL",
  };
}

export async function GET(request: NextRequest) {
  const token = customerToken(request);
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await customerApiFetch<{ customer: { addresses: { nodes: unknown[] } } | null }>(
      token,
      `query CustomerAddresses {
        customer {
          addresses(first: 20) {
            nodes {
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
        }
      }`
    );
    return NextResponse.json(data.customer?.addresses.nodes ?? [], {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    console.error("Unable to load customer addresses.", error);
    return NextResponse.json({ error: "Unable to load addresses." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = customerToken(request);
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = addressInput(await request.json());
    const data = await customerApiFetch<{
      customerAddressCreate: { customerAddress: { id: string } | null; userErrors: { field: string[]; message: string }[] };
    }>(
      token,
      `mutation CustomerAddressCreate($address: CustomerAddressInput!) {
        customerAddressCreate(address: $address) {
          customerAddress { id }
          userErrors { field message }
        }
      }`,
      { address: body }
    );
    const errors = data.customerAddressCreate.userErrors;
    if (errors.length) return NextResponse.json({ errors }, { status: 400 });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unable to create customer address.", error);
    return NextResponse.json({ error: "Unable to create address." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const token = customerToken(request);
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (typeof body.addressId !== "string") {
      return NextResponse.json({ error: "Missing address ID." }, { status: 400 });
    }
    const data = await customerApiFetch<{
      customerAddressUpdate: { customerAddress: { id: string } | null; userErrors: { field: string[]; message: string }[] };
    }>(
      token,
      `mutation CustomerAddressUpdate($addressId: ID!, $address: CustomerAddressInput!) {
        customerAddressUpdate(addressId: $addressId, address: $address) {
          customerAddress { id }
          userErrors { field message }
        }
      }`,
      { addressId: body.addressId, address: addressInput(body) }
    );
    const errors = data.customerAddressUpdate.userErrors;
    if (errors.length) return NextResponse.json({ errors }, { status: 400 });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unable to update customer address.", error);
    return NextResponse.json({ error: "Unable to update address." }, { status: 500 });
  }
}
