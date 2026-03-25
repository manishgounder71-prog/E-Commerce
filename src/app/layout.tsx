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
    default: "NEBULA | NEXT-GEN B2B E-COMMERCE",
    template: "%s | NEBULA"
  },
  description: "High-performance B2B marketplace for architectural assets, hardware evolution, and neural fiber apparel. Production-ready assets for the architectural void.",
  keywords: ["B2B", "Architectural Assets", "Hardware", "Apparel", "Marketplace", "Design Systems", "Next-gen E-commerce"],
  authors: [{ name: "NEBULA Team" }],
  creator: "NEBULA",
  publisher: "NEBULA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nebula-ecommerce.vercel.app',
    siteName: 'NEBULA',
    title: 'NEBULA | NEXT-GEN B2B E-COMMERCE',
    description: 'High-performance B2B marketplace for architectural assets and high-end hardware.',
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
    title: 'NEBULA | NEXT-GEN B2B E-COMMERCE',
    description: 'Next-generation B2B marketplace for architectural assets.',
    images: ['/og-image.jpg'],
    creator: '@nebula_store',
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
  verification: {
    google: 'google-site-verification-id', // User should replace with actual ID
    yandex: 'yandex-verification-id',
    yahoo: 'yahoo-verification-id',
    other: {
      me: ['my-contact-url'],
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
