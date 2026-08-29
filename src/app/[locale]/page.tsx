import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSlider } from '@/components/home/HeroSlider';
import { LookbookTeaser } from '@/components/home/LookbookTeaser';
import { LandingSections } from '@/components/home/LandingSections';
import { getHomepageLookbook } from '@/lib/shopify/lookbook';

export const revalidate = 300;

export default async function Home() {
  const lookbook = await getHomepageLookbook().catch(() => null);

  return (
    <main className="min-h-screen">
      <Header />
      {lookbook && lookbook.slides.length > 0 && (
        <HeroSlider
          collectionTitle={lookbook.collectionTitle}
          collectionHandle={lookbook.collectionHandle}
          slides={lookbook.slides}
        />
      )}
      <LookbookTeaser />
      <LandingSections />
      <Footer />
    </main>
  );
}