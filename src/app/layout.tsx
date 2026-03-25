import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nebula-ecommerce.vercel.app'),
  title: {
    default: "NEBULA | B2B ARCHITECTURAL VOID",
    template: "%s | NEBULA"
  },
  description: "Next-generation B2B marketplace for architectural assets, hardware evolution, and neural fiber apparel. Production-ready assets for the architectural void.",
  keywords: ["B2B", "Architectural Assets", "Hardware", "Apparel", "Marketplace", "Design Systems"],
  authors: [{ name: "NEBULA Team" }],
  creator: "NEBULA",
  publisher: "NEBULA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nebula-ecommerce.vercel.app',
    siteName: 'NEBULA',
    title: 'NEBULA | B2B ARCHITECTURAL VOID',
    description: 'Production-ready B2B marketplace for architectural assets and high-end hardware.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NEBULA Marketplace Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEBULA | B2B ARCHITECTURAL VOID',
    description: 'Next-generation B2B marketplace for architectural assets.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'NEBULA',
              url: 'https://nebula-ecommerce.vercel.app',
              logo: 'https://nebula-ecommerce.vercel.app/logo.png',
              sameAs: [
                'https://twitter.com/nebula',
                'https://github.com/nebula',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-XXXXXXXXXX',
                contactType: 'customer service',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased bg-surface text-on-surface selection:bg-white selection:text-black scanline-overlay`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
