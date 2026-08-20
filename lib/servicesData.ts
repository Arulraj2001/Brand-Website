import {
  Gauge,
  Video,
  Code2,
  Smartphone,
  Search,
  MapPin,
  Target,
  Zap,
  LucideIcon,
} from 'lucide-react';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  icon: LucideIcon;
  badge: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  painPoints: string[];
  auditProcess: string[];
  results: string;
  faqs: ServiceFAQ[];
}

export const SERVICES_DETAIL_MAP: Record<string, ServiceDetail> = {
  'website-speed-upgrade': {
    id: 'website-upgrade',
    slug: 'website-speed-upgrade',
    icon: Gauge,
    badge: 'HIGH DEMAND INTERNATIONAL SERVICE',
    title: 'Old Website Upgrade / Speed & SEO Overhaul',
    h1: 'Website Speed & SEO Upgrade Services',
    metaTitle: 'Website Speed & SEO Upgrade Services | Fix a Slow Website',
    metaDescription:
      'Transform your sluggish legacy website into a sub-second, 100/100 Core Web Vitals sales engine. Fix slow mobile loads, plugin bloat, and ranking drops.',
    tagline:
      'Transform your sluggish legacy website into a sub-second, 100/100 Core Web Vitals sales engine.',
    painPoints: [
      'Is your website taking 3 to 6 seconds to load on mobile devices?',
      'Has your organic Google ranking dropped unexpectedly due to slow Core Web Vitals?',
      'Are prospective buyers bouncing before your page even finishes rendering?',
    ],
    auditProcess: [
      'Core Web Vitals & Code Audit: Eliminate heavy plugins, uncompressed assets, and render-blocking scripts.',
      'Technical SEO Cleanup: Fix broken canonical links, missing schema, and indexation errors.',
      'Modern High-Converting Redesign: Upgrade to responsive, lightning-fast UI components with instant CTAs.',
    ],
    results: '0.8s Avg Load Speed • 100/100 Mobile Vitals • +220% Organic Leads',
    faqs: [
      {
        question: 'How fast can you overhaul an old slow website?',
        answer:
          'Most website speed and SEO overhauls are completed within 5 to 7 business days, achieving guaranteed sub-second load times and 100/100 Core Web Vitals scores.',
      },
      {
        question: 'Will upgrading my website speed affect my current Google rankings?',
        answer:
          'Upgrading your speed and fixing technical SEO issues directly improves your Google rankings. We preserve all existing URL structures and set up proper redirects if needed.',
      },
      {
        question: 'Do I need to rebuild my entire site or can you optimize my existing system?',
        answer:
          'We audit your existing platform first. If code refactoring and asset optimization suffice, we fix it in place; otherwise, we recommend migrating to a modern, sub-second framework.',
      },
      {
        question: 'What guarantees do you offer for Core Web Vitals scores?',
        answer:
          'We guarantee 90+ mobile and 98+ desktop Core Web Vitals scores on Google PageSpeed Insights upon project delivery.',
      },
    ],
  },
  'ugc-video-ads': {
    id: 'ugc-ads',
    slug: 'ugc-video-ads',
    icon: Video,
    badge: 'HIGH ROAS CREATIVE ENGINE',
    title: 'UGC Video Ads for E-Commerce & DTC',
    h1: 'UGC Video Ads Agency for E-Commerce & DTC Brands',
    metaTitle: 'UGC Video Ads Agency | TikTok & Meta Ad Creatives',
    metaDescription:
      'High-converting user-generated video ad hooks produced by real creators for E-Commerce & DTC brands. Achieve 3.5x–5.2x verified ROAS.',
    tagline:
      'Authentic user-generated video ad hooks that beat expensive studio commercials on Meta & TikTok.',
    painPoints: [
      'High cost-per-acquisition (CPA) on traditional static image ads?',
      'Ad creatives fatigue after just 5 to 7 days on Meta & Instagram?',
      'Struggling to find native creator hooks that stop the thumb scroll?',
    ],
    auditProcess: [
      'Creator Hook Scripting: Write 5-10 native video hooks focused on customer pain points & solutions.',
      'Rapid Video Editing: Deliver polished 15-30s UGC ad variations formatted for Reels, Shorts & TikTok.',
      'A/B Creative Testing: Scale top-performing video hooks to achieve 4x-6x verified ROAS.',
    ],
    results: '5.2x Verified ROAS • $24 Cost Per Acquisition • 4x Creative Lifespan',
    faqs: [
      {
        question: 'What results can I expect from UGC Video Ads?',
        answer:
          'Our user-generated video ad creatives consistently deliver 3.5x to 5.2x ROAS on Meta and TikTok by stopping scroll with native UGC hooks.',
      },
      {
        question: 'Do you source creators and manage script writing?',
        answer:
          'Yes! We handle the entire workflow—scripting native hooks, matching vetted creators, editing 15-30s video variations, and delivering ad-ready assets.',
      },
      {
        question: 'How fast can UGC ad variations be delivered?',
        answer:
          'Initial creative concepts and scripts are delivered within 48 hours, and final video ad variations are ready for campaign launch within 5 to 7 days.',
      },
      {
        question: 'Which ad platforms work best for UGC video ads?',
        answer:
          'UGC video ads perform exceptionally well on Meta (Instagram Reels & Facebook Feed), TikTok, YouTube Shorts, and Pinterest.',
      },
    ],
  },
  'website-development': {
    id: 'web-dev',
    slug: 'website-development',
    icon: Code2,
    badge: 'CORE ENGINEERING',
    title: 'Website Development',
    h1: 'Affordable Custom Website Development Services',
    metaTitle: 'Website Development Agency | Custom Sites & E-Commerce',
    metaDescription:
      'Custom business websites, high-converting landing pages, and e-commerce portals built with zero plugin bloat and sub-second speed.',
    tagline:
      'Custom business websites, high-converting landing pages, and e-commerce portals built with modern architecture.',
    painPoints: [
      'Clunky WordPress templates that break during routine software updates?',
      'Slow server response times causing high visitor abandonment rates?',
      'Inflexible web systems that cannot scale with your growing business?',
    ],
    auditProcess: [
      'Modern Architecture: Built with sub-second React/Next.js frameworks and zero plugin bloat.',
      'Global Checkout Integration: Stripe, PayPal, and international payment gateway wiring.',
      'SEO & Mobile Optimization: Mobile-first responsive design with structured JSON-LD schemas.',
    ],
    results: '99.9% Uptime • Sub-Second Page Speeds • Global Edge Deployment',
    faqs: [
      {
        question: 'What technologies do you use for web development?',
        answer:
          'We build modern web applications using Next.js, React, TypeScript, Tailwind CSS, and Supabase for sub-second page performance and security.',
      },
      {
        question: 'Can you integrate payment gateways like Stripe or PayPal?',
        answer:
          'Yes, we seamlessly integrate global payment processors including Stripe, PayPal, Razorpay, and custom checkout workflows.',
      },
      {
        question: 'How long does a custom website development project take?',
        answer:
          'Standard business websites take 1 to 2 weeks, while complex e-commerce portals or custom web applications take 2 to 4 weeks.',
      },
      {
        question: 'Is mobile responsiveness included?',
        answer:
          'Every website we build is 100% mobile-first, tested across all phone screen sizes, tablets, and desktop displays.',
      },
    ],
  },
  'app-development': {
    id: 'app-dev',
    slug: 'app-development',
    icon: Smartphone,
    badge: 'WEB & MOBILE APPS',
    title: 'App Development',
    h1: 'Custom Web & Mobile App Development Company',
    metaTitle: 'Custom App Development Company | Web & Mobile Apps',
    metaDescription:
      'Scalable web applications and iOS / Android mobile apps built with modern real-time databases and enterprise security.',
    tagline:
      'Scalable web applications and iOS / Android mobile apps built with modern cloud databases.',
    painPoints: [
      'Overwhelmed by high traditional agency app development quotes ($50k+)?',
      'Need real-time database backends and fast user authentication systems?',
      'Struggling to build cross-platform apps for both iOS and Android?',
    ],
    auditProcess: [
      'Full-Stack Application Engineering: React Native and Next.js cross-platform architecture.',
      'Real-Time Database Sync: Supabase/Firebase database backends with instant API endpoints.',
      'Enterprise Security & Authentication: Role-based authorization and encrypted user sessions.',
    ],
    results: 'Cross-Platform Ready • Real-Time Database Sync • Enterprise Security',
    faqs: [
      {
        question: 'Do you build native mobile apps or cross-platform apps?',
        answer:
          'We specialize in cross-platform development using React Native and Next.js progressive web apps, reducing development costs by 50% while delivering native performance on both iOS and Android.',
      },
      {
        question: 'What backend and database technologies do you deploy?',
        answer:
          'We utilize scalable PostgreSQL backends via Supabase, Node.js microservices, and serverless edge functions for sub-second database queries.',
      },
      {
        question: 'Can you help publish the app to the Apple App Store and Google Play Store?',
        answer:
          'Yes! We handle full submission, review compliance, app listing optimization, and store approval for both platforms.',
      },
      {
        question: 'How do you handle post-launch maintenance and updates?',
        answer:
          'We provide dedicated monthly SLA support packages covering feature additions, security patches, and database monitoring.',
      },
    ],
  },
  'seo-optimization': {
    id: 'seo',
    slug: 'seo-optimization',
    icon: Search,
    badge: 'ORGANIC DOMINANCE',
    title: 'SEO Optimization',
    h1: 'Search Engine Optimization (SEO) & Ranking Services',
    metaTitle: 'Technical SEO Optimization Services | Search Rankings',
    metaDescription:
      'Capture top 3 commercial search rankings across English-speaking global markets with structured JSON-LD schema and keyword strategy.',
    tagline:
      'Capture top 3 commercial search rankings across English-speaking global markets.',
    painPoints: [
      'Stuck on Page 3 of Google for high-intent buyer keywords?',
      'Wasting money on cheap spam link-building services that trigger penalties?',
      'Missing technical schema wiring that prevents rich snippet search results?',
    ],
    auditProcess: [
      'Commercial Intent Keyword Mapping: Identify high-converting search terms your competitors miss.',
      'Technical SEO & JSON-LD Wiring: Implement Organization, Product, and Article structured data.',
      'Content & Internal Link Engineering: Optimize site hierarchy to pass maximum search authority.',
    ],
    results: '140+ Rank 1 Keywords • +480% Organic Search Traffic Surge',
    faqs: [
      {
        question: 'How long does it take to see results from SEO optimization?',
        answer:
          'Technical SEO fixes and schema improvements often yield indexing improvements within 2 to 4 weeks, with major rank increases taking 60 to 90 days.',
      },
      {
        question: 'Do you focus on local SEO or international global search rankings?',
        answer:
          'We provide both! We optimize local Google Map packs for local businesses as well as global commercial search rankings across US, UK, Canada, Australia, and Asia-Pacific markets.',
      },
      {
        question: 'What makes your SEO approach different from traditional agencies?',
        answer:
          'We combine technical web engineering with intent-driven content strategy—fixing code speed, structured data, and keyword relevance instead of relying on spam links.',
      },
      {
        question: 'Do you provide monthly ranking reports?',
        answer:
          'Yes, we provide transparent ranking dashboards and monthly traffic reports showing exact position movements and organic lead conversions.',
      },
    ],
  },
  'local-business-marketing': {
    id: 'local-business',
    slug: 'local-business-marketing',
    icon: MapPin,
    badge: 'LOCAL MAP PACKS',
    title: 'Local Business Marketing',
    h1: 'Local Business Marketing & Google Map Pack SEO',
    metaTitle: 'Local Business Marketing & Google Map Pack SEO',
    metaDescription:
      'Dominate local Google Map packs and capture local customer consultation inquiries with automated review workflows.',
    tagline:
      'Dominate local Google Map packs and capture local customer inquiries for brick-and-mortar businesses.',
    painPoints: [
      'Competitors outranking your business on local Google Map searches?',
      'Inconsistent name, address, and phone number (NAP) listings across directory maps?',
      'Lacking an automated system to turn happy customers into 5-star Google reviews?',
    ],
    auditProcess: [
      'Google Business Profile Optimization: Audit categories, geo-tagged photos, and service attributes.',
      'Local Citation & NAP Building: Synchronize consistent business citations across major mapping platforms.',
      'Automated Review & Lead Funnels: Deploy SMS/Email review request workflows and local map lead captures.',
    ],
    results: '#1 Local Map Rank • 850+ Monthly Consultations • 68% Conversion Rate',
    faqs: [
      {
        question: 'How do you get my business into the Google Map 3-Pack?',
        answer:
          'We optimize your Google Business Profile, fix NAP consistency across citations, generate authentic customer reviews, and embed geo-relevant structured schemas.',
      },
      {
        question: 'Can this help brick-and-mortar or service-area businesses?',
        answer:
          'Yes! Our local marketing workflows work for storefronts, dental practices, real estate firms, legal offices, and home service providers.',
      },
      {
        question: 'How do you automate customer review requests?',
        answer:
          'We set up automated post-service SMS and email workflows that invite satisfied customers to leave 5-star Google reviews in seconds.',
      },
      {
        question: 'What is the timeframe for seeing local map ranking improvements?',
        answer:
          'Most local map optimizations show visible ranking improvements within 14 to 30 days of profile and citation synchronization.',
      },
    ],
  },
  'meta-ads': {
    id: 'meta-ads',
    slug: 'meta-ads',
    icon: Target,
    badge: 'PERFORMANCE ADS',
    title: 'Meta & LinkedIn Ads',
    h1: 'Meta & LinkedIn Performance Ad Management',
    metaTitle: 'Meta & LinkedIn Ads Agency | Facebook Ad Management',
    metaDescription:
      'Full-funnel Facebook, Instagram & LinkedIn ad management with Server-Side CAPI tracking setup for verified ROAS growth.',
    tagline:
      'Full-funnel Facebook, Instagram & LinkedIn ad management for verified revenue growth.',
    painPoints: [
      'Unpredictable ad performance and signal loss after iOS privacy updates?',
      'Lack of Conversion API (CAPI) pixel tracking resulting in missed attribution?',
      'Ad campaigns stalling due to generic copy and unoptimized audience funnels?',
    ],
    auditProcess: [
      'Server-Side CAPI Pixel Setup: Reclaim lost attribution signal with custom server-side conversion tracking.',
      'High-Converting Ad Copy & Creative: Write targeted hooks for prospecting, middle-of-funnel, and retargeting.',
      'Full-Funnel Ad Optimization: Structure campaigns to maximize verified Return on Ad Spend (ROAS).',
    ],
    results: '5.2x Verified ROAS • $1.2M Ad Revenue Generated',
    faqs: [
      {
        question: 'What is Meta Conversion API (CAPI) and why is it needed?',
        answer:
          'CAPI sends conversion events directly from your web server to Meta, bypassing iOS ad blockers and restoring accurate ad attribution so Meta can optimize for real buyers.',
      },
      {
        question: 'What monthly ad budget do you recommend starting with?',
        answer:
          'We work with growing businesses starting from $1,000/month up to enterprise ad spends exceeding $50,000/month.',
      },
      {
        question: 'Do you manage LinkedIn ad campaigns for B2B lead generation?',
        answer:
          'Yes! We manage targeted B2B LinkedIn campaigns aimed at decision-makers, executives, and high-value B2B buyers.',
      },
      {
        question: 'How do you track ad performance and ROAS?',
        answer:
          'We build custom live reporting dashboards displaying exact ROAS, Cost Per Acquisition (CPA), and qualified lead count in real time.',
      },
    ],
  },
  'sales-growth-cro': {
    id: 'sales-growth',
    slug: 'sales-growth-cro',
    icon: Zap,
    badge: 'CRO & LEAD FUNNELS',
    title: 'Sales Growth & Conversion Rate Optimization (CRO)',
    h1: 'Conversion Rate Optimization & Lead Funnel Engineering',
    metaTitle: 'Conversion Rate Optimization (CRO) & Lead Funnels',
    metaDescription:
      'Turn site visitors into qualified consultation bookings with interactive lead funnels, automated CRM routing, and instant alerts.',
    tagline:
      'Turn cold site visitors into qualified consultation bookings with interactive funnels.',
    painPoints: [
      'Getting decent website traffic but near-zero inquiry form submissions?',
      'Slow manual follow-ups causing warm prospective clients to choose competitors?',
      'Unqualified lead inquiries wasting your sales team’s valuable time?',
    ],
    auditProcess: [
      'Interactive Qualification Funnels: Replace boring static contact forms with multi-step qualification steps.',
      'Automated CRM Routing: Instantly push new leads to WhatsApp, Email, or your sales CRM.',
      '12-Hour SLA Booking Alerts: Ensure every inquiry receives an immediate, automated confirmation response.',
    ],
    results: '+340% Inquiry Rate • 12-Hour SLA Reply • Higher Client LTV',
    faqs: [
      {
        question: 'What is Conversion Rate Optimization (CRO)?',
        answer:
          'CRO is the systematic engineering process of redesigning user flows, forms, and call-to-actions to increase the percentage of website visitors who convert into paying customers.',
      },
      {
        question: 'How do interactive lead funnels increase inquiries?',
        answer:
          'Multi-step qualification funnels guide visitors through simple, low-friction questions, increasing completion rates by 200%–300% compared to long static forms.',
      },
      {
        question: 'Can you connect lead forms to my existing CRM or email software?',
        answer:
          'Yes! We wire lead forms directly to your preferred tools including Supabase, HubSpot, Salesforce, Zapier, WhatsApp, and custom email alerts.',
      },
      {
        question: 'How quickly can a CRO overhaul be deployed?',
        answer:
          'Lead funnel redesigns and CRO implementations are typically deployed within 3 to 5 business days.',
      },
    ],
  },
};

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES_DETAIL_MAP[slug];
}
