import { PortfolioProject, Testimonial, Lead, SiteSettings, TeamMember, BlogPost, StudentFeedbackVideo, StudentProject, SiteStat, ActivityFeedItem, ClientLogo } from '@/types';
import { createClient, isSupabaseConfigured } from './client';

type PortfolioProjectRow = PortfolioProject & { client_city?: string };
type TestimonialRow = Testimonial & { client_city?: string };
type LeadRow = Lead & { city?: string };
type BlogPostPayload = Record<string, unknown>;

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  phone: '+91 8637474067',
  whatsapp_number: '918637474067',
  email: 'arulraj8637@gmail.com',
  address: 'Tiruvannamalai, Tamil Nadu, India',
  linkedin_url: 'https://linkedin.com/company/ostrune',
  twitter_url: 'https://x.com/ostrune',
  instagram_url: 'https://instagram.com/ostrune',
  brand_name: 'Ostrune',
  trust_logos_text: '',
  stat_counters_text: '',
  hero_feed_title: '',
  hero_feed_subtitle: '',
  hero_feed_badge: '',
};

export const INITIAL_SITE_STATS: SiteStat[] = [];
export const INITIAL_ACTIVITY_FEED: ActivityFeedItem[] = [];

export const INITIAL_CLIENT_LOGOS: ClientLogo[] = [
  {
    id: 'logo-1',
    name: 'VizhiTn',
    category: 'Civic News Platform',
    link_url: 'https://vizhitn.in',
    logo_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: 'logo-2',
    name: 'Yourchoiceproperties',
    category: 'Real Estate Portal',
    link_url: 'https://yourchoiceproperties.in',
    logo_url: '',
    created_at: new Date().toISOString(),
  },
];

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
    title: 'Civic News & Public Interest Web Portal',
    slug: 'vizhitn-civic-news-portal',
    client_name: 'VizhiTn',
    client_location: 'Tamil Nadu, India',
    client_city: '',
    service_type: 'web_dev',
    short_description: 'Engineered a lightweight civic-news publishing platform optimized for high concurrent traffic and instant page rendering.',
    full_description: 'VizhiTn is a regional civic-news platform delivering public-interest explainers and local news updates. We re-architected their web portal using modern server-side rendering, sub-second edge distribution, responsive UI components, and accessible typography.',
    challenge_description: 'VizhiTn needed a reliable news publishing engine capable of serving regional civic-news updates rapidly without server crashes or slow page load times.',
    solution_description: 'Architected a high-performance publishing platform with streamlined content delivery, server-side caching, structured data schemas, and clean reader-focused typography.',
    before_metric: 'Slow load speed • Legacy CMS bloat • High bounce rate',
    after_metric: '0.7s Load Speed • 99/100 Core Web Vitals • Instant Page Rendering',
    project_duration: '10 Days',
    tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel CDN'],
    deliverables: [
      'Sub-Second Next.js News Web Portal Engine',
      'High-Speed Content Distribution & Edge Caching',
      'Structured Technical SEO & Breadcrumb Schemas',
      'Responsive Mobile-First Typography System',
    ],
    cover_image_url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80'
    ],
    results: '0.7s Load Speed | 99/100 Core Web Vitals | Reliable Civic News Delivery',
    testimonial: 'Ostrune delivered an exceptionally fast and responsive news web portal for our platform.',
    live_url: 'https://vizhitn.in',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Real Estate Property Listing & Booking Engine',
    slug: 'yourchoiceproperties-real-estate-portal',
    client_name: 'Yourchoiceproperties',
    client_location: 'India',
    client_city: '',
    service_type: 'local_business',
    short_description: 'Digital property showcase and automated consultation booking funnel for real estate listings.',
    full_description: 'Built a full-featured real estate showcase web portal for Yourchoiceproperties, enabling clients to browse listings and schedule property tours seamlessly.',
    challenge_description: 'Yourchoiceproperties relied on manual phone calls and unoptimized property listing pages that suffered from low inquiry conversion rates.',
    solution_description: 'Developed a modern property catalog web app with automated inquiry capture, responsive property search filters, and high-speed image delivery.',
    before_metric: 'Manual phone inquiries • Unoptimized property galleries • High drop-off',
    after_metric: 'Automated Lead Capture • Sub-Second Property Galleries • Verified Inquiry Surge',
    project_duration: '12 Days',
    tech_stack: ['React', 'Next.js', 'Tailwind CSS', 'Supabase DB', 'Local SEO'],
    deliverables: [
      'Property Catalog & Filterable Listing Engine',
      'Automated Online Inquiry & Booking Workflow',
      'Sub-Second Property Gallery Optimization',
      'Local Map & Google Business Profile Integration',
    ],
    cover_image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    results: 'Automated Lead Capture | Sub-Second Property Galleries | Verified Growth',
    testimonial: 'Our online property inquiries increased immediately after launching the new platform built by Ostrune.',
    live_url: 'https://yourchoiceproperties.in',
    is_featured: true,
    created_at: new Date().toISOString(),
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [];

