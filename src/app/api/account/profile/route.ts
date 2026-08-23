import { NextRequest, NextResponse } from "next/server";

import {
    CUSTOMER_TOKEN_COOKIE,
    customerApiFetch,
} from "@/lib/shopify/customer-auth";



export async function GET(
    request: NextRequest
) {

    const token =
        request.cookies.get(
            CUSTOMER_TOKEN_COOKIE
        )?.value;


    if (!token) {

        return NextResponse.json(
            {
                customer: null,
            },
            {
                status: 401,
            }
        );

    }


    try {

        const data =
            await customerApiFetch<{
                customer: {
                    id: string;
                    firstName: string | null;
                    lastName: string | null;

                    emailAddress: {
                        emailAddress: string;
                    } | null;


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
            }>(
                token,
                `
        query CustomerProfile {

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

        }
        `
            );


        return NextResponse.json(
            data
        );


    } catch (error) {


        console.error(
            "PROFILE GET ERROR:",
            error
        );


        const response =
            NextResponse.json(
                {
                    customer: null,
                },
                {
                    status: 401,
                }
            );


        response.cookies.delete(
            CUSTOMER_TOKEN_COOKIE
        );


        return response;

    }

}





export async function PUT(
    request: NextRequest
) {


    const token =
        request.cookies.get(
            CUSTOMER_TOKEN_COOKIE
        )?.value;


    if (!token) {

        return NextResponse.json(
            {
                error: "Unauthorized",
            },
            {
                status: 401,
            }
        );

    }



    try {


        const body =
            await request.json();



        const {
            firstName,
            lastName,
        } = body;



        const data =
            await customerApiFetch<{

                customerUpdate: {

                    customer: {

                        id: string;

                        firstName: string | null;

                        lastName: string | null;

                    } | null;


                    userErrors: {

                        field: string[];

                        message: string;

                    }[];

                };

            }>(
                token,
                `
        mutation CustomerUpdate(
          $input: CustomerUpdateInput!
        ) {

          customerUpdate(
            input: $input
          ) {

            customer {

              id

              firstName

              lastName

            }


            userErrors {

              field

              message

            }

          }

        }
        `,
                {
                    input: {

                        firstName,

                        lastName,

                    },
                }
            );



        if (
            data.customerUpdate.userErrors.length > 0
        ) {

            return NextResponse.json(
                {
                    errors:
                        data.customerUpdate.userErrors,
                },
                {
                    status: 400,
                }
            );

        }



        return NextResponse.json(
            data
        );



    } catch (error) {


        console.error(
            "PROFILE UPDATE ERROR:",
            error
        );


        return NextResponse.json(
            {
                error: "Profile update failed",
            },
            {
                status: 500,
            }
        );

    }

}