-- Schema for Ostrune Platform
-- Database: Supabase PostgreSQL (Phase 12 International-First Shift)

-- 1. Portfolio Projects Table
create table if not exists portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  client_name text,
  client_location text, -- Formerly client_city (e.g. "Austin, USA")
  service_type text not null check (service_type in ('web_dev', 'app_dev', 'seo', 'website_upgrade', 'local_business', 'meta_ads', 'ugc_ads', 'sales_growth')),
  short_description text,
  full_description text,
  cover_image_url text,
  gallery_urls text[],
  results text,
  testimonial text,
  live_url text,
  is_featured boolean default false,
  tech_stack text[],
  before_metric text,
  after_metric text,
  deliverables text[],
  project_duration text,
  challenge_description text,
  solution_description text,
  created_at timestamp with time zone default now()
);

-- Migration columns for existing portfolio_projects table
alter table if exists portfolio_projects
  add column if not exists tech_stack text[],
  add column if not exists before_metric text,
  add column if not exists after_metric text,
  add column if not exists deliverables text[],
  add column if not exists project_duration text,
  add column if not exists challenge_description text,
  add column if not exists solution_description text;

-- 2. Leads Table
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  country text, -- Formerly city
  service_interested text,
  budget_range text, -- USD ranges e.g. "$1,000–$3,000"
  message text,
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamp with time zone default now()
);

-- 3. Testimonials Table
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text,
  client_company text,
  client_location text, -- Formerly client_city
  quote text,
  rating int default 5 check (rating >= 1 and rating <= 5),
  created_at timestamp with time zone default now()
);

-- 4. Site Settings Table
create table if not exists site_settings (
  id text primary key default 'global',
  phone text not null default '+91 8637474067',
  whatsapp_number text not null default '918637474067',
  email text not null default 'arulraj8637@gmail.com',
  address text not null default 'Tiruvannamalai, Tamil Nadu, India',
  linkedin_url text default 'https://linkedin.com/company/ostrune',
  twitter_url text default 'https://twitter.com/ostrune',
  instagram_url text default 'https://instagram.com/ostrune',
  brand_name text default 'Ostrune',
  trust_logos_text text,
  stat_counters_text text,
  hero_feed_title text,
  hero_feed_subtitle text,
  hero_feed_badge text,
  created_at timestamp with time zone default now()
);

-- 5. Team Members Table (Meet the Growth Architects)
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  location text,
  badge text,
  bio text,
  profile_image_url text,
  created_at timestamp with time zone default now()
);

-- 6. Blog Posts Table (Phase 11 & Phase 12 SEO Keywords)
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  category text check (category in ('seo', 'web_dev', 'app_dev', 'website_upgrade', 'local_business', 'meta_ads', 'ugc_ads', 'sales_growth', 'general')),
  target_keyword text,
  secondary_keywords text,
  city text,
  author_name text default 'Ostrune Team',
  is_published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

alter table blog_posts add column if not exists secondary_keywords text;

-- Insert Default Site Settings Row
insert into site_settings (id, phone, whatsapp_number, email, address, linkedin_url, twitter_url, instagram_url)
values (
  'global',
  '+91 8637474067',
  '918637474067',
  'arulraj8637@gmail.com',
  'Tiruvannamalai, Tamil Nadu, India',
  'https://linkedin.com/company/ostrune',
  'https://twitter.com/ostrune',
  'https://instagram.com/ostrune'
)
on conflict (id) do nothing;

-- 7. Exchange Rates Table (Phase 14)
create table if not exists exchange_rates (
  id uuid primary key default gen_random_uuid(),
  base_currency text default 'USD',
  target_currency text not null unique,
  rate numeric not null,
  updated_at timestamp with time zone default now()
);

-- RLS Security Policies
alter table portfolio_projects enable row level security;
alter table leads enable row level security;
alter table testimonials enable row level security;
alter table site_settings enable row level security;
alter table team_members enable row level security;
alter table blog_posts enable row level security;
alter table exchange_rates enable row level security;

-- Public READ access
create policy "Allow public read on portfolio_projects" on portfolio_projects for select using (true);
create policy "Allow public read on testimonials" on testimonials for select using (true);
create policy "Allow public read on site_settings" on site_settings for select using (true);
create policy "Allow public read on team_members" on team_members for select using (true);
create policy "Allow public read on exchange_rates" on exchange_rates for select using (true);

-- Public SELECT only where is_published = true for blog_posts
create policy "Allow public read on published blog_posts" on blog_posts for select using (is_published = true);

-- Public INSERT on leads
create policy "Allow public insert on leads" on leads for insert with check (true);

-- Full CRUD for authenticated admin users
create policy "Allow full access for authenticated admin on portfolio" on portfolio_projects for all using (auth.role() = 'authenticated');
create policy "Allow full access for authenticated admin on leads" on leads for all using (auth.role() = 'authenticated');
create policy "Allow full access for authenticated admin on testimonials" on testimonials for all using (auth.role() = 'authenticated');
create policy "Allow full access for authenticated admin on site_settings" on site_settings for all using (auth.role() = 'authenticated');
create policy "Allow full access for authenticated admin on team_members" on team_members for all using (auth.role() = 'authenticated');
create policy "Allow full access for authenticated admin on blog_posts" on blog_posts for all using (auth.role() = 'authenticated');

-- Storage Bucket Setup & Policies
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

-- Public read access (anyone can view images)
create policy "Public read access on portfolio-images"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

-- Upload access: authenticated admin users
-- NOTE: If using the /api/upload route with service_role key, this policy is bypassed.
create policy "Admin upload access on portfolio-images"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-images' and auth.role() = 'authenticated');

-- Delete access: authenticated admin users only
create policy "Admin delete access on portfolio-images"
  on storage.objects for delete
  using (bucket_id = 'portfolio-images' and auth.role() = 'authenticated');

