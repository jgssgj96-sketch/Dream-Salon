import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SalonProvider } from "@/lib/context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-cormorant" });

export const metadata: Metadata = {
  title: "Dream Salon | Modern Barbershop",
  description: "Experience premium grooming in a sophisticated setting.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-background text-off-white font-sans antialiased">
        <SalonProvider>
          {children}
        </SalonProvider>
      </body>
    </html>
  );
}