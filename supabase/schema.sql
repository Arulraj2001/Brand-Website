-- Schema for ApexPulse Digital Agency Platform
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
  created_at timestamp with time zone default now()
);

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
  phone text not null default '+1 (800) 555-0199',
  whatsapp_number text not null default '18005550199',
  email text not null default 'hello@apexpulse.in',
  address text not null default 'Global Remote HQ • Austin, TX & International Hubs',
  linkedin_url text default 'https://linkedin.com/company/apexpulse-india',
  twitter_url text default 'https://twitter.com/apexpulse_in',
  instagram_url text default 'https://instagram.com/apexpulse.in',
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
  city text,
  author_name text default 'ApexPulse Team',
  is_published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Insert Default Site Settings Row
insert into site_settings (id, phone, whatsapp_number, email, address, linkedin_url, twitter_url, instagram_url)
values (
  'global',
  '+1 (800) 555-0199',
  '18005550199',
  'hello@apexpulse.in',
  'Global Remote HQ • Austin, TX & International Hubs',
  'https://linkedin.com/company/apexpulse-india',
  'https://twitter.com/apexpulse_in',
  'https://instagram.com/apexpulse.in'
)
on conflict (id) do nothing;

-- RLS Security Policies
alter table portfolio_projects enable row level security;
alter table leads enable row level security;
alter table testimonials enable row level security;
alter table site_settings enable row level security;
alter table team_members enable row level security;
alter table blog_posts enable row level security;

-- Public READ access
create policy "Allow public read on portfolio_projects" on portfolio_projects for select using (true);
create policy "Allow public read on testimonials" on testimonials for select using (true);
create policy "Allow public read on site_settings" on site_settings for select using (true);
create policy "Allow public read on team_members" on team_members for select using (true);

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

create policy "Public read access on portfolio-images"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

create policy "Admin upload access on portfolio-images"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-images' and auth.role() = 'authenticated');
