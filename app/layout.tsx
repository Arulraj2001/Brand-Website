import type { Metadata } from 'next';
import { Source_Sans_3, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const sourceCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code',
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://apexpulse.in'),
  title: {
    default: 'ApexPulse | Affordable Web Development, SEO & Performance Growth Agency',
    template: '%s | ApexPulse Digital',
  },
  description:
    'High-impact web engineering, old website speed upgrades, technical SEO, and high-ROAS UGC video ads for ambitious brands in the US, UK, India, Canada, Australia, and Europe.',
  keywords: [
    'Web Development Agency',
    'affordable web development agency for Indian businesses',
    'SEO agency for Indian startups',
    'website development company serving India and international clients',
    'digital marketing agency for small businesses in India',
    'app development company India',
    'Technical SEO Agency US UK India',
    'Old Website Speed Overhaul',
    'Custom React Next.js Development',
    'UGC Video Ads Meta',
  ],
  authors: [{ name: 'ApexPulse Growth Team' }],
  creator: 'ApexPulse Growth Team',
  publisher: 'ApexPulse Growth Team',
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apexpulse.in',
    title: 'ApexPulse | Affordable Web Development, SEO & Growth Agency',
    description:
      'Engineered web portals, sub-second speed upgrades, and top 3 SEO rankings for businesses in US, UK, India, Canada, Australia & Europe.',
    siteName: 'ApexPulse',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'ApexPulse Digital Agency India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexPulse Digital | Web & App Engineering & ROI Growth Agency India',
    description:
      'Engineered web & software portals, top 3 SEO rankings, and verified INR revenue growth for ambitious companies across India.',
    creator: '@apexpulse_in',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    ],
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

import { CurrencyProvider } from '@/components/ui/CurrencyContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceCode.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#1C1C1C] selection:bg-[#FFD21E] selection:text-[#1C1C1C]">
        <CurrencyProvider>
          <Navbar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
        </CurrencyProvider>
      </body>
    </html>
  );
}
