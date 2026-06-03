'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Fraction = 'player' | 'anime' | null;

interface ThemeContextType {
  fraction: Fraction;
  setFraction: (fraction: Fraction) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fraction, setFraction] = useState<Fraction>(null);

  useEffect(() => {
    const saved = localStorage.getItem('twww-fraction') as Fraction;
    if (saved) setFraction(saved);
  }, []);

  useEffect(() => {
    if (fraction) {
      document.documentElement.setAttribute('data-theme', fraction);
      localStorage.setItem('twww-fraction', fraction);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [fraction]);

  return (
    <ThemeContext.Provider value={{ fraction, setFraction }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
