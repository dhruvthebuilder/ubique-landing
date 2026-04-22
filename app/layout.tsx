import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ubique — Your Wardrobe, Everywhere",
  description: "Ubique digitises, stores, and delivers your wardrobe. Daily. Now accepting reservations in Mumbai, Delhi, Bengaluru, Hyderabad, and Chennai.",
  openGraph: {
    title: "Ubique — Your Wardrobe, Everywhere",
    description: "Reserve your archivist session. No payment required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg text-ink">{children}</body>
    </html>
  );
}
