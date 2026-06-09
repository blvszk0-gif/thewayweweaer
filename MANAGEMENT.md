# Content Management - TWWW (PocketBase)

Twój sklep jest zintegrowany z PocketBase jako backendem. Aby zarządzać treścią, zaloguj się do panelu admina (standardowo `http://127.0.0.1:8090/_/`).

## Struktura Kolekcji

### 1. `products`
Główna kolekcja ubrań.
- `name` (Text): Nazwa produktu (np. OVERSIZE HOODIE).
- `price` (Number): Cena w PLN.
- `description` (Editor): Szczegółowy opis premium.
- `category` (Select): bluzy, koszulki, akcesoria.
- `images` (File): Paczka zdjęć (pierwsze zdjęcie to główny packshot).
- `stock` (JSON): Rozpiska rozmiarów (XS, S, M, L, XL, XXL) i ich dostępność.
- `embroideries` (Relation): Możliwe motywy haftu przypisane do produktu.

### 2. `collections`
- `name` (Text): Nazwa dropu (np. The Way WE Stare).
- `slug` (Text): URL (np. stare).
- `hero_image` (File): Zdjęcie do slidera na stronie głównej.
- `is_active` (Bool): Czy kolekcja jest widoczna.

### 3. `orders`
- `status` (Select): CONFIRMED, PREPARING, PACKING, SHIPPED.
- `customer_data` (JSON): Dane do wysyłki.
- `items` (Relation): Zakupione produkty.

## Zarządzanie Zdjęciami
Wszystkie zdjęcia powinny być w wysokiej rozdzielczości, najlepiej w formacie 3:4 dla kart produktów, aby zachować estetykę Apple/Zara.

## Personalizacja Frakcji
W PocketBase możesz stworzyć flagę `faction_exclusive` (GRACZ/ANIME), aby dany produkt wyświetlał się tylko wybranej "frakcji" po ich wyborze na wejściu.
