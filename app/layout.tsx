import type { Metadata } from 'next';
import { Source_Sans_3, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import AutoLeadModal from '@/components/ui/AutoLeadModal';
import { CurrencyProvider } from '@/components/ui/CurrencyContext';

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

const baseUrl = 'https://ostrune.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ostrune — Web Development & SEO Agency India',
    template: '%s | Ostrune',
  },
  description:
    'We build fast websites, run SEO & Meta Ads that get real clients for Indian businesses. Free site audit — reply guaranteed in 12 hours.',
  authors: [{ name: 'Ostrune' }],
  creator: 'Ostrune',
  publisher: 'Ostrune',
  verification: {
    google: 's2W-AWEAXVsjx5SQMYZwRd33ZraT1c0qUbM4DGmpeW4',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    title: 'Ostrune — Web Development & SEO Agency India',
    description:
      'We build fast websites, run SEO & Meta Ads that get real clients for Indian businesses. Free site audit — reply guaranteed in 12 hours.',
    siteName: 'Ostrune',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        secureUrl: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ostrune — Web Development & SEO Agency India',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ostrune — Web Development & SEO Agency India',
    description:
      'We build fast websites, run SEO & Meta Ads that get real clients for Indian businesses. Free site audit — reply guaranteed in 12 hours.',
    creator: '@ostrune',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        alt: 'Ostrune — Web Development & SEO Agency India',
      },
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
  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ostrune',
    url: baseUrl,
    telephone: '+91 8637474067',
    email: 'arulraj8637@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tiruvannamalai',
      addressLocality: 'Tiruvannamalai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'India',
    },
    areaServed: ['India', 'Global'],
    priceRange: '₹₹',
    image: `${baseUrl}/logo.png`,
  };

  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ostrune',
    description: 'We build fast websites, run SEO & Meta Ads that get real clients for Indian businesses. Free site audit — reply guaranteed in 12 hours.',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    telephone: '+91 8637474067',
    email: 'arulraj8637@gmail.com',
  };

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ostrune',
    url: baseUrl,
  };

  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceCode.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#1C1C1C] selection:bg-[#FFD21E] selection:text-[#1C1C1C]">
        <CurrencyProvider>
          <Navbar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
          <AutoLeadModal />
        </CurrencyProvider>
      </body>
    </html>
  );
}
