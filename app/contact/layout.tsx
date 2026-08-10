import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Book a Free Strategy Call',
  description:
    'Get in touch with Ostrune. Book a free strategy call, request a quote for web development, SEO, or UGC video ads. Available worldwide across all time zones.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Ostrune | Free Strategy Call',
    description:
      'Book a free strategy call with Ostrune. Get a quote for web dev, SEO, or UGC ads. Available worldwide.',
    url: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
