import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dr. Muhammad Salim - Author & Scholar",
  description: "Delve into the knowledge and insights of Dr. Muhammad Salim. Explore his books available on Amazon and read thought-provoking articles on spirituality, philosophy, and Islamic studies.",
  keywords: ["Dr. Muhammad Salim", "Islamic scholar", "books", "articles", "spirituality", "philosophy"],
  authors: [{ name: "Dr. Muhammad Salim" }],
  openGraph: {
    title: "Dr. Muhammad Salim - Author & Scholar",
    description: "Join thousands on a journey of knowledge with Dr. Muhammad Salim",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