export const INITIAL_BLOG_POSTS: BlogPost[] = [];

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

export function getPortfolioProjectsSync(): PortfolioProject[] {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem('ostrune_portfolio_projects');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
  }
  return INITIAL_PORTFOLIO;
}

// Helper to fetch portfolio projects
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  let localCache: PortfolioProject[] = getPortfolioProjectsSync();

  if (!isSupabaseConfigured()) return localCache;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return localCache;
    }

    // Ensure fallback mapping for client_location
    const fresh = (data as PortfolioProjectRow[]).map((p) => ({
      ...p,
      client_location: p.client_location || p.client_city || 'Global',
    })) as PortfolioProject[];

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ostrune_portfolio_projects', JSON.stringify(fresh));
      } catch {}
    }

    return fresh;
  } catch {
    return localCache;
  }
}

// Helper to fetch single project by slug
export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  if (!slug) return null;

  // 1. Try local cache first on client
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem('ostrune_portfolio_projects');
      if (cached) {
        const parsed: PortfolioProject[] = JSON.parse(cached);
        const found = parsed.find((p) => p.slug === slug);
        if (found) return found;
      }
    } catch {}
  }

  if (!isSupabaseConfigured()) {
    return INITIAL_PORTFOLIO.find((p) => p.slug === slug) || null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!error && data) {
      const p = data as PortfolioProjectRow;
      const project = {
        ...p,
        client_location: p.client_location || p.client_city || 'Global',
      } as PortfolioProject;

      // Cache locally
      if (typeof window !== 'undefined') {
        try {
          const cached = localStorage.getItem('ostrune_portfolio_projects');
          let list: PortfolioProject[] = cached ? JSON.parse(cached) : [];
          const idx = list.findIndex((item) => item.slug === slug);
          if (idx >= 0) list[idx] = project;
          else list.unshift(project);
          localStorage.setItem('ostrune_portfolio_projects', JSON.stringify(list));
        } catch {}
      }

      return project;
    }
  } catch (e) {
    console.error('Error fetching project by slug from Supabase:', e);
  }

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

    return (data as TestimonialRow[]).map((t) => ({
      ...t,
      client_location: t.client_location || t.client_city || 'Global',
    })) as Testimonial[];
  } catch {
    return INITIAL_TESTIMONIALS;
  }
}

// Helper to fetch blog posts (all for admin, published only for public)
export async function getBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
  let localPosts: BlogPost[] = INITIAL_BLOG_POSTS;
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem('ostrune_blog_posts');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localPosts = parsed;
        }
      }
    } catch (e) {
      console.warn('localStorage blog read error:', e);
    }
  }

  if (!isSupabaseConfigured()) {
    return publishedOnly ? localPosts.filter((p) => p.is_published) : localPosts;
  }

  let dbPosts: BlogPost[] = [];
  try {
    const supabase = createClient();
    let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });

    if (publishedOnly) {
      query = query.eq('is_published', true);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      dbPosts = data as BlogPost[];
    }
  } catch (err) {
    console.warn('Supabase fetch blog_posts error:', err);
  }

  // Merge dbPosts and localPosts seamlessly by slug/id (dbPosts take precedence)
  const map = new Map<string, BlogPost>();
  for (const post of localPosts) {
    const key = post.slug || post.id;
    if (key) map.set(key, post);
  }
  for (const post of dbPosts) {
    const key = post.slug || post.id;
    if (key) map.set(key, post);
  }

  const combined = Array.from(map.values());

  if (typeof window !== 'undefined' && combined.length > 0) {
    try {
      const cacheablePosts = publishedOnly ? combined.filter((p) => p.is_published) : combined;
      localStorage.setItem('ostrune_blog_posts', JSON.stringify(cacheablePosts));
    } catch {}
  }

  return publishedOnly ? combined.filter((p) => p.is_published) : combined;
}

