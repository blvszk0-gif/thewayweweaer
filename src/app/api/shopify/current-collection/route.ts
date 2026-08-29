import { NextResponse } from "next/server";
import { storefrontFetch } from "@/lib/shopify/storefront";

export const revalidate = 300;

export async function GET() {
  const query = `
    query CurrentCollection {
      metaobject(handle: { type: "ustawienia_strony", handle: "main" }) {
        field(key: "kolekcja_lookbooka_na_stronie_glownej") {
          reference {
            ... on Collection {
              handle
              title
            }
          }
        }
      }
    }
  `;
  const data = await storefrontFetch<{
    metaobject: { field: { reference: { handle: string; title: string } | null } | null } | null;
  }>(query);

  const collection = data.metaobject?.field?.reference ?? null;
  return NextResponse.json({ collection });
}
