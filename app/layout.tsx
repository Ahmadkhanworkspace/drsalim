import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Dr. Muhammad Salim - Author & Scholar",
  description: "Explore the books and articles of Dr. Muhammad Salim on theology, ethics, spiritual purification, and classical philosophy.",
  keywords: ["Dr. Muhammad Salim", "Islamic scholar", "books", "articles", "philosophy"],
  authors: [{ name: "Dr. Muhammad Salim" }],
  openGraph: {
    title: "Dr. Muhammad Salim - Author & Scholar",
    description: "Published books and articles by Dr. Muhammad Salim",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${lora.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased text-stone-900 bg-stone-50/50">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
