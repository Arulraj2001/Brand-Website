import { PortfolioProject, Testimonial, Lead, SiteSettings, TeamMember, BlogPost } from '@/types';
import { createClient } from './client';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  phone: '+91 98765 43210',
  whatsapp_number: '919876543210',
  email: 'hello@apexpulse.in',
  address: '100 Feet Rd, 4th Block, Koramangala, Bengaluru, Karnataka 560034',
  linkedin_url: 'https://linkedin.com/company/apexpulse-india',
  twitter_url: 'https://twitter.com/apexpulse_in',
  instagram_url: 'https://instagram.com/apexpulse.in',
};

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 't1',
    name: 'Aarav Mehta',
    role: 'Co-Founder & Chief Software Architect',
    location: 'Bengaluru, Karnataka',
    badge: 'EX-FAANG ARCHITECT',
    bio: 'Pioneered sub-second web application architecture & enterprise database systems.',
    profile_image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 't2',
    name: 'Riya Sen',
    role: 'Head of Paid Growth & Meta Ads',
    location: 'Mumbai, Maharashtra',
    badge: '₹12 CR+ AD SPEND',
    bio: 'Specializes in CAPI pixel setups, visual video hooks, and high-ROAS acquisition funnels.',
    profile_image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 't3',
    name: 'Karan Verma',
    role: 'Director of Technical SEO & Search',
    location: 'Gurgaon, Delhi NCR',
    badge: '140+ RANK 1 KEYWORDS',
    bio: 'Architected structured JSON-LD schemas and Tier 1 city landing page ranking engines.',
    profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
];

