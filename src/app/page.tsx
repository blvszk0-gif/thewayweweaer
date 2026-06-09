'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSlider } from '@/components/home/HeroSlider';
import { LandingSections } from '@/components/home/LandingSections';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroSlider />
      <LandingSections />
      <Footer />
    </main>
  );
}
