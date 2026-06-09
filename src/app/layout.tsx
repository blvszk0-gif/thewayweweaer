import type { Metadata } from "next";
import { Abel } from "next/font/google";
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
    <html lang="pl" className={abel.variable}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Abel&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
