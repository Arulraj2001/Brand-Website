// SEO helpers shared across server components, layouts, and metadata functions.
// All URLs are derived from NEXT_PUBLIC_SITE_URL (falling back to the production domain)
// so metadata, sitemap, and robots always reference one true origin.

import type { Metadata } from 'next';

export const DEFAULT_SITE_NAME = 'Ostrune';

export function getSiteName(): string {
  const name = process.env.NEXT_PUBLIC_SITE_NAME?.trim();
  return name && name.length > 0 ? name : DEFAULT_SITE_NAME;
}

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://ostrune.netlify.app';
  return url.replace(/\/+$/, '');
}

export function getDefaultTagline(): string {
  return 'Custom websites engineered on any tech stack, scalable iOS & Android mobile applications, and predictable B2B lead generation funnels worldwide. Guaranteed 12h reply across all time zones.';
}

export interface OgUrlOptions {
  title: string;
  description?: string;
  type?: string;
}

// Absolute URL of the dynamically generated Open Graph image (/og route).
export function getOgImageUrl(opts: OgUrlOptions): string {
  const params = new URLSearchParams({
    title: opts.title,
    type: opts.type || 'website',
  });
  if (opts.description) params.set('description', opts.description);
  return `${getSiteUrl()}/og?${params.toString()}`;
}

export interface OgImageMeta {
  url: string;
  width: number;
  height: number;
  alt: string;
}

// Convenience wrapper returning an OG images array entry that references the /og generator.
export function ogImageEntry(opts: OgUrlOptions): OgImageMeta {
  return {
    url: getOgImageUrl(opts),
    width: 1200,
    height: 630,
    alt: opts.title,
  };
}

// Shared default robots metadata reused across pages for consistency.
export function seoRobots(): NonNullable<Metadata['robots']> {
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

// Shared default twitter card block.
export function twitterMeta(
  title: string,
  description: string,
  imageUrl: string
): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    title,
    description,
    creator: '@ostrune',
    images: [
      {
        url: imageUrl,
        alt: title,
      },
    ],
  };
}