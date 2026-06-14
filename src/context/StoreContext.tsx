'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('twww-cart');
    const savedWishlist = localStorage.getItem('twww-wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('twww-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('twww-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      // Logic for Hero Slider / Unique items where we only want one per SKU
      const isUniqueItem = item.id.includes('packshot') || item.id.includes('slide');
      const existing = prev.find(i => i.id === item.id && i.size === item.size && i.color === item.color);

      if (existing) {
        if (isUniqueItem) return prev; // Don't add more if it's unique
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i));
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlist(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(i => i.id !== id));
  };

  const isInWishlist = (id: string) => {
    return wishlist.some(i => i.id === id);
  };

  return (
    <StoreContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
