import type { Metadata } from "next";
import { Antonio } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BackToTop } from "@/components/ui/BackToTop";
import { StoreProvider } from "@/context/StoreContext";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import "../globals.css";

const antonio = Antonio({
  weight: ["400", "700"],
  variable: "--font-antonio",
  subsets: ["latin", "latin-ext"],
  display: 'swap',
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      default: "The Way WE Wear",
      template: "%s | The Way WE Wear"
    },
    description: "Premium Minimalist Streetwear",
    icons: {
      icon: [
        { url: '/logokarta.png', type: 'image/png' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: '/logokarta.png',
    },
    alternates: {
      canonical: locale === 'pl' ? '/' : `/${locale}`,
      languages: {
        'pl': '/',
        'en': '/en',
        'uk': '/uk'
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const klaviyoCompanyId = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID;

  return (
    <html lang={locale} className={`${antonio.variable}`}>
      <body className="font-antonio antialiased">
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            {children}
            <BackToTop />
          </StoreProvider>
        </NextIntlClientProvider>
        <SpeedInsights />
        {klaviyoCompanyId && (
          <Script
            id="klaviyo-onsite"
            strategy="afterInteractive"
            src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${encodeURIComponent(klaviyoCompanyId)}`}
          />
        )}
      </body>
    </html>
  );
}
