import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cartContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KeyLight — Residential Lighting Design",
  description:
    "KeyLight is a boutique lighting design studio crafting bespoke residential lighting experiences across the world's most considered homes.",
  keywords: "residential lighting design, interior lighting, lighting studio, custom lighting",
  openGraph: {
    title: "KeyLight — Residential Lighting Design",
    description:
      "Lighting designed for the way you live. A boutique studio for residential interiors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body className="min-h-full antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
