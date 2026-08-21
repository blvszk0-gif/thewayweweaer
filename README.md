# The Way WE Wear — Next.js 15 & Shopify E-Commerce Integration

Ten projekt reprezentuje oficjalny sklep internetowy **The Way WE Wear** (https://thewaywewear.pl) zbudowany na **Next.js 15 (App Router)** i zintegrowany z **Shopify** jako wyłącznym silnikiem e-commerce (Storefront API, Admin API i Customer Account API).

---

## 🚀 Wymagania Środowiskowe

* **Node.js**: `>=18.17.0`
* **NPM**: `>=9.0.0`
* **Shopify Storefront API Version**: `2025-01`

---

## 🔑 Zmienne Środowiskowe (`.env` / `.env.local`)

Utwórz plik `.env.local` na podstawie `.env.example`:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here
SHOPIFY_API_VERSION=2025-01
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_access_token_here
SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID=your_customer_account_client_id_here
```

### Opis Zmiennych:
1. `SHOPIFY_STORE_DOMAIN`: Domena Twojego sklepu Shopify (np. `thewaywewear.myshopify.com`).
2. `SHOPIFY_STOREFRONT_ACCESS_TOKEN`: Token dostępowy do Storefront API (używany po stronie klienta i serwera do pobierania katalogu, produktów, kolekcji oraz koszyka).
3. `SHOPIFY_API_VERSION`: Wersja GraphQL API (domyślnie `2025-01`).
4. `SHOPIFY_ADMIN_ACCESS_TOKEN`: Private App Access Token z uprawnieniami `write_customers` / `read_customers` do obsługi zapisu do newslettera i mutations po stronie serwera. **Nigdy nie przekazuj tego klucza do przeglądarki.**
5. `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID`: Client ID z panelu Shopify Customer Accounts OAuth.

---

## 🛍️ Konfiguracja Sklepu w Panelu Shopify

### 1. Tworzenie Headless App w Shopify
1. Zaloguj się do panelu **Shopify Admin** (`https://admin.shopify.com`).
2. Przejdź do **Settings (Ustawienia) -> Apps and sales channels (Aplikacje i kanały sprzedaży)**.
3. Kliknij **Develop apps (Twórz aplikacje)** i utwórz nową aplikację o nazwie `The Way WE Wear Headless`.
4. W zakładce **Configuration (Konfiguracja)** skonsultuj i włącz następujące uprawnienia Storefront API:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_content` (dla artykułów blogowych, metaobiektów i polityk)
   - `unauthenticated_write_checkouts`
   - `unauthenticated_write_customers`
5. Zainstaluj aplikację i skopiuj **Storefront API access token**.
6. W zakładce **Admin API integration** dodaj uprawnienia `read_customers` oraz `write_customers` i skopiuj **Admin API access token**.

### 2. Definicja Metaobiektów w Shopify
W zakładce **Content (Treści) -> Metaobjects (Metaobiekty)** zdefiniuj typy:

1. `lookbook`:
   - `title` (Single line text)
   - `season` (Single line text)
   - `description` (Multi-line text)
   - `images` (JSON lub File list)
   - `sort_order` (Integer)
2. `care_instruction`:
   - `title` (Single line text)
   - `icon` (Single line text)
   - `description` (Multi-line text)
   - `sort_order` (Integer)
3. `size_chart`:
   - `title` (Single line text)
   - `image` (File)
   - `description` (Multi-line text)
   - `notes` (Single line text)
4. `faq`:
   - `question` (Single line text)
   - `answer` (Multi-line text)
   - `category` (Single line text)
   - `sort_order` (Integer)
5. `social_link`:
   - `platform` (Single line text)
   - `url` (Single line text)
   - `sort_order` (Integer)
6. `editorial_page`:
   - `title` (Single line text)
   - `body` (Rich text / Multi-line text)
   - `featured_image` (File)
   - `seo_title` (Single line text)
   - `seo_description` (Single line text)

### 3. Definicja Metafields dla Produktów
W zakładce **Settings -> Custom data -> Products** dodaj pola pod przestrzenią `custom`:
- `custom.composition` (Single line text)
- `custom.fit` (Single line text)
- `custom.care_instruction` (Single line text)
- `custom.size_chart` (Single line text / Metaobject reference)
- `custom.material` (Single line text)
- `custom.country_of_origin` (Single line text)
- `custom.model_info` (Single line text)
- `custom.lookbook` (Single line text)

---

## 🧪 Instrukcja Testowania

1. **Uruchomienie serwera deweloperskiego:**
   ```bash
   npm run dev
   ```
2. **Koszyk i Checkout:**
   - Dodaj dowolny produkt do koszyka z wybranym rozmiarem i kolorem.
   - Otwórz podgląd koszyka `/cart`.
   - Kliknij **Realizuj zakup**. Powinieneś zostać bezproblemowo przekierowany do dokładnego adresu `checkoutUrl` w Shopify.
3. **Newsletter:**
   - Otwórz okno newslettera (modal) lub formularz w stopce.
   - Podaj adres e-mail i potwierdź zgodę marketingową.
   - Serwerowy endpoint `/api/newsletter/subscribe` doda lub zaktualizuje klienta w Shopify z opcją double opt-in (`SUBSCRIBED`).

---

## 🛠️ Komendy

- `npm run dev` — uruchamia lokalny serwer Next.js na porcie `3000`.
- `npm run build` — kompiluje produkcyjną wersję aplikacji i weryfikuje poprawność typów TypeScript.
- `npm run start` — uruchamia skompilowaną aplikację w trybie produkcyjnym.
