import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Source_Sans_3, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import AutoLeadModal from '@/components/ui/AutoLeadModal';
import { CurrencyProvider } from '@/components/ui/CurrencyContext';
import JsonLd from '@/components/JsonLd';
import {
  organizationSchema,
  webSiteSchema,
  type JsonLdObject,
} from '@/lib/schema';
import { getSiteName, getSiteUrl, ogImageEntry, getDefaultTagline } from '@/lib/seo';

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

const baseUrl = getSiteUrl();
const siteName = getSiteName();
const defaultTagline = getDefaultTagline();
const GA_TRACKING_ID = 'G-54KHWP0NR5';

const defaultTitle = `${siteName} — Web Development, SEO & Performance Growth Agency`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FF9D00',
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultTagline,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  verification: {
    google: 's2W-AWEAXVsjx5SQMYZwRd33ZraT1c0qUbM4DGmpeW4',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: defaultTitle,
    description: defaultTagline,
    siteName,
    images: [ogImageEntry({ title: defaultTitle, description: defaultTagline, type: 'website' })],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultTagline,
    creator: '@ostrune',
    images: [ogImageEntry({ title: defaultTitle, description: defaultTagline, type: 'website' })],
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

// Organization + WebSite + LocalBusiness structured data (injected once globally on every page).
function buildGlobalSchema(): JsonLdObject[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: siteName,
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
    },
    organizationSchema({
      url: baseUrl,
      name: siteName,
      logo: `${baseUrl}/logo.png`,
      description: defaultTagline,
      sameAs: [
        'https://www.linkedin.com',
        'https://twitter.com/ostrune',
        'https://www.instagram.com',
      ],
      address: {
        streetAddress: 'Tiruvannamalai',
        addressLocality: 'Tiruvannamalai',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'India',
      },
      knowsAbout: [
        'Next.js Web Development',
        'Website Speed Optimization',
        'Core Web Vitals',
        'Technical SEO',
        'React Native App Development',
        'Supabase PostgreSQL Architecture',
        'UGC Video Ads Production',
        'Meta Conversions API (CAPI)',
        'Conversion Rate Optimization (CRO)',
      ],
      areaServed: [
        'United States',
        'United Kingdom',
        'Canada',
        'Australia',
        'Germany',
        'India',
        'Worldwide',
      ],
      hasOfferCatalog: {
        name: 'Digital Engineering & Growth Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Website Speed & SEO Upgrade',
              url: `${baseUrl}/services/website-speed-upgrade`,
              description: 'Sub-second Core Web Vitals optimization and legacy site overhauls.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'UGC Video Ads for E-Commerce',
              url: `${baseUrl}/services/ugc-video-ads`,
              description: 'High-converting user-generated video ad creatives for TikTok and Meta.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Website Development',
              url: `${baseUrl}/services/website-development`,
              description: 'Next.js business websites, landing pages, and e-commerce portals.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'App Development',
              url: `${baseUrl}/services/app-development`,
              description: 'Cross-platform React Native and Next.js web and mobile apps.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Technical SEO Optimization',
              url: `${baseUrl}/services/seo-optimization`,
              description: 'Commercial keyword mapping, structured JSON-LD schemas, and ranking growth.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Local Business Marketing',
              url: `${baseUrl}/services/local-business-marketing`,
              description: 'Google Map 3-pack optimization, citation building, and review funnels.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Meta & LinkedIn Ads',
              url: `${baseUrl}/services/meta-ads`,
              description: 'Full-funnel paid advertising with server-side CAPI pixel setup.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Sales Growth & CRO',
              url: `${baseUrl}/services/sales-growth-cro`,
              description: 'Interactive qualification funnels, CRM routing, and 12-hour response alerts.',
            },
          },
        ],
      },
      contactPoint: {
        telephone: '+91 8637474067',
        contactType: 'customer service',
        email: 'arulraj8637@gmail.com',
        availableLanguage: ['English', 'Tamil'],
      },
    }),
    webSiteSchema({
      url: baseUrl,
      name: siteName,
      searchUrl: `${baseUrl}/blog?q={search_term_string}`,
    }),
  ];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceCode.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#1C1C1C] selection:bg-[#FFD21E] selection:text-[#1C1C1C]">
        <JsonLd data={buildGlobalSchema()} />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
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