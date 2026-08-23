import 'server-only';

type GraphQLError = { message: string };

type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLError[];
};

const apiVersion = process.env.SHOPIFY_API_VERSION || '2026-07';

console.log('[Shopify CONFIG]', {
  hasStoreDomain: Boolean(process.env.SHOPIFY_STORE_DOMAIN),
  hasPrivateStorefrontToken: Boolean(process.env.SHOPIFY_PRIVATE_STOREFRONT_ACCESS_TOKEN),
  hasStorefrontToken: Boolean(process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN),
  apiVersion,
});

function storeDomain() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
    ?.replace(/^https?:\/\//, '')
    .replace(/\/$/, '');

  if (!domain) {
    throw new Error(
      'Shopify is not configured. Missing SHOPIFY_STORE_DOMAIN.'
    );
  }

  return domain;
}

function storefrontToken() {
  const token =
    process.env.SHOPIFY_PRIVATE_STOREFRONT_ACCESS_TOKEN ||
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!token) {
    throw new Error(
      'Shopify is not configured. Missing Storefront API token.'
    );
  }

  return token;
}

export async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(
    `https://${storeDomain()}/api/${apiVersion}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Shopify-Storefront-Private-Token': storefrontToken(),
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    }
  );

  // TEMPORARY SHOPIFY DEBUG
  // Nie logujemy tokena ani nagłówków.
  console.log('[Shopify DEBUG] status:', response.status);

  const debugText = await response.clone().text();

  console.log(
    '[Shopify DEBUG] response:',
    debugText.slice(0, 2000)
  );

  const body = (await response.json()) as GraphQLResponse<T>;

  if (!response.ok || body.errors?.length || !body.data) {
    throw new Error(
      body.errors?.map((error) => error.message).join(', ') ||
        'Shopify Storefront API request failed.'
    );
  }

  return body.data;
}

export type StorefrontProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  images: {
    nodes: Array<{
      url: string;
      altText: string | null;
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    nodes: Array<{
      id: string;
      title: string;
      availableForSale: boolean;
      price: {
        amount: string;
        currencyCode: string;
      };
      image: {
        url: string;
        altText: string | null;
      } | null;
      selectedOptions: Array<{
        name: string;
        value: string;
      }>;
    }>;
  };
  availableForSale: boolean;
};

export type StorefrontCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    nodes: Array<{
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
        product: {
          title: string;
          handle: string;
          featuredImage: {
            url: string;
            altText: string | null;
          } | null;
        };
        price: {
          amount: string;
          currencyCode: string;
        };
        image: {
          url: string;
          altText: string | null;
        } | null;
      };
    }>;
  };
};