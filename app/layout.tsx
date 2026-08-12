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
    default: 'Ostrune | Affordable Web Development, SEO & Growth Agency',
    template: '%s | Ostrune',
  },
  description:
    'High-impact web engineering, old website speed upgrades, technical SEO, and growth support for clients worldwide.',
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
    locale: 'en_US',
    url: baseUrl,
    title: 'Ostrune | Affordable Web Development, SEO & Growth Agency',
    description:
      'High-impact web engineering, sub-second speed upgrades, technical SEO, and growth support for clients worldwide.',
    siteName: 'Ostrune',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        secureUrl: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ostrune — Affordable Web Development, SEO & Growth Agency',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ostrune | Web Development & SEO Growth Agency',
    description:
      'Sub-second web engineering, technical SEO, and growth systems for ambitious companies.',
    creator: '@ostrune',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        alt: 'Ostrune Digital Agency',
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
  // NOTE: phone, sameAs, and social URLs are managed via Admin → Site Settings
  // so they update without a code deploy. Defaults below are used until admin saves real values.
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ostrune',
    description: 'Affordable web development, technical SEO, UGC video ads, and digital growth for clients worldwide.',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    // sameAs and contactPoint are injected dynamically from admin site settings
    // via the WhatsAppFloatingButton which reads from Supabase. No hardcoded
    // placeholder values are used here to avoid misleading Google.
  };

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ostrune',
    url: baseUrl,
    // SearchAction removed: the portfolio ?q= param is not a true site search endpoint
  };

  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceCode.variable} h-full antialiased`}>
      <head>
        {/* google verification is already declared in metadata.verification above — one tag is enough */}
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
