# ApexPulse Digital Agency Platform

A high-performance agency website & administrative platform built with Next.js 14 App Router, Supabase, Tailwind CSS, and Framer Motion.

---

## Quick Start (Local Setup)

1. **Start Development Server**:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

---

## How to Access the Admin Dashboard Locally

1. **Navigate to the Login Page**:
   Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) in your browser (or click **"Admin Portal"** at the bottom of the footer).

2. **Sign In Credentials**:
   - **Local / Offline Demo Mode**:
     Enter any email (e.g., `admin@apexpulse.in`) and any password (e.g., `admin123`), then click **"Sign In to Admin Dashboard"**. The system detects local preview mode and signs you into the dashboard instantly.
   - **Supabase Auth Mode**:
     If your Supabase project is linked via `.env.local` (`NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`), log in with your registered admin email and password.

3. **Admin Dashboard Features (`http://localhost:3000/admin`)**:
   - **Overview Tab**: Live analytics (Total Leads, New This Week, Portfolio Count, Won Deals, and status breakdown).
   - **Portfolio Manager**: Search/filter projects, click **"+ Add New Project"**, edit details, toggle `is_featured`, or delete projects with confirmation modals and toast alerts.
   - **Leads Queue**: View leads sorted newest-first, update status inline (`New` / `Contacted` / `Won`), and trigger instant WhatsApp links.
   - **Testimonials Manager**: Manage client reviews and 1-5 star ratings with full CRUD functionality.
   - **Sign Out**: Click **"Sign Out"** at the bottom of the sidebar to terminate your session and return to `/admin/login`.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router & Server Components)
- **Database & Auth**: Supabase PostgreSQL + Supabase Auth (`@supabase/ssr`)
- **Styling & Design System**: Tailwind CSS v4 (Hugging Face-inspired palette: `#FFD21E` Brand Yellow, `#FF9D00` Primary Orange, `#3B82F6` Accent Blue)
- **Typography**: Source Sans 3 (UI text) & Source Code Pro (Monospace / Stats)
- **Form Validation**: React Hook Form + Zod (Strict USD $ budget ranges & international country validation)
- **Animations**: Framer Motion
