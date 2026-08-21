import { storefrontFetch, adminFetch } from './client';
import {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
  ShopifyMetaobject,
  ShopifyArticle,
  ShopifyShopPolicy,
  ShopifyMenu
} from './types';

/* -------------------------------------------------------------------------- */
/* FRAGMENTS                                                                  */
/* -------------------------------------------------------------------------- */

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    tags
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
          }
        }
      }
    }
    metafields(identifiers: [
      { namespace: "custom", key: "composition" },
      { namespace: "custom", key: "fit" },
      { namespace: "custom", key: "care_instruction" },
      { namespace: "custom", key: "size_chart" },
      { namespace: "custom", key: "material" },
      { namespace: "custom", key: "country_of_origin" },
      { namespace: "custom", key: "model_info" },
      { namespace: "custom", key: "lookbook" }
    ]) {
      key
      namespace
      value
      type
      reference {
        ... on Metaobject {
          id
          handle
          type
          fields {
            key
            value
          }
        }
      }
      references(first: 10) {
        edges {
          node {
            ... on Metaobject {
              id
              handle
              type
              fields {
                key
                value
              }
            }
          }
        }
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                id
                handle
                title
                featuredImage {
                  url
                  altText
                }
              }
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/* PRODUCTS & COLLECTIONS                                                     */
/* -------------------------------------------------------------------------- */

export async function getProducts({
  first = 50,
  query
}: {
  first?: number;
  query?: string;
} = {}): Promise<ShopifyProduct[]> {
  const gql = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!, $query: String) {
      products(first: $first, query: $query) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `;

  const res = await storefrontFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>({
    query: gql,
    variables: { first, query },
    cache: 'no-store'
  });

  return res.data?.products?.edges?.map((edge) => edge.node) || [];
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const gql = `
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
      }
    }
  `;

  const res = await storefrontFetch<{ product: ShopifyProduct | null }>({
    query: gql,
    variables: { handle },
    cache: 'no-store'
  });

  return res.data?.product || null;
}

export async function getCollections(): Promise<ShopifyCollection[]> {
  const gql = `
    query GetCollections {
      collections(first: 50) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const res = await storefrontFetch<{ collections: { edges: Array<{ node: ShopifyCollection }> } }>({
    query: gql,
    cache: 'no-store'
  });

  return res.data?.collections?.edges?.map((edge) => edge.node) || [];
}

export async function getCollectionByHandle(handle: string): Promise<ShopifyCollection | null> {
  const gql = `
    ${PRODUCT_FRAGMENT}
    query GetCollectionByHandle($handle: String!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        image {
          url
          altText
        }
        products(first: 50) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }
  `;

  const res = await storefrontFetch<{ collection: ShopifyCollection | null }>({
    query: gql,
    variables: { handle },
    cache: 'no-store'
  });

  return res.data?.collection || null;
}

/* -------------------------------------------------------------------------- */
/* CART OPERATIONS                                                            */
/* -------------------------------------------------------------------------- */

