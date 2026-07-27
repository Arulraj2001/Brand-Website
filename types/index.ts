export type ServiceType = 'web_dev' | 'seo' | 'meta_ads' | 'lead_gen';

export type BlogCategory = 'seo' | 'web_dev' | 'meta_ads' | 'lead_gen' | 'general';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category: BlogCategory;
  target_keyword?: string;
  city?: string;
  author_name: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  client_city: string;
  service_type: ServiceType;
  short_description: string;
  full_description: string;
  cover_image_url: string;
  gallery_urls: string[];
  results: string;
  testimonial?: string;
  live_url?: string;
  is_featured: boolean;
  created_at: string;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  service_interested: string;
  budget_range: string;
  message: string;
  status?: 'new' | 'contacted' | 'qualified' | 'closed';
  created_at?: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_company: string;
  client_city: string;
  quote: string;
  rating: number;
  created_at?: string;
}

export interface SiteSettings {
  id?: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
  linkedin_url: string;
  twitter_url: string;
  instagram_url: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  badge: string;
  bio: string;
  profile_image_url?: string;
  created_at?: string;
}

export interface ServiceDetail {
  id: ServiceType;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
  icon: string;
}
