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
    serviceUrl: '/services/seo-optimization',
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
    serviceUrl: '/services/website-development',
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
    serviceUrl: '/services/app-development',
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
    serviceUrl: '/services/website-speed-upgrade',
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
    serviceUrl: '/services/local-business-marketing',
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
    serviceUrl: '/services/meta-ads',
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
    serviceUrl: '/services/ugc-video-ads',
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
    serviceUrl: '/services/sales-growth-cro',
    auditTitle: 'Get a Free Conversion Rate Optimization Audit',
    auditBadge: 'FREE CRO AUDIT',
    auditDescription:
      'Identify drop-off points in your inquiry funnels and add interactive qualification steps to boost lead capture.',
    midCalloutTitle: 'Getting Visitors but Zero Consultation Bookings?',
    midCalloutText:
      'We build interactive lead funnels and automated CRM routing that increase lead conversion rates by 300%+',
    ctaButtonText: 'View Sales Growth Services',
  },
  ai_automation: {
    category: 'ai_automation',
    serviceTitle: 'AI & Automation Solutions',
    serviceUrl: '/services',
    auditTitle: 'Get a Free AI & Workflow Automation Strategy Audit',
    auditBadge: 'FREE AI AUDIT',
    auditDescription: 'Discover how AI agents and automated workflows can save 40+ hours per week for your operations.',
    midCalloutTitle: 'Want to Automate Repetitive Business Tasks?',
    midCalloutText: 'We build custom AI chatbots, automated lead routers, and intelligent workflow pipelines.',
    ctaButtonText: 'Explore AI Automation',
  },
  cybersecurity: {
    category: 'cybersecurity',
    serviceTitle: 'Cloud Security & Infrastructure',
    serviceUrl: '/services',
    auditTitle: 'Get a Free Cloud & Security Infrastructure Audit',
    auditBadge: 'FREE SECURITY AUDIT',
    auditDescription: 'Evaluate cloud hosting security, SSL configurations, and database protection for peace of mind.',
    midCalloutTitle: 'Is Your Infrastructure Secure and Scalable?',
    midCalloutText: 'We architect enterprise-grade cloud deployments with 99.99% uptime and zero-trust security.',
    ctaButtonText: 'View Cloud Services',
  },
  ecommerce: {
    category: 'ecommerce',
    serviceTitle: 'E-Commerce Growth Engineering',
    serviceUrl: '/services',
    auditTitle: 'Get a Free E-Commerce Checkout & Speed Audit',
    auditBadge: 'FREE ECOMMERCE AUDIT',
    auditDescription: 'Optimize checkout friction, payment gateway integrations, and mobile shopping experience.',
    midCalloutTitle: 'Looking to Double Your Online Store Revenue?',
    midCalloutText: 'We build ultra-fast Shopify & custom Next.js e-commerce platforms engineered for sales.',
    ctaButtonText: 'View E-Commerce Services',
  },
  brand_design: {
    category: 'brand_design',
    serviceTitle: 'UI/UX & Brand Design',
    serviceUrl: '/services',
    auditTitle: 'Get a Free UI/UX & Brand Identity Review',
    auditBadge: 'FREE DESIGN AUDIT',
    auditDescription: 'Elevate your visual identity, design system, and user experience to command premium pricing.',
    midCalloutTitle: 'Does Your Design Command Premium Trust?',
    midCalloutText: 'Our design agency crafts world-class visual identities and modern glassmorphic web interfaces.',
    ctaButtonText: 'View Branding Services',
  },
  content_marketing: {
    category: 'content_marketing',
    serviceTitle: 'Content Strategy & Copywriting',
    serviceUrl: '/services',
    auditTitle: 'Get a Free Content & Search Authority Audit',
    auditBadge: 'FREE CONTENT AUDIT',
    auditDescription: 'Identify high-converting topic hubs and authority article strategies that drive organic inbound leads.',
    midCalloutTitle: 'Need Authority Content that Drives Inbound Leads?',
    midCalloutText: 'We produce search-optimized industry reports, masterclasses, and conversion-focused articles.',
    ctaButtonText: 'View Content Services',
  },
  saas_growth: {
    category: 'saas_growth',
    serviceTitle: 'SaaS Platform Development',
    serviceUrl: '/services',
    auditTitle: 'Get a Free SaaS Growth & Tech Stack Review',
    auditBadge: 'FREE SAAS AUDIT',
    auditDescription: 'Review subscription billing, multi-tenant database design, and user onboarding funnels.',
    midCalloutTitle: 'Building or Scaling a Software Product?',
    midCalloutText: 'We engineer scalable SaaS platforms with real-time analytics and Stripe billing built in.',
    ctaButtonText: 'View SaaS Services',
  },
  analytics_data: {
    category: 'analytics_data',
    serviceTitle: 'Data Analytics & Funnel Tracking',
    serviceUrl: '/services',
    auditTitle: 'Get a Free GA4 & Conversion Tracking Audit',
    auditBadge: 'FREE ANALYTICS AUDIT',
    auditDescription: 'Fix tracking discrepancies, set up custom conversion goals, and track exact acquisition ROI.',
    midCalloutTitle: 'Flying Blind Without Accurate Conversion Data?',
    midCalloutText: 'We set up server-side tracking dashboards that show exactly which channels bring paying clients.',
    ctaButtonText: 'View Analytics Services',
  },
  general: {
    category: 'general',
    serviceTitle: 'Digital Engineering & Growth Services',
    serviceUrl: '/services',
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