// Helper to fetch single published blog post by slug
export async function getBlogPostBySlug(
  slug: string,
  options: { includeDrafts?: boolean } = {}
): Promise<BlogPost | null> {
  const all = await getBlogPosts(!options.includeDrafts);
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
      return (data as LeadRow[]).map((l) => ({
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

function cacheBlogPostLocal(post: BlogPost, previousSlug?: string): void {
  if (typeof window === 'undefined') return;

  try {
    const cached = localStorage.getItem('ostrune_blog_posts');
    let list: BlogPost[] = cached ? JSON.parse(cached) : INITIAL_BLOG_POSTS;
    const idx = list.findIndex(
      (p) =>
        p.id === post.id ||
        p.slug === post.slug ||
        (previousSlug ? p.slug === previousSlug : false)
    );

    if (idx !== -1) {
      list[idx] = { ...list[idx], ...post };
    } else {
      list = [post, ...list];
    }

    localStorage.setItem('ostrune_blog_posts', JSON.stringify(list));
  } catch (e) {
    console.warn('localStorage blog write warning', e);
  }
}

export async function saveBlogPostToSupabase(post: BlogPost): Promise<BlogPost> {
  cacheBlogPostLocal(post);

  if (!isSupabaseConfigured()) return post;
  try {
    const supabase = createClient();
    const payload: BlogPostPayload = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_image_url: post.cover_image_url,
      cover_image_prompt: post.cover_image_prompt || null,
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

    const savePayload = (nextPayload: BlogPostPayload) =>
      isUUID(post.id)
        ? supabase.from('blog_posts').update(nextPayload).eq('id', post.id).select().single()
        : supabase.from('blog_posts').upsert(nextPayload, { onConflict: 'slug' }).select().single();

    let { data, error } = await savePayload(payload);

    if (error && error.message?.includes('cover_image_prompt')) {
      const legacyPayload = { ...payload };
      delete legacyPayload.cover_image_prompt;
      console.warn('blog_posts.cover_image_prompt is missing in Supabase; saving article without that field.');
      const retry = await savePayload(legacyPayload);
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      throw error;
    }

    if (data) {
      const saved = data as BlogPost;
      cacheBlogPostLocal(saved, post.slug);
      return saved;
    }
  } catch (err) {
    console.error('Error saving blog post to Supabase:', err);
    throw err;
  }
  return post;
}

export async function deleteBlogPostFromSupabase(id: string, slug?: string): Promise<void> {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem('ostrune_blog_posts');
      if (cached) {
        const list: BlogPost[] = JSON.parse(cached);
        const filtered = list.filter((p) => p.id !== id && p.slug !== slug);
        localStorage.setItem('ostrune_blog_posts', JSON.stringify(filtered));
      }
    } catch {}
  }
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    if (slug) {
      await supabase.from('blog_posts').delete().eq('slug', slug);
    } else if (isUUID(id)) {
      await supabase.from('blog_posts').delete().eq('id', id);
    }
  } catch (err) {
    console.error('Error deleting blog post from Supabase:', err);
  }
}

export async function saveProjectToSupabase(project: PortfolioProject): Promise<PortfolioProject> {
  let updatedProject = project;

  // 1. Immediately update local cache and dispatch update event for instant real-time client hydration
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem('ostrune_portfolio_projects');
      let projectsList: PortfolioProject[] = cached ? JSON.parse(cached) : [...INITIAL_PORTFOLIO];
      const existingIdx = projectsList.findIndex((p) => p.id === project.id || p.slug === project.slug);
      if (existingIdx >= 0) {
        projectsList[existingIdx] = { ...projectsList[existingIdx], ...project };
      } else {
        projectsList.unshift(project);
      }
      localStorage.setItem('ostrune_portfolio_projects', JSON.stringify(projectsList));
      window.dispatchEvent(new Event('ostrune_portfolio_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.warn('Error updating local portfolio storage', e);
    }
  }

  if (!isSupabaseConfigured()) return updatedProject;

  try {
    const supabase = createClient();
    const payload: Record<string, unknown> = {
      title: project.title,
      slug: project.slug,
      client_name: project.client_name,
      client_location: project.client_location || project.client_city || 'Global',
      service_type: project.service_type,
      short_description: project.short_description,
      full_description: project.full_description || project.short_description,
      cover_image_url: project.cover_image_url,
      gallery_urls: project.gallery_urls || [project.cover_image_url],
      results: project.results,
      testimonial: project.testimonial || '',
      live_url: project.live_url || '',
      is_featured: project.is_featured || false,
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
      updatedProject = data as PortfolioProject;
      if (typeof window !== 'undefined') {
        try {
          const cached = localStorage.getItem('ostrune_portfolio_projects');
          let projectsList: PortfolioProject[] = cached ? JSON.parse(cached) : [...INITIAL_PORTFOLIO];
          const idx = projectsList.findIndex((p) => p.slug === updatedProject.slug);
          if (idx >= 0) projectsList[idx] = updatedProject;
          else projectsList.unshift(updatedProject);
          localStorage.setItem('ostrune_portfolio_projects', JSON.stringify(projectsList));
          window.dispatchEvent(new Event('ostrune_portfolio_updated'));
          window.dispatchEvent(new Event('storage'));
        } catch {}
      }
    } else if (error) {
      console.error('Supabase error saving project:', error);
    }
  } catch (err) {
    console.error('Error saving project to Supabase:', err);
  }
  return updatedProject;
}

export async function deleteProjectFromSupabase(id: string, slug?: string): Promise<void> {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem('ostrune_portfolio_projects');
      if (cached) {
        let projectsList: PortfolioProject[] = JSON.parse(cached);
        projectsList = projectsList.filter((p) => p.id !== id && p.slug !== slug);
        localStorage.setItem('ostrune_portfolio_projects', JSON.stringify(projectsList));
        window.dispatchEvent(new Event('ostrune_portfolio_updated'));
        window.dispatchEvent(new Event('storage'));
      }
    } catch {}
  }

  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    if (id && isUUID(id)) await supabase.from('portfolio_projects').delete().eq('id', id);
    if (slug) await supabase.from('portfolio_projects').delete().eq('slug', slug);
  } catch (err) {
    console.error('Error deleting project from Supabase:', err);
  }
}

