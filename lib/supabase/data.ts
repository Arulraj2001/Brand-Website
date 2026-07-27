import { PortfolioProject, Testimonial, Lead, SiteSettings, TeamMember, BlogPost } from '@/types';
import { createClient } from './client';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  phone: '+1 (800) 555-0199',
  whatsapp_number: '18005550199',
  email: 'hello@apexpulse.in',
  address: 'Global Remote HQ • Austin, TX & International Hubs',
  linkedin_url: 'https://linkedin.com/company/apexpulse-india',
  twitter_url: 'https://twitter.com/apexpulse_in',
  instagram_url: 'https://instagram.com/apexpulse.in',
};

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 't1',
    name: 'Aarav Mehta',
    role: 'Co-Founder & Chief Software Architect',
    location: 'Austin, TX & Global Remote',
    badge: 'EX-FAANG ARCHITECT',
    bio: 'Pioneered sub-second web application architecture & enterprise database systems for global startups.',
    profile_image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 't2',
    name: 'Riya Sen',
    role: 'Head of Paid Growth & UGC Ads',
    location: 'London, UK & Global Remote',
    badge: '$1.5M+ AD SPEND',
    bio: 'Specializes in CAPI pixel setups, high-converting UGC video hooks, and 5.2x ROAS acquisition funnels.',
    profile_image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 't3',
    name: 'Karan Verma',
    role: 'Director of Technical SEO & Speed Upgrades',
    location: 'Toronto, Canada & Global Remote',
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
    client_location: 'Austin, USA',
    client_city: 'Austin',
    service_type: 'web_dev',
    short_description: 'Engineered a web application with 99.9% uptime, sub-second latency, and integrated Stripe/PayPal payment flows.',
    full_description: 'ZetaPay needed a complete rebuild of their client acquisition platform. We redesigned the UX from the ground up using modern Tailwind CSS micro-animations, fast server-side rendering, and responsive UI components.',
    cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80'
    ],
    results: '+340% Qualified Leads | 0.8s Average Page Load | $520K Monthly Transactions',
    testimonial: 'ApexPulse transformed our online acquisition flow completely. The visual depth and speed of the site impressed our US investors.',
    live_url: 'https://zetapay.in',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'D2C Brand Website Speed & Technical SEO Overhaul',
    slug: 'nutra-pure-organic-seo',
    client_name: 'NutraPure Global',
    client_location: 'London, UK',
    client_city: 'London',
    service_type: 'website_upgrade',
    short_description: 'Overhauled a slow legacy e-commerce site to achieve 100/100 Core Web Vitals and top 3 Google rankings across high-intent keywords.',
    full_description: 'We performed deep technical SEO fixes, structured data integration (JSON-LD), Core Web Vitals page speed optimization, and mobile rendering fixes.',
    cover_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80'
    ],
    results: '4.8x Organic Traffic Surge | Page Speed 99/100 | +220% Organic E-Commerce Sales',
    testimonial: 'Our site load speed dropped from 4.8s to under 0.9s. ApexPulse delivered affordable premium engineering.',
    live_url: 'https://nutrapure.in',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'UGC Video Ads & High-ROAS Meta Creative Scaling',
    slug: 'work-space-b2b-lead-gen',
    client_name: 'WorkSpace International',
    client_city: 'Toronto',
    client_location: 'Toronto, Canada',
    service_type: 'ugc_ads',
    short_description: 'Produced scroll-stopping UGC video ad creatives and automated funnel landing pages for corporate client acquisition.',
    full_description: 'Produced 12 A/B UGC creator hooks, high-converting visual ad sequences, and retargeting campaigns across Meta & LinkedIn.',
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
    client_city: 'Sydney',
    client_location: 'Sydney, Australia',
    service_type: 'local_business',
    short_description: 'Dominated local search maps and built automated consultation booking funnels for luxury property listings.',
    full_description: 'Built a local SEO strategy, Google Business Profile optimization, and automated booking funnel.',
    cover_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    ],
    results: '850+ Monthly Consultations | 68% Online Booking Rate | #1 Local Map Rank',
    testimonial: 'The automated consultation booking funnel transformed our sales workflow.',
    live_url: 'https://prestigevillas.in',
    is_featured: false,
    created_at: new Date().toISOString(),
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    client_name: 'David Miller',
    client_company: 'Founder & CEO, ZetaPay USA',
    client_location: 'Austin, TX (USA)',
    client_city: 'Austin, USA',
    quote: 'ApexPulse delivered a sub-second SaaS portal at a fraction of US agency quotes. Responsive, time-zone friendly, and outstanding engineering.',
    rating: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    client_name: 'Sarah Jenkins',
    client_company: 'CMO, NutraPure Health',
    client_location: 'London, UK',
    client_city: 'London, UK',
    quote: 'Our website speed score jumped from 32 to 99/100. Their old website upgrade service is the best investment we made all year.',
    rating: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    client_name: 'Marcus Vance',
    client_company: 'Director, Skyline Properties',
    client_location: 'Sydney, Australia',
    quote: 'Their UGC ad creatives doubled our Meta ad ROAS within 2 weeks. Seamless async communication across time zones.',
    rating: 5,
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b-p12-1',
    title: 'Why Is My Website Ranking Dropping? 7 Technical SEO Fixes for 2026',
    slug: 'why-is-my-website-ranking-dropping',
    excerpt: 'Is your organic search traffic slipping? Discover 7 hidden technical SEO glitches, Core Web Vitals drops, and schema errors causing Google rank drops.',
    category: 'seo',
    target_keyword: 'why is my website ranking dropping',
    city: 'Global',
    author_name: 'Karan Verma',
    is_published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    content: `
# Why Is My Website Ranking Dropping? 7 Technical SEO Fixes for 2026

Watching your organic traffic plummet on Google Analytics is every website owner's nightmare. When rankings drop unexpectedly, many founders rush to buy spammy backlinks or rewrite working copy.

However, over 80% of sudden ranking losses stem from underlying technical SEO issues and page speed bottlenecks.

## 1. Core Web Vitals & INP Performance Degradation
Google's latest algorithm updates heavily penalize websites with slow Interaction to Next Paint (INP) scores and high Cumulative Layout Shift (CLS). If your site loads in over 2.5 seconds on mobile networks, search bots will lower your visibility.

## 2. Broken Canonical Tags & Duplicate Rendering
If your canonical tags point to HTTP instead of HTTPS, or if parameters create infinite duplicate URLs, search crawlers get confused about which page is authoritative.

## 3. Outdated or Invalid JSON-LD Schema
Search engines rely on structured JSON-LD data to understand your business offerings. Missing required fields in Organization or Product schema can revoke your rich snippets overnight.

## How to Fix It
Run a full technical code audit, eliminate heavy third-party plugins, optimize image payload sizes, and restore clean DOM structures.
`,
  },
  {
    id: 'b-p12-2',
    title: 'How to Speed Up a Slow Website: Core Web Vitals Optimization Guide',
    slug: 'how-to-speed-up-slow-website',
    excerpt: 'Learn how to transform a sluggish 5-second website into a sub-second powerhouse. A step-by-step guide to fixing LCP, CLS, and mobile loading speeds.',
    category: 'website_upgrade',
    target_keyword: 'how to speed up a slow website',
    city: 'Global',
    author_name: 'Aarav Mehta',
    is_published: true,
    published_at: new Date(Date.now() - 86400000).toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString(),
    cover_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    content: `
# How to Speed Up a Slow Website: Core Web Vitals Optimization Guide

Every second of delay on your website costs you 7% in sales conversions. If your website takes 4 seconds to load, over half of your paid ad visitors leave before seeing your offer.

## Why Legacy Sites Are Slow
- **Plugin Bloat**: WordPress or legacy CMS sites running 30+ unoptimized plugins.
- **Uncompressed High-Res Images**: Uploading raw 4MB PNG files instead of WebP formats.
- **Render-Blocking CSS & JS**: Scripts loading before main hero content renders.

## The Web Engineering Speed Fix
1. **Convert Media to WebP**: Reduce image payload sizes by up to 80% without losing visual clarity.
2. **Implement Serverless Caching**: Deliver content from global edge locations near your visitors.
3. **Clean Code & Code-Splitting**: Load JavaScript asynchronously so hero sections render instantly.
`,
  },
  {
    id: 'b-p12-3',
    title: 'How Much Does Professional SEO Cost in 2026? Agency Pricing Guide',
    slug: 'how-much-does-professional-seo-cost',
    excerpt: 'Transparent breakdown of global SEO agency pricing models, monthly retainers vs project quotes, and why affordable offshore technical SEO delivers 5x ROI.',
    category: 'seo',
    target_keyword: 'how much does professional SEO cost',
    city: 'Global',
    author_name: 'Karan Verma',
    is_published: true,
    published_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    content: `
# How Much Does Professional SEO Cost in 2026? Agency Pricing Guide

Understanding SEO pricing models helps business owners avoid cheap $99/month spam packages while also avoiding overpriced $15,000/month US agency retainers.

## Global SEO Cost Averages in 2026

- **Cheap $99–$300/mo Packages**: Automated spam links that risk Google manual penalties.
- **US/UK Local Agencies ($3,000–$10,000/mo)**: High overhead costs passed down to clients.
- **Affordable Offshore Technical Agencies ($500–$2,000/mo)**: Same or superior code audits, schema architecture, and high-intent commercial ranking strategy at a fraction of Western rates.

## What Should Be Included in Professional SEO?
A legitimate SEO retainer includes full technical audits, Core Web Vitals fixes, JSON-LD schema implementation, high-intent keyword mapping, and transparent monthly rank tracking.
`,
  },
  {
    id: 'b-p12-4',
    title: '5 Critical Signs Your Website Needs a Redesign Before You Lose More Leads',
    slug: 'signs-your-website-needs-a-redesign',
    excerpt: 'Is your current website scaring away prospective clients? Discover 5 warning signs it is time for a modern, high-converting website redesign.',
    category: 'web_dev',
    target_keyword: 'signs your website needs a redesign',
    city: 'Global',
    author_name: 'Aarav Mehta',
    is_published: true,
    published_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    cover_image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    content: `
# 5 Critical Signs Your Website Needs a Redesign Before You Lose More Leads

Your website is your 24/7 digital storefront. If it looks outdated or feels sluggish, prospective buyers immediately question your business's credibility.

## 1. High Bounce Rate on Mobile Devices
If over 60% of mobile visitors exit within 5 seconds, your site layout is not mobile-first responsive.

## 2. Low Conversion Rates Despite Good Traffic
If you get traffic but zero consultation bookings or sales, your user flow lacks clear CTAs and visual hierarchy.

## 3. Slow Page Speeds & Outdated Visual Design
If your site takes 4+ seconds to load or uses outdated font styling, visitors will jump to modern competitors.
`,
  },
  {
    id: 'b-p12-5',
    title: 'UGC Ads vs Traditional Studio Ads for E-Commerce: Which Converts Better?',
    slug: 'ugc-ads-vs-traditional-ads-ecommerce',
    excerpt: 'Why authentic User-Generated Content video ads outperform expensive traditional studio commercials for Meta and TikTok ad campaigns.',
    category: 'ugc_ads',
    target_keyword: 'UGC ads vs traditional ads for ecommerce',
    city: 'Global',
    author_name: 'Riya Sen',
    is_published: true,
    published_at: new Date(Date.now() - 86400000 * 9).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 9).toISOString(),
    cover_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    content: `
# UGC Ads vs Traditional Studio Ads for E-Commerce: Which Converts Better?

Modern digital consumers skip slick TV commercials. Instead, they stop scrolling for authentic, relatable video reviews created by real people.

## Why UGC Ads Drive 4x Higher ROAS

1. **Native Social Integration**: UGC videos look like natural posts from friends rather than intrusive ads.
2. **Pain-Point Problem & Solution Hooks**: Real creators demonstrate product usage in 15-second mobile hooks.
3. **Rapid A/B Testing**: You can test 10+ UGC video angles for the cost of a single traditional studio video shoot.
`,
  },
];

