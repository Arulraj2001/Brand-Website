import { BlogCategory } from '@/types';

export interface BlogCtaInfo {
  category: BlogCategory;
  serviceTitle: string;
  serviceUrl: string; // e.g. /services#seo or /services for general
  auditTitle: string;
  auditBadge: string;
  auditDescription: string;
  midCalloutTitle: string;
  midCalloutText: string;
  ctaButtonText: string;
}

export const CATEGORY_CTA_CONFIG: Record<BlogCategory, BlogCtaInfo> = {
  seo: {
    category: 'seo',
    serviceTitle: 'SEO Optimization',
    serviceUrl: '/services#seo',
    auditTitle: 'Get a Free Organic SEO & Keyword Audit',
    auditBadge: 'FREE SEO AUDIT',
    auditDescription:
      'Discover high-intent keyword gaps, indexation errors, and schema opportunities to capture top 3 Google rankings.',
    midCalloutTitle: 'Struggling to Rank on Page 1 of Google?',
    midCalloutText:
      'Our engineering team builds SEO structures and schema wiring that drive rank #1 search positions.',
    ctaButtonText: 'Explore SEO Services',
  },
  web_dev: {
    category: 'web_dev',
    serviceTitle: 'Website Development',
    serviceUrl: '/services#web-dev',
    auditTitle: 'Get a Free Website Architecture & UX Audit',
    auditBadge: 'FREE WEBSITE AUDIT',
    auditDescription:
      'We audit your current codebase, design system, and checkout flows to build a modern, high-converting website.',
    midCalloutTitle: 'Need a Custom, High-Converting Website?',
    midCalloutText:
      'We build sub-second custom websites and e-commerce portals at a fraction of traditional agency rates.',
    ctaButtonText: 'View Web Dev Services',
  },
  app_dev: {
    category: 'app_dev',
    serviceTitle: 'App Development',
    serviceUrl: '/services#app-dev',
    auditTitle: 'Get a Free Web & Mobile App Strategy Review',
    auditBadge: 'FREE APP AUDIT',
    auditDescription:
      'Analyze database scalability, real-time auth, and API architecture for your web or cross-platform mobile app.',
    midCalloutTitle: 'Building a Web or Mobile Application?',
    midCalloutText:
      'From cloud backends to React Native & Web apps, we deliver scalable digital products fast.',
    ctaButtonText: 'View App Dev Services',
  },
  website_upgrade: {
    category: 'website_upgrade',
    serviceTitle: 'Old Website Upgrade & Speed Overhaul',
    serviceUrl: '/services#website-upgrade',
    auditTitle: 'Get a Free Core Web Vitals & Speed Audit',
    auditBadge: 'FREE SPEED AUDIT',
    auditDescription:
      'Uncover render-blocking scripts, uncompressed images, and plugin bloat slowing down your site speed.',
    midCalloutTitle: 'Is Your Slow Website Burning Potential Leads?',
    midCalloutText:
      'We overhaul legacy websites to achieve guaranteed 100/100 Core Web Vitals and sub-second load times.',
    ctaButtonText: 'View Speed Upgrade Services',
  },
  local_business: {
    category: 'local_business',
    serviceTitle: 'Local Business Marketing',
    serviceUrl: '/services#local-business',
    auditTitle: 'Get a Free Local Map Pack & Citation Audit',
    auditBadge: 'FREE LOCAL AUDIT',
    auditDescription:
      'Find out why competitors are outranking you on local Google Map packs and how to automate consultation bookings.',
    midCalloutTitle: 'Want More Inquiries from Local Customers?',
    midCalloutText:
      'Dominate local map searches and build automated review workflows for your brick-and-mortar business.',
    ctaButtonText: 'View Local Marketing Services',
  },
  meta_ads: {
    category: 'meta_ads',
    serviceTitle: 'Meta & LinkedIn Ads',
    serviceUrl: '/services#meta-ads',
    auditTitle: 'Get a Free Meta Ads & Conversion Pixel Audit',
    auditBadge: 'FREE ADS AUDIT',
    auditDescription:
      'Review your Server-Side CAPI tracking, ad creative fatigue, and audience targeting to lower cost-per-acquisition.',
    midCalloutTitle: 'High Cost-Per-Acquisition on Meta & LinkedIn Ads?',
    midCalloutText:
      'We set up CAPI tracking and high-converting retargeting funnels for verified ROAS growth.',
    ctaButtonText: 'View Meta Ads Services',
  },
  ugc_ads: {
    category: 'ugc_ads',
    serviceTitle: 'UGC Video Ads for E-Commerce',
    serviceUrl: '/services#ugc-ads',
    auditTitle: 'Get a Free UGC Video Ad Creative Strategy Audit',
    auditBadge: 'FREE UGC AD AUDIT',
    auditDescription:
      'See how authentic creator video hooks on TikTok & Meta can cut acquisition costs by 50%+ for your brand.',
    midCalloutTitle: 'Tired of Low ROAS on Static Image Ads?',
    midCalloutText:
      'Our UGC ad creative engine produces scroll-stopping video hooks that deliver 3.5x–5.2x verified ROAS.',
    ctaButtonText: 'View UGC Ads Services',
  },
  sales_growth: {
    category: 'sales_growth',
    serviceTitle: 'Sales Growth & CRO',
    serviceUrl: '/services#sales-growth',
    auditTitle: 'Get a Free Conversion Rate Optimization Audit',
    auditBadge: 'FREE CRO AUDIT',
    auditDescription:
      'Identify drop-off points in your inquiry funnels and add interactive qualification steps to boost lead capture.',
    midCalloutTitle: 'Getting Visitors but Zero Consultation Bookings?',
    midCalloutText:
      'We build interactive lead funnels and automated CRM routing that increase lead conversion rates by 300%+',
    ctaButtonText: 'View Sales Growth Services',
  },
  general: {
    category: 'general',
    serviceTitle: 'Digital Engineering & Growth Services',
    serviceUrl: '/services', // Links to full /services page per user requirement #2!
    auditTitle: 'Get a Free Growth & Technical SEO Audit',
    auditBadge: 'FREE STRATEGY AUDIT',
    auditDescription:
      'Receive a custom evaluation of your website speed, search visibility, and acquisition pipeline from our team.',
    midCalloutTitle: 'Ready to Scale Your Digital Growth Pipeline?',
    midCalloutText:
      'Explore full-service web development, SEO dominance, and high-ROAS marketing at affordable rates.',
    ctaButtonText: 'View All Growth Services',
  },
};

export function getBlogCtaConfig(category: BlogCategory): BlogCtaInfo {
  return CATEGORY_CTA_CONFIG[category] || CATEGORY_CTA_CONFIG.general;
}
