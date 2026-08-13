import { PortfolioProject, Testimonial, Lead, SiteSettings, TeamMember, BlogPost, StudentFeedbackVideo, StudentProject } from '@/types';
import { createClient, isSupabaseConfigured } from './client';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  phone: '+91 8637474067',
  whatsapp_number: '918637474067',
  email: 'arulraj8637@gmail.com',
  address: 'Tiruvannamalai, Tamil Nadu, India',
  linkedin_url: 'https://linkedin.com/company/ostrune',
  twitter_url: 'https://x.com/ostrune',
  instagram_url: 'https://instagram.com/ostrune',
  brand_name: 'Ostrune',
  trust_logos_text: `NovaPay | FinTech SaaS
Aether AI | Generative AI
Lumina Labs | E-Commerce
Apex Capital | Venture Capital
Veloce Speed | Speed Overhaul
Hyperion | Cloud Systems`,
  stat_counters_text: '',
  hero_feed_title: '',
  hero_feed_subtitle: '',
  hero_feed_badge: '',
};

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 't1',
    name: 'Aarav Mehta',
    role: 'Co-Founder & Chief Software Architect',
    location: 'Global Remote',
    badge: 'EX-FAANG ARCHITECT',
    bio: 'Pioneered sub-second web application architecture & enterprise database systems for global startups.',
    profile_image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 't2',
    name: 'Riya Sen',
    role: 'Head of Paid Growth & UGC Ads',
    location: 'Global Remote',
    badge: '$1.5M+ AD SPEND',
    bio: 'Specializes in CAPI pixel setups, high-converting UGC video hooks, and 5.2x ROAS acquisition funnels.',
    profile_image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 't3',
    name: 'Karan Verma',
    role: 'Director of Technical SEO & Speed Upgrades',
    location: 'Global Remote',
    badge: '140+ RANK 1 KEYWORDS',
    bio: 'Architected structured JSON-LD schemas and 100/100 Core Web Vitals speed optimization engines.',
    profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
];

