import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies | Web Development & SEO',
  description:
    "Explore Ostrune's portfolio of web development, technical SEO, UGC video ads, and digital growth projects for clients worldwide.",
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Ostrune Portfolio | Web & SEO Case Studies',
    description:
      'Real client results - web engineering, speed upgrades, SEO growth, and paid ad campaigns delivered by Ostrune.',
    url: '/portfolio',
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