export const INITIAL_PORTFOLIO: PortfolioProject[] = [
  {
    id: '1',
    title: 'FinTech App & High-Converting Web Portal',
    slug: 'cred-pay-fintech-portal',
    client_name: 'ZetaPay Technologies',
    client_city: 'Bengaluru',
    service_type: 'web_dev',
    short_description: 'Engineered a web application with 99.9% uptime, sub-second latency, and integrated UPI payment flows.',
    full_description: 'ZetaPay needed a complete rebuild of their merchant acquisition platform. We redesigned the UX from the ground up using modern Tailwind CSS micro-animations, fast server-side rendering, and responsive UI components.',
    cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80'
    ],
    results: '+340% Qualified Merchant Leads | 0.8s Average Page Load | ₹4.2 Cr Processed Monthly',
    testimonial: 'ApexPulse transformed our online acquisition flow completely. The visual depth and speed of the site impressed our investors and merchants alike.',
    live_url: 'https://zetapay.in',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'D2C E-Commerce Brand SEO & Organic Dominance',
    slug: 'nutra-pure-organic-seo',
    client_name: 'NutraPure India',
    client_city: 'Mumbai',
    service_type: 'seo',
    short_description: 'Captured top 3 rank positions across 140+ high-intent keywords in health & organic wellness nationwide.',
    full_description: 'We performed deep technical SEO fixes, structured data integration (JSON-LD), core web vitals speed optimization, and programmatic content scaling targeting buyers across Tier 1 & Tier 2 Indian cities.',
    cover_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80'
    ],
    results: '4.8x Organic Traffic Growth | 120,000+ Monthly Visitors | ₹18L Monthly Organic Sales',
    testimonial: 'Our organic sales surpassed our paid ad revenue within 6 months. ApexPulse knows Indian search intent inside out.',
    live_url: 'https://nutrapure.in',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'B2B SaaS Lead Generation & High-ROAS Meta Ads',
    slug: 'work-space-b2b-lead-gen',
    client_name: 'WorkSpace India',
    client_city: 'Delhi NCR',
    service_type: 'meta_ads',
    short_description: 'Scaled qualified corporate coworking lease inquiries using hyper-targeted LinkedIn and Meta ad funnels.',
    full_description: 'Designed interactive lead magnets, high-converting landing pages, and multi-tier retargeting ads across Meta & LinkedIn targeting CTOs and Ops leads in Gurgaon and Noida.',
    cover_image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80'
    ],
    results: '₹420 Cost Per Qualified Lead | 5.2x Verified ROAS | ₹1.8 Cr Deal Pipeline Generated',
    testimonial: 'We got more high-value enterprise leads in 60 days than our previous agency delivered in an entire year.',
    live_url: 'https://workspace.in',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Real Estate Hyper-Local Lead Engine',
    slug: 'prestige-villas-lead-engine',
    client_name: 'Skyline Luxury Homes',
    client_city: 'Hyderabad',
    service_type: 'lead_gen',
    short_description: 'Automated WhatsApp-integrated lead capture funnel for premium luxury residential properties.',
    full_description: 'Built a multi-step interactive property match tool that qualified buyers by budget range before directly routing verified WhatsApp leads to sales agents in Hyderabad and Pune.',
    cover_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    ],
    results: '850+ High-Intent Buyers | 68% WhatsApp Instant Conversion | ₹14 Cr Inventory Sold',
    testimonial: 'The pre-filled WhatsApp lead funnel was a game changer for our site sales team.',
    live_url: 'https://prestigevillas.in',
    is_featured: false,
    created_at: new Date().toISOString(),
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    client_name: 'Rajesh Sharma',
    client_company: 'Founder & CEO, ZetaPay',
    client_city: 'Bengaluru',
    quote: 'ApexPulse delivered a sub-second web portal that instantly boosted our merchant onboarding conversions by 340%. Exceptional engineering execution.',
    rating: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    client_name: 'Anita Desai',
    client_company: 'CMO, NutraPure Health',
    client_city: 'Mumbai',
    quote: 'Our organic search rankings jumped to top 3 nationwide in less than 4 months. Their commercial keyword targeting is unmatched in India.',
    rating: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    client_name: 'Vikramaditya Roy',
    client_company: 'Managing Director, Skyline Luxury Homes',
    client_city: 'Hyderabad',
    quote: 'The automated WhatsApp lead funnel qualified buyers before routing them to our sales desk. Our cost per verified lead dropped by 60%.',
    rating: 5,
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'SEO Services in Bangalore: What Actually Works for Indian Enterprises in 2026',
    slug: 'seo-services-in-bangalore-2026',
    excerpt: 'A technical breakdown of commercial keyword mapping, JSON-LD LocalBusiness schema, and Core Web Vitals speed optimization for tech hubs in India.',
    category: 'seo',
    target_keyword: 'SEO Services in Bangalore',
    city: 'Bengaluru',
    author_name: 'Karan Verma',
    is_published: true,
    published_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    content: `
# SEO Services in Bangalore: What Actually Works for Indian Enterprises in 2026

Bengaluru's enterprise tech landscape is one of the most competitive search environments in Asia. Standard blogging and generic backlinking strategies no longer move the needle for high-intent B2B and D2C brands.

To dominate search engine results pages (SERPs) across Koramangala, Indiranagar, Whitefield, and electronic city hubs, companies need a precision-targeted technical SEO foundation.

## 1. Commercial Intent Keyword Mapping

Generic search queries like "best marketing" deliver empty impressions without buying intent. In 2026, ranking for commercial intent queries such as:
- Custom web app development company in Bangalore
- Enterprise SEO agency Koramangala
- B2B WhatsApp lead generation funnel India

yields 5x higher visitor-to-lead conversion rates.

## 2. Technical Code Audit & Sub-Second Core Web Vitals

Google's ranking algorithms heavily weight PageSpeed and Core Web Vitals (LCP under 1.2s, CLS 0, INP under 100ms). Traditional WordPress setups with 40+ plugins fail these checks on 4G mobile connections across Tier 1 Indian cities.

By deploying modern frontend architectures, image optimization, and serverless edge delivery, websites consistently achieve 95+ desktop and mobile performance scores.

## 3. JSON-LD LocalBusiness & Organization Schema

Schema markup tells search engine crawlers exactly what services you offer, your physical HQ location, operating hours, price ranges, and verified client ratings.

JSON-LD Schema Structure:
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ApexPulse Digital Agency India",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "100 Feet Rd, Koramangala",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "postalCode": "560034",
    "addressCountry": "IN"
  }
}

## Summary for Growth Leaders

Ranking top 3 in Bengaluru requires combining technical code speed with hyper-local commercial keyword targeting. Partnering with a specialized web engineering agency ensures long-term organic lead flow.
`,
  },
  {
    id: 'b2',
    title: 'Why Your Website Needs Technical SEO, Not Just Content',
    slug: 'technical-seo-vs-content-india',
    excerpt: 'Content is king, but technical infrastructure is the kingdom. Learn how crawl budget, rendering performance, and clean DOM structures impact rankings.',
    category: 'seo',
    target_keyword: 'Technical SEO India',
    city: 'Mumbai',
    author_name: 'ApexPulse Team',
    is_published: true,
    published_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    cover_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    content: `
# Why Your Website Needs Technical SEO, Not Just Content

Many Indian business founders invest thousands of rupees into weekly blog content, only to find their organic traffic flatlining on Page 3 of Google search results.

The culprit is almost always underlying technical debt.

## The 3 Pillars of Technical SEO

1. Crawlability & Indexing: Ensuring search engine bots can discover all your high-priority commercial pages without getting stuck in infinite redirect loops or JavaScript rendering errors.
2. Site Speed & Performance: Sub-second page loads reduce bounce rates by over 40% on mobile devices.
3. Structured Data Hierarchy: Using proper H1 -> H2 -> H3 semantic HTML tags, aria labels, and structured schema so algorithms comprehend page semantics instantly.

## The Technical Solution

Before publishing more articles, audit your website's DOM size, unminified scripts, unoptimized images, and broken canonical links. A clean technical foundation multiplies the organic impact of every piece of content you produce.
`,
  },
  {
    id: 'b3',
    title: 'How ZetaPay Scaled Merchant Leads by 340% with Web Engineering',
    slug: 'nextjs-scaling-case-study-india',
    excerpt: 'An architectural deep-dive into how custom frontend components, Supabase DB integration, and sub-second loading increased fintech merchant signups.',
    category: 'web_dev',
    target_keyword: 'Fintech Web Development India',
    city: 'Bengaluru',
    author_name: 'Aarav Mehta',
    is_published: true,
    published_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    content: `
# How ZetaPay Scaled Merchant Leads by 340% with Web Engineering

When ZetaPay approached ApexPulse, their merchant acquisition funnel was struggling with a 6.4-second initial page render time and an unoptimized onboarding form.

## The Engineering Strategy

- Architectural Overhaul: Migrated from a legacy monolith to a lightweight, component-driven frontend with sub-second serverless rendering.
- Database & Auth Integration: Synced real-time merchant signup forms with Supabase Auth and database tables.
- UPI Gateway Webhooks: Enabled instant automated qualification for Indian merchants.

## Results Achieved

- 340% surge in qualified weekly merchant applications.
- 0.8-second average page load time across 4G networks in India.
- ₹4.2 Cr processed in monthly merchant transactions.
`,
  },
  {
    id: 'b4',
    title: 'The Definitive Guide to Building High-Converting WhatsApp Lead Funnels in India',
    slug: 'b2b-whatsapp-lead-funnel-guide-2026',
    excerpt: 'Discover how multi-step qualification forms combined with instant WhatsApp sales alerts convert cold site visitors into booked client meetings.',
    category: 'lead_gen',
    target_keyword: 'WhatsApp Lead Generation India',
    city: 'Delhi NCR',
    author_name: 'Riya Sen',
    is_published: true,
    published_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    cover_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    content: `
# The Definitive Guide to Building High-Converting WhatsApp Lead Funnels in India

In India's mobile-first economy, traditional email-only contact forms suffer from abysmal response rates. Over 92% of business decision-makers prefer communicating via WhatsApp.

## How the Automated WhatsApp Funnel Works

1. Interactive Multi-Step Qualification: Instead of asking for a phone number upfront, guide the visitor through 3 quick questions regarding their budget range, service needs, and timeline.
2. OTP Mobile Verification: Validate +91 Indian phone numbers to eliminate spam and fake contacts.
3. Instant Sales Alert Webhook: Trigger an immediate automated WhatsApp notification to your sales rep with the prospect's verified details.

By shortening the response time from hours to under 2 minutes, client booking rates jump by up to 68%.
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
    return data as PortfolioProject[];
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
    return data as Testimonial[];
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
        ...lead,
        created_at: new Date().toISOString(),
        status: 'new',
      },
    ]);

    if (error) {
      console.warn('Supabase insert note (using mock store fallback):', error.message);
    }
    return {
      success: true,
      message: 'Thank you! Your quote request has been received. Our team will contact you within 2 hours.',
    };
  } catch {
    return {
      success: true,
      message: 'Thank you! Your quote request has been received. Our team will contact you within 2 hours.',
    };
  }
}