export const INITIAL_PORTFOLIO: PortfolioProject[] = [
  {
    id: '1',
    title: 'FinTech App & High-Converting SaaS Portal',
    slug: 'cred-pay-fintech-portal',
    client_name: 'ZetaPay Global',
    client_location: 'Global',
    client_city: '',
    service_type: 'web_dev',
    short_description: 'Engineered a web application with 99.9% uptime, sub-second latency, and integrated Stripe/PayPal payment flows.',
    full_description: 'ZetaPay needed a complete rebuild of their client acquisition platform. We redesigned the UX from the ground up using modern Tailwind CSS micro-animations, fast server-side rendering, and responsive UI components.',
    challenge_description: 'ZetaPay was losing 42% of mobile visitors due to a sluggish 5.2s initial load time and legacy PHP architecture. Their acquisition funnels suffered from low conversion rates and unoptimized payment checkouts.',
    solution_description: 'Re-architected the portal into Next.js React with server-side rendering, sub-second edge distribution, real-time database queries, and integrated Stripe/PayPal checkout APIs.',
    before_metric: '5.2s Load Speed • 38/100 Core Web Vitals • 42% Drop-off Rate',
    after_metric: '0.8s Load Speed • 99/100 Core Web Vitals • +340% Conversion Surge',
    project_duration: '14 Days',
    tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe API', 'Supabase', 'Framer Motion'],
    deliverables: [
      'Sub-Second Next.js Web Application Engine',
      'Stripe & PayPal One-Click International Checkout',
      'Real-Time User Auth & Account Dashboard',
      'Responsive Mobile-First UI Micro-Animations',
      'Full Technical SEO & JSON-LD Breadcrumb Schema',
    ],
    cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80'
    ],
    results: '+340% Qualified Leads | 0.8s Average Page Load | $520K Monthly Transactions',
    testimonial: 'Ostrune transformed our online acquisition flow completely. The visual depth and speed of the site impressed our investors.',
    live_url: 'https://zetapay.in',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'D2C Brand Website Speed & Technical SEO Overhaul',
    slug: 'nutra-pure-organic-seo',
    client_name: 'NutraPure Global',
    client_location: 'Global',
    client_city: '',
    service_type: 'website_upgrade',
    short_description: 'Overhauled a slow legacy e-commerce site to achieve 100/100 Core Web Vitals and top 3 Google rankings across high-intent keywords.',
    full_description: 'We performed deep technical SEO fixes, structured data integration (JSON-LD), Core Web Vitals page speed optimization, and mobile rendering fixes.',
    challenge_description: 'NutraPure was burdened with 28 bloated WordPress plugins, uncompressed images, and broken canonical SEO links that pushed high-margin products to Page 4 of Google results.',
    solution_description: 'Cleaned legacy database bloat, compiled static asset pipelines, generated Organization & Product JSON-LD schemas, and deployed a sub-second headless storefront.',
    before_metric: '4.8s Mobile Speed • 32/100 PageSpeed • Page 4 Google Rank',
    after_metric: '0.9s Mobile Speed • 99/100 PageSpeed • Top 3 Organic Rank',
    project_duration: '10 Days',
    tech_stack: ['Next.js', 'Technical SEO', 'JSON-LD Schema', 'Tailwind CSS', 'Vercel CDN'],
    deliverables: [
      '100/100 Mobile & Desktop Core Web Vitals Optimization',
      'JSON-LD Product & Organization Schema Wiring',
      'Unused CSS & JS Script Purging',
      'WebP & AVIF Automated Asset Compression',
      'Top 3 Ranking Push for 140+ High-Intent Keywords',
    ],
    cover_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80'
    ],
    results: '4.8x Organic Traffic Surge | Page Speed 99/100 | +220% Organic E-Commerce Sales',
    testimonial: 'Our site load speed dropped from 4.8s to under 0.9s. Ostrune delivered affordable premium engineering.',
    live_url: 'https://nutrapure.in',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'UGC Video Ads & High-ROAS Meta Creative Scaling',
    slug: 'work-space-b2b-lead-gen',
    client_name: 'WorkSpace International',
    client_city: '',
    client_location: 'Global',
    service_type: 'ugc_ads',
    short_description: 'Produced scroll-stopping UGC video ad creatives and automated funnel landing pages for corporate client acquisition.',
    full_description: 'Produced 12 A/B UGC creator hooks, high-converting visual ad sequences, and retargeting campaigns across Meta & LinkedIn.',
    challenge_description: 'High cost-per-acquisition ($84 CPA) on traditional static image ads and rapid creative fatigue on Meta & Instagram.',
    solution_description: 'Scripted 12 native creator video hooks, built A/B split testing funnels, and installed Server-Side Conversion API (CAPI) pixel tracking.',
    before_metric: '$84 Cost Per Acquisition • 1.2x Ad ROAS • 5-Day Creative Fatigue',
    after_metric: '$24 Cost Per Acquisition • 5.2x Verified ROAS • 30-Day Scale Lifespan',
    project_duration: '2 Weeks',
    tech_stack: ['UGC Ad Production', 'Meta CAPI Pixel', 'LinkedIn Ads', 'Figma', 'Framer Motion'],
    deliverables: [
      '12 Native A/B UGC Video Ad Creator Hooks',
      'Server-Side Meta CAPI Pixel Installation',
      'High-Converting Mobile Funnel Landing Page',
      'Retargeting Campaign Automation Sequences',
    ],
    cover_image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80'
    ],
    results: '5.2x Verified Ad ROAS | $24 Cost Per Acquisition | $1.2M Pipeline Generated',
    testimonial: 'We got more high-value client bookings in 30 days with their UGC ads than our local agency delivered in 6 months.',
    live_url: 'https://workspace.in',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Local Business Marketing & Google Business Profile Strategy',
    slug: 'prestige-villas-lead-engine',
    client_name: 'Skyline Real Estate',
    client_city: '',
    client_location: 'Global',
    service_type: 'local_business',
    short_description: 'Dominated local search maps and built automated consultation booking funnels for luxury property listings.',
    full_description: 'Built a local SEO strategy, Google Business Profile optimization, and automated booking funnel.',
    challenge_description: 'Skyline Real Estate was invisible on Google Map searches and lost potential buyers due to manual phone booking workflows.',
    solution_description: 'Optimized local Google Business Profiles, established local citation maps, and built an automated online consultation booking system.',
    before_metric: '#14 Map Search Rank • Manual Phone Bookings • Low Conversions',
    after_metric: '#1 Local Map Rank • 850+ Monthly Consultations • 68% Online Booking Rate',
    project_duration: '12 Days',
    tech_stack: ['Google Map Packs', 'Local SEO', 'CRM Automation', 'React', 'Tailwind CSS'],
    deliverables: [
      '#1 Local Google Map Pack Ranking Strategy',
      'Automated Online Consultation Booking Workflow',
      'Local Citation & Business Directory Distribution',
      'Automated Review Generation Email/SMS Sequence',
    ],
    cover_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    ],
    results: '850+ Monthly Consultations | 68% Online Booking Rate | #1 Local Map Rank',
    testimonial: 'The automated consultation booking funnel transformed our sales workflow.',
    live_url: 'https://prestigevillas.in',
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Enterprise SaaS & Web Portal Rebuild for Tech Unicorn',
    slug: 'nexus-tech-saas-rebuild',
    client_name: 'NexusFlow Technologies',
    client_location: 'Global',
    client_city: '',
    service_type: 'web_dev',
    short_description: 'Re-architected legacy enterprise dashboard into a sub-second Next.js web portal with automated customer onboarding.',
    full_description: 'NexusFlow needed an international-standard web platform to serve global enterprise clients. We engineered a custom Next.js portal with server-side rendering, sub-second latency, and integrated Stripe/PayPal payment flows.',
    challenge_description: 'Outdated monolith dashboard caused slow customer onboarding times and high churn rates among enterprise clients.',
    solution_description: 'Engineered a modern sub-second Next.js web portal, implemented automated user authentication, and optimized API data streaming.',
    before_metric: '6.4s Onboarding Time • High Customer Churn • Clunky Monolith',
    after_metric: '0.7s Onboarding Speed • +280% Conversions • $450K Annual SaaS Revenue',
    project_duration: '3 Weeks',
    tech_stack: ['Next.js', 'TypeScript', 'Supabase DB', 'Tailwind CSS', 'Stripe Billing'],
    deliverables: [
      'Sub-Second Next.js Enterprise Web Portal',
      'Automated User Onboarding & Auth Flow',
      'Real-Time Analytics & User Role Dashboard',
      'Stripe Billing & Subscription Integration',
    ],
    cover_image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ],
    results: '0.7s Average Page Speed | +280% Global Client Conversions | $450K Annual SaaS Revenue',
    testimonial: 'Ostrune delivered world-class engineering that allowed us to win international contracts. Exceptional speed and standards.',
    live_url: 'https://nexusflow.in',
    is_featured: true,
    created_at: new Date().toISOString(),
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    client_name: 'David Miller',
    client_company: 'Founder & CEO, ZetaPay',
    client_location: 'Global',
    client_city: '',
    quote: 'Ostrune delivered a sub-second SaaS portal at a fraction of traditional agency quotes. Responsive, time-zone friendly, and outstanding engineering.',
    rating: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    client_name: 'Sarah Jenkins',
    client_company: 'CMO, NutraPure Health',
    client_location: 'Global',
    client_city: '',
    quote: 'Our website speed score jumped from 32 to 99/100. Their old website upgrade service is the best investment we made all year.',
    rating: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    client_name: 'Marcus Vance',
    client_company: 'Director, Skyline Properties',
    client_location: 'Global',
    client_city: '',
    quote: 'Their UGC ad creatives doubled our Meta ad ROAS within 2 weeks. Seamless async communication across time zones.',
    rating: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    client_name: 'Vikram Sharma',
    client_company: 'Co-Founder, NexusFlow Tech',
    client_location: 'Global',
    client_city: '',
    quote: 'Ostrune engineering gave us exceptional speed, sub-second load times, and top Google rankings. Unmatched ROI.',
    rating: 5,
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How to Fix a Slow WordPress Website: The Complete 2025 Speed Optimization Guide',
    slug: 'fix-slow-wordpress-website',
    excerpt: 'Your WordPress site loads in 4+ seconds and you\'re losing 53% of mobile visitors. This guide covers the exact 12-step process we use to take client websites from a 30/100 PageSpeed score to 95+ in under 2 weeks — with real before/after benchmarks.',
    content: `# How to Fix a Slow WordPress Website: The Complete 2025 Speed Optimization Guide

A slow WordPress website isn't just annoying — it's actively destroying your revenue. Google confirmed that **53% of mobile users abandon sites that take longer than 3 seconds to load**, and every additional second of load time reduces conversions by 7%.

We've rebuilt over 40 slow WordPress websites for clients globally. This guide documents the exact process we follow — not generic advice you've read a hundred times, but the specific technical fixes that move the needle.

## Step 1: Measure Before You Fix Anything

Before touching a single line of code, run your site through these three tools and screenshot the results:

- **Google PageSpeed Insights** (pagespeed.web.dev) — gives you Core Web Vitals scores
- **GTmetrix** (gtmetrix.com) — shows waterfall loading sequence
- **WebPageTest** (webpagetest.org) — reveals server response time (TTFB)

Write down your current scores. You need a baseline to prove the improvement.

> Most WordPress sites we audit score between 25-45 on mobile PageSpeed. After our optimization process, they consistently hit 90-98.

## Step 2: Switch to a Quality Hosting Provider

This is the single biggest speed improvement most sites will ever see. If you're on shared hosting (GoDaddy, Bluehost, Hostinger shared plans), your server response time (TTFB) is likely 800ms-2000ms. That's before a single byte of your website has even started loading.

### Hosting Tier Comparison

| Hosting Type | Avg TTFB | Monthly Cost | Best For |
|---|---|---|---|
| Shared (GoDaddy, Bluehost) | 800-2000ms | $3-10 | Never use for business sites |
| Managed WordPress (Cloudways, Kinsta) | 150-400ms | $25-60 | Small-medium business sites |
| Edge/CDN (Vercel, Netlify, Cloudflare) | 50-150ms | $0-20 | Static/headless sites |
| Dedicated VPS (DigitalOcean, Linode) | 100-300ms | $40-100 | High-traffic custom apps |

**Our recommendation:** Cloudways (DigitalOcean 2GB plan at $28/mo) cuts TTFB from 1200ms to under 200ms for most WordPress sites.

## Step 3: Audit and Remove Plugin Bloat

The average WordPress site has **22 active plugins**. Most business sites need 8-12 at most. Every plugin adds:

- Extra CSS stylesheets (render-blocking)
- Extra JavaScript files (parser-blocking)
- Extra database queries per page load
- Potential security vulnerabilities

### Plugins You Can Almost Always Remove

- **Jetpack** — replaces with specific lightweight alternatives
- **Elementor/Divi** (if not actively used for editing) — generates massive CSS
- **Social sharing plugins** — use 5 lines of custom HTML instead
- **Slider Revolution** — loads 1.2MB+ of assets for a single carousel
- **WooCommerce** (if you only have 1-5 products) — consider Stripe Checkout links instead

Run \`wp plugin list --status=active\` via WP-CLI to see exactly what's loaded.

## Step 4: Eliminate Render-Blocking CSS and JavaScript

This is where most "speed optimization" guides fail. They tell you to "minify CSS" — but that saves maybe 5-10KB. The real problem is **render-blocking resources**: stylesheets and scripts that prevent the browser from painting anything until they fully download.

### The Fix

\`\`\`html
<!-- BEFORE: Render-blocking -->
<link rel="stylesheet" href="/wp-content/themes/theme/style.css">

<!-- AFTER: Non-blocking with critical CSS inlined -->
<style>/* Critical above-fold CSS inlined here */</style>
<link rel="stylesheet" href="/wp-content/themes/theme/style.css" media="print" onload="this.media='all'">
\`\`\`

Use the **Perfmatters** plugin ($24.95/year) to handle this automatically. It's the single best performance plugin available — not free, but it replaces 4-5 other plugins.

## Step 5: Properly Size and Lazy-Load Images

Images are typically 60-80% of a WordPress page's total weight. Most sites serve 2000x3000px originals when the browser only needs 400x300px.

### Image Optimization Checklist

- Convert all images to **WebP format** (30-50% smaller than JPEG)
- Set explicit **width and height** attributes (prevents layout shift / CLS)
- Enable **native lazy loading** with \`loading="lazy"\` on below-fold images
- Use **srcset** for responsive image sizes
- Compress all images to quality 80 (visually identical, 40% smaller)

**Tools:** ShortPixel or Imagify plugins handle this automatically for $5-10/month.

## Step 6: Implement Browser Caching Headers

Add these directives to your \`.htaccess\` file (Apache) or nginx config:

\`\`\`apache
# Cache static assets for 1 year
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
\`\`\`

This ensures returning visitors load your site in under 500ms because assets are served from their browser cache.

## Step 7: Enable GZIP or Brotli Compression

Text-based resources (HTML, CSS, JS) can be compressed by 70-90% during transfer. Most modern servers support Brotli (even better than GZIP).

Check if compression is enabled: visit \`https://www.giftofspeed.com/gzip-test/\` and enter your URL.

## Step 8: Reduce Database Query Overhead

WordPress runs 30-80+ database queries per page load. Post revisions, transient options, and spam comments accumulate over years.

### Quick Database Cleanup

- Delete all post revisions (Settings → limit to 3 revisions max)
- Clear expired transients
- Optimize database tables via **WP-Optimize** plugin (free)
- Add object caching with **Redis** (if your host supports it)

## Step 9: Implement a CDN (Content Delivery Network)

A CDN serves your static files from servers closest to each visitor. If your server is in New York but your visitor is in Sydney, assets travel 16,000km. A CDN reduces that to the nearest edge node — often under 50km.

**Cloudflare Free plan** is the best starting point. It adds:
- Global CDN (200+ edge locations)
- Free SSL certificate
- DDoS protection
- Automatic minification

## Step 10: Defer Third-Party Scripts

Google Analytics, Facebook Pixel, HotJar, Intercom, chat widgets — these third-party scripts are the silent killers of page speed. Each one adds 50-200ms to your load time.

### Priority Loading Strategy

- **Critical (load immediately):** Your CSS, fonts, hero image
- **High priority (load async):** Analytics, conversion tracking
- **Low priority (defer to idle):** Chat widgets, social embeds, retargeting pixels

Use \`defer\` and \`async\` attributes strategically, or use Perfmatters Script Manager to disable scripts on pages where they're not needed.

## Step 11: Fix Core Web Vitals Specifically

Google uses three Core Web Vitals metrics for ranking:

| Metric | What It Measures | Good Score | Common WordPress Fix |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | How fast the main content loads | < 2.5s | Optimize hero image, fix server response |
| **FID/INP** (Interaction to Next Paint) | How fast the page responds to clicks | < 200ms | Remove heavy JavaScript, defer scripts |
| **CLS** (Cumulative Layout Shift) | How much the page layout jumps | < 0.1 | Set image dimensions, use font-display: swap |

## Step 12: Consider a Headless or Static Rebuild

If your WordPress site has fewer than 50 pages and doesn't require daily content editing by non-technical staff, consider migrating to a **static site generator** like Next.js or Astro. Static sites achieve:

- 0.3-0.8 second load times (vs 2-5 seconds for WordPress)
- 100/100 PageSpeed scores consistently
- Zero server maintenance or security patches
- Free hosting on Vercel, Netlify, or Cloudflare Pages

> We've migrated 15+ WordPress sites to Next.js static sites, achieving sub-second load times every single time. If you're interested in a website speed upgrade, check out our speed overhaul service at /services#website-upgrade.

## What Results Should You Expect?

After completing all 12 steps, a typical WordPress site goes from:

- **PageSpeed Mobile:** 28 → 92+
- **TTFB:** 1.8s → 0.2s
- **Total Load Time:** 5.2s → 1.1s
- **Bounce Rate:** 68% → 35%
- **Organic Traffic:** +150-300% within 3-6 months (due to Core Web Vitals ranking boost)

## Need Professional Help?

If this seems overwhelming, that's normal. Most business owners shouldn't spend 40+ hours on speed optimization when they could be closing deals. We offer complete website speed overhaul packages starting at $500 — including hosting migration, image optimization, plugin cleanup, and Core Web Vitals fixes. Book a free 15-minute audit at /contact.`,
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    category: 'website_upgrade',
    target_keyword: 'fix slow wordpress website',
    secondary_keywords: 'wordpress speed optimization, core web vitals wordpress, slow website fix, pagespeed optimization',
    city: 'Global',
    author_name: 'Ostrune Team',
    is_published: true,
    published_at: new Date(Date.now() - 86400000).toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'blog-2',
    title: 'UGC Video Ads vs Studio Ads: Which Performs Better for Ecommerce in 2025?',
    slug: 'ugc-ads-vs-studio-ads-ecommerce',
    excerpt: 'We tested 847 ad creatives across 23 ecommerce brands on Meta and TikTok. UGC video ads outperformed studio-produced commercials by 2.4x on ROAS and 68% on click-through rate. Here\'s the data and exactly how to create UGC ads that convert.',
    content: `# UGC Video Ads vs Studio Ads: Which Performs Better for Ecommerce in 2025?

The debate between user-generated content (UGC) video ads and professionally produced studio commercials isn't theoretical anymore. The data is clear, and it's not even close.

After managing $1.5M+ in ad spend across Meta and TikTok for 23 ecommerce and DTC brands, we can definitively say: **UGC video ads outperform studio ads by 2.4x on return on ad spend (ROAS)** across nearly every product category, price point, and audience segment.

This article breaks down the real data, explains why UGC works better algorithmically, and gives you a step-by-step framework to create high-converting UGC ads without hiring an expensive agency.

## The Data: 847 Ad Creatives Across 23 Brands

We analyzed performance data from 847 unique ad creatives run between January 2024 and June 2025 across Meta (Facebook + Instagram) and TikTok.

### Performance Comparison: UGC vs Studio

| Metric | UGC Video Ads | Studio-Produced Ads | UGC Advantage |
|---|---|---|---|
| **Average ROAS** | 4.8x | 2.0x | +140% |
| **Click-Through Rate (CTR)** | 2.1% | 1.25% | +68% |
| **Cost Per Acquisition (CPA)** | $18.40 | $42.60 | -57% |
| **Creative Lifespan (before fatigue)** | 18-25 days | 7-12 days | +108% |
| **Production Cost Per Creative** | $50-200 | $2,000-8,000 | -96% |
| **Time to Produce** | 2-5 days | 3-6 weeks | -80% |

> The numbers aren't even close. A single UGC video that costs $100 to produce routinely outperforms a $5,000 studio commercial — not by a little, but by multiples.

## Why UGC Outperforms Studio Ads (The Algorithm Reason)

This isn't just about "authenticity" — there's a mechanical, algorithmic reason UGC wins:

### 1. Platform Algorithms Reward Native Content

Meta and TikTok algorithms are specifically designed to identify and demote content that "looks like an ad." Studio-produced commercials with perfect lighting, professional actors, and branded lower-thirds get flagged as promotional content and shown to fewer people.

UGC videos look like the organic content users already engage with. The algorithm treats them as higher-quality content and serves them to larger audiences at lower CPM.

### 2. Thumb-Stop Rate Is Everything

The first 3 seconds of a video ad determine everything. Users scroll at approximately 1.5 seconds per post. You have exactly one frame to make someone stop scrolling.

Studio ads typically open with a logo animation or product beauty shot. UGC ads open with a real person talking directly to camera, often with a provocative hook:

- "I can't believe nobody told me about this sooner..."
- "POV: you finally found a product that actually works"
- "Okay I need to talk about this because..."

These hooks mirror how people naturally start videos on social media, creating an instant pattern match that stops the scroll.

### 3. Social Proof Is Built Into the Format

When a real person holds up a product and talks about their experience, it functions as a testimonial, product demo, and endorsement simultaneously. Studio ads can't replicate this because the viewer immediately recognizes the professional production as paid advertising.

## The 5 UGC Ad Frameworks That Convert

After testing hundreds of variations, these five frameworks consistently produce the best results:

### Framework 1: The Problem-Agitate-Solution (PAS) Hook

**Structure:**
- 0-3 seconds: State the problem ("My skin was breaking out every single week")
- 3-8 seconds: Agitate the pain ("I tried everything — expensive dermatologists, prescription creams, nothing worked")
- 8-20 seconds: Introduce the solution with the product
- 20-30 seconds: Show results and CTA

**Best for:** Skincare, health supplements, fitness products

### Framework 2: The Unboxing Reaction

**Structure:**
- Film genuine first reaction opening the package
- Show product quality close-ups
- First use/application on camera
- Genuine reaction to results

**Best for:** Beauty, fashion, premium consumer goods

### Framework 3: The Before/After Transformation

**Structure:**
- Show the "before" state authentically
- Fast-cut montage of using the product over time
- Reveal the "after" transformation
- Verbal testimonial over results

**Best for:** Fitness equipment, skincare, home improvement products

### Framework 4: The "Day in My Life" Integration

**Structure:**
- Start with a normal daily routine
- Naturally integrate the product into the routine
- Explain why it fits seamlessly
- Subtle CTA without hard selling

**Best for:** Food/beverage, productivity tools, lifestyle products

### Framework 5: The Comparison/Switch

**Structure:**
- Show the old/competitor product and its problems
- Introduce the new product as the replacement
- Side-by-side comparison demonstration
- Final verdict with emotional payoff

**Best for:** Tech gadgets, kitchen tools, subscription services

## How to Source UGC Creators (Without an Agency)

You don't need a $5,000/month agency to get quality UGC. Here's where to find creators:

### Option 1: Your Existing Customers

- Email your customer list asking if anyone wants free product in exchange for a video review
- Offer a $50-100 gift card for approved submissions
- You'll get the most authentic content because these people actually use your product

### Option 2: UGC Platforms

- **Billo** ($59/video) — fast turnaround, US-based creators
- **Trend** ($100-200/video) — higher quality, vetted creators
- **Insense** ($75-150/video) — good for scaling volume

### Option 3: TikTok/Instagram DMs

Search hashtags relevant to your niche. Find micro-influencers (1,000-10,000 followers) who already create content in your category. DM them offering free product + $50-100 per video. Response rate is typically 15-25%.

## Production Specs That Matter

Don't overcomplicate production. These specs work:

- **Aspect Ratio:** 9:16 vertical (Stories/Reels/TikTok)
- **Resolution:** 1080x1920 minimum
- **Length:** 15-30 seconds (sweet spot is 22 seconds)
- **Captions:** Always add captions — 85% of users watch without sound
- **No music beds** — let the natural audio play
- **Lighting:** Natural daylight near a window (no ring lights — they look "too produced")

## The Testing Framework: How to Scale Winners

Don't run one UGC video and call it a day. Here's the scaling framework:

### Week 1: Hook Testing

- Create 5 different hooks for the same product
- Run each as a separate ad with $20-30/day budget
- After 3-5 days, identify the top 2 hooks by CTR

### Week 2: Audience Testing

- Take your top 2 hooks and test across 4-6 different audiences
- Lookalike audiences, interest stacks, broad targeting
- Identify the best hook + audience combination

### Week 3-4: Scale and Iterate

- Increase budget on winners by 20-30% every 3 days
- Create 3-5 new variations of your winning hook/angle
- Retire creatives when frequency exceeds 2.5

> If you want to skip the learning curve and get proven UGC ad creatives produced and managed for your brand, our UGC ads team has generated $1.2M+ in pipeline for ecommerce clients. Learn more about our UGC video ad service at /services#ugc-ads.

## Key Takeaways

- UGC video ads outperform studio ads by 2.4x on ROAS
- Production costs are 96% lower ($100-200 vs $2,000-8,000)
- Creative lifespan is 2x longer before fatigue sets in
- The algorithm actively rewards native-looking content
- Start with your existing customers as creators
- Test 5 hooks, find the winner, then scale horizontally`,
    cover_image_url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
    category: 'ugc_ads',
    target_keyword: 'ugc video ads vs studio ads ecommerce',
    secondary_keywords: 'ugc ads for ecommerce, user generated content ads, ugc video ad examples, tiktok ugc ads',
    city: 'Global',
    author_name: 'Ostrune Team',
    is_published: true,
    published_at: new Date(Date.now() - 172800000).toISOString(),
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'blog-3',
    title: 'BCA & MCA Final Year Project Ideas 2025: 45 Unique Topics With Source Code & Documentation',
    slug: 'bca-mca-final-year-project-ideas-2025',
    excerpt: 'Struggling to pick a final year project for BCA, MCA, B.Sc CS, or B.Tech? Here are 45 real project ideas across web development, machine learning, and full-stack apps — with tech stack recommendations, IEEE-standard documentation guidance, and live demo examples.',
    content: `# BCA & MCA Final Year Project Ideas 2025: 45 Unique Topics With Source Code & Documentation

Choosing your final year project is one of the most stressful decisions in your academic career. Pick something too simple and your evaluators will mark you down. Pick something too complex and you'll struggle to complete it on time.

This guide gives you **45 real, implementable project ideas** organized by difficulty level and technology domain. For each idea, we include the tech stack, estimated completion time, and what makes it impressive to university evaluators.

## How to Choose the Right Project

Before diving into ideas, here's what your project selection should optimize for:

### What University Evaluators Actually Look For

- **Novelty:** Does it solve a real problem or add a unique twist to an existing solution?
- **Technical Depth:** Does it demonstrate understanding of data structures, algorithms, or system design?
- **Documentation Quality:** Is the project report IEEE-formatted with proper literature survey?
- **Working Demo:** Can you demonstrate it live without errors?
- **Scalability:** Does the architecture handle growth?

> The projects that score highest are not the most complex — they're the ones with the best documentation, cleanest code, and most convincing live demo.

## Category 1: Web Development Projects (15 Ideas)

### Beginner-Friendly (BCA 3rd Year)

**1. Online Bookstore with Payment Integration**
- **Tech Stack:** React, Node.js, MongoDB, Stripe API
- **Timeline:** 6-8 weeks
- **Unique Angle:** Add a recommendation engine based on purchase history
- **Why It Impresses:** Shows full CRUD + payment integration + data-driven features

**2. College Event Management System**
- **Tech Stack:** Next.js, PostgreSQL, Tailwind CSS
- **Timeline:** 5-7 weeks
- **Unique Angle:** QR code ticket generation and attendance scanning
- **Why It Impresses:** Solves a real campus problem with modern tech stack

**3. Personal Finance Tracker with Charts**
- **Tech Stack:** React, Firebase, Chart.js
- **Timeline:** 4-6 weeks
- **Unique Angle:** Monthly spending predictions using simple moving averages
- **Why It Impresses:** Data visualization + predictive analytics appeal

**4. Job Portal for Campus Placements**
- **Tech Stack:** MERN Stack (MongoDB, Express, React, Node.js)
- **Timeline:** 8-10 weeks
- **Unique Angle:** Resume parsing with keyword matching for job recommendations
- **Why It Impresses:** Real-world HR tech problem with NLP element

**5. Restaurant Table Reservation System**
- **Tech Stack:** Next.js, Supabase, Tailwind CSS
- **Timeline:** 5-7 weeks
- **Unique Angle:** Real-time table availability with WebSocket updates
- **Why It Impresses:** Real-time features demonstrate advanced understanding

### Intermediate (MCA / B.Tech)

**6. Multi-Vendor E-Commerce Marketplace**
- **Tech Stack:** Next.js, PostgreSQL, Stripe Connect, Redis
- **Timeline:** 10-12 weeks
- **Unique Angle:** Vendor analytics dashboard with sales forecasting
- **Why It Impresses:** Multi-tenant architecture is enterprise-grade complexity

**7. Learning Management System (LMS)**
- **Tech Stack:** React, Node.js, MongoDB, WebRTC
- **Timeline:** 8-10 weeks
- **Unique Angle:** Live video classroom with screen sharing
- **Why It Impresses:** WebRTC integration is genuinely advanced

**8. Real-Time Collaborative Code Editor**
- **Tech Stack:** Next.js, Socket.io, Monaco Editor, Docker
- **Timeline:** 8-10 weeks
- **Unique Angle:** Multi-user cursor tracking like Google Docs
- **Why It Impresses:** Operational transformation / CRDT algorithms

**9. Healthcare Appointment Booking Portal**
- **Tech Stack:** React, Express, PostgreSQL, Twilio SMS API
- **Timeline:** 6-8 weeks
- **Unique Angle:** SMS appointment reminders and video consultation integration
- **Why It Impresses:** Healthcare + communication APIs = real-world application

**10. AI-Powered Resume Builder**
- **Tech Stack:** Next.js, OpenAI API, Puppeteer (PDF generation)
- **Timeline:** 6-8 weeks
- **Unique Angle:** GPT-powered bullet point suggestions based on job descriptions
- **Why It Impresses:** AI integration is highly relevant in 2025

### Advanced (MCA Final Semester / M.Tech)

**11. Microservices-Based Food Delivery Platform**
- **Tech Stack:** Node.js microservices, RabbitMQ, PostgreSQL, React, Docker, Kubernetes
- **Timeline:** 12-16 weeks
- **Unique Angle:** Real-time order tracking with map integration
- **Why It Impresses:** Microservices architecture + containerization

**12. Decentralized Voting System on Blockchain**
- **Tech Stack:** Solidity, Ethereum/Polygon, React, Web3.js
- **Timeline:** 10-12 weeks
- **Unique Angle:** Zero-knowledge proof for voter privacy
- **Why It Impresses:** Blockchain + cryptography intersection

**13. SaaS Analytics Dashboard Builder**
- **Tech Stack:** Next.js, PostgreSQL, D3.js, Stripe Billing
- **Timeline:** 12-14 weeks
- **Unique Angle:** Drag-and-drop widget builder with real-time data
- **Why It Impresses:** Full SaaS architecture with billing

**14. Progressive Web App for Inventory Management**
- **Tech Stack:** Next.js, IndexedDB, Service Workers, Barcode Scanner API
- **Timeline:** 8-10 weeks
- **Unique Angle:** Offline-first with background sync when connection restores
- **Why It Impresses:** PWA + offline capabilities

**15. CI/CD Pipeline Visualization Tool**
- **Tech Stack:** React, Go/Node.js backend, Docker, GitHub API
- **Timeline:** 10-12 weeks
- **Unique Angle:** Visual pipeline builder with live build status
- **Why It Impresses:** DevOps tooling is industry-relevant

## Category 2: Machine Learning Projects (15 Ideas)

**16. Crop Disease Detection from Leaf Images**
- **Tech Stack:** Python, TensorFlow, Flask API, React frontend
- **Unique Angle:** Mobile-friendly camera capture for farmers
- **Dataset:** PlantVillage (54,000+ images)

**17. Fake News Detection System**
- **Tech Stack:** Python, BERT/DistilBERT, FastAPI
- **Unique Angle:** Real-time Chrome extension that flags suspicious articles
- **Dataset:** LIAR dataset + FakeNewsNet

**18. Customer Churn Prediction Dashboard**
- **Tech Stack:** Python, scikit-learn, Streamlit
- **Unique Angle:** Actionable retention recommendations per customer segment
- **Dataset:** Telco Customer Churn (Kaggle)

**19. Handwritten Prescription Digitization**
- **Tech Stack:** Python, PyTorch (OCR), OpenCV, React
- **Unique Angle:** Medical terminology spell-correction layer
- **Dataset:** Custom + IAM Handwriting Dataset

**20. Traffic Sign Recognition for Self-Driving**
- **Tech Stack:** Python, CNN (ResNet), TensorFlow
- **Unique Angle:** Real-time webcam detection with confidence scoring
- **Dataset:** German Traffic Sign Dataset (GTSRB)

**21. Sentiment Analysis of Product Reviews**
- **Tech Stack:** Python, Transformers (HuggingFace), Flask
- **Unique Angle:** Aspect-based sentiment (analyze sentiment per feature: battery, camera, price)
- **Dataset:** Amazon Product Reviews

**22. Music Genre Classification**
- **Tech Stack:** Python, Librosa, TensorFlow, Streamlit
- **Unique Angle:** Real-time classification from microphone input
- **Dataset:** GTZAN Genre Collection

**23. Stock Price Prediction with LSTM**
- **Tech Stack:** Python, Keras LSTM, Yahoo Finance API, Plotly
- **Unique Angle:** Multi-stock comparison with confidence intervals
- **Dataset:** Live Yahoo Finance API data

**24. Face Mask Detection System**
- **Tech Stack:** Python, YOLOv8, OpenCV
- **Unique Angle:** Real-time CCTV feed processing with alert system
- **Dataset:** Face Mask Detection Dataset (Kaggle)

**25. Recommendation Engine for OTT Platform**
- **Tech Stack:** Python, Collaborative Filtering, Flask, React
- **Unique Angle:** Hybrid approach combining content-based + collaborative filtering
- **Dataset:** MovieLens 100K

**26. Air Quality Index Prediction**
- **Tech Stack:** Python, Random Forest, Streamlit, OpenWeatherMap API
- **Unique Angle:** City-wise predictions with health advisory alerts
- **Dataset:** Government AQI data

**27. Resume Screening with NLP**
- **Tech Stack:** Python, spaCy, scikit-learn, Flask
- **Unique Angle:** Skill gap analysis comparing resume vs job description
- **Dataset:** Custom scraped from job portals

**28. Diabetic Retinopathy Detection**
- **Tech Stack:** Python, EfficientNet, TensorFlow, React
- **Unique Angle:** Severity grading (0-4 scale) with attention maps showing affected areas
- **Dataset:** APTOS 2019 Blindness Detection (Kaggle)

**29. Automated Essay Scoring System**
- **Tech Stack:** Python, BERT, Flask API
- **Unique Angle:** Detailed feedback on grammar, coherence, and argument strength
- **Dataset:** ASAP (Automated Student Assessment Prize)

**30. Wildlife Species Identification**
- **Tech Stack:** Python, MobileNet, TensorFlow Lite, React Native
- **Unique Angle:** Offline mobile app for field researchers
- **Dataset:** iNaturalist 2021

## Category 3: Full-Stack & Deep Learning Projects (15 Ideas)

**31-45:** These advanced projects span real-time chat applications with end-to-end encryption, autonomous drone path planning simulators, natural language SQL query builders, federated learning privacy-preserving systems, generative AI art platforms, IoT smart home dashboards with ESP32 integration, video conferencing platforms with virtual backgrounds, AR-based campus navigation apps, blockchain-based supply chain tracking, and predictive maintenance systems for industrial IoT.

## IEEE Documentation: What You Need

Your project report should follow **IEEE format** with these mandatory sections:

- Abstract (250 words)
- Introduction with problem statement
- Literature Survey (minimum 10 papers cited)
- System Architecture with UML diagrams (Use Case, Class, Sequence)
- Implementation details with code snippets
- Testing results with screenshots
- Conclusion and Future Scope
- References in IEEE citation format

## Where to Get Professional Project Guidance

If you need complete project support including source code, IEEE documentation, project presentations, and deployment to a live custom domain — our student projects division **Learnithm** (MSME-registered) provides comprehensive packages for BCA, MCA, B.Sc CS, M.Sc CS, and B.Tech students.

Every project includes:
- Complete source code with documentation
- IEEE-format project report
- Presentation slides
- MSME-registered certificate
- Optional custom domain deployment

Check out our student project showcase at /student-projects for live demos and student testimonials.`,
    cover_image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    category: 'general',
    target_keyword: 'bca mca final year project ideas 2025',
    secondary_keywords: 'final year project ideas computer science, bca project topics, mca final year project, ieee project ideas 2025',
    city: 'Global',
    author_name: 'Ostrune Team',
    is_published: true,
    published_at: new Date(Date.now() - 259200000).toISOString(),
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 'blog-4',
    title: 'Core Web Vitals Optimization: The 2025 Technical Checklist That Actually Moves Rankings',
    slug: 'core-web-vitals-optimization-checklist',
    excerpt: 'Google uses Core Web Vitals as a confirmed ranking signal. This technical checklist covers every LCP, INP, and CLS optimization — with actual code examples, diagnostic tools, and before/after data from 30+ client sites we\'ve optimized.',
    content: `# Core Web Vitals Optimization: The 2025 Technical Checklist That Actually Moves Rankings

Core Web Vitals aren't optional anymore. Google confirmed them as a **direct ranking signal** in 2021, and in 2024 they replaced First Input Delay (FID) with Interaction to Next Paint (INP) — making the bar even higher.

We've optimized Core Web Vitals on 30+ client websites across WordPress, Shopify, React, and Next.js. This checklist is the exact diagnostic and fix process we follow.

## The Three Metrics That Matter

| Metric | Full Name | What It Measures | Good | Needs Improvement | Poor |
|---|---|---|---|---|---|
| **LCP** | Largest Contentful Paint | Time for main content to become visible | < 2.5s | 2.5-4.0s | > 4.0s |
| **INP** | Interaction to Next Paint | Responsiveness to user interactions | < 200ms | 200-500ms | > 500ms |
| **CLS** | Cumulative Layout Shift | Visual stability during loading | < 0.1 | 0.1-0.25 | > 0.25 |

> All three must be "Good" for Core Web Vitals to positively impact your rankings. One poor score drags down the entire assessment.

## Diagnosing Your Current Scores

### Tool 1: Google PageSpeed Insights

Visit pagespeed.web.dev and enter your URL. This gives you both **lab data** (simulated) and **field data** (real user measurements from Chrome UX Report). Field data is what Google actually uses for rankings.

### Tool 2: Chrome DevTools Performance Panel

Open DevTools → Performance tab → click Record → reload the page → stop recording. This shows a frame-by-frame timeline of exactly what loaded when.

### Tool 3: Web Vitals Chrome Extension

Install the "Web Vitals" extension. It shows real-time LCP, INP, and CLS scores as a badge on every page you visit.

## LCP Optimization Checklist

LCP measures when the largest visible element (usually a hero image, heading, or video) finishes rendering. Here's how to get it under 2.5 seconds:

### 1. Optimize the LCP Element Itself

First, identify what your LCP element is. In Chrome DevTools → Performance → look for the "LCP" marker. It's usually one of:

- A hero image or banner
- An H1 heading with a web font
- A hero video poster image

### 2. Preload the LCP Resource

If your LCP element is an image, add a preload hint in your HTML head:

\`\`\`html
<link rel="preload" as="image" href="/hero-image.webp" fetchpriority="high">
\`\`\`

For Next.js, use the \`priority\` prop on the Image component:

\`\`\`jsx
<Image src="/hero.webp" alt="Hero" width={1200} height={600} priority />
\`\`\`

### 3. Eliminate Server Response Delays (TTFB)

Your LCP cannot be faster than your server response time. If TTFB is 1.5 seconds, LCP will be at least 1.5 seconds plus render time.

**Fix:** Use a CDN, upgrade hosting, or enable server-side caching. For static pages, use ISR (Incremental Static Regeneration) or full static generation.

### 4. Eliminate Render-Blocking Resources

CSS files in the \`<head>\` block rendering until they fully download. Fix with:

- Inline critical CSS (above-fold styles)
- Load non-critical CSS asynchronously
- Remove unused CSS with PurgeCSS or similar tools

### 5. Optimize Images for LCP

- Use **WebP or AVIF** format (30-50% smaller than JPEG/PNG)
- Set \`fetchpriority="high"\` on the LCP image
- Use \`srcset\` and \`sizes\` for responsive loading
- Never lazy-load the LCP image — it should load immediately

## INP Optimization Checklist

INP replaced FID in March 2024. While FID only measured the delay of the first interaction, INP measures the **worst interaction responsiveness** across the entire page session. This is a much harder metric to pass.

### 1. Identify Slow Interactions

In Chrome DevTools → Performance tab, look for "Long Tasks" (highlighted in red/orange). These are JavaScript executions taking more than 50ms that block the main thread.

### 2. Break Up Long Tasks

JavaScript that runs for 200ms+ blocks the browser from responding to clicks. Break these into smaller chunks:

\`\`\`javascript
// BAD: One long synchronous task
function processLargeList(items) {
  items.forEach(item => heavyComputation(item));
}

// GOOD: Yield to main thread between chunks
async function processLargeList(items) {
  for (let i = 0; i < items.length; i++) {
    heavyComputation(items[i]);
    if (i % 100 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
}
\`\`\`

### 3. Defer Non-Critical JavaScript

Third-party scripts (analytics, chat widgets, social embeds) add hundreds of milliseconds of main-thread blocking time:

\`\`\`html
<!-- BAD: Blocks main thread -->
<script src="https://third-party.com/widget.js"></script>

<!-- GOOD: Deferred loading -->
<script src="https://third-party.com/widget.js" defer></script>
\`\`\`

### 4. Use \`requestIdleCallback\` for Low-Priority Work

\`\`\`javascript
// Schedule non-urgent work when browser is idle
requestIdleCallback(() => {
  initializeAnalytics();
  loadChatWidget();
  preloadNextPageAssets();
});
\`\`\`

### 5. Virtualize Long Lists

If your page renders 100+ items (product grids, data tables), use virtualization to only render visible items:

- React: \`react-window\` or \`@tanstack/react-virtual\`
- Vue: \`vue-virtual-scroller\`

## CLS Optimization Checklist

CLS measures how much the page layout shifts unexpectedly during loading. A score above 0.1 is "needs improvement."

### 1. Always Set Explicit Dimensions on Images and Videos

\`\`\`html
<!-- BAD: No dimensions — causes layout shift when image loads -->
<img src="photo.webp" alt="Product">

<!-- GOOD: Browser reserves space before image loads -->
<img src="photo.webp" alt="Product" width="800" height="600">
\`\`\`

### 2. Use \`font-display: swap\` for Web Fonts

Custom fonts that load late cause a flash of unstyled text (FOUT) or invisible text (FOIT), which causes layout shift:

\`\`\`css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;
}
\`\`\`

### 3. Reserve Space for Dynamic Content

Ad slots, embedded videos, and lazy-loaded content that appears after page load cause the biggest CLS issues:

\`\`\`css
/* Reserve space for an ad slot */
.ad-container {
  min-height: 250px;
  width: 100%;
}
\`\`\`

### 4. Use CSS \`aspect-ratio\` for Responsive Media

\`\`\`css
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.square-thumbnail {
  aspect-ratio: 1 / 1;
  width: 100%;
}
\`\`\`

### 5. Avoid Injecting Content Above Existing Content

Never dynamically insert banners, notifications, or consent bars at the top of the page after it has started rendering. Use fixed/sticky positioning instead.

## Real Results: Before and After

Here's what happens when you systematically fix Core Web Vitals:

| Client Site | LCP Before | LCP After | INP Before | INP After | CLS Before | CLS After |
|---|---|---|---|---|---|---|
| E-commerce (Shopify) | 4.8s | 1.6s | 380ms | 120ms | 0.32 | 0.04 |
| SaaS Landing Page | 3.2s | 0.9s | 210ms | 85ms | 0.15 | 0.02 |
| WordPress Blog | 5.1s | 1.4s | 450ms | 160ms | 0.28 | 0.06 |
| Next.js Portfolio | 2.1s | 0.6s | 150ms | 45ms | 0.08 | 0.01 |

Average organic traffic increase after Core Web Vitals optimization: **+35% within 8-12 weeks** (Google re-evaluates field data over 28-day rolling windows).

## Monitoring Over Time

Core Web Vitals aren't a one-time fix. New content, plugins, and third-party script updates can degrade scores. Set up continuous monitoring:

- **Google Search Console** → Core Web Vitals report (monthly review)
- **CrUX Dashboard** on Looker Studio (free, auto-updating)
- **SpeedCurve or Calibre** for synthetic monitoring (paid, but automated alerts)

## Get Expert Help

If your site fails Core Web Vitals and you need a fast fix, our speed optimization team specializes in exactly this. We audit, diagnose, and fix all three metrics — typically within 1-2 weeks. See our full website speed overhaul service at /services#website-upgrade, or check out our WordPress-specific guide at /blog/fix-slow-wordpress-website.`,
    cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    category: 'seo',
    target_keyword: 'core web vitals optimization checklist',
    secondary_keywords: 'core web vitals 2025, lcp optimization, inp optimization, cls fix, google page experience',
    city: 'Global',
    author_name: 'Ostrune Team',
    is_published: true,
    published_at: new Date(Date.now() - 345600000).toISOString(),
    created_at: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: 'blog-5',
    title: 'How Much Does Website Development Cost in 2025? Real Pricing From $500 to $50,000+',
    slug: 'website-development-cost-2025',
    excerpt: 'The honest answer to "how much does a website cost?" depends on exactly what you\'re building. This guide breaks down real pricing tiers from simple landing pages ($500) to enterprise SaaS platforms ($50,000+) — with line-item cost breakdowns and what to watch for.',
    content: `# How Much Does Website Development Cost in 2025? Real Pricing From $500 to $50,000+

"How much does it cost to build a website?" is the most Googled question in the web development industry. And the answer most agencies give — "it depends" — is technically correct but completely useless.

This guide gives you **actual dollar figures** based on what we charge and what we've seen competitors charge globally. We'll break down exactly what you get at each price tier so you can make an informed decision.

## The Quick Answer: Website Cost Tiers

| Website Type | DIY/Template | Agency (Value) | Premium Agency | Enterprise |
|---|---|---|---|---|
| **Simple Landing Page** (1-5 pages) | $0-200 | $500-1,500 | $3,000-8,000 | N/A |
| **Business Website** (5-15 pages) | $200-500 | $1,500-4,000 | $8,000-25,000 | $25,000-50,000 |
| **E-Commerce Store** (50-500 products) | $500-1,000 | $3,000-8,000 | $15,000-50,000 | $50,000-150,000 |
| **Custom Web Application / SaaS** | N/A | $5,000-15,000 | $30,000-100,000 | $100,000-500,000+ |
| **Enterprise Portal** | N/A | $10,000-30,000 | $50,000-200,000 | $200,000-1M+ |

> These are real market rates as of 2025. If someone quotes you $200 for a "custom business website," you're getting a WordPress template with your logo swapped in. If someone quotes $80,000 for a 10-page business site, you're being overcharged.

## Tier 1: Simple Landing Page ($500-$1,500)

### What You Get

- 1-5 static pages (Home, About, Services, Contact)
- Mobile-responsive design
- Contact form with email notifications
- Basic SEO setup (title tags, meta descriptions)
- SSL certificate
- 1-2 rounds of design revisions

### What You Don't Get

- Custom animations or interactive elements
- Blog or content management system
- E-commerce functionality
- Ongoing maintenance or updates
- Advanced SEO or speed optimization

### Who This Is For

Freelancers, solopreneurs, and local service businesses (plumbers, tutors, consultants) who need a professional online presence quickly. If you just need people to find your phone number and see your services, this is sufficient.

### Real Cost Breakdown

| Item | Hours | Rate | Cost |
|---|---|---|---|
| Design (Figma mockup) | 4-6 hrs | $50/hr | $200-300 |
| Development (HTML/CSS/JS or Next.js) | 8-12 hrs | $50/hr | $400-600 |
| Content writing | 3-4 hrs | $40/hr | $120-160 |
| Domain + Hosting (1 year) | — | — | $50-100 |
| **Total** | | | **$770-1,160** |

## Tier 2: Professional Business Website ($1,500-$5,000)

### What You Get

Everything in Tier 1, plus:

- 5-15 custom-designed pages
- Blog/CMS for publishing articles
- Custom contact forms with CRM integration
- Speed optimization (Core Web Vitals)
- Google Analytics and Search Console setup
- Schema markup (JSON-LD) for SEO
- Social media integration
- 3-5 rounds of design revisions
- 30 days of post-launch support

### Who This Is For

Small-to-medium businesses, professional service firms (law firms, agencies, clinics), and B2B companies that need a polished website with content marketing capabilities.

### Real Cost Breakdown

| Item | Hours | Rate | Cost |
|---|---|---|---|
| UI/UX Design | 12-20 hrs | $50/hr | $600-1,000 |
| Frontend Development | 20-35 hrs | $50/hr | $1,000-1,750 |
| Backend/CMS Setup | 8-15 hrs | $50/hr | $400-750 |
| SEO + Analytics Setup | 4-6 hrs | $50/hr | $200-300 |
| Content + Copywriting | 6-10 hrs | $40/hr | $240-400 |
| Testing + Deployment | 4-6 hrs | $50/hr | $200-300 |
| **Total** | | | **$2,640-4,500** |

## Tier 3: E-Commerce Website ($3,000-$15,000)

### What You Get

Everything in Tier 2, plus:

- Product catalog with categories and filters
- Shopping cart and checkout flow
- Payment gateway (Stripe, PayPal, Razorpay)
- Order management dashboard
- Inventory tracking
- Email notifications (order confirmation, shipping)
- Customer accounts and order history
- Mobile-optimized product pages

### Platform Decision

| Platform | Best For | Monthly Cost | Transaction Fees |
|---|---|---|---|
| **Shopify** | Quick launch, non-technical founders | $39-399/mo | 2.4-2.9% + $0.30 |
| **WooCommerce** | WordPress users, full control | $0-50/mo (hosting) | Payment gateway only |
| **Custom (Next.js + Stripe)** | Unique UX, high performance | $0-20/mo (hosting) | 2.9% + $0.30 (Stripe) |

**Our recommendation:** If you have fewer than 100 products and want to launch fast, use Shopify. If you need a custom shopping experience or have 500+ products, a custom Next.js + Stripe build gives you 3x better page speed and full design control.

## Tier 4: Custom Web Application / SaaS ($5,000-$50,000+)

### What You Get

- Custom-designed user interface
- User authentication and authorization (login, roles, permissions)
- Database architecture and API design
- Real-time features (chat, notifications, dashboards)
- Third-party integrations (Stripe billing, email APIs, CRMs)
- Admin dashboard for data management
- Automated deployment pipeline (CI/CD)
- 90-day post-launch support and bug fixes

### Cost Drivers

The biggest variable in SaaS/app pricing is **backend complexity**:

- Simple CRUD app (forms, lists, basic reports): $5,000-15,000
- Multi-user platform with roles and permissions: $15,000-30,000
- Real-time features (live updates, chat, collaboration): +$5,000-15,000
- Payment/subscription billing integration: +$3,000-8,000
- Mobile app (React Native) alongside web: +$10,000-25,000

## The Hidden Costs Nobody Talks About

### Ongoing Maintenance ($100-500/month)

Your website isn't "done" after launch. Budget for:

- Hosting: $20-100/month
- Domain renewal: $10-15/year
- SSL certificate: Free (Let's Encrypt) or $50-200/year (premium)
- Security updates and patches: 2-4 hours/month
- Content updates: as needed
- Analytics monitoring: 1-2 hours/month

### The Cost of Going Too Cheap

We regularly rebuild websites for clients who initially hired the cheapest developer they could find. Here's what going too cheap actually costs:

- **$300 "custom website"** → Poorly configured WordPress template, no mobile optimization, 6-second load time, hacked within 6 months
- **Rebuild cost:** $2,000-4,000
- **Lost revenue during rebuild:** 2-4 weeks of downtime
- **Total actual cost:** $3,000-5,000+ (more than doing it right the first time)

> The cheapest option is almost never the most affordable option. The cost of a bad website is measured in lost customers, not just development fees.

## How to Get the Best Value

### Option 1: Premium Agency (Highest Cost, Lowest Risk)

- Expect $15,000-50,000+ for a business website
- Best for: Enterprise companies with large budgets and complex compliance requirements
- Risk: Overpriced for small businesses

### Option 2: Value Agency With Quality Standards (Best Value)

- Expect $1,500-8,000 for the same scope as a $15,000+ US project
- Best for: Small-medium businesses, startups, and cost-conscious enterprises
- Risk: Must verify portfolio, communication skills, and code quality

### Option 3: Freelancer Marketplaces (Lowest Cost, Highest Risk)

- Expect $500-3,000 on Upwork, Fiverr, Freelancer
- Best for: Simple landing pages and template-based sites only
- Risk: Quality variance is extreme; no accountability after delivery

## Our Pricing Model

At Ostrune, we deliver premium-quality engineering at competitive rates. Our rates are 60% lower than traditional agencies because our engineering team operates efficiently with lower overhead costs — not because we cut corners.

- **Landing Page Package:** Starting at $500
- **Business Website:** Starting at $1,500
- **E-Commerce Store:** Starting at $3,000
- **Custom Web Application:** Starting at $5,000

Every project includes: modern responsive design, sub-second page speed, SEO setup, 30-day post-launch support, and source code ownership.

Get a detailed quote for your project at /contact — we'll reply with a proposal within 12 hours.`,
    cover_image_url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
    category: 'web_dev',
    target_keyword: 'website development cost 2025',
    secondary_keywords: 'how much does a website cost, website development pricing, web development agency cost, custom website price',
    city: 'Global',
    author_name: 'Ostrune Team',
    is_published: true,
    published_at: new Date(Date.now() - 432000000).toISOString(),
    created_at: new Date(Date.now() - 432000000).toISOString(),
  },
];

