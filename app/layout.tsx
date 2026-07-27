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
    default: 'ApexPulse Digital | Premier Web & Software Engineering Agency India',
    template: '%s | ApexPulse Digital India',
  },
  description:
    'High-impact custom web & app development, national SEO dominance, high-ROAS Meta Ads, and automated WhatsApp lead generation for ambitious Indian brands.',
  keywords: [
    'Web Development Agency India',
    'Custom Software Developers Bangalore',
    'SEO Agency Mumbai',
    'Meta Ads Agency Gurgaon',
    'B2B Lead Generation India',
  ],
  authors: [{ name: 'ApexPulse Digital Technologies' }],
  creator: 'ApexPulse Digital Technologies',
  publisher: 'ApexPulse Digital Technologies',
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://apexpulse.in',
    title: 'ApexPulse Digital | Web & App Engineering & ROI Growth Agency India',
    description:
      'Engineered web & software portals, top 3 SEO rankings, and verified INR revenue growth for ambitious companies across India.',
    siteName: 'ApexPulse Digital',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceCode.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#1C1C1C] selection:bg-[#FFD21E] selection:text-[#1C1C1C]">
        <Navbar />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
