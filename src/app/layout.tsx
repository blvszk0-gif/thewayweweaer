import type { Metadata } from "next";
import { Antonio } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BackToTop } from "@/components/ui/BackToTop";
import { StoreProvider } from "@/context/StoreContext";
import "./globals.css";

const antonio = Antonio({
  weight: ["400", "700"],
  variable: "--font-antonio",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "The Way WE Wear",
  description: "Premium Minimalist Streetwear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${antonio.variable}`}>
      <body className="font-antonio antialiased">
        <StoreProvider>
          {children}
          <BackToTop />
        </StoreProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