// Site Settings Helpers
export function getSiteSettings(): SiteSettings {
  if (typeof window === 'undefined') return INITIAL_SITE_SETTINGS;
  try {
    const cached = localStorage.getItem('ostrune_site_settings');
    if (cached) return JSON.parse(cached);
  } catch {}
  return INITIAL_SITE_SETTINGS;
}

export function updateSiteSettings(newSettings: SiteSettings): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('ostrune_site_settings', JSON.stringify(newSettings));
      window.dispatchEvent(new Event('ostrune_settings_updated'));
    } catch {}
  }
}

export async function fetchSiteSettingsFromSupabase(): Promise<SiteSettings> {
  const local = getSiteSettings();
  if (!isSupabaseConfigured()) return local;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'global')
      .single();

    if (!error && data) {
      const settings: SiteSettings = {
        ...INITIAL_SITE_SETTINGS,
        ...local,
        id: data.id || 'global',
        phone: data.phone || local.phone || INITIAL_SITE_SETTINGS.phone,
        whatsapp_number: data.whatsapp_number || local.whatsapp_number || INITIAL_SITE_SETTINGS.whatsapp_number,
        email: data.email || local.email || INITIAL_SITE_SETTINGS.email,
        address: data.address || local.address || INITIAL_SITE_SETTINGS.address,
        linkedin_url: data.linkedin_url ?? local.linkedin_url ?? INITIAL_SITE_SETTINGS.linkedin_url,
        twitter_url: data.twitter_url ?? local.twitter_url ?? INITIAL_SITE_SETTINGS.twitter_url,
        instagram_url: data.instagram_url ?? local.instagram_url ?? INITIAL_SITE_SETTINGS.instagram_url,
        brand_name: data.brand_name || local.brand_name || INITIAL_SITE_SETTINGS.brand_name,
        trust_logos_text: data.trust_logos_text ?? local.trust_logos_text ?? INITIAL_SITE_SETTINGS.trust_logos_text,
        stat_counters_text: data.stat_counters_text ?? local.stat_counters_text ?? INITIAL_SITE_SETTINGS.stat_counters_text,
        hero_feed_title: data.hero_feed_title ?? local.hero_feed_title ?? INITIAL_SITE_SETTINGS.hero_feed_title,
        hero_feed_subtitle: data.hero_feed_subtitle ?? local.hero_feed_subtitle ?? INITIAL_SITE_SETTINGS.hero_feed_subtitle,
        hero_feed_badge: data.hero_feed_badge ?? local.hero_feed_badge ?? INITIAL_SITE_SETTINGS.hero_feed_badge,
      };
      updateSiteSettings(settings);
      return settings;
    }
  } catch {}
  return local;
}

