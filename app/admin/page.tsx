'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  LogOut,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  ShieldCheck,
  Star,
  ExternalLink,
  ChevronRight,
  Filter,
  UserCheck,
  Settings as SettingsIcon,
  Phone,
  Mail,
  MapPin,
  Globe,
  User,
  Link2,
  Send,
} from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { TableSkeleton, Skeleton } from '@/components/admin/Skeleton';
import { PortfolioProject, Testimonial, Lead, ServiceType, SiteSettings, TeamMember } from '@/types';
import { getPortfolioProjects, getTestimonials } from '@/lib/supabase/data';
import { useSiteSettings, useTeamMembers } from '@/lib/useSiteData';
import { createClient } from '@/lib/supabase/client';

const INITIAL_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'Vikram Choudhury',
    email: 'vikram@workspace.in',
    phone: '+91 98765 43210',
    city: 'Bengaluru',
    service_interested: 'Web Development',
    budget_range: '₹50K–1L',
    message: 'Looking for custom website & mobile app development for our retail chain.',
    status: 'new',
    created_at: new Date().toISOString(),
  },
  {
    id: 'l2',
    name: 'Priya Sharma',
    email: 'priya@cleanenergy.in',
    phone: '+91 98220 11223',
    city: 'Pune',
    service_interested: 'Web Development',
    budget_range: '₹1L+',
    message: 'Need a web portal rebuild for our clean energy SaaS platform.',
    status: 'contacted',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'l3',
    name: 'Anil Kulkarni',
    email: 'anil@organicfarms.in',
    phone: '+91 99001 77889',
    city: 'Bengaluru',
    service_interested: 'SEO Dominance',
    budget_range: '₹25K–50K',
    message: 'Want to rank top 3 in organic search for D2C organic groceries in South India.',
    status: 'closed', // Won
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'l4',
    name: 'Rajiv Malhotra',
    email: 'rajiv@malhotragroup.in',
    phone: '+91 98110 33445',
    city: 'Mumbai',
    service_interested: 'Lead Generation',
    budget_range: '₹50K–1L',
    message: 'Require automated WhatsApp lead qualification funnel for luxury housing.',
    status: 'new',
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'leads' | 'testimonials' | 'team' | 'settings'>('overview');
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [userEmail, setUserEmail] = useState<string>('admin@apexpulse.in');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Site Settings & Team Custom Hooks
  const { settings, saveSettings } = useSiteSettings();
  const { teamMembers, saveTeam } = useTeamMembers();

  // Settings Local Form State
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  // Search & Filter States
  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [portfolioFilter, setPortfolioFilter] = useState('all');

  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');

  // Modal States
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<PortfolioProject | null>(null);

  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deleteConfirmTestimonial, setDeleteConfirmTestimonial] = useState<Testimonial | null>(null);

  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [deleteConfirmTeamMember, setDeleteConfirmTeamMember] = useState<TeamMember | null>(null);

  const router = useRouter();

  // Toast Helper
  const addToast = (type: 'success' | 'error', text: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Initial Data Loading
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projData, testData] = await Promise.all([
          getPortfolioProjects(),
          getTestimonials(),
        ]);
        setProjects(projData);
        setTestimonials(testData);

        // Get user session if Supabase Auth is enabled
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        if (data?.user?.email) {
          setUserEmail(data.user.email);
        }
      } catch (err) {
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {}
    addToast('success', 'Signed out successfully');
    router.push('/admin/login');
    router.refresh();
  };

  // Portfolio Save Handler
  const handleSaveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const slug = (formData.get('slug') as string) || title.toLowerCase().replace(/ /g, '-');
    const client_name = formData.get('client_name') as string;
    const client_city = formData.get('client_city') as string;
    const service_type = formData.get('service_type') as ServiceType;
    const short_description = formData.get('short_description') as string;
    const full_description = formData.get('full_description') as string;
    const cover_image_url = formData.get('cover_image_url') as string || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
    const results = formData.get('results') as string;
    const testimonial = formData.get('testimonial') as string;
    const live_url = formData.get('live_url') as string;
    const is_featured = formData.get('is_featured') === 'on';

    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id
            ? {
                ...p,
                title,
                slug,
                client_name,
                client_city,
                service_type,
                short_description,
                full_description,
                cover_image_url,
                results,
                testimonial,
                live_url,
                is_featured,
              }
            : p
        )
      );
      addToast('success', `Project "${title}" updated successfully`);
    } else {
      const newProj: PortfolioProject = {
        id: Math.random().toString(36).substring(2, 9),
        title,
        slug,
        client_name,
        client_city,
        service_type,
        short_description,
        full_description,
        cover_image_url,
        gallery_urls: [cover_image_url],
        results,
        testimonial,
        live_url,
        is_featured,
        created_at: new Date().toISOString(),
      };
      setProjects((prev) => [newProj, ...prev]);
      addToast('success', `Project "${title}" created successfully`);
    }

    setProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    addToast('success', 'Project deleted');
    setDeleteConfirmProject(null);
  };

  // Testimonial Save Handler
  const handleSaveTestimonial = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const client_name = formData.get('client_name') as string;
    const client_company = formData.get('client_company') as string;
    const client_city = formData.get('client_city') as string;
    const quote = formData.get('quote') as string;
    const rating = parseInt(formData.get('rating') as string) || 5;

    if (editingTestimonial) {
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === editingTestimonial.id
            ? { ...t, client_name, client_company, client_city, quote, rating }
            : t
        )
      );
      addToast('success', `Testimonial from "${client_name}" updated`);
    } else {
      const newTest: Testimonial = {
        id: Math.random().toString(36).substring(2, 9),
        client_name,
        client_company,
        client_city,
        quote,
        rating,
        created_at: new Date().toISOString(),
      };
      setTestimonials((prev) => [newTest, ...prev]);
      addToast('success', `Testimonial from "${client_name}" added`);
    }

    setTestimonialModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    addToast('success', 'Testimonial deleted');
    setDeleteConfirmTestimonial(null);
  };

  // Team Architect Save Handler
  const handleSaveTeamMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const location = formData.get('location') as string;
    const badge = formData.get('badge') as string;
    const bio = formData.get('bio') as string;
    const profile_image_url = formData.get('profile_image_url') as string;

    if (editingTeamMember) {
      const updated = teamMembers.map((m) =>
        m.id === editingTeamMember.id
          ? { ...m, name, role, location, badge, bio, profile_image_url }
          : m
      );
      saveTeam(updated);
      addToast('success', `Team profile "${name}" updated successfully`);
    } else {
      const newMember: TeamMember = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        role,
        location,
        badge,
        bio,
        profile_image_url,
        created_at: new Date().toISOString(),
      };
      saveTeam([...teamMembers, newMember]);
      addToast('success', `Team profile "${name}" added successfully`);
    }

    setTeamModalOpen(false);
    setEditingTeamMember(null);
  };

  const handleDeleteTeamMember = (id: string) => {
    const updated = teamMembers.filter((m) => m.id !== id);
    saveTeam(updated);
    addToast('success', 'Team member profile deleted');
    setDeleteConfirmTeamMember(null);
  };

  // Site Settings Save Handler
  const handleSaveSiteSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveSettings(settingsForm);
    addToast('success', 'Global contact settings & social links updated across all pages');
  };

  // Lead Status Update Handler
  const handleLeadStatusChange = (id: string, newStatus: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    addToast('success', `Lead status updated to ${newStatus?.toUpperCase()}`);
  };

  // Filtered Lists
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      p.client_name.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      p.client_city.toLowerCase().includes(portfolioSearch.toLowerCase());

    if (portfolioFilter === 'featured') return matchesSearch && p.is_featured;
    if (portfolioFilter !== 'all') return matchesSearch && p.service_type === portfolioFilter;
    return matchesSearch;
  });

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.city.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.includes(leadSearch);

    if (leadStatusFilter === 'closed') return matchesSearch && l.status === 'closed';
    if (leadStatusFilter !== 'all') return matchesSearch && l.status === leadStatusFilter;
    return matchesSearch;
  });

  // Overview Counts
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const contactedLeadsCount = leads.filter((l) => l.status === 'contacted').length;
  const qualifiedLeadsCount = leads.filter((l) => l.status === 'qualified').length;
  const wonLeadsCount = leads.filter((l) => l.status === 'closed').length;

  const NAV_ITEMS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'leads', label: 'Leads Queue', icon: Users },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'team', label: 'Team Architects', icon: UserCheck },
    { id: 'settings', label: 'Site Settings', icon: SettingsIcon },
  ];

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="pt-[56px] min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row text-[#1C1C1C]">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* 220px LIGHT SURFACE SIDEBAR */}
      <aside className="w-full md:w-[220px] bg-[#F9FAFB] border-r border-[#E5E7EB] p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-2 px-1 py-1">
            <div className="w-8 h-8 rounded-lg bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center font-bold border border-[#E5E7EB]">
              <Sparkles size={16} />
            </div>
            <div>
              <span className="font-extrabold text-base text-[#1C1C1C] tracking-tight block">
                Apex<span className="text-[#FF9D00]">Pulse</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((nav) => {
              const Icon = nav.icon;
              const isActive = activeTab === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => setActiveTab(nav.id as any)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-xs ${
                    isActive
                      ? 'bg-[#FF9D00] text-white font-bold shadow-xs'
                      : 'text-[#6B7280] hover:text-[#1C1C1C] hover:bg-white border border-transparent hover:border-[#E5E7EB]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{nav.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info & Logout */}
        <div className="pt-3 border-t border-[#E5E7EB] space-y-2">
          <div className="text-[11px]">
            <p className="text-[#6B7280]">Logged in as:</p>
            <p className="font-bold text-[#1C1C1C] truncate">{userEmail}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#EF4444] bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/20 transition-colors"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT AREA */}
      <main className="flex-1 p-5 sm:p-6 space-y-5 bg-white overflow-x-hidden">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-[#1C1C1C]">
                  System <GradientText>Overview & Metrics</GradientText>
                </h1>
                <p className="text-xs text-[#6B7280]">
                  High-level performance snapshot for India regional leads and projects
                </p>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </div>
            ) : (
              /* Stat Cards Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-white border border-[#E5E7EB]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#6B7280] mb-1">
                    <span>TOTAL LEADS</span>
                    <Users size={16} className="text-[#FF9D00]" />
                  </div>
                  <p className="text-3xl font-extrabold text-[#1C1C1C] font-mono-stats">{totalLeads}</p>
                  <p className="text-[11px] text-[#10B981] font-semibold mt-1 flex items-center gap-1">
                    <TrendingUp size={12} /> +{newLeadsCount} New Inquiries This Week
                  </p>
                </Card>

                <Card className="p-4 bg-white border border-[#E5E7EB]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#6B7280] mb-1">
                    <span>PORTFOLIO PROJECTS</span>
                    <Briefcase size={16} className="text-[#3B82F6]" />
                  </div>
                  <p className="text-3xl font-extrabold text-[#1C1C1C] font-mono-stats">{projects.length}</p>
                  <p className="text-[11px] text-[#6B7280] mt-1">
                    {projects.filter((p) => p.is_featured).length} Featured Case Studies
                  </p>
                </Card>

                <Card className="p-4 bg-white border border-[#E5E7EB]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#6B7280] mb-1">
                    <span>CLOSED / WON DEALS</span>
                    <CheckCircle2 size={16} className="text-[#10B981]" />
                  </div>
                  <p className="text-3xl font-extrabold text-[#10B981] font-mono-stats">{wonLeadsCount}</p>
                  <p className="text-[11px] text-[#6B7280] mt-1">Verified Revenue Pipeline</p>
                </Card>

                <Card className="p-4 bg-white border border-[#E5E7EB]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#6B7280] mb-1">
                    <span>TESTIMONIALS</span>
                    <Star size={16} className="text-[#FFD21E]" />
                  </div>
                  <p className="text-3xl font-extrabold text-[#1C1C1C] font-mono-stats">{testimonials.length}</p>
                  <p className="text-[11px] text-[#6B7280] mt-1">5.0 Star Client Reviews</p>
                </Card>
              </div>
            )}

            {/* Leads by Status Breakdown & Recent Inquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Status Breakdown (5 cols) */}
              <Card className="lg:col-span-5 p-4 space-y-3">
                <h3 className="text-sm font-bold text-[#1C1C1C]">Leads Status Breakdown</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#E5E7EB] text-[#1C1C1C] font-semibold">
                    <span>New Inquiries</span>
                    <span className="font-bold font-mono-stats">{newLeadsCount}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] font-semibold">
                    <span>Contacted / SLA Active</span>
                    <span className="font-bold font-mono-stats">{contactedLeadsCount}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#3B82F6]/15 text-[#3B82F6] font-semibold">
                    <span>Qualified Pipeline</span>
                    <span className="font-bold font-mono-stats">{qualifiedLeadsCount}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#10B981]/15 text-[#10B981] font-semibold">
                    <span>Won / Closed Deals</span>
                    <span className="font-bold font-mono-stats">{wonLeadsCount}</span>
                  </div>
                </div>
              </Card>

              {/* Recent Inquiries List (7 cols) */}
              <Card className="lg:col-span-7 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-[#1C1C1C]">Latest Inbound Requests</h3>
                  <button onClick={() => setActiveTab('leads')} className="text-xs font-bold text-[#FF9D00] hover:underline">
                    Manage All
                  </button>
                </div>

                <div className="divide-y divide-[#E5E7EB]">
                  {leads.slice(0, 4).map((l) => (
                    <div key={l.id} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-[#1C1C1C]">{l.name}</p>
                        <p className="text-[11px] text-[#6B7280]">{l.email} • {l.city}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-[4px] font-bold bg-[#FFF9E6] text-[#FF9D00] border border-[#FFD21E] font-mono-stats">
                        {l.budget_range}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 2: PORTFOLIO MANAGER */}
        {activeTab === 'portfolio' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#1C1C1C]">Portfolio Manager</h1>
                <p className="text-xs text-[#6B7280]">Create, edit, or delete case studies displayed on the public site</p>
              </div>
              <Button onClick={() => { setEditingProject(null); setProjectModalOpen(true); }} variant="primary" size="sm">
                <Plus size={14} />
                <span>Add New Project</span>
              </Button>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#F9FAFB] p-2.5 rounded-lg border border-[#E5E7EB]">
              <div className="relative flex-1 w-full">
                <Search size={14} className="absolute left-3 top-2.5 text-[#9CA3AF]" />
                <input
                  type="text"
                  value={portfolioSearch}
                  onChange={(e) => setPortfolioSearch(e.target.value)}
                  placeholder="Search projects by title, client name, or city..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                <Filter size={14} className="text-[#6B7280] shrink-0" />
                {['all', 'featured', 'web_dev', 'seo', 'meta_ads', 'lead_gen'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setPortfolioFilter(st)}
                    className={`px-2.5 py-1 rounded-[4px] text-xs font-bold uppercase whitespace-nowrap transition-all ${
                      portfolioFilter === st
                        ? 'bg-[#FF9D00] text-white'
                        : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#1C1C1C]'
                    }`}
                  >
                    {st === 'all' ? 'All' : st === 'featured' ? '★ Featured' : st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Table */}
            {loading ? (
              <TableSkeleton rows={4} />
            ) : (
              <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-bold uppercase">
                      <th className="py-2.5 px-3">Case Study Title</th>
                      <th className="py-2.5 px-3">Client & City</th>
                      <th className="py-2.5 px-3">Service Type</th>
                      <th className="py-2.5 px-3">Featured</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {filteredProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3 px-3">
                          <p className="font-bold text-[#1C1C1C] max-w-xs truncate">{p.title}</p>
                          <p className="text-[11px] text-[#6B7280]">/portfolio/{p.slug}</p>
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-semibold text-[#1C1C1C]">{p.client_name}</p>
                          <p className="text-[11px] text-[#6B7280]">{p.client_city}</p>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-[4px] font-bold uppercase text-[10px] bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20">
                            {p.service_type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          {p.is_featured ? (
                            <span className="px-2 py-0.5 rounded-[4px] font-bold text-[10px] bg-[#FFF9E6] text-[#FF9D00] border border-[#FFD21E]">
                              ★ Featured
                            </span>
                          ) : (
                            <span className="text-[#9CA3AF] text-[11px]">—</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button
                            onClick={() => { setEditingProject(p); setProjectModalOpen(true); }}
                            className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#FF9D00] text-[#1C1C1C] transition-colors"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmProject(p)}
                            className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#EF4444] text-[#EF4444] transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LEADS MANAGER */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#1C1C1C]">Leads Queue Manager</h1>
                <p className="text-xs text-[#6B7280]">Sorted newest-first with inline status updates & instant WhatsApp links</p>
              </div>
            </div>

            {/* Search & Status Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#F9FAFB] p-2.5 rounded-lg border border-[#E5E7EB]">
              <div className="relative flex-1 w-full">
                <Search size={14} className="absolute left-3 top-2.5 text-[#9CA3AF]" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Search leads by name, email, phone, or city..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white"
                />
              </div>

              <div className="flex items-center gap-1">
                {['all', 'new', 'contacted', 'closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-[4px] text-xs font-bold uppercase transition-all ${
                      leadStatusFilter === st
                        ? 'bg-[#FF9D00] text-white'
                        : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#1C1C1C]'
                    }`}
                  >
                    {st === 'closed' ? 'Won' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-bold uppercase">
                    <th className="py-2.5 px-3">Contact</th>
                    <th className="py-2.5 px-3">City</th>
                    <th className="py-2.5 px-3">Service</th>
                    <th className="py-2.5 px-3">Budget (₹)</th>
                    <th className="py-2.5 px-3">Status Badge</th>
                    <th className="py-2.5 px-3 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredLeads.map((l) => (
                    <tr key={l.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-3 px-3">
                        <p className="font-bold text-[#1C1C1C]">{l.name}</p>
                        <p className="text-[11px] text-[#6B7280]">{l.email}</p>
                        <a
                          href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(l.name)}!%20This%20is%20ApexPulse.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-[#25D366] hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <WhatsAppIcon size={13} fill="#25D366" />
                          <span>WhatsApp: {l.phone}</span>
                        </a>
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#6B7280]">{l.city}</td>
                      <td className="py-3 px-3 font-bold text-[#1C1C1C]">{l.service_interested}</td>
                      <td className="py-3 px-3 font-extrabold text-[#FF9D00] font-mono-stats">{l.budget_range}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-[4px] font-bold uppercase text-[11px] ${
                            l.status === 'new'
                              ? 'bg-[#E5E7EB] text-[#1C1C1C]'
                              : l.status === 'contacted'
                              ? 'bg-[#F59E0B]/15 text-[#F59E0B]'
                              : l.status === 'closed'
                              ? 'bg-[#10B981]/15 text-[#10B981]'
                              : 'bg-[#3B82F6]/15 text-[#3B82F6]'
                          }`}
                        >
                          {l.status === 'closed' ? 'Won' : l.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <select
                          value={l.status || 'new'}
                          onChange={(e) => handleLeadStatusChange(l.id!, e.target.value as any)}
                          className="px-2 py-1 border border-[#E5E7EB] rounded-md text-xs font-bold text-[#1C1C1C] bg-white focus:outline-none focus:border-[#FF9D00]"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="closed">Won</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: TESTIMONIALS MANAGER */}
        {activeTab === 'testimonials' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#1C1C1C]">Testimonials Manager</h1>
                <p className="text-xs text-[#6B7280]">Client quotes and 5-star ratings displayed on home and service pages</p>
              </div>
              <Button onClick={() => { setEditingTestimonial(null); setTestimonialModalOpen(true); }} variant="primary" size="sm">
                <Plus size={14} />
                <span>Add Testimonial</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <Card key={t.id} className="p-4 space-y-3 border border-[#E5E7EB] relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#1C1C1C]">{t.client_name}</p>
                      <p className="text-xs text-[#6B7280]">{t.client_company} • {t.client_city}</p>
                    </div>
                    <div className="flex text-[#FFD21E]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#FFD21E" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#6B7280] italic">"{t.quote}"</p>
                  <div className="flex justify-end gap-2 pt-2 border-t border-[#E5E7EB]">
                    <button
                      onClick={() => { setEditingTestimonial(t); setTestimonialModalOpen(true); }}
                      className="p-1 rounded-md border border-[#E5E7EB] hover:border-[#FF9D00] text-[#1C1C1C]"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmTestimonial(t)}
                      className="p-1 rounded-md border border-[#E5E7EB] hover:border-[#EF4444] text-[#EF4444]"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TEAM ARCHITECTS MANAGER ("Meet the Growth Architects") */}
        {activeTab === 'team' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#1C1C1C]">Team Architects Manager</h1>
                <p className="text-xs text-[#6B7280]">
                  Manage team profiles on the About page ("Meet the Growth Architects") with profile image links
                </p>
              </div>
              <Button onClick={() => { setEditingTeamMember(null); setTeamModalOpen(true); }} variant="primary" size="sm">
                <Plus size={14} />
                <span>Add Team Member</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((m) => (
                <Card key={m.id} className="p-4 space-y-3 border border-[#E5E7EB]">
                  <div className="flex items-start gap-3">
                    {/* Profile Image Thumbnail Avatar */}
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#F9FAFB] border border-[#E5E7EB] shrink-0">
                      {m.profile_image_url ? (
                        <Image src={m.profile_image_url} alt={m.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#FF9D00] bg-[#FFF9E6]">
                          <User size={20} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="font-bold text-sm text-[#1C1C1C] truncate">{m.name}</p>
                        <span className="px-1.5 py-0.5 rounded-[4px] text-[10px] font-extrabold bg-[#FFD21E] text-[#1C1C1C] border border-[#E5E7EB] shrink-0">
                          {m.badge}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#FF9D00]">{m.role}</p>
                      <p className="text-[11px] text-[#6B7280]">{m.location}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B7280] line-clamp-2 pt-2 border-t border-[#E5E7EB]">
                    {m.bio}
                  </p>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => { setEditingTeamMember(m); setTeamModalOpen(true); }}
                      className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#FF9D00] text-[#1C1C1C]"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmTeamMember(m)}
                      className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#EF4444] text-[#EF4444]"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SITE CONTACT SETTINGS MANAGER */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-[#1C1C1C]">Site Contact Settings</h1>
                <p className="text-xs text-[#6B7280]">
                  Edit global address, phone, WhatsApp number, email, and social media links (changes reflect across all pages)
                </p>
              </div>
            </div>

            <Card className="p-6 max-w-3xl">
              <form onSubmit={handleSaveSiteSettings} className="space-y-4">
                {/* Phone & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1 flex items-center gap-1.5">
                      <Phone size={14} className="text-[#FF9D00]" />
                      <span>Display Phone Number (+91) *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1 flex items-center gap-1.5">
                      <WhatsAppIcon size={14} fill="#25D366" />
                      <span>WhatsApp Number (Digits only, e.g. 919876543210) *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.whatsapp_number}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                      placeholder="919876543210"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>
                </div>

                {/* Email & Address */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1 flex items-center gap-1.5">
                      <Mail size={14} className="text-[#FF9D00]" />
                      <span>Official Email Address *</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      placeholder="hello@apexpulse.in"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1 flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#FF9D00]" />
                      <span>India HQ Full Address *</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      placeholder="100 Feet Rd, 4th Block, Koramangala, Bengaluru, Karnataka 560034"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E5E7EB]">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1 flex items-center gap-1.5">
                      <Link2 size={14} className="text-[#3B82F6]" />
                      <span>LinkedIn Profile URL</span>
                    </label>
                    <input
                      type="url"
                      value={settingsForm.linkedin_url}
                      onChange={(e) => setSettingsForm({ ...settingsForm, linkedin_url: e.target.value })}
                      placeholder="https://linkedin.com/company/apexpulse-india"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1 flex items-center gap-1.5">
                      <Link2 size={14} className="text-[#3B82F6]" />
                      <span>Twitter / X Profile URL</span>
                    </label>
                    <input
                      type="url"
                      value={settingsForm.twitter_url}
                      onChange={(e) => setSettingsForm({ ...settingsForm, twitter_url: e.target.value })}
                      placeholder="https://twitter.com/apexpulse_in"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1 flex items-center gap-1.5">
                      <Link2 size={14} className="text-[#3B82F6]" />
                      <span>Instagram Profile URL</span>
                    </label>
                    <input
                      type="url"
                      value={settingsForm.instagram_url || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagram_url: e.target.value })}
                      placeholder="https://instagram.com/apexpulse.in"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" size="md" className="w-full mt-2">
                  <Send size={16} />
                  <span>Save & Apply Settings Site-Wide</span>
                </Button>
              </form>
            </Card>
          </div>
        )}
      </main>

      {/* TEAM MEMBER MODAL */}
      {teamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-[#E5E7EB] rounded-[10px] p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <h3 className="font-bold text-lg text-[#1C1C1C]">
                {editingTeamMember ? 'Edit Team Architect' : 'Add Team Architect'}
              </h3>
              <button onClick={() => setTeamModalOpen(false)} className="text-[#6B7280] hover:text-[#1C1C1C]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTeamMember} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Full Name *</label>
                <input
                  name="name"
                  required
                  defaultValue={editingTeamMember?.name || ''}
                  placeholder="e.g. Aarav Mehta"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Role / Title *</label>
                  <input
                    name="role"
                    required
                    defaultValue={editingTeamMember?.role || ''}
                    placeholder="e.g. Chief Software Architect"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Location *</label>
                  <input
                    name="location"
                    required
                    defaultValue={editingTeamMember?.location || ''}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Badge Tag *</label>
                <input
                  name="badge"
                  required
                  defaultValue={editingTeamMember?.badge || ''}
                  placeholder="e.g. EX-FAANG ARCHITECT"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Profile Image URL (Minimal Avatar) *</label>
                <input
                  name="profile_image_url"
                  defaultValue={editingTeamMember?.profile_image_url || ''}
                  placeholder="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Bio / Summary *</label>
                <textarea
                  name="bio"
                  required
                  rows={3}
                  defaultValue={editingTeamMember?.bio || ''}
                  placeholder="Briefly describe background and expertise..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" onClick={() => setTeamModalOpen(false)} variant="secondary" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Member
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TEAM MEMBER DELETE CONFIRM MODAL */}
      {deleteConfirmTeamMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-lg text-[#1C1C1C]">Confirm Delete</h3>
            <p className="text-xs text-[#6B7280]">
              Are you sure you want to delete profile for <strong className="text-[#1C1C1C]">{deleteConfirmTeamMember.name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setDeleteConfirmTeamMember(null)} variant="secondary" size="sm">
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteTeamMember(deleteConfirmTeamMember.id)}
                variant="primary"
                size="sm"
                className="bg-[#EF4444] hover:bg-[#dc2626] border-none text-white"
              >
                Delete Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* PORTFOLIO MODAL */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-[#E5E7EB] rounded-[10px] p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <h3 className="font-bold text-lg text-[#1C1C1C]">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={() => setProjectModalOpen(false)} className="text-[#6B7280] hover:text-[#1C1C1C]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Project Title *</label>
                <input
                  name="title"
                  required
                  defaultValue={editingProject?.title || ''}
                  placeholder="e.g. Fintech Mobile App Portal"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Client Name *</label>
                  <input
                    name="client_name"
                    required
                    defaultValue={editingProject?.client_name || ''}
                    placeholder="e.g. ZetaPay India"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Client City *</label>
                  <input
                    name="client_city"
                    required
                    defaultValue={editingProject?.client_city || ''}
                    placeholder="e.g. Bengaluru"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Service Type *</label>
                  <select
                    name="service_type"
                    defaultValue={editingProject?.service_type || 'web_dev'}
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  >
                    <option value="web_dev">Web Development</option>
                    <option value="seo">SEO Dominance</option>
                    <option value="meta_ads">Meta Ads</option>
                    <option value="lead_gen">Lead Gen Funnel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">URL Slug</label>
                  <input
                    name="slug"
                    defaultValue={editingProject?.slug || ''}
                    placeholder="cred-pay-portal"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Cover Image URL *</label>
                <input
                  name="cover_image_url"
                  defaultValue={editingProject?.cover_image_url || ''}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Live Project Website URL (Visit Live Work Link)</label>
                <input
                  name="live_url"
                  type="url"
                  defaultValue={editingProject?.live_url || ''}
                  placeholder="https://zetapay.in"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Short Description *</label>
                <textarea
                  name="short_description"
                  required
                  rows={2}
                  defaultValue={editingProject?.short_description || ''}
                  placeholder="Brief 1-2 sentence summary..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Results Metric Text *</label>
                <input
                  name="results"
                  required
                  defaultValue={editingProject?.results || ''}
                  placeholder="+340% Leads | 0.8s Page Speed"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is_featured"
                  name="is_featured"
                  defaultChecked={editingProject?.is_featured || false}
                  className="w-4 h-4 text-[#FF9D00] rounded-sm focus:ring-[#FF9D00]"
                />
                <label htmlFor="is_featured" className="text-xs font-semibold text-[#1C1C1C]">
                  Mark as Featured Case Study (Highlighted on Homepage & Portfolio)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" onClick={() => setProjectModalOpen(false)} variant="secondary" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PORTFOLIO DELETE CONFIRM MODAL */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-lg text-[#1C1C1C]">Confirm Delete</h3>
            <p className="text-xs text-[#6B7280]">
              Are you sure you want to delete <strong className="text-[#1C1C1C]">{deleteConfirmProject.title}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setDeleteConfirmProject(null)} variant="secondary" size="sm">
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteProject(deleteConfirmProject.id)}
                variant="primary"
                size="sm"
                className="bg-[#EF4444] hover:bg-[#dc2626] border-none text-white"
              >
                Delete Project
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TESTIMONIAL MODAL */}
      {testimonialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-[10px] p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <h3 className="font-bold text-lg text-[#1C1C1C]">
                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setTestimonialModalOpen(false)} className="text-[#6B7280]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Client Name *</label>
                <input
                  name="client_name"
                  required
                  defaultValue={editingTestimonial?.client_name || ''}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Company / Title *</label>
                  <input
                    name="client_company"
                    required
                    defaultValue={editingTestimonial?.client_company || ''}
                    placeholder="CEO, ZetaPay"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">City *</label>
                  <input
                    name="client_city"
                    required
                    defaultValue={editingTestimonial?.client_city || ''}
                    placeholder="Bengaluru"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Star Rating (1-5)</label>
                <input
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  defaultValue={editingTestimonial?.rating || 5}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Quote Text *</label>
                <textarea
                  name="quote"
                  required
                  rows={3}
                  defaultValue={editingTestimonial?.quote || ''}
                  placeholder="Client review text..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" onClick={() => setTestimonialModalOpen(false)} variant="secondary" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TESTIMONIAL DELETE CONFIRM */}
      {deleteConfirmTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-lg text-[#1C1C1C]">Confirm Delete</h3>
            <p className="text-xs text-[#6B7280]">
              Delete testimonial from <strong className="text-[#1C1C1C]">{deleteConfirmTestimonial.client_name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setDeleteConfirmTestimonial(null)} variant="secondary" size="sm">
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteTestimonial(deleteConfirmTestimonial.id)}
                variant="primary"
                size="sm"
                className="bg-[#EF4444] hover:bg-[#dc2626] border-none text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
