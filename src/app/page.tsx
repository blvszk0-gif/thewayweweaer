'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSlider } from '@/components/home/HeroSlider';
import { LandingSections } from '@/components/home/LandingSections';
import { BackToTop } from '@/components/ui/BackToTop';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSlider />
      <LandingSections />
      <BackToTop />

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