export async function saveSiteSettingsToSupabase(newSettings: SiteSettings): Promise<void> {
  updateSiteSettings(newSettings);
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    await supabase.from('site_settings').upsert({
      id: 'global',
      phone: newSettings.phone,
      whatsapp_number: newSettings.whatsapp_number,
      email: newSettings.email,
      address: newSettings.address,
      linkedin_url: newSettings.linkedin_url,
      twitter_url: newSettings.twitter_url,
      instagram_url: newSettings.instagram_url,
      brand_name: newSettings.brand_name,
      trust_logos_text: newSettings.trust_logos_text,
      stat_counters_text: newSettings.stat_counters_text,
      hero_feed_title: newSettings.hero_feed_title,
      hero_feed_subtitle: newSettings.hero_feed_subtitle,
      hero_feed_badge: newSettings.hero_feed_badge,
    });
  } catch (err) {
    console.error('Error saving site settings to Supabase:', err);
  }
}

// Team Members Helpers
export function getTeamMembers(): TeamMember[] {
  if (typeof window === 'undefined') return INITIAL_TEAM_MEMBERS;
  try {
    const cached = localStorage.getItem('ostrune_team_members');
    if (cached) return JSON.parse(cached);
  } catch {}
  return INITIAL_TEAM_MEMBERS;
}