export async function saveTestimonialToSupabase(t: Testimonial): Promise<Testimonial> {
  if (!isSupabaseConfigured()) return t;
  try {
    const supabase = createClient();
    const payload: Record<string, unknown> = {
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

// Site Stats Helpers
export function getSiteStats(): SiteStat[] {
  if (typeof window === 'undefined') return INITIAL_SITE_STATS;
  try {
    const cached = localStorage.getItem('ostrune_site_stats');
    if (cached) return JSON.parse(cached);
  } catch {}
  return INITIAL_SITE_STATS;
}

export function saveSiteStatsLocal(stats: SiteStat[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('ostrune_site_stats', JSON.stringify(stats));
      window.dispatchEvent(new Event('ostrune_stats_updated'));
    } catch {}
  }
}

export async function fetchSiteStatsFromSupabase(): Promise<SiteStat[]> {
  if (!isSupabaseConfigured()) return getSiteStats();
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('site_stats')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data) {
      saveSiteStatsLocal(data as SiteStat[]);
      return data as SiteStat[];
    }
  } catch {}
  return getSiteStats();
}

export async function saveSiteStatToSupabase(stat: SiteStat): Promise<SiteStat> {
  const current = getSiteStats();
  const index = current.findIndex((s) => s.id === stat.id);
  let updatedList: SiteStat[];
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = stat;
  } else {
    updatedList = [...current, stat];
  }
  saveSiteStatsLocal(updatedList);

  if (!isSupabaseConfigured()) return stat;
  try {
    const supabase = createClient();
    const payload: Record<string, unknown> = {
      label: stat.label,
      value: stat.value,
      suffix: stat.suffix || '',
      description: stat.description || '',
      sort_order: stat.sort_order || 0,
      updated_at: new Date().toISOString(),
    };
    if (isUUID(stat.id)) {
      payload.id = stat.id;
    }
    const { data, error } = await supabase.from('site_stats').upsert(payload).select().single();
    if (!error && data) return data as SiteStat;
  } catch (err) {
    console.error('Error saving site stat to Supabase:', err);
  }
  return stat;
}

export async function deleteSiteStatFromSupabase(id: string): Promise<void> {
  const current = getSiteStats();
  const filtered = current.filter((s) => s.id !== id);
  saveSiteStatsLocal(filtered);

  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    await supabase.from('site_stats').delete().eq('id', id);
  } catch (err) {
    console.error('Error deleting site stat from Supabase:', err);
  }
}

