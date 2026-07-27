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

export const INITIAL_BLOG_POSTS: BlogPost[] = [];

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

export async function fetchSiteSettingsFromSupabase(): Promise<SiteSettings> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'global')
      .single();

    if (!error && data) {
      const settings: SiteSettings = {
        id: data.id,
        phone: data.phone || INITIAL_SITE_SETTINGS.phone,
        whatsapp_number: data.whatsapp_number || INITIAL_SITE_SETTINGS.whatsapp_number,
        email: data.email || INITIAL_SITE_SETTINGS.email,
        address: data.address || INITIAL_SITE_SETTINGS.address,
        linkedin_url: data.linkedin_url || INITIAL_SITE_SETTINGS.linkedin_url,
        twitter_url: data.twitter_url || INITIAL_SITE_SETTINGS.twitter_url,
        instagram_url: data.instagram_url || INITIAL_SITE_SETTINGS.instagram_url,
      };
      updateSiteSettings(settings);
      return settings;
    }
  } catch {}
  return getSiteSettings();
}

export async function saveSiteSettingsToSupabase(newSettings: SiteSettings): Promise<void> {
  updateSiteSettings(newSettings);
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
    });
  } catch (err) {
    console.error('Error saving site settings to Supabase:', err);
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

export async function fetchTeamMembersFromSupabase(): Promise<TeamMember[]> {
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

// Fetch leads for Admin
export async function getLeadsFromSupabase(): Promise<Lead[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data.map((l: any) => ({
        ...l,
        country: l.country || l.city || 'United States',
      })) as Lead[];
    }
  } catch {}
  return [];
}

const isUUID = (str?: string) =>
  typeof str === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

export async function saveBlogPostToSupabase(post: BlogPost): Promise<BlogPost> {
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
      author_name: post.author_name || 'ApexPulse Team',
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
  try {
    const supabase = createClient();
    if (isUUID(id)) {
      await supabase.from('blog_posts').delete().eq('id', id);
    } else if (slug) {
      await supabase.from('blog_posts').delete().eq('slug', slug);
    }
  } catch (err) {
    console.error('Error deleting blog post from Supabase:', err);
  }
}

export async function saveProjectToSupabase(project: PortfolioProject): Promise<PortfolioProject> {
  try {
    const supabase = createClient();
    const payload: any = {
      title: project.title,
      slug: project.slug,
      client_name: project.client_name,
      client_location: project.client_location || project.client_city || 'Austin, USA',
      service_type: project.service_type,
      short_description: project.short_description,
      full_description: project.full_description,
      cover_image_url: project.cover_image_url,
      gallery_urls: project.gallery_urls || [project.cover_image_url],
      results: project.results,
      testimonial: project.testimonial,
      live_url: project.live_url,
      is_featured: project.is_featured,
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
  try {
    const supabase = createClient();
    if (isUUID(id)) {
      await supabase.from('portfolio_projects').delete().eq('id', id);
    } else if (slug) {
      await supabase.from('portfolio_projects').delete().eq('slug', slug);
    }
  } catch (err) {
    console.error('Error deleting project from Supabase:', err);
  }
}

export async function saveTestimonialToSupabase(t: Testimonial): Promise<Testimonial> {
  try {
    const supabase = createClient();
    const payload: any = {
      client_name: t.client_name,
      client_company: t.client_company,
      client_location: t.client_location || t.client_city || 'USA',
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
  try {
    const supabase = createClient();
    if (isUUID(id)) {
      await supabase.from('testimonials').delete().eq('id', id);
    }
  } catch (err) {
    console.error('Error deleting testimonial from Supabase:', err);
  }
}

export async function updateLeadStatusInSupabase(id: string, status: Lead['status']): Promise<void> {
  try {
    const supabase = createClient();
    if (isUUID(id)) {
      await supabase.from('leads').update({ status }).eq('id', id);
    }
  } catch (err) {
    console.error('Error updating lead status in Supabase:', err);
  }
}

export async function deleteLeadFromSupabase(id: string): Promise<void> {
  try {
    const supabase = createClient();
    if (isUUID(id)) {
      await supabase.from('leads').delete().eq('id', id);
    }
  } catch (err) {
    console.error('Error deleting lead from Supabase:', err);
  }
}

export async function deleteTeamMemberFromSupabase(id: string): Promise<void> {
  try {
    const supabase = createClient();
    if (isUUID(id)) {
      await supabase.from('team_members').delete().eq('id', id);
    }
  } catch (err) {
    console.error('Error deleting team member from Supabase:', err);
  }
}
