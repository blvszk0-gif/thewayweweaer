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
                addresses: null,
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

                    addresses: {

                        nodes: {

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

                            phoneNumber: string | null;

                        }[];

                    };

                } | null;

            }>(

                token,

                `
        query CustomerAddresses {

          customer {

            addresses(first:20) {

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

                phoneNumber

              }

            }

          }

        }
        `

            );



        return NextResponse.json(
            data.customer?.addresses.nodes ?? []
        );



    } catch (error) {


        console.error(
            "ADDRESS GET ERROR:",
            error
        );


        return NextResponse.json(
            {
                error:
                    "Cannot load addresses",
            },
            {
                status: 500,
            }
        );


    }

}







export async function POST(
    request: NextRequest
) {


    const token =
        request.cookies.get(
            CUSTOMER_TOKEN_COOKIE
        )?.value;



    if (!token) {


        return NextResponse.json(
            {
                error:
                    "Unauthorized",
            },
            {
                status: 401,
            }
        );


    }



    try {


        const body =
            await request.json();



        const data =
            await customerApiFetch<{

                customerAddressCreate: {

                    address: {

                        id: string;

                    } | null;


                    userErrors: {

                        field: string[];

                        message: string;

                    }[];

                };

            }>(

                token,


                `
        mutation CustomerAddressCreate(
          $address: CustomerAddressInput!
        ){

          customerAddressCreate(
            address:$address
          ){

            address{

              id

            }


            userErrors{

              field

              message

            }

          }

        }
        `,


                {

                    address: {

                        firstName:
                            body.firstName ?? null,


                        lastName:
                            body.lastName ?? null,


                        address1:
                            body.address1 ?? null,


                        address2:
                            body.address2 ?? null,


                        city:
                            body.city ?? null,


                        zip:
                            body.zip ?? null,


                        zoneCode:
                            body.zoneCode ?? null,


                        territoryCode:
                            body.territoryCode ?? "PL",


                        phoneNumber:
                            body.phoneNumber ?? null,

                    },

                }

            );




        if (
            data.customerAddressCreate.userErrors.length
        ) {


            return NextResponse.json(
                {
                    errors:
                        data.customerAddressCreate.userErrors,
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
            "ADDRESS CREATE ERROR:",
            error
        );


        return NextResponse.json(
            {
                error:
                    "Address create failed",
            },
            {
                status: 500,
            }
        );


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
                error:
                    "Unauthorized",
            },
            {
                status: 401,
            }
        );


    }



    try {


        const body =
            await request.json();



        const data =
            await customerApiFetch<{

                customerAddressUpdate: {

                    address: {

                        id: string;

                    } | null;


                    userErrors: {

                        field: string[];

                        message: string;

                    }[];

                };

            }>(


                token,


                `
        mutation CustomerAddressUpdate(
          $addressId:ID!,
          $address:CustomerAddressInput!
        ){

          customerAddressUpdate(

            addressId:$addressId,

            address:$address

          ){

            address{

              id

            }


            userErrors{

              field

              message

            }

          }

        }
        `,


                {

                    addressId:
                        body.addressId,


                    address: {

                        firstName:
                            body.firstName ?? null,


                        lastName:
                            body.lastName ?? null,


                        address1:
                            body.address1 ?? null,


                        address2:
                            body.address2 ?? null,


                        city:
                            body.city ?? null,


                        zip:
                            body.zip ?? null,


                        zoneCode:
                            body.zoneCode ?? null,


                        territoryCode:
                            body.territoryCode ?? "PL",


                        phoneNumber:
                            body.phoneNumber ?? null,

                    },

                }

            );



        if (
            data.customerAddressUpdate.userErrors.length
        ) {


            return NextResponse.json(
                {
                    errors:
                        data.customerAddressUpdate.userErrors,
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
            "ADDRESS UPDATE ERROR:",
            error
        );


        return NextResponse.json(
            {
                error:
                    "Address update failed",
            },
            {
                status: 500,
            }
        );


    }

}









export async function DELETE(
    request: NextRequest
) {


    const token =
        request.cookies.get(
            CUSTOMER_TOKEN_COOKIE
        )?.value;



    if (!token) {


        return NextResponse.json(
            {
                error:
                    "Unauthorized",
            },
            {
                status: 401,
            }
        );


    }



    try {


        const body =
            await request.json();



        const data =
            await customerApiFetch<{

                customerAddressDelete: {

                    deletedAddressId: string | null;


                    userErrors: {

                        field: string[];

                        message: string;

                    }[];

                };

            }>(


                token,


                `
        mutation CustomerAddressDelete(
          $addressId:ID!
        ){

          customerAddressDelete(
            addressId:$addressId
          ){

            deletedAddressId


            userErrors{

              field

              message

            }

          }

        }
        `,


                {

                    addressId:
                        body.addressId,

                }

            );



        if (
            data.customerAddressDelete.userErrors.length
        ) {


            return NextResponse.json(
                {
                    errors:
                        data.customerAddressDelete.userErrors,
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
            "ADDRESS DELETE ERROR:",
            error
        );


        return NextResponse.json(
            {
                error:
                    "Address delete failed",
            },
            {
                status: 500,
            }
        );


    }

}