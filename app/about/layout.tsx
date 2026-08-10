import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Our Story, Team & Mission',
  description:
    'Learn about Ostrune — our founding story, global engineering team, and mission to deliver premium web development at competitive rates for brands worldwide.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Ostrune | Affordable Global Web Agency',
    description:
      'Ostrune delivers premium web engineering, SEO, and growth systems at competitive rates. Meet our team and story.',
    url: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
