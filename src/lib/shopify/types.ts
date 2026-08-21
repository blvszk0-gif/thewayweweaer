export interface ShopifyImage {
  url: string;
  altText?: string | null;
  width?: number;
  height?: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney | null;
  selectedOptions: ShopifySelectedOption[];
  image?: ShopifyImage | null;
}

export interface ShopifyMetafield {
  key: string;
  namespace: string;
  value: string;
  type: string;
  description?: string | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  featuredImage?: ShopifyImage | null;
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  variants: {
    edges: Array<{ node: ShopifyProductVariant }>;
  };
  metafields?: Array<ShopifyMetafield | null>;
  tags?: string[];
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImage | null;
  products: {
    edges: Array<{ node: ShopifyProduct }>;
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage?: ShopifyImage | null;
    };
    price: ShopifyMoney;
    selectedOptions: ShopifySelectedOption[];
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: Array<{ node: ShopifyCartLine }>;
  };
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount?: ShopifyMoney | null;
  };
}

export interface ShopifyMetaobject {
  id: string;
  handle: string;
  type: string;
  fields: Array<{
    key: string;
    value: string;
    reference?: any;
    references?: any;
  }>;
}

export interface ShopifyArticle {
  id: string;
  handle: string;
  title: string;
  excerpt?: string | null;
  contentHtml: string;
  publishedAt: string;
  image?: ShopifyImage | null;
  authorV2?: {
    name: string;
  } | null;
  tags?: string[];
}

export interface ShopifyBlog {
  id: string;
  handle: string;
  title: string;
  articles: {
    edges: Array<{ node: ShopifyArticle }>;
  };
}

export interface ShopifyMenuItem {
  id: string;
  title: string;
  url: string;
  type: string;
  resourceId?: string | null;
  items?: ShopifyMenuItem[];
}

export interface ShopifyMenu {
  id: string;
  handle: string;
  title: string;
  items: ShopifyMenuItem[];
}

export interface ShopifyShopPolicy {
  id: string;
  title: string;
  body: string;
  handle: string;
}

export interface ShopifyPage {
  id: string;
  title: string;
  body: string;
  handle: string;
}
