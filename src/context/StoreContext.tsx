'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type CartItem = { id: string; merchandiseId: string; name: string; handle: string; price: number; currencyCode: string; image: string; quantity: number; color?: string; size?: string };
export type WishlistItem = { id: string; name: string; price: number; image: string; category: string; variantId?: string; availableForSale?: boolean };
type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
  lines: {
    nodes: Array<{
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        selectedOptions: Array<{ name: string; value: string }>;
        product: { title: string; handle: string; featuredImage: { url: string } | null };
        price: { amount: string; currencyCode: string };
        image: { url: string } | null;
      };
    }>;
  };
};
type AddToCartInput = { merchandiseId?: string; id?: string; name?: string; price?: number; image?: string; quantity?: number; color?: string; size?: string };
type StoreContextType = {
  cart: CartItem[]; cartId: string | null; checkoutUrl: string | null; cartError: string | null; isCartLoading: boolean;
  addToCart: (item: AddToCartInput) => Promise<boolean>; removeFromCart: (lineId: string) => Promise<void>; updateQuantity: (lineId: string, quantity: number) => Promise<void>; checkout: () => void;
  wishlist: WishlistItem[]; addToWishlist: (item: WishlistItem) => void; removeFromWishlist: (id: string) => void; isInWishlist: (id: string) => boolean;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);
const CART_KEY = 'twww-shopify-cart-id';
const WISHLIST_KEY = 'twww-wishlist';

function mapCart(raw: RawCart): CartItem[] {
  return raw.lines.nodes.map((line) => {
    const options = Object.fromEntries(
      line.merchandise.selectedOptions.map((option) => [
        option.name.toLowerCase(),
        option.value,
      ])
    );

    return {
      id: line.id,
      merchandiseId: line.merchandise.id,
      name: line.merchandise.product.title,
      handle: line.merchandise.product.handle,
      price: Number(line.merchandise.price.amount),
      currencyCode: line.merchandise.price.currencyCode,
      image:
        line.merchandise.image?.url ||
        line.merchandise.product.featuredImage?.url ||
        '',
      quantity: line.quantity,
      color: options.color || options.kolor,
      size: options.size || options.rozmiar,
    };
  });
}

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [cartError, setCartError] = useState<string | null>(null);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const applyCart = useCallback((raw: RawCart) => { setCartId(raw.id); setCheckoutUrl(raw.checkoutUrl); setCart(mapCart(raw)); localStorage.setItem(CART_KEY, raw.id); }, []);
  const requestCart = useCallback(async (url: string, init?: RequestInit) => {
    const response = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } });
    const body = await response.json() as { cart?: RawCart; error?: string };
    if (!response.ok || !body.cart) throw new Error(body.error || 'Nie udało się połączyć z koszykiem Shopify.');
    return body.cart;
  }, []);

  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_KEY);
    const savedWishlist = localStorage.getItem(WISHLIST_KEY);
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (!savedCartId) return;
    setIsCartLoading(true);
    requestCart(`/api/shopify/cart?cartId=${encodeURIComponent(savedCartId)}`).then(applyCart).catch(() => localStorage.removeItem(CART_KEY)).finally(() => setIsCartLoading(false));
  }, [applyCart, requestCart]);
  useEffect(() => { localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = async (item: AddToCartInput) => {
    if (!item.merchandiseId) { setCartError('Wybierz dostępny wariant produktu przed dodaniem go do koszyka.'); return false; }
    setCartError(null); setIsCartLoading(true);
    try { applyCart(await requestCart('/api/shopify/cart', { method: 'POST', body: JSON.stringify({ cartId, merchandiseId: item.merchandiseId, quantity: item.quantity || 1 }) })); return true; }
    catch (error) { setCartError(error instanceof Error ? error.message : 'Nie udało się dodać produktu do koszyka.'); return false; }
    finally { setIsCartLoading(false); }
  };
  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cartId) return; setCartError(null); setIsCartLoading(true);
    try { applyCart(await requestCart('/api/shopify/cart', { method: 'PATCH', body: JSON.stringify({ cartId, lineId, quantity }) })); }
    catch (error) { setCartError(error instanceof Error ? error.message : 'Nie udało się zmienić ilości.'); }
    finally { setIsCartLoading(false); }
  };
  const removeFromCart = async (lineId: string) => {
    if (!cartId) return; setCartError(null); setIsCartLoading(true);
    try { applyCart(await requestCart('/api/shopify/cart', { method: 'DELETE', body: JSON.stringify({ cartId, lineId }) })); }
    catch (error) { setCartError(error instanceof Error ? error.message : 'Nie udało się usunąć produktu.'); }
    finally { setIsCartLoading(false); }
  };
  const checkout = () => { if (!checkoutUrl) { setCartError('Twój koszyk jest pusty lub nie jest jeszcze gotowy.'); return; } window.location.assign(checkoutUrl); };
  const addToWishlist = (item: WishlistItem) => setWishlist((previous) => previous.some((entry) => entry.id === item.id) ? previous : [...previous, item]);
  const removeFromWishlist = (id: string) => setWishlist((previous) => previous.filter((entry) => entry.id !== id));
  const isInWishlist = (id: string) => wishlist.some((entry) => entry.id === id);
  return <StoreContext.Provider value={{ cart, cartId, checkoutUrl, cartError, isCartLoading, addToCart, removeFromCart, updateQuantity, checkout, wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>{children}</StoreContext.Provider>;
};

export const useStore = () => { const context = useContext(StoreContext); if (!context) throw new Error('useStore must be used within a StoreProvider'); return context; };