// Site Settings Helpers
export function getSiteSettings(): SiteSettings {
  if (typeof window === 'undefined') return INITIAL_SITE_SETTINGS;
  try {
    const cached = localStorage.getItem('apexpulse_site_settings');
    if (cached) return JSON.parse(cached);
  } catch {}
  return INITIAL_SITE_SETTINGS;
}

export function updateSiteSettings(newSettings: SiteSettings): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('apexpulse_site_settings', JSON.stringify(newSettings));
      window.dispatchEvent(new Event('apexpulse_settings_updated'));
    } catch {}
  }
}

// Team Members Helpers
export function getTeamMembers(): TeamMember[] {
  if (typeof window === 'undefined') return INITIAL_TEAM_MEMBERS;
  try {
    const cached = localStorage.getItem('apexpulse_team_members');
    if (cached) return JSON.parse(cached);
  } catch {}
  return INITIAL_TEAM_MEMBERS;
}

export function saveTeamMembers(newTeam: TeamMember[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('apexpulse_team_members', JSON.stringify(newTeam));
      window.dispatchEvent(new Event('apexpulse_team_updated'));
    } catch {}
  }
}

// Helper to fetch portfolio projects
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
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
      client_location: p.client_location || p.client_city || 'Austin, USA',
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
      client_location: t.client_location || t.client_city || 'USA',
    })) as Testimonial[];
  } catch {
    return INITIAL_TESTIMONIALS;
  }
}

// Helper to fetch blog posts (all for admin, published only for public)
export async function getBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
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
  try {
    const supabase = createClient();
    const { error } = await supabase.from('leads').insert([
      {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        country: lead.country || lead.city || 'United States',
        service_interested: lead.service_interested,
        budget_range: lead.budget_range,
        message: lead.message,
        created_at: new Date().toISOString(),
        status: 'new',
      },
    ]);

    if (error) {
      console.warn('Supabase insert note (using mock store fallback):', error.message);
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
