import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Blog | Web Dev, SEO & Growth Insights',
  description:
    'Read Ostrune\'s engineering blog for actionable insights on web development, technical SEO, performance optimization, and digital growth strategies.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Ostrune Engineering Blog | Web Dev & SEO Insights',
    description:
      'Actionable engineering & SEO content from the Ostrune team. Web dev guides, performance tips, and growth strategies.',
    url: '/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
