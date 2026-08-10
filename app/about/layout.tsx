import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Our Story, Team & Mission',
  description:
    'Learn about Ostrune — our founding story, global engineering team, and mission to deliver US-standard web development at 60% lower cost for brands worldwide.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Ostrune | Affordable Global Web Agency',
    description:
      'Ostrune delivers US-standard web engineering, SEO, and growth systems at 60% lower cost. Meet our team and story.',
    url: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
