'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string; // Line ID
  variantId?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoadingCart: boolean;
  cartError: string | null;
  addToCart: (item: { variantId?: string; name: string; price: number; image: string; quantity: number; color?: string; size?: string }) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  proceedToCheckout: () => void;
  clearCartError: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoadingCart, setIsLoadingCart] = useState<boolean>(false);
  const [cartError, setCartError] = useState<string | null>(null);

  // Helper to sync Shopify Cart state from server response
  const syncCartState = (shopifyCart: any) => {
    if (!shopifyCart) {
      setCart([]);
      setCheckoutUrl(null);
      return;
    }

    setCartId(shopifyCart.id);
    setCheckoutUrl(shopifyCart.checkoutUrl);
    localStorage.setItem('twww-shopify-cart-id', shopifyCart.id);

    const mapped: CartItem[] = (shopifyCart.lines?.edges || []).map(({ node }: any) => {
      const selectedSize = node.merchandise?.selectedOptions?.find(
        (o: any) => o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'rozmiar'
      )?.value;
      const selectedColor = node.merchandise?.selectedOptions?.find(
        (o: any) => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'kolor'
      )?.value;

      return {
        id: node.id,
        variantId: node.merchandise?.id,
        name: node.merchandise?.product?.title || 'Produkt',
        price: parseFloat(node.merchandise?.price?.amount || '0'),
        image: node.merchandise?.product?.featuredImage?.url || 'https://placehold.co/400x500/000000/FFFFFF?text=TWWW',
        quantity: node.quantity,
        size: selectedSize,
        color: selectedColor,
      };
    });

    setCart(mapped);
  };

  // Call server proxy route `/api/shopify/cart`
  const callCartProxy = async (payload: Record<string, any>) => {
    const res = await fetch('/api/shopify/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error || 'Błąd komunikacji z serwerem Shopify Cart API.');
    }
    return data.cart;
  };

  // Initialize cart on mount
  useEffect(() => {
    const initStore = async () => {
      setIsLoadingCart(true);
      const savedWishlist = localStorage.getItem('twww-wishlist');
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist));
        } catch (e) {
          console.error(e);
        }
      }

      const existingCartId = localStorage.getItem('twww-shopify-cart-id');
      if (existingCartId) {
        try {
          const shopifyCart = await callCartProxy({ action: 'get', cartId: existingCartId });
          if (shopifyCart) {
            syncCartState(shopifyCart);
          } else {
            localStorage.removeItem('twww-shopify-cart-id');
          }
        } catch (err: any) {
          console.warn('Failed to restore Shopify cart:', err);
        }
      }
      setIsLoadingCart(false);
    };

    initStore();
  }, []);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('twww-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = async (item: { variantId?: string; name: string; price: number; image: string; quantity: number; color?: string; size?: string }) => {
    setIsLoadingCart(true);
    setCartError(null);

    if (!item.variantId) {
      setCartError('Wariant produktu jest niedostępny lub nie wybrano rozmiaru/koloru.');
      setIsLoadingCart(false);
      return;
    }

    try {
      const updatedCart = await callCartProxy({
        action: 'add',
        cartId: cartId || undefined,
        lines: [{ merchandiseId: item.variantId, quantity: item.quantity }],
      });

      if (updatedCart) {
        syncCartState(updatedCart);
      } else {
        throw new Error('Shopify Cart API nie zwróciło koszyka.');
      }
    } catch (err: any) {
      console.error('Cart add error:', err);
      setCartError(err.message || 'Nie udało się dodać produktu do koszyka. Sprawdź połączenie lub konfigurację Shopify.');
    } finally {
      setIsLoadingCart(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    setIsLoadingCart(true);
    setCartError(null);

    if (!cartId) {
      setIsLoadingCart(false);
      return;
    }

    try {
      const updatedCart = await callCartProxy({
        action: 'remove',
        cartId,
        lineIds: [lineId],
      });
      syncCartState(updatedCart);
    } catch (err: any) {
      console.error('Cart remove error:', err);
      setCartError(err.message || 'Błąd usuwania z koszyka Shopify.');
    } finally {
      setIsLoadingCart(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    setIsLoadingCart(true);
    setCartError(null);
    const validQty = Math.max(1, quantity);

    if (!cartId) {
      setIsLoadingCart(false);
      return;
    }

    try {
      const updatedCart = await callCartProxy({
        action: 'update',
        cartId,
        lines: [{ id: lineId, quantity: validQty }],
      });
      syncCartState(updatedCart);
    } catch (err: any) {
      console.error('Cart update error:', err);
      setCartError(err.message || 'Błąd aktualizacji ilości w koszyku.');
    } finally {
      setIsLoadingCart(false);
    }
  };

  const proceedToCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      setCartError('Brak aktywnego checkoutUrl z Shopify. Dodaj produkty do koszyka.');
    }
  };

  const clearCartError = () => setCartError(null);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((i) => i.id === id);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        cartId,
        checkoutUrl,
        isLoadingCart,
        cartError,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        proceedToCheckout,
        clearCartError,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