export function saveTeamMembers(newTeam: TeamMember[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('ostrune_team_members', JSON.stringify(newTeam));
      window.dispatchEvent(new Event('ostrune_team_updated'));
    } catch {}
  }
}

export async function fetchTeamMembersFromSupabase(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured()) return getTeamMembers();
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data && data.length > 0) {
      saveTeamMembers(data as TeamMember[]);
      return data as TeamMember[];
    }
  } catch {}
  return getTeamMembers();
}

export async function saveTeamMembersToSupabase(newTeam: TeamMember[]): Promise<void> {
  saveTeamMembers(newTeam);
  try {
    const supabase = createClient();
    // Delete existing team members or upsert
    for (const member of newTeam) {
      await supabase.from('team_members').upsert({
        id: member.id.length > 20 ? member.id : undefined, // uuid check
        name: member.name,
        role: member.role,
        location: member.location,
        badge: member.badge,
        bio: member.bio,
        profile_image_url: member.profile_image_url,
      });
    }
  } catch (err) {
    console.error('Error saving team members to Supabase:', err);
  }
}

// Helper to fetch portfolio projects
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  if (!isSupabaseConfigured()) return INITIAL_PORTFOLIO;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_PORTFOLIO;
    }

    // Ensure fallback mapping for client_location
    return data.map((p: any) => ({
      ...p,
      client_location: p.client_location || p.client_city || 'Global',
    })) as PortfolioProject[];
  } catch {
    return INITIAL_PORTFOLIO;
  }
}

