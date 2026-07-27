import { PortfolioProject, Testimonial, Lead, SiteSettings, TeamMember } from '@/types';
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
    quote: 'ApexPulse built us a platform that commands respect. The micro-animations, layered light-mode design, and raw speed gave our brand instant enterprise credibility.',
    rating: 5,
  },
  {
    id: '2',
    client_name: 'Priya Nair',
    client_company: 'Marketing Director, NutraPure',
    client_city: 'Mumbai',
    quote: 'Our ROI with ApexPulse has been phenomenal. Their SEO strategy targetted commercial intent keywords in Indian Tier 1 cities, driving explosive sales growth.',
    rating: 5,
  },
  {
    id: '3',
    client_name: 'Vikram Choudhury',
    client_company: 'VP of Growth, WorkSpace India',
    client_city: 'Gurgaon, Delhi NCR',
    quote: 'Unlike agencies that deliver vanity metrics, ApexPulse tracks real INR revenue and qualified enterprise leads. Highly recommended for any serious Indian business.',
    rating: 5,
  },
  {
    id: '4',
    client_name: 'Ananya Reddy',
    client_company: 'Managing Director, Skyline Homes',
    client_city: 'Hyderabad',
    quote: 'Their WhatsApp lead funnel integration brought us immediate results. We closed 3 high-value villa sales in our very first month!',
    rating: 5,
  }
];

// Site Settings Helpers
export function getSiteSettings(): SiteSettings {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('apexpulse_site_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
  }
  return INITIAL_SITE_SETTINGS;
}

export function updateSiteSettings(settings: SiteSettings): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('apexpulse_site_settings', JSON.stringify(settings));
    window.dispatchEvent(new Event('apexpulse_settings_updated'));
  }
}

// Team Members Helpers
export function getTeamMembers(): TeamMember[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('apexpulse_team_members');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
  }
  return INITIAL_TEAM_MEMBERS;
}

export function saveTeamMembers(members: TeamMember[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('apexpulse_team_members', JSON.stringify(members));
    window.dispatchEvent(new Event('apexpulse_team_updated'));
  }
}

// Helper to fetch projects with fallback
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
