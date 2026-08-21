# The Way WE Wear — Next.js 15 & Shopify E-Commerce Integration

Ten projekt reprezentuje oficjalny sklep internetowy **The Way WE Wear** (https://thewaywewear.pl) zbudowany na **Next.js 15 (App Router)** i zintegrowany z **Shopify** jako wyłącznym silnikiem e-commerce (Storefront API, Admin API i Customer Account API).

---

## 🚀 Wymagania Środowiskowe

* **Node.js**: `>=18.17.0`
* **NPM**: `>=9.0.0`
* **Shopify Storefront API Version**: `2026-07`

---

## 🔑 Zmienne Środowiskowe (`.env` / `.env.local`)

Utwórz plik `.env.local` na podstawie `.env.example`:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_public_storefront_access_token
SHOPIFY_PRIVATE_STOREFRONT_ACCESS_TOKEN=your_private_storefront_access_token_server_only
SHOPIFY_API_VERSION=2026-07
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_api_token_for_custom_app
SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID=your_customer_account_client_id
```

### Opis Zmiennych:
1. `SHOPIFY_STORE_DOMAIN`: Domena Twojego sklepu Shopify (np. `thewaywewear.myshopify.com`).
2. `SHOPIFY_STOREFRONT_ACCESS_TOKEN`: Publiczny token dostępowy Storefront API.
3. `SHOPIFY_PRIVATE_STOREFRONT_ACCESS_TOKEN`: Prywatny token dostępowy Storefront API (używany wyłącznie po stronie serwera w route handlerach `/api/shopify/*`).
4. `SHOPIFY_API_VERSION`: Wersja API (`2026-07`).
5. `SHOPIFY_ADMIN_ACCESS_TOKEN`: Admin API access token dla custom app (używany wyłącznie po stronie serwera w `/api/newsletter/subscribe` do mutacji ze zgodą Double Opt-in). **Nigdy nie trafia do przeglądarki.**
6. `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID`: Client ID z panelu Shopify Customer Accounts API.

---

## 🏗️ Architektura Proxy Serwerowego (`/api/shopify/*`)

Aplikacja wykonuje wszystkie zapytania i mutacje Storefront API wyłącznie po stronie serwera za pomocą wewnętrznych route handlerów:
- `/api/shopify/cart`: Obsługa operacji na koszyku (get, create, add, update, remove).
- `/api/shopify/products`: Pobieranie listy lub szczegółów produktów po `handle`.
- `/api/shopify/collections`: Pobieranie kolekcji i przypisanych do nich produktów.
- `/api/shopify/metaobjects`: Pobieranie opublikowanych metaobiektów (`lookbook`, `care_instruction`, `size_chart`, itp.).
- `/api/shopify/policies`: Pobieranie oficjalnych regulaminów i polityk sklepu.

Dzięki temu prywatne tokeny nie są udostępniane w kodzie klienckim (bundle JavaScript przeglądarki).

---

## 🛍️ Konfiguracja Sklepu w Panelu Shopify

### 1. Kanał Sprzedaży Headless w Shopify
1. Zaloguj się do **Shopify Admin** (`https://admin.shopify.com`).
2. Przejdź do: **Shopify Admin → Sales channels (Kanały sprzedaży) → Headless → Add storefront (Dodaj storefront)**.
3. W sekcji **Storefront API permissions (Uprawnienia Storefront API)** włącz dokładnie następujące uprawnienia:
   - `unauthenticated_read_metaobjects`
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_content`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_customers`
   - `unauthenticated_write_customers`
4. Skopiuj wygenerowany **Storefront API access token** oraz **Private Storefront API access token**.

### 2. Tworzenie `SHOPIFY_ADMIN_ACCESS_TOKEN` (Custom App)
Do obsługi mutacji newslettera ze zgodą Double Opt-in po stronie serwera wymagany jest Admin API access token utworzony jako Custom App:
1. Przejdź do: **Shopify Admin → Settings (Ustawienia) → Apps and sales channels (Aplikacje i kanały sprzedaży) → Develop apps (Twórz aplikacje)**.
2. Kliknij **Create app (Utwórz aplikację)** i podaj nazwę np. `TWWW Admin Services`.
3. W zakładce **Configuration (Konfiguracja)** przy **Admin API integration** wybierz **Configure (Skonfiguruj)** i zaznacz scopes:
   - `read_customers`
   - `write_customers`
4. Kliknij **Save (Zapisz)**, a następnie **Install app (Zainstaluj aplikację)**.
5. Skopiuj wygenerowany **Admin API access token** i wklej go do zmiennej `SHOPIFY_ADMIN_ACCESS_TOKEN`.

### 3. Publikacja Zasobów w Kanale Headless (Wymóg konieczny!)
Wszystkie **produkty**, **kolekcje** oraz **metaobiekty** utworzone w Shopify muszą mieć włączoną dostępność (publikację) dla kanału sprzedaży **Headless**. Jeżeli produkt nie zostanie przypisany do kanału Headless, nie pojawi się na froncie w sklepie.

### 4. Definicja Metaobiektów w Shopify
W zakładce **Content (Treści) → Metaobjects (Metaobiekty)** utwórz metaobiekty z poniższymi typami pól:

1. `lookbook`:
   - `title` (Single line text)
   - `season` (Single line text)
   - `description` (Multi-line text)
   - `images` (List of files — wyłącznie obrazy)
   - `sort_order` (Integer)
2. `care_instruction`:
   - `title` (Single line text)
   - `icon` (Image / File)
   - `description` (Multi-line text)
   - `sort_order` (Integer)
3. `size_chart`:
   - `title` (Single line text)
   - `image` (Image / File)
   - `description` (Multi-line text)
   - `notes` (Multi-line text)
4. `faq`:
   - `question` (Single line text)
   - `answer` (Rich text)
   - `category` (Single line text)
   - `sort_order` (Integer)
5. `social_link`:
   - `platform` (Single line text)
   - `url` (URL)
   - `sort_order` (Integer)
6. `editorial_page`:
   - `title` (Single line text)
   - `body` (Rich text)
   - `featured_image` (Image / File)
   - `seo_title` (Single line text)
   - `seo_description` (Single line text)

### 5. Definicja Metafields dla Produktów
W zakładce **Settings → Custom data → Products** utwórz następujące pola w przestrzeni `custom`:
- `custom.composition` (Single line text / Multi-line text)
- `custom.fit` (Single line text / Multi-line text)
- `custom.care_instruction` (Metaobject reference → `care_instruction`)
- `custom.size_chart` (Metaobject reference → `size_chart`)
- `custom.material` (Single line text)
- `custom.country_of_origin` (Single line text)
- `custom.model_info` (Single line text)
- `custom.lookbook` (Metaobject reference lub Metaobject reference list → `lookbook`)

---

## 👤 Realne Konto Klienta & OAuth PKCE (`/api/auth/*`)

Aplikacja wykorzystuje oficjalny protokół OAuth 2.0 PKCE dla Shopify Customer Account API:
- `/api/auth/login`: Generuje unikalny PKCE `code_verifier`, hash `code_challenge` oraz `state`, po czym przekierowuje użytkownika do logowania Shopify.
- `/api/auth/callback`: Weryfikuje `state` i wymienia kod na autoryzowany token dostępowy, zapisując go w zaszyfrowanym ciasteczku `twww_customer_session` (HttpOnly).
- `/api/auth/me`: Odczytuje sesję i pobiera bezpośrednio z GraphQL API Customer Account dane profilu oraz historię zamówień klienta.
- `/api/auth/logout`: Czyści ciasteczka sesyjne i przekierowuje do wylogowania Shopify.

### Wymagana Konfiguracja w Panelu Shopify:
1. W panelu **Shopify Admin → Customer accounts** włącz opcję Nowe Konta Klientów (New Customer Accounts).
2. Ustawienia URL:
   - **Allowed callback URIs:**
     - `https://thewaywewear.pl/api/auth/callback`
     - Dla testów lokalnych tunel HTTPS: `https://<twoj-tunel>.ngrok.app/api/auth/callback`
   - **JavaScript origin:** `https://thewaywewear.pl`
   - **Allowed logout URIs:** `https://thewaywewear.pl`
3. **Zakupy jako gość (Guest Checkout)** są w pełni zachowane.

---

## 📩 Newsletter (Double Opt-In)

- Endpoint `/api/newsletter/subscribe` wywołuje bezpieczną mutację Admin API ustawiającą stan marketingowy zgody e-mail na `PENDING`.
- Shopify automatycznie generuje i wysyła wiadomość e-mail z linkiem potwierdzającym subskrypcję do klienta, zgodnie z ustawieniami Double Opt-in w sklepie.
- Żadne PII (dane osobowe) ani tokeny nie są logowane do konsoli serwera.

---

## 🧪 Uruchomienie i Testowanie

1. **Instalacja i rozwój:**
   ```bash
   npm install
   npm run dev
   ```
2. **Kompilacja produkcyjna i weryfikacja lintera:**
   ```bash
   npm run lint
   npm run build
   ```