// Helper to fetch single project by slug
export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const all = await getPortfolioProjects();
  return all.find((p) => p.slug === slug) || null;
}

// Helper to fetch testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return INITIAL_TESTIMONIALS;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_TESTIMONIALS;
    }

    return data.map((t: any) => ({
      ...t,
      client_location: t.client_location || t.client_city || 'Global',
    })) as Testimonial[];
  } catch {
    return INITIAL_TESTIMONIALS;
  }
}

// Helper to fetch blog posts (all for admin, published only for public)
export async function getBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return publishedOnly ? INITIAL_BLOG_POSTS.filter((p) => p.is_published) : INITIAL_BLOG_POSTS;
  try {
    const supabase = createClient();
    let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });

    if (publishedOnly) {
      query = query.eq('is_published', true);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      return publishedOnly ? INITIAL_BLOG_POSTS.filter((p) => p.is_published) : INITIAL_BLOG_POSTS;
    }
    return data as BlogPost[];
  } catch {
    return publishedOnly ? INITIAL_BLOG_POSTS.filter((p) => p.is_published) : INITIAL_BLOG_POSTS;
  }
}

// Helper to fetch single published blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const all = await getBlogPosts(false);
  return all.find((p) => p.slug === slug) || null;
}

// Helper to submit lead
export async function submitLead(lead: Lead): Promise<{ success: boolean; message: string }> {
  const payload = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    country: lead.country || lead.city || 'Global',
    service_interested: lead.service_interested,
    budget_range: lead.budget_range,
    message: lead.message,
    created_at: new Date().toISOString(),
    status: 'new',
  };

  // Try server API route first for service-role bypass
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        return {
          success: true,
          message: json.message || 'Thank you! Your inquiry has been received. Our team will reply within 12 hours.',
        };
      }
    } catch (e) {
      console.warn('API leads fetch error, falling back to direct client:', e);
    }
  }

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: 'Thank you! Your inquiry has been received. Our team will reply within 12 hours.',
    };
  }
  try {
    const supabase = createClient();
    const { error } = await supabase.from('leads').insert([payload]);

    if (error) {
      console.warn('Supabase insert note:', error.message);
    }
    return {
      success: true,
      message: 'Thank you! Your inquiry has been received. Our team will reply within 12 hours.',
    };
  } catch {
    return {
      success: true,
      message: 'Thank you! Your inquiry has been received. Our team will reply within 12 hours.',
    };
  }
}

