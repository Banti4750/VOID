import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/Cursor";
import { Loader } from "@/components/Loader";
import { LenisInit } from "@/components/LenisInit";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Nav } from "@/components/Nav";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "VØID | SS26 Zero Compromise",
  description: "New Drop. No Noise. Just Form. Premium streetwear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable}`}>
      <body className="antialiased min-h-screen bg-black text-bone overflow-x-hidden">
        <LenisInit />
        <ScrollProgress />
        <Cursor />
        <Loader />
        <Nav />
        {children}
      </body>
    </html>
  );
}
