export type ServiceType =
  | 'web_dev'
  | 'app_dev'
  | 'seo'
  | 'website_upgrade'
  | 'local_business'
  | 'meta_ads'
  | 'ugc_ads'
  | 'sales_growth';

export type BlogCategory =
  | 'seo'
  | 'web_dev'
  | 'app_dev'
  | 'website_upgrade'
  | 'local_business'
  | 'meta_ads'
  | 'ugc_ads'
  | 'sales_growth'
  | 'general';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  cover_image_prompt?: string;
  category: BlogCategory;
  target_keyword?: string;
  secondary_keywords?: string[] | string;
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
  client_location: string; // Location format e.g. "Global"
  client_city?: string; // Legacy fallback alias
  service_type: ServiceType;
  short_description: string;
  full_description: string;
  cover_image_url: string;
  gallery_urls: string[];
  results: string;
  testimonial?: string;
  live_url?: string;
  is_featured: boolean;
  tech_stack?: string[];
  before_metric?: string;
  after_metric?: string;
  deliverables?: string[];
  project_duration?: string;
  challenge_description?: string;
  solution_description?: string;
  created_at: string;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  country: string; // Renamed from city for international reach
  city?: string; // Legacy fallback
  service_interested: string;
  budget_range?: string; // USD ranges e.g. "$1,000–$3,000"
  message: string;
  status?: 'new' | 'contacted' | 'qualified' | 'closed';
  created_at?: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_company: string;
  client_location: string; // Location format e.g. "Global"
  client_city?: string; // Legacy fallback
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
  brand_name: string;
  trust_logos_text: string;
  stat_counters_text: string;
  hero_feed_title: string;
  hero_feed_subtitle: string;
  hero_feed_badge: string;
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

export type StudentProjectCategory =
  | 'web_dev'
  | 'machine_learning'
  | 'deep_learning'
  | 'custom_domain'
  | 'full_stack';

export interface StudentFeedbackVideo {
  id: string;
  student_name: string;
  degree_branch: string; // e.g. "MCA", "BCA", "B.Sc CS", "M.Sc CS", "B.Tech CS"
  project_title: string;
  project_category: StudentProjectCategory;
  video_url: string; // YouTube video, YouTube Shorts, MP4 URL, or Vimeo
  thumbnail_url?: string;
  rating: number; // e.g. 5
  quote: string;
  is_featured: boolean;
  created_at?: string;
}

export interface StudentProject {
  id: string;
  title: string;
  category: StudentProjectCategory;
  degree: string; // e.g. "BCA / MCA"
  description: string;
  tech_stack: string[];
  has_documentation: boolean;
  has_presentation: boolean;
  has_certificate: boolean;
  has_custom_domain: boolean;
  demo_url?: string;
  image_url: string;
  created_at?: string;
}