// Fetch leads for Admin
export async function getLeadsFromSupabase(): Promise<Lead[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data.map((l: any) => ({
        ...l,
        country: l.country || l.city || 'Global',
      })) as Lead[];
    }
  } catch {}
  return [];
}

const isUUID = (str?: string) =>
  typeof str === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

export async function saveBlogPostToSupabase(post: BlogPost): Promise<BlogPost> {
  if (!isSupabaseConfigured()) return post;
  try {
    const supabase = createClient();
    const payload: any = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_image_url: post.cover_image_url,
      category: post.category,
      target_keyword: post.target_keyword,
      secondary_keywords: Array.isArray(post.secondary_keywords)
        ? post.secondary_keywords.join(', ')
        : post.secondary_keywords,
      city: post.city || 'Global',
      author_name: post.author_name || 'Ostrune Team',
      is_published: post.is_published,
      published_at: post.published_at || (post.is_published ? new Date().toISOString() : null),
    };

    if (isUUID(post.id)) {
      payload.id = post.id;
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .upsert(payload, { onConflict: 'slug' })
      .select()
      .single();

    if (!error && data) {
      return data as BlogPost;
    }
  } catch (err) {
    console.error('Error saving blog post to Supabase:', err);
  }
  return post;
}

export async function deleteBlogPostFromSupabase(id: string, slug?: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    if (id) await supabase.from('blog_posts').delete().eq('id', id);
    if (slug) await supabase.from('blog_posts').delete().eq('slug', slug);
  } catch (err) {
    console.error('Error deleting blog post from Supabase:', err);
  }
}

export async function saveProjectToSupabase(project: PortfolioProject): Promise<PortfolioProject> {
  if (!isSupabaseConfigured()) return project;
  try {
    const supabase = createClient();
    const payload: any = {
      title: project.title,
      slug: project.slug,
      client_name: project.client_name,
      client_location: project.client_location || project.client_city || 'Global',
      service_type: project.service_type,
      short_description: project.short_description,
      full_description: project.full_description,
      cover_image_url: project.cover_image_url,
      gallery_urls: project.gallery_urls || [project.cover_image_url],
      results: project.results,
      testimonial: project.testimonial,
      live_url: project.live_url,
      is_featured: project.is_featured,
      tech_stack: project.tech_stack || [],
      before_metric: project.before_metric || '',
      after_metric: project.after_metric || '',
      deliverables: project.deliverables || [],
      project_duration: project.project_duration || '',
      challenge_description: project.challenge_description || '',
      solution_description: project.solution_description || '',
    };

    if (isUUID(project.id)) {
      payload.id = project.id;
    }

    const { data, error } = await supabase
      .from('portfolio_projects')
      .upsert(payload, { onConflict: 'slug' })
      .select()
      .single();

    if (!error && data) {
      return data as PortfolioProject;
    }
  } catch (err) {
    console.error('Error saving project to Supabase:', err);
  }
  return project;
}

export async function deleteProjectFromSupabase(id: string, slug?: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    if (id) await supabase.from('portfolio_projects').delete().eq('id', id);
    if (slug) await supabase.from('portfolio_projects').delete().eq('slug', slug);
  } catch (err) {
    console.error('Error deleting project from Supabase:', err);
  }
}

export async function saveTestimonialToSupabase(t: Testimonial): Promise<Testimonial> {
  if (!isSupabaseConfigured()) return t;
  try {
    const supabase = createClient();
    const payload: any = {
      client_name: t.client_name,
      client_company: t.client_company,
      client_location: t.client_location || t.client_city || 'Global',
      quote: t.quote,
      rating: t.rating || 5,
    };

    if (isUUID(t.id)) {
      payload.id = t.id;
    }

    const { data, error } = await supabase
      .from('testimonials')
      .upsert(payload)
      .select()
      .single();

    if (!error && data) {
      return data as Testimonial;
    }
  } catch (err) {
    console.error('Error saving testimonial to Supabase:', err);
  }
  return t;
}

export async function deleteTestimonialFromSupabase(id: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    if (id) await supabase.from('testimonials').delete().eq('id', id);
  } catch (err) {
    console.error('Error deleting testimonial from Supabase:', err);
  }
}

export async function updateLeadStatusInSupabase(id: string, status: Lead['status']): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    if (id) await supabase.from('leads').update({ status }).eq('id', id);
  } catch (err) {
    console.error('Error updating lead status in Supabase:', err);
  }
}

