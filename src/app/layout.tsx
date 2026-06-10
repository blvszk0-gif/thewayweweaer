import type { Metadata } from "next";
import { Abel } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BackToTop } from "@/components/ui/BackToTop";
import "./globals.css";

const abel = Abel({
  weight: "400",
  variable: "--font-abel",
  subsets: ["latin"],
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
    <html lang="pl" className={`${abel.variable}`}>
      <body className="font-abel antialiased">
        {children}
        <BackToTop />
        <SpeedInsights />
      </body>
    </html>
  );
}
