# The Way We Wear — Shopify headless

The Next.js storefront stays on `thewaywewear.pl`. Shopify is the source of truth for products, collections, variants, stock, carts, checkout, customers, orders and newsletter consent. No PocketBase code is used.

## Environment variables

Copy `.env.example` to `.env.local` and fill values **locally only**. In Vercel add the same variables through **Project → Settings → Environment Variables**. Never commit values or send tokens in chat.

- `SHOPIFY_STORE_DOMAIN` — e.g. `your-store.myshopify.com`, without `https://`.
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` or `SHOPIFY_PRIVATE_STOREFRONT_ACCESS_TOKEN` — token from the Headless sales channel. This implementation uses it only on the server.
- `SHOPIFY_ADMIN_ACCESS_TOKEN` — custom app token for newsletter endpoint only; it requires `read_customers` and `write_customers`.
- `SHOPIFY_API_VERSION` — `2026-07`.
- `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID` — public client ID from Shopify Customer Accounts.
- `SHOPIFY_BLOG_HANDLE` — Shopify blog handle, default `journal`.

## Shopify setup

1. Add the **Headless** sales channel and create a Storefront API token. Make products, collections, blog posts and metaobjects available to the channel.
2. Create a custom app for the newsletter endpoint with only `read_customers` and `write_customers`; install it and place its Admin API token in Vercel.
3. In **Settings → Customer accounts**, enable new customer accounts. Create/configure a Customer Account API client with callback URL `https://thewaywewear.pl/api/auth/callback` and JavaScript origin `https://thewaywewear.pl`.
4. Enable marketing double opt-in in Shopify. Newsletter requests set consent to `PENDING`; confirmation is delivered by Shopify.
5. Create collection handles matching routes. Any collection handle is available at `/shop/[handle]`; product handles are at `/product/[handle]`.

## Content model

Create Shopify metaobjects `lookbook`, `care_instruction`, `size_chart`, `faq`, `social_link`, and `editorial_page`. Turn on Storefront API access and translations for each. Product metafields use namespace `custom`: `composition`, `fit`, `care_instruction`, `size_chart`, `material`, `country_of_origin`, `model_info`, and `lookbook`.

Routes consuming Shopify content: `/lookbook`, `/faq`, `/pielegnacja`, `/sledz-nas`, `/journal`, `/journal/[handle]`, and `/editorial/[handle]`.

## Local verification

```bash
npm install
npm run lint
npm run build
```

Test on a Vercel preview before production: product → cart → Shopify checkout, newsletter confirmation, Customer Accounts login/logout, and an order connected to the test customer.