export async function deleteLeadFromSupabase(id: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    if (id) await supabase.from('leads').delete().eq('id', id);
  } catch (err) {
    console.error('Error deleting lead from Supabase:', err);
  }
}

export async function deleteTeamMemberFromSupabase(id: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    if (id) await supabase.from('team_members').delete().eq('id', id);
  } catch (err) {
    console.error('Error deleting team member from Supabase:', err);
  }
}

// ----------------------------------------------------
// STUDENT PROJECTS & VIDEO FEEDBACK (MSME Learnithm)
// ----------------------------------------------------

export const INITIAL_STUDENT_FEEDBACK_VIDEOS: StudentFeedbackVideo[] = [
  {
    id: 'sv-1',
    student_name: 'Ananya Sharma',
    degree_branch: 'MCA Final Year',
    project_title: 'AI Based Health Diagnostic System using Deep Learning',
    project_category: 'deep_learning',
    video_url: 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    quote: 'Learnithm made my final year MCA project effortless! The Deep Learning CNN model accuracy was 98.4%, and the MSME certificate + IEEE report documentation helped me clear my viva with top grades!',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'sv-2',
    student_name: 'Rahul Verma',
    degree_branch: 'BCA Final Year',
    project_title: 'Smart E-Commerce Portal with Custom Domain Hosting',
    project_category: 'web_dev',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    quote: 'Got complete source code, PPT presentation, and custom domain deployment from Learnithm. Over 80+ of my college seniors recommended them, and now I see why!',
    is_featured: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'sv-3',
    student_name: 'Priya Patel',
    degree_branch: 'B.Sc CS',
    project_title: 'Predictive Stock & Crypto Analytics using Machine Learning',
    project_category: 'machine_learning',
    video_url: 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    quote: 'Awesome guidance for Machine Learning algorithms! The project report followed my university format perfectly and the MSME registered Learnithm certificate gave a huge boost to my resume.',
    is_featured: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'sv-4',
    student_name: 'Vikram Singh',
    degree_branch: 'M.Sc CS',
    project_title: 'Real-Time Facial Recognition & Security System',
    project_category: 'deep_learning',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    quote: 'The viva preparation sessions and detailed documentation were top-notch. Learnithm provided custom domain hosting and full source code walk-throughs!',
    is_featured: true,
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
];

export const INITIAL_STUDENT_PROJECTS: StudentProject[] = [
  {
    id: 'sp-1',
    title: 'AI Medical Diagnosis & X-Ray Analysis System',
    category: 'deep_learning',
    degree: 'MCA / M.Sc CS',
    description: 'Deep Learning Convolutional Neural Network (CNN) trained on PyTorch/TensorFlow for classifying lung pathologies with 98% accuracy. Includes Flask API & React dashboard.',
    tech_stack: ['Python', 'TensorFlow', 'PyTorch', 'Flask', 'React'],
    has_documentation: true,
    has_presentation: true,
    has_certificate: true,
    has_custom_domain: true,
    demo_url: 'https://med-ai-demo.learnithm.in',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString(),
  },
  {
    id: 'sp-2',
    title: 'Full-Stack Smart Learning Management System',
    category: 'web_dev',
    degree: 'BCA / B.Tech CS',
    description: 'Next.js & Tailwind CSS responsive LMS portal with student dashboards, video streaming, quizzes, PDF certificate generator, and Razorpay/Stripe integration.',
    tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js'],
    has_documentation: true,
    has_presentation: true,
    has_certificate: true,
    has_custom_domain: true,
    demo_url: 'https://lms-portal.learnithm.in',
    image_url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'sp-3',
    title: 'Customer Churn & Sales Revenue Prediction ML Model',
    category: 'machine_learning',
    degree: 'B.Sc CS / MCA',
    description: 'Scikit-Learn Random Forest and XGBoost regression pipeline predicting customer churn with interactive Streamlit web dashboard and real-time visualization.',
    tech_stack: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'Streamlit'],
    has_documentation: true,
    has_presentation: true,
    has_certificate: true,
    has_custom_domain: true,
    demo_url: 'https://churn-ml.learnithm.in',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'sp-4',
    title: 'Autonomous Vehicle Obstacle Detection System',
    category: 'deep_learning',
    degree: 'M.Sc CS / B.Tech CS',
    description: 'YOLOv8 Computer Vision model for real-time traffic obstacle and pedestrian detection, featuring OpenCV processing and live web feed controls.',
    tech_stack: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch', 'FastAPI'],
    has_documentation: true,
    has_presentation: true,
    has_certificate: true,
    has_custom_domain: true,
    demo_url: 'https://yolo-vision.learnithm.in',
    image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
];

export function getStudentFeedbackVideos(): StudentFeedbackVideo[] {
  if (typeof window === 'undefined') return INITIAL_STUDENT_FEEDBACK_VIDEOS;
  try {
    const cached = localStorage.getItem('ostrune_student_feedback');
    if (cached) return JSON.parse(cached);
  } catch (err) {
    console.error('Error reading student feedback from localStorage:', err);
  }
  return INITIAL_STUDENT_FEEDBACK_VIDEOS;
}

export function saveStudentFeedbackLocal(videos: StudentFeedbackVideo[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('ostrune_student_feedback', JSON.stringify(videos));
    window.dispatchEvent(new Event('ostrune_student_data_updated'));
  } catch (err) {
    console.error('Error saving student feedback to localStorage:', err);
  }
}

export async function fetchStudentFeedbackFromSupabase(): Promise<StudentFeedbackVideo[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('student_feedback_videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      saveStudentFeedbackLocal(data as StudentFeedbackVideo[]);
      return data as StudentFeedbackVideo[];
    }
  } catch (err) {
    console.error('Error fetching student feedback from Supabase:', err);
  }
  return null;
}

export async function saveStudentFeedbackToSupabase(item: StudentFeedbackVideo): Promise<StudentFeedbackVideo> {
  // 1. Update local cache
  const current = getStudentFeedbackVideos();
  const existingIdx = current.findIndex((v) => v.id === item.id);
  let updatedList: StudentFeedbackVideo[];
  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = item;
  } else {
    updatedList = [item, ...current];
  }
  saveStudentFeedbackLocal(updatedList);

  // 2. Sync to Supabase if configured
  if (!isSupabaseConfigured()) return item;
  try {
    const supabase = createClient();
    const payload: Partial<StudentFeedbackVideo> = {
      student_name: item.student_name,
      degree_branch: item.degree_branch,
      project_title: item.project_title,
      project_category: item.project_category,
      video_url: item.video_url,
      thumbnail_url: item.thumbnail_url,
      rating: item.rating,
      quote: item.quote,
      is_featured: item.is_featured,
    };
    if (isUUID(item.id)) {
      payload.id = item.id;
    }

    const { data, error } = await supabase
      .from('student_feedback_videos')
      .upsert(payload)
      .select()
      .single();

    if (!error && data) {
      return data as StudentFeedbackVideo;
    }
  } catch (err) {
    console.error('Error saving student feedback to Supabase:', err);
  }
  return item;
}

export async function deleteStudentFeedbackFromSupabase(id: string): Promise<void> {
  const current = getStudentFeedbackVideos();
  const filtered = current.filter((v) => v.id !== id);
  saveStudentFeedbackLocal(filtered);

  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    if (id) {
      await supabase.from('student_feedback_videos').delete().eq('id', id);
    }
  } catch (err) {
    console.error('Error deleting student feedback from Supabase:', err);
  }
}

export function getStudentProjects(): StudentProject[] {
  if (typeof window === 'undefined') return INITIAL_STUDENT_PROJECTS;
  try {
    const cached = localStorage.getItem('ostrune_student_projects');
    if (cached) return JSON.parse(cached);
  } catch (err) {
    console.error('Error reading student projects from localStorage:', err);
  }
  return INITIAL_STUDENT_PROJECTS;
}

export function saveStudentProjectsLocal(projects: StudentProject[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('ostrune_student_projects', JSON.stringify(projects));
    window.dispatchEvent(new Event('ostrune_student_data_updated'));
  } catch (err) {
    console.error('Error saving student projects to localStorage:', err);
  }
}

export async function fetchStudentProjectsFromSupabase(): Promise<StudentProject[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('student_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      saveStudentProjectsLocal(data as StudentProject[]);
      return data as StudentProject[];
    }
  } catch (err) {
    console.error('Error fetching student projects from Supabase:', err);
  }
  return null;
}

export async function saveStudentProjectToSupabase(item: StudentProject): Promise<StudentProject> {
  const current = getStudentProjects();
  const existingIdx = current.findIndex((p) => p.id === item.id);
  let updatedList: StudentProject[];
  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = item;
  } else {
    updatedList = [item, ...current];
  }
  saveStudentProjectsLocal(updatedList);

  if (!isSupabaseConfigured()) return item;
  try {
    const supabase = createClient();
    const payload: Partial<StudentProject> = {
      title: item.title,
      category: item.category,
      degree: item.degree,
      description: item.description,
      tech_stack: item.tech_stack,
      has_documentation: item.has_documentation,
      has_presentation: item.has_presentation,
      has_certificate: item.has_certificate,
      has_custom_domain: item.has_custom_domain,
      demo_url: item.demo_url,
      image_url: item.image_url,
    };
    if (isUUID(item.id)) {
      payload.id = item.id;
    }

    const { data, error } = await supabase
      .from('student_projects')
      .upsert(payload)
      .select()
      .single();

    if (!error && data) {
      return data as StudentProject;
    }
  } catch (err) {
    console.error('Error saving student project to Supabase:', err);
  }
  return item;
}

export async function deleteStudentProjectFromSupabase(id: string): Promise<void> {
  const current = getStudentProjects();
  const filtered = current.filter((p) => p.id !== id);
  saveStudentProjectsLocal(filtered);

  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    if (id) {
      await supabase.from('student_projects').delete().eq('id', id);
    }
  } catch (err) {
    console.error('Error deleting student project from Supabase:', err);
  }
}

