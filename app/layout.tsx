import type { Metadata } from 'next';
import { Source_Sans_3, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
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

const baseUrl = 'https://arusythapex.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Arusyth Apex | Affordable Web Development, SEO & Growth Agency',
    template: '%s | Arusyth Apex Technologies',
  },
  description:
    'High-impact web engineering, old website speed upgrades, technical SEO, and final year student IEEE projects under MSME registered Learnithm for clients worldwide.',
  keywords: [
    'Arusyth Apex',
    'Arusyth Apex Technologies',
    'Arusyth Apex Netlify',
    'Arusyth Apex Web Development',
    'Web Development Agency',
    'Affordable Web Development Company',
    'Technical SEO Agency',
    'Old Website Speed Overhaul',
    'Custom React Next.js Development',
    'BCA MCA Final Year Student Projects Learnithm',
    'IEEE Project Documentation and Reports',
    'MSME Registered Project Certification',
  ],
  authors: [{ name: 'Arusyth Apex Growth Team' }],
  creator: 'Arusyth Apex Growth Team',
  publisher: 'Arusyth Apex Technologies',
  verification: {
    google: 's2W-AWEAXVsjx5SQMYZwRd33ZraT1c0qUbM4DGmpeW4',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'Arusyth Apex | Affordable Web Development, SEO & Performance Agency',
    description:
      'Engineered web portals, sub-second speed upgrades, top 3 SEO rankings, and MSME Learnithm student final year project guidance worldwide.',
    siteName: 'Arusyth Apex',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Arusyth Apex Digital Agency & Student Projects Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arusyth Apex Technologies | Web Development & SEO Growth Agency',
    description:
      'Sub-second web engineering, technical SEO, and verified student project certifications under MSME registered Learnithm.',
    creator: '@arusyth_apex',
    images: [`${baseUrl}/og-image.png`],
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
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Arusyth Apex Technologies',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://learnithm.vercel.app/',
      'https://linkedin.com/company/arusyth-apex',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-555-0199',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
  };

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Arusyth Apex',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/portfolio?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceCode.variable} h-full antialiased`}>
      <head>
        <meta name="google-site-verification" content="s2W-AWEAXVsjx5SQMYZwRd33ZraT1c0qUbM4DGmpeW4" />
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
        </CurrencyProvider>
      </body>
    </html>
  );
}
