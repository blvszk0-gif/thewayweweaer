'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createCart,
  getCart,
  addToCart as shopifyAddToCart,
  updateCartLines as shopifyUpdateCartLines,
  removeCartLines as shopifyRemoveCartLines,
  ShopifyCart
} from '@/lib/shopify';

export interface CartItem {
  id: string; // Line ID or item ID
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
  addToCart: (item: { variantId?: string; name: string; price: number; image: string; quantity: number; color?: string; size?: string }) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  proceedToCheckout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoadingCart, setIsLoadingCart] = useState<boolean>(false);

  // Sync shopify cart data to state
  const syncShopifyCart = (shopifyCart: ShopifyCart | null) => {
    if (!shopifyCart) return;

    setCartId(shopifyCart.id);
    setCheckoutUrl(shopifyCart.checkoutUrl);
    localStorage.setItem('twww-shopify-cart-id', shopifyCart.id);

    const mappedItems: CartItem[] = shopifyCart.lines.edges.map(({ node }) => {
      const selectedSize = node.merchandise.selectedOptions?.find((o) => o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'rozmiar')?.value;
      const selectedColor = node.merchandise.selectedOptions?.find((o) => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'kolor')?.value;

      return {
        id: node.id,
        variantId: node.merchandise.id,
        name: node.merchandise.product.title,
        price: parseFloat(node.merchandise.price.amount),
        image: node.merchandise.product.featuredImage?.url || 'https://placehold.co/400x500/000000/FFFFFF?text=TWWW',
        quantity: node.quantity,
        size: selectedSize,
        color: selectedColor,
      };
    });

    setCart(mappedItems);
  };

  // Initialize Cart on Mount
  useEffect(() => {
    const initCart = async () => {
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
          const shopifyCart = await getCart(existingCartId);
          if (shopifyCart) {
            syncShopifyCart(shopifyCart);
            setIsLoadingCart(false);
            return;
          }
        } catch (err) {
          console.warn('Failed to fetch existing Shopify cart:', err);
        }
      }

      // Fallback local cart if shopify credentials or cart not present
      const savedLocalCart = localStorage.getItem('twww-cart');
      if (savedLocalCart) {
        try {
          setCart(JSON.parse(savedLocalCart));
        } catch (e) {
          console.error(e);
        }
      }
      setIsLoadingCart(false);
    };

    initCart();
  }, []);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('twww-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync local cart backup when not on Shopify
  useEffect(() => {
    if (!cartId) {
      localStorage.setItem('twww-cart', JSON.stringify(cart));
    }
  }, [cart, cartId]);

  const addToCart = async (item: { variantId?: string; name: string; price: number; image: string; quantity: number; color?: string; size?: string }) => {
    setIsLoadingCart(true);

    if (item.variantId) {
      try {
        let updatedCart: ShopifyCart | null = null;
        if (!cartId) {
          updatedCart = await createCart([{ merchandiseId: item.variantId, quantity: item.quantity }]);
        } else {
          updatedCart = await shopifyAddToCart(cartId, [{ merchandiseId: item.variantId, quantity: item.quantity }]);
        }

        if (updatedCart) {
          syncShopifyCart(updatedCart);
          setIsLoadingCart(false);
          return;
        }
      } catch (err) {
        console.warn('Shopify Cart Add error:', err);
      }
    }

    // Fallback local cart handling
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.name === item.name && i.size === item.size && i.color === item.color);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: `local-${Date.now()}`,
          variantId: item.variantId,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        },
      ];
    });

    setIsLoadingCart(false);
  };

  const removeFromCart = async (lineId: string) => {
    setIsLoadingCart(true);
    if (cartId && !lineId.startsWith('local-')) {
      try {
        const updatedCart = await shopifyRemoveCartLines(cartId, [lineId]);
        if (updatedCart) {
          syncShopifyCart(updatedCart);
          setIsLoadingCart(false);
          return;
        }
      } catch (err) {
        console.warn('Shopify Cart Remove error:', err);
      }
    }

    setCart((prev) => prev.filter((i) => i.id !== lineId));
    setIsLoadingCart(false);
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    setIsLoadingCart(true);
    const validQty = Math.max(1, quantity);

    if (cartId && !lineId.startsWith('local-')) {
      try {
        const updatedCart = await shopifyUpdateCartLines(cartId, [{ id: lineId, quantity: validQty }]);
        if (updatedCart) {
          syncShopifyCart(updatedCart);
          setIsLoadingCart(false);
          return;
        }
      } catch (err) {
        console.warn('Shopify Cart Update error:', err);
      }
    }

    setCart((prev) => prev.map((i) => (i.id === lineId ? { ...i, quantity: validQty } : i)));
    setIsLoadingCart(false);
  };

  const proceedToCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      alert('Koszyk zostanie otwarty po podłączeniu kluczy Shopify Storefront API.');
    }
  };

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
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        proceedToCheckout,
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
