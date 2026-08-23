"use client";

import { useEffect, useState } from "react";


type Address = {

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

};



type Customer = {

    firstName: string | null;

    lastName: string | null;

    emailAddress: {

        emailAddress: string;

    } | null;

};



export default function ProfilePage() {


    const [customer, setCustomer] =
        useState<Customer | null>(null);


    const [address, setAddress] =
        useState<Address | null>(null);



    const [loading, setLoading] =
        useState(true);


    const [saving, setSaving] =
        useState(false);



    const [form, setForm] =
        useState({

            firstName: "",

            lastName: "",

            address1: "",

            address2: "",

            city: "",

            zip: "",

            zoneCode: "",

            territoryCode: "PL",

            phoneNumber: "",

        });





    useEffect(() => {

        loadData();

    }, []);






    async function loadData() {


        try {


            const [
                profileResponse,
                addressesResponse,
            ] = await Promise.all([


                fetch(
                    "/api/account/profile"
                ),


                fetch(
                    "/api/account/adresses"
                ),

            ]);



            const profile =
                await profileResponse.json();


            const addresses =
                await addressesResponse.json();




            setCustomer(
                profile.customer
            );



            const currentAddress =
                addresses?.[0] ?? null;



            setAddress(
                currentAddress
            );



            setForm({

                firstName:
                    profile.customer?.firstName ?? "",


                lastName:
                    profile.customer?.lastName ?? "",


                address1:
                    currentAddress?.address1 ?? "",


                address2:
                    currentAddress?.address2 ?? "",


                city:
                    currentAddress?.city ?? "",


                zip:
                    currentAddress?.zip ?? "",


                zoneCode:
                    currentAddress?.zoneCode ?? "",


                territoryCode:
                    currentAddress?.territoryCode ?? "PL",


                phoneNumber:
                    currentAddress?.phoneNumber ?? "",

            });



        } catch (error) {


            console.error(
                "PROFILE LOAD ERROR:",
                error
            );


        } finally {


            setLoading(false);


        }

    }







    function updateField(
        field: string,
        value: string
    ) {


        setForm(
            previous => ({

                ...previous,

                [field]: value,

            })
        );


    }








    async function saveProfile() {


        setSaving(true);



        try {



            const profileResponse =
                await fetch(
                    "/api/account/profile",
                    {


                        method: "PUT",


                        headers: {

                            "Content-Type":
                                "application/json",

                        },


                        body: JSON.stringify({

                            firstName:
                                form.firstName,


                            lastName:
                                form.lastName,

                        }),


                    }
                );



            if (!profileResponse.ok) {


                throw new Error(
                    "Profile update failed"
                );


            }







            const addressPayload = {


                firstName:
                    form.firstName,


                lastName:
                    form.lastName,


                address1:
                    form.address1,


                address2:
                    form.address2,


                city:
                    form.city,


                zip:
                    form.zip,


                zoneCode:
                    form.zoneCode,


                territoryCode:
                    form.territoryCode,


                phoneNumber:
                    form.phoneNumber,

            };






            let addressResponse;



            if (address?.id) {



                addressResponse =
                    await fetch(
                        "/api/account/adresses",
                        {

                            method: "PUT",

                            headers: {

                                "Content-Type":
                                    "application/json",

                            },


                            body: JSON.stringify({

                                addressId:
                                    address.id,


                                ...addressPayload,

                            }),


                        }
                    );



            } else {



                addressResponse =
                    await fetch(
                        "/api/account/adresses",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                            },


                            body: JSON.stringify(
                                addressPayload
                            ),

                        }
                    );



            }







            if (!addressResponse.ok) {


                throw new Error(
                    "Address update failed"
                );


            }




            alert(
                "Dane zostały zapisane"
            );



            await loadData();




        } catch (error) {



            console.error(
                "SAVE ERROR:",
                error
            );



            alert(
                "Nie udało się zapisać danych"
            );



        } finally {



            setSaving(false);



        }


    }








    if (loading) {


        return (

            <main>

                Ładowanie profilu...

            </main>

        );


    }








    return (

        <main
            style={{

                maxWidth: "700px",

                margin: "40px auto",

            }}
        >


            <h1>
                Profil
            </h1>





            <section>


                <h2>
                    Dane konta
                </h2>



                <label>

                    Email

                    <input

                        disabled

                        value={
                            customer
                                ?.emailAddress
                                ?.emailAddress ?? ""
                        }

                    />

                </label>





                <label>

                    Imię

                    <input

                        value={
                            form.firstName
                        }

                        onChange={
                            e =>
                                updateField(
                                    "firstName",
                                    e.target.value
                                )
                        }

                    />

                </label>





                <label>

                    Nazwisko

                    <input

                        value={
                            form.lastName
                        }

                        onChange={
                            e =>
                                updateField(
                                    "lastName",
                                    e.target.value
                                )
                        }

                    />

                </label>


            </section>







            <section>


                <h2>
                    Adres
                </h2>



                <label>

                    Ulica i numer

                    <input

                        value={
                            form.address1
                        }

                        onChange={
                            e =>
                                updateField(
                                    "address1",
                                    e.target.value
                                )
                        }

                    />

                </label>





                <label>

                    Numer mieszkania / dodatkowe informacje

                    <input

                        value={
                            form.address2
                        }

                        onChange={
                            e =>
                                updateField(
                                    "address2",
                                    e.target.value
                                )
                        }

                    />

                </label>





                <label>

                    Miasto

                    <input

                        value={
                            form.city
                        }

                        onChange={
                            e =>
                                updateField(
                                    "city",
                                    e.target.value
                                )
                        }

                    />

                </label>





                <label>

                    Kod pocztowy

                    <input

                        value={
                            form.zip
                        }

                        onChange={
                            e =>
                                updateField(
                                    "zip",
                                    e.target.value
                                )
                        }

                    />

                </label>





                <label>

                    Województwo

                    <input

                        value={
                            form.zoneCode
                        }

                        onChange={
                            e =>
                                updateField(
                                    "zoneCode",
                                    e.target.value
                                )
                        }

                    />

                </label>





                <label>

                    Kraj

                    <input

                        value={
                            form.territoryCode
                        }

                        onChange={
                            e =>
                                updateField(
                                    "territoryCode",
                                    e.target.value
                                )
                        }

                    />

                </label>





                <label>

                    Telefon

                    <input

                        value={
                            form.phoneNumber
                        }

                        onChange={
                            e =>
                                updateField(
                                    "phoneNumber",
                                    e.target.value
                                )
                        }

                    />

                </label>



            </section>







            <button

                disabled={
                    saving
                }

                onClick={
                    saveProfile
                }

            >

                {
                    saving
                        ? "Zapisywanie..."
                        : "Zapisz zmiany"
                }


            </button>





        </main>

    );

}