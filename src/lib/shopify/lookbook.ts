import { storefrontFetch } from './storefront';

const QUERY = `
  query HomepageLookbook($settingsHandle: String!) {
    metaobject(handle: { type: "ustawienia_strony", handle: $settingsHandle }) {
      field(key: "kolekcja_lookbooka_na_stronie_glownej") {
        reference {
          ... on Collection {
            handle
            title
            slidesField: metafield(namespace: "custom", key: "lookbook_slides") {
              references(first: 20) {
                nodes {
                  ... on Metaobject {
                    id
                    imageField: field(key: "zdjecie") {
                      references(first: 1) {
                        nodes {
                          ... on MediaImage {
                            image { url altText width height }
                          }
                        }
                      }
                    }
                    captionField: field(key: "podpis") { value }
                    productField: field(key: "produkt") {
                      reference {
                        ... on Product {
                          id
                          handle
                          title
                          productType
                          priceRange { minVariantPrice { amount currencyCode } }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export interface LookbookSlide {
  id: string;
  caption: string | null;
  image: { url: string; altText: string | null; width: number; height: number } | null;
  product: {
    id: string;
    handle: string;
    title: string;
    category: string | null;
    price: number;
  } | null;
}

export interface HomepageLookbook {
  collectionHandle: string;
  collectionTitle: string;
  slides: LookbookSlide[];
}

export async function getHomepageLookbook(
  settingsHandle: string = "main"
): Promise<HomepageLookbook | null> {
  const data = await storefrontFetch<{
    metaobject: {
      field: {
        reference: {
          handle: string;
          title: string;
          slidesField: { references: { nodes: RawSlide[] } } | null;
        } | null;
      } | null;
    } | null;
  }>(QUERY, { settingsHandle });

  const collection = data.metaobject?.field?.reference;
  if (!collection) return null;

  const nodes = collection.slidesField?.references?.nodes ?? [];

  return {
    collectionHandle: collection.handle,
    collectionTitle: collection.title,
    slides: nodes.map((n) => ({
      id: n.id,
      caption: n.captionField?.value ?? null,
      image: n.imageField?.references?.nodes?.[0]?.image ?? null,
      product: n.productField?.reference
        ? {
          id: n.productField.reference.id,
          handle: n.productField.reference.handle,
          title: n.productField.reference.title,
          category: n.productField.reference.productType || null,
          price: Number(n.productField.reference.priceRange.minVariantPrice.amount),
        }
        : null,
    })),
  };
}

interface RawSlide {
  id: string;
  imageField: {
    references: { nodes: Array<{ image: LookbookSlide["image"] }> } | null;
  } | null;
  captionField: { value: string } | null;
  productField: {
    reference: {
      id: string;
      handle: string;
      title: string;
      productType: string | null;
      priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    } | null;
  } | null;
}