// Activity Feed Helpers
export function getActivityFeed(): ActivityFeedItem[] {
  if (typeof window === 'undefined') return INITIAL_ACTIVITY_FEED;
  try {
    const cached = localStorage.getItem('ostrune_activity_feed');
    if (cached) return JSON.parse(cached);
  } catch {}
  return INITIAL_ACTIVITY_FEED;
}

export function saveActivityFeedLocal(items: ActivityFeedItem[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('ostrune_activity_feed', JSON.stringify(items));
      window.dispatchEvent(new Event('ostrune_activity_updated'));
    } catch {}
  }
}

export async function fetchActivityFeedFromSupabase(): Promise<ActivityFeedItem[]> {
  if (!isSupabaseConfigured()) return getActivityFeed();
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('activity_feed')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      saveActivityFeedLocal(data as ActivityFeedItem[]);
      return data as ActivityFeedItem[];
    }
  } catch {}
  return getActivityFeed();
}

export async function saveActivityFeedItemToSupabase(item: ActivityFeedItem): Promise<ActivityFeedItem> {
  const current = getActivityFeed();
  const index = current.findIndex((a) => a.id === item.id);
  let updatedList: ActivityFeedItem[];
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = item;
  } else {
    updatedList = [item, ...current];
  }
  saveActivityFeedLocal(updatedList);

  if (!isSupabaseConfigured()) return item;
  try {
    const supabase = createClient();
    const payload: Record<string, unknown> = {
      text: item.text,
      subtext: item.subtext || '',
      badge: item.badge || 'Just Now',
      is_active: item.is_active ?? true,
    };
    if (isUUID(item.id)) {
      payload.id = item.id;
    }
    const { data, error } = await supabase.from('activity_feed').upsert(payload).select().single();
    if (!error && data) return data as ActivityFeedItem;
  } catch (err) {
    console.error('Error saving activity feed item to Supabase:', err);
  }
  return item;
}

export async function deleteActivityFeedItemFromSupabase(id: string): Promise<void> {
  const current = getActivityFeed();
  const filtered = current.filter((a) => a.id !== id);
  saveActivityFeedLocal(filtered);

  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    await supabase.from('activity_feed').delete().eq('id', id);
  } catch (err) {
    console.error('Error deleting activity feed item from Supabase:', err);
  }
}

// Client Logos Helpers
export function getClientLogos(): ClientLogo[] {
  if (typeof window === 'undefined') return INITIAL_CLIENT_LOGOS;
  try {
    const cached = localStorage.getItem('ostrune_client_logos');
    if (cached) return JSON.parse(cached);
  } catch {}
  return INITIAL_CLIENT_LOGOS;
}

export function saveClientLogosLocal(logos: ClientLogo[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('ostrune_client_logos', JSON.stringify(logos));
      window.dispatchEvent(new Event('ostrune_logos_updated'));
    } catch {}
  }
}

export async function fetchClientLogosFromSupabase(): Promise<ClientLogo[]> {
  if (!isSupabaseConfigured()) return getClientLogos();
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('client_logos')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data && data.length > 0) {
      saveClientLogosLocal(data as ClientLogo[]);
      return data as ClientLogo[];
    }
  } catch {}
  return getClientLogos();
}

export async function saveClientLogoToSupabase(logo: ClientLogo): Promise<ClientLogo> {
  const current = getClientLogos();
  const index = current.findIndex((l) => l.id === logo.id);
  let updatedList: ClientLogo[];
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = logo;
  } else {
    updatedList = [...current, logo];
  }
  saveClientLogosLocal(updatedList);

  if (!isSupabaseConfigured()) return logo;
  try {
    const supabase = createClient();
    const payload: Record<string, unknown> = {
      name: logo.name,
      logo_url: logo.logo_url || '',
      link_url: logo.link_url || '',
      category: logo.category || '',
    };
    if (isUUID(logo.id)) {
      payload.id = logo.id;
    }
    const { data, error } = await supabase.from('client_logos').upsert(payload).select().single();
    if (!error && data) return data as ClientLogo;
  } catch (err) {
    console.error('Error saving client logo to Supabase:', err);
  }
  return logo;
}

export async function deleteClientLogoFromSupabase(id: string): Promise<void> {
  const current = getClientLogos();
  const filtered = current.filter((l) => l.id !== id);
  saveClientLogosLocal(filtered);

  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    await supabase.from('client_logos').delete().eq('id', id);
  } catch (err) {
    console.error('Error deleting client logo from Supabase:', err);
  }
}