export async function createCart(lines: Array<{ merchandiseId: string; quantity: number }> = []): Promise<ShopifyCart | null> {
  const gql = `
    ${CART_FRAGMENT}
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const res = await storefrontFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: gql,
    variables: { input: { lines } },
    cache: 'no-store'
  });

  return res.data?.cartCreate?.cart || null;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const gql = `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
  `;

  const res = await storefrontFetch<{ cart: ShopifyCart | null }>({
    query: gql,
    variables: { cartId },
    cache: 'no-store'
  });

  return res.data?.cart || null;
}

export async function addToCart(cartId: string, lines: Array<{ merchandiseId: string; quantity: number }>): Promise<ShopifyCart | null> {
  const gql = `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `;

  const res = await storefrontFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: gql,
    variables: { cartId, lines },
    cache: 'no-store'
  });

  return res.data?.cartLinesAdd?.cart || null;
}

export async function updateCartLines(cartId: string, lines: Array<{ id: string; quantity: number }>): Promise<ShopifyCart | null> {
  const gql = `
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `;

  const res = await storefrontFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query: gql,
    variables: { cartId, lines },
    cache: 'no-store'
  });

  return res.data?.cartLinesUpdate?.cart || null;
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart | null> {
  const gql = `
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
      }
    }
  `;

  const res = await storefrontFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: gql,
    variables: { cartId, lineIds },
    cache: 'no-store'
  });

  return res.data?.cartLinesRemove?.cart || null;
}

/* -------------------------------------------------------------------------- */
/* METAOBJECTS                                                                */
/* -------------------------------------------------------------------------- */

export async function getMetaobjects(type: string): Promise<ShopifyMetaobject[]> {
  const gql = `
    query GetMetaobjects($type: String!) {
      metaobjects(type: $type, first: 50) {
        edges {
          node {
            id
            handle
            type
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
              references(first: 10) {
                edges {
                  node {
                    ... on MediaImage {
                      image {
                        url
                        altText
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

  const res = await storefrontFetch<{ metaobjects: { edges: Array<{ node: ShopifyMetaobject }> } }>({
    query: gql,
    variables: { type },
    cache: 'no-store'
  });

  return res.data?.metaobjects?.edges?.map((e) => e.node) || [];
}

/* -------------------------------------------------------------------------- */
/* BLOG ARTICLES                                                              */
/* -------------------------------------------------------------------------- */

export async function getBlogArticles(blogHandle = 'news'): Promise<ShopifyArticle[]> {
  const gql = `
    query GetBlogArticles($blogHandle: String!) {
      blog(handle: $blogHandle) {
        id
        handle
        title
        articles(first: 50) {
          edges {
            node {
              id
              handle
              title
              excerpt
              contentHtml
              publishedAt
              image {
                url
                altText
              }
              authorV2 {
                name
              }
            }
          }
        }
      }
    }
  `;

  const res = await storefrontFetch<{ blog: { articles: { edges: Array<{ node: ShopifyArticle }> } } | null }>({
    query: gql,
    variables: { blogHandle },
    cache: 'no-store'
  });

  return res.data?.blog?.articles?.edges?.map((e) => e.node) || [];
}

export async function getArticleByHandle(articleHandle: string, blogHandle = 'news'): Promise<ShopifyArticle | null> {
  const articles = await getBlogArticles(blogHandle);
  return articles.find((a) => a.handle === articleHandle) || null;
}

/* -------------------------------------------------------------------------- */
/* POLICIES & MENUS                                                           */
/* -------------------------------------------------------------------------- */

export async function getShopPolicies(): Promise<ShopifyShopPolicy[]> {
  const gql = `
    query GetPolicies {
      shop {
        privacyPolicy {
          id
          title
          body
          handle
        }
        termsOfService {
          id
          title
          body
          handle
        }
        refundPolicy {
          id
          title
          body
          handle
        }
      }
    }
  `;

  const res = await storefrontFetch<{ shop: any }>({ query: gql, cache: 'no-store' });
  const shop = res.data?.shop;
  if (!shop) return [];

  const policies: ShopifyShopPolicy[] = [];
  if (shop.privacyPolicy) policies.push(shop.privacyPolicy);
  if (shop.termsOfService) policies.push(shop.termsOfService);
  if (shop.refundPolicy) policies.push(shop.refundPolicy);

  return policies;
}

export async function getMenu(handle = 'main-menu'): Promise<ShopifyMenu | null> {
  const gql = `
    query GetMenu($handle: String!) {
      menu(handle: $handle) {
        id
        handle
        title
        items {
          id
          title
          url
          type
          resourceId
        }
      }
    }
  `;

  const res = await storefrontFetch<{ menu: ShopifyMenu | null }>({
    query: gql,
    variables: { handle },
    cache: 'no-store'
  });

  return res.data?.menu || null;
}

/* -------------------------------------------------------------------------- */
/* NEWSLETTER MUTATION (ADMIN API)                                            */
/* -------------------------------------------------------------------------- */

export async function subscribeNewsletterAdmin(email: string) {
  const gql = `
    mutation customerCreate($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          emailMarketingConsent {
            marketingState
            consentUpdatedAt
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      email,
      emailMarketingConsent: {
        marketingConsentUpdatedState: "PENDING"
      }
    }
  };

  return await adminFetch<{ customerCreate: any }>({ query: gql, variables });
}
