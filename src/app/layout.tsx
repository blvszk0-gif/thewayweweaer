import type { Metadata } from "next";
import { Abel, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/ui/BackToTop";

const abel = Abel({
  weight: "400",
  variable: "--font-abel",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TWWW - The Way WE Wear",
  description: "Premium streetwear for gamers and anime fans.",
  icons: {
    icon: "/logokarta.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${abel.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#383e42] text-white">
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <BackToTop />
      </body>
    </html>
  );
}
