import { NextRequest, NextResponse } from "next/server";
import {
  customerApiFetch,
  CUSTOMER_TOKEN_COOKIE,
} from "@/lib/shopify/customer-auth";


export async function GET(request: NextRequest) {

  console.log(
    "COOKIES RECEIVED:",
    request.cookies.getAll()
  );


  const token =
    request.cookies.get(
      CUSTOMER_TOKEN_COOKIE
    )?.value;


  if (!token) {
    return NextResponse.json(
      {
        customer: null
      },
      {
        status: 401
      }
    );
  }


  try {

    const data =
      await customerApiFetch<{ customer: unknown }>(
        token,
        `
        query Customer {
          customer {
            id
            firstName
            lastName
            emailAddress {
              emailAddress
            }
          }
        }
        `
      );


    return NextResponse.json(data);


  } catch(error) {

    console.log(
      "CUSTOMER API ERROR",
      error
    );


    const response =
      NextResponse.json(
        {
          customer:null
        },
        {
          status:401
        }
      );


    response.cookies.delete(
      CUSTOMER_TOKEN_COOKIE
    );


    return response;
  }
}