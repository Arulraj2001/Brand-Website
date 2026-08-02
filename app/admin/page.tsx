'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ArusythApexLogo from '@/components/ui/ArusythApexLogo';
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
  FileText,
  Tag,
  Eye,
  EyeOff,
  UploadCloud,
  Copy,
  Check,
  ImageIcon,
  Heading,
  Bold,
  Italic,
  List,
  Quote as QuoteIcon,
  Code,
  FileSpreadsheet,
  GraduationCap,
  Video,
  Play,
} from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { TableSkeleton, Skeleton } from '@/components/admin/Skeleton';
import { PortfolioProject, Testimonial, Lead, ServiceType, SiteSettings, TeamMember, BlogPost, BlogCategory, StudentFeedbackVideo, StudentProject, StudentProjectCategory } from '@/types';
import {
  getPortfolioProjects,
  saveProjectToSupabase,
  deleteProjectFromSupabase,
  getTestimonials,
  saveTestimonialToSupabase,
  deleteTestimonialFromSupabase,
  getBlogPosts,
  saveBlogPostToSupabase,
  deleteBlogPostFromSupabase,
  getLeadsFromSupabase,
  updateLeadStatusInSupabase,
  deleteLeadFromSupabase,
  deleteTeamMemberFromSupabase,
} from '@/lib/supabase/data';
import { useSiteSettings, useTeamMembers, useStudentData } from '@/lib/useSiteData';
import { createClient } from '@/lib/supabase/client';

interface MediaItem {
  id: string;
  url: string;
  name: string;
  created_at: string;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'David Miller',
    email: 'david@company.com',
    phone: '+1 (512) 555-0199',
    country: 'Austin, USA',
    service_interested: 'Old Website Upgrade',
    budget_range: '$3,000–$5,000',
    message: 'Need a complete speed overhaul and technical SEO cleanup for our SaaS portal.',
    status: 'new',
    created_at: new Date().toISOString(),
  },
  {
    id: 'l2',
    name: 'Sarah Jenkins',
    email: 'sarah@cleanenergy.uk',
    phone: '+44 20 7946 0912',
    country: 'London, UK',
    service_interested: 'UGC Video Ads',
    budget_range: '$5,000+',
    message: 'Looking for 12 A/B UGC video ad hooks for our D2C e-commerce campaign.',
    status: 'contacted',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'l3',
    name: 'Marcus Vance',
    email: 'marcus@skyline.au',
    phone: '+61 2 9374 4000',
    country: 'Sydney, Australia',
    service_interested: 'Local Business Marketing',
    budget_range: '$1,000–$3,000',
    message: 'Want to rank #1 on Google Map packs for our luxury property listings in Sydney.',
    status: 'closed',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'l4',
    name: 'Emma Dupont',
    email: 'emma@techhub.de',
    phone: '+49 30 1234567',
    country: 'Berlin, Germany',
    service_interested: 'Website Development',
    budget_range: '$3,000–$5,000',
    message: 'Require custom web portal engineering with Stripe payment integration.',
    status: 'new',
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'leads' | 'testimonials' | 'team' | 'settings' | 'blog' | 'media' | 'student_projects'>('overview');
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [userEmail, setUserEmail] = useState<string>('admin@arusythapex.netlify.app');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Student Projects & Video Feedback State
  const {
    feedbackVideos,
    projects: studentProjects,
    saveFeedbackVideo,
    deleteFeedbackVideo,
    saveStudentProject,
    deleteStudentProject,
  } = useStudentData();

  const [studentVideoModalOpen, setStudentVideoModalOpen] = useState(false);
  const [editingStudentVideo, setEditingStudentVideo] = useState<StudentFeedbackVideo | null>(null);
  const [deleteConfirmStudentVideo, setDeleteConfirmStudentVideo] = useState<StudentFeedbackVideo | null>(null);

  const [studentProjModalOpen, setStudentProjModalOpen] = useState(false);
  const [editingStudentProj, setEditingStudentProj] = useState<StudentProject | null>(null);
  const [deleteConfirmStudentProj, setDeleteConfirmStudentProj] = useState<StudentProject | null>(null);

  // Media Library State
  const [mediaList, setMediaList] = useState<MediaItem[]>([
    {
      id: 'm1',
      name: 'saas-portal-preview.jpg',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: 'm2',
      name: 'seo-growth-analytics.jpg',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      created_at: new Date().toISOString(),
    },
  ]);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

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

  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');

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

  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [deleteConfirmBlogPost, setDeleteConfirmBlogPost] = useState<BlogPost | null>(null);

  // Advanced Blog Writing Studio State
  const [blogStudioTab, setBlogStudioTab] = useState<'write' | 'meta' | 'preview'>('write');
  const [blogTitleText, setBlogTitleText] = useState('');
  const [blogContentText, setBlogContentText] = useState('');
  const [blogKeywordText, setBlogKeywordText] = useState('');
  const [blogSecondaryKeywordsText, setBlogSecondaryKeywordsText] = useState('');
  const [blogExcerptText, setBlogExcerptText] = useState('');
  const [blogCategoryVal, setBlogCategoryVal] = useState<BlogCategory>('seo');
  const [blogAuthorVal, setBlogAuthorVal] = useState('Arusyth Apex Team');

  // Modal Image Inputs State
  const [projectCoverUrl, setProjectCoverUrl] = useState('');
  const [blogCoverUrl, setBlogCoverUrl] = useState('');
  const [teamProfileUrl, setTeamProfileUrl] = useState('');

  const router = useRouter();

  const addToast = (type: 'success' | 'error', text: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projData, testData, postsData, leadsData] = await Promise.all([
          getPortfolioProjects(),
          getTestimonials(),
          getBlogPosts(false),
          getLeadsFromSupabase(),
        ]);
        setProjects(projData);
        setTestimonials(testData);
        setBlogPosts(postsData);
        if (leadsData && leadsData.length > 0) {
          setLeads(leadsData);
        }

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

  // Supabase Storage Image Upload Helper
  const uploadImageFile = async (file: File): Promise<string> => {
    setUploadingMedia(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop() || 'png';
      const fileName = `${Math.random().toString(36).substring(2, 9)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file, { upsert: true });

      if (!error && data?.path) {
        const { data: publicUrlData } = supabase.storage
          .from('portfolio-images')
          .getPublicUrl(filePath);

        const publicUrl = publicUrlData.publicUrl;
        const newItem: MediaItem = {
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          url: publicUrl,
          created_at: new Date().toISOString(),
        };
        setMediaList((prev) => [newItem, ...prev]);
        setUploadingMedia(false);
        return publicUrl;
      }
    } catch (e) {
      console.warn('Storage upload fallback');
    }

    // Fallback Data URL reader
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const newItem: MediaItem = {
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          url: dataUrl,
          created_at: new Date().toISOString(),
        };
        setMediaList((prev) => [newItem, ...prev]);
        setUploadingMedia(false);
        resolve(dataUrl);
      };
      reader.readAsDataURL(file);
    });
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    addToast('success', 'Image URL copied to clipboard!');
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleDeleteMedia = async (id: string, url: string) => {
    try {
      const supabase = createClient();
      const urlParts = url.split('/portfolio-images/');
      if (urlParts.length > 1) {
        const storagePath = urlParts[1];
        await supabase.storage.from('portfolio-images').remove([storagePath]);
      }
    } catch (e) {
      console.warn('Storage remove warning', e);
    }

    setMediaList((prev) => prev.filter((m) => m.id !== id));
    addToast('success', 'Image removed from media library');
  };

  const insertMarkdownToolbar = (prefix: string, suffix: string = '') => {
    setBlogContentText((prev) => `${prev}\n${prefix}sample text${suffix}`);
  };

  // Portfolio Save Handler
  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const slug = (formData.get('slug') as string) || title.toLowerCase().replace(/ /g, '-');
    const client_name = formData.get('client_name') as string;
    const client_location = formData.get('client_location') as string;
    const service_type = formData.get('service_type') as ServiceType;
    const short_description = formData.get('short_description') as string;
    const full_description = formData.get('full_description') as string;
    const cover_image_url = projectCoverUrl || (formData.get('cover_image_url') as string) || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
    const results = formData.get('results') as string;
    const testimonial = formData.get('testimonial') as string;
    const live_url = formData.get('live_url') as string;
    const is_featured = formData.get('is_featured') === 'on';

    if (editingProject) {
      const updatedItem: PortfolioProject = {
        ...editingProject,
        title,
        slug,
        client_name,
        client_location,
        service_type,
        short_description,
        full_description,
        cover_image_url,
        results,
        testimonial,
        live_url,
        is_featured,
      };
      setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? updatedItem : p)));
      await saveProjectToSupabase(updatedItem);
      addToast('success', `Project "${title}" updated successfully`);
    } else {
      const newProj: PortfolioProject = {
        id: Math.random().toString(36).substring(2, 9),
        title,
        slug,
        client_name,
        client_location,
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
      const saved = await saveProjectToSupabase(newProj);
      if (saved && saved.id) {
        setProjects((prev) => prev.map((p) => (p.slug === slug ? saved : p)));
      }
      addToast('success', `Project "${title}" created successfully`);
    }

    setProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = async (id: string) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    await deleteProjectFromSupabase(id, target?.slug);
    addToast('success', 'Project deleted');
    setDeleteConfirmProject(null);
  };

  // Testimonial Save Handler
  const handleSaveTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const client_name = formData.get('client_name') as string;
    const client_company = formData.get('client_company') as string;
    const client_location = formData.get('client_location') as string;
    const quote = formData.get('quote') as string;
    const rating = parseInt(formData.get('rating') as string) || 5;

    if (editingTestimonial) {
      const updated: Testimonial = { ...editingTestimonial, client_name, client_company, client_location, quote, rating };
      setTestimonials((prev) => prev.map((t) => (t.id === editingTestimonial.id ? updated : t)));
      await saveTestimonialToSupabase(updated);
      addToast('success', `Testimonial from "${client_name}" updated`);
    } else {
      const newTest: Testimonial = {
        id: Math.random().toString(36).substring(2, 9),
        client_name,
        client_company,
        client_location,
        quote,
        rating,
        created_at: new Date().toISOString(),
      };
      setTestimonials((prev) => [newTest, ...prev]);
      const saved = await saveTestimonialToSupabase(newTest);
      if (saved && saved.id) {
        setTestimonials((prev) => prev.map((t) => (t.id === newTest.id ? saved : t)));
      }
      addToast('success', `Testimonial from "${client_name}" added`);
    }

    setTestimonialModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = async (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    await deleteTestimonialFromSupabase(id);
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
    const profile_image_url = teamProfileUrl || (formData.get('profile_image_url') as string);

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

  const handleDeleteTeamMember = async (id: string) => {
    const updated = teamMembers.filter((m) => m.id !== id);
    saveTeam(updated);
    await deleteTeamMemberFromSupabase(id);
    addToast('success', 'Team member profile deleted');
    setDeleteConfirmTeamMember(null);
  };

  // Site Settings Save Handler
  const handleSaveSiteSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveSettings(settingsForm);
    addToast('success', 'Global contact settings & social links updated across all pages');
  };

  // Advanced Blog Post Save Handler
  const handleSaveBlogPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = blogTitleText || (formData.get('title') as string);
    const slug =
      (formData.get('slug') as string) ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    const category = blogCategoryVal || (formData.get('category') as BlogCategory) || 'seo';
    const target_keyword = blogKeywordText || (formData.get('target_keyword') as string);
    const secondary_keywords = blogSecondaryKeywordsText || (formData.get('secondary_keywords') as string);
    const city = (formData.get('city') as string) || 'Global';
    const author_name = blogAuthorVal || (formData.get('author_name') as string) || 'Arusyth Apex Team';
    const cover_image_url =
      blogCoverUrl ||
      (formData.get('cover_image_url') as string) ||
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
    const excerpt = blogExcerptText || (formData.get('excerpt') as string);
    const content = blogContentText || (formData.get('content') as string);
    const is_published = formData.get('is_published') === 'on';

    if (editingBlogPost) {
      const updated: BlogPost = {
        ...editingBlogPost,
        title,
        slug,
        category,
        target_keyword,
        secondary_keywords,
        city,
        author_name,
        cover_image_url,
        excerpt,
        content,
        is_published,
        published_at: is_published
          ? editingBlogPost.published_at || new Date().toISOString()
          : editingBlogPost.published_at,
      };
      setBlogPosts((prev) => prev.map((post) => (post.id === editingBlogPost.id ? updated : post)));
      await saveBlogPostToSupabase(updated);
      addToast('success', `Blog post "${title}" updated successfully`);
    } else {
      const newPost: BlogPost = {
        id: Math.random().toString(36).substring(2, 9),
        title,
        slug,
        category,
        target_keyword,
        secondary_keywords,
        city,
        author_name,
        cover_image_url,
        excerpt,
        content,
        is_published,
        published_at: is_published ? new Date().toISOString() : undefined,
        created_at: new Date().toISOString(),
      };
      setBlogPosts((prev) => [newPost, ...prev]);
      const saved = await saveBlogPostToSupabase(newPost);
      if (saved && saved.id) {
        setBlogPosts((prev) => prev.map((p) => (p.slug === slug ? saved : p)));
      }
      addToast('success', `Blog post "${title}" created successfully`);
    }

    setBlogModalOpen(false);
    setEditingBlogPost(null);
  };

  const handleDeleteBlogPost = async (id: string) => {
    const target = blogPosts.find((p) => p.id === id);
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
    await deleteBlogPostFromSupabase(id, target?.slug);
    addToast('success', 'Blog post deleted');
    setDeleteConfirmBlogPost(null);
  };

  const handleTogglePublishPost = async (id: string) => {
    const target = blogPosts.find((p) => p.id === id);
    if (!target) return;
    const nextPublished = !target.is_published;
    const updated: BlogPost = {
      ...target,
      is_published: nextPublished,
      published_at: nextPublished ? target.published_at || new Date().toISOString() : target.published_at,
    };

    setBlogPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    await saveBlogPostToSupabase(updated);
    addToast('success', `Post "${target.title}" ${nextPublished ? 'published' : 'unpublished'}`);
  };

  // Student Video Feedback Handlers
  const handleSaveStudentVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const student_name = formData.get('student_name') as string;
    const degree_branch = formData.get('degree_branch') as string;
    const project_title = formData.get('project_title') as string;
    const project_category = (formData.get('project_category') as StudentProjectCategory) || 'web_dev';
    const video_url = formData.get('video_url') as string;
    const thumbnail_url = formData.get('thumbnail_url') as string;
    const quote = formData.get('quote') as string;
    const rating = parseInt(formData.get('rating') as string) || 5;
    const is_featured = formData.get('is_featured') === 'on';

    if (editingStudentVideo) {
      const updated: StudentFeedbackVideo = {
        ...editingStudentVideo,
        student_name,
        degree_branch,
        project_title,
        project_category,
        video_url,
        thumbnail_url,
        quote,
        rating,
        is_featured,
      };
      await saveFeedbackVideo(updated);
      addToast('success', `Student video review by "${student_name}" updated`);
    } else {
      const newVideo: StudentFeedbackVideo = {
        id: 'sv-' + Math.random().toString(36).substring(2, 9),
        student_name,
        degree_branch,
        project_title,
        project_category,
        video_url,
        thumbnail_url,
        quote,
        rating,
        is_featured,
        created_at: new Date().toISOString(),
      };
      await saveFeedbackVideo(newVideo);
      addToast('success', `Student video review by "${student_name}" added`);
    }

    setStudentVideoModalOpen(false);
    setEditingStudentVideo(null);
  };

  const handleDeleteStudentVideo = async (id: string) => {
    await deleteFeedbackVideo(id);
    addToast('success', 'Student video feedback deleted');
    setDeleteConfirmStudentVideo(null);
  };

  // Student Project Handlers
  const handleSaveStudentProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const category = (formData.get('category') as StudentProjectCategory) || 'web_dev';
    const degree = formData.get('degree') as string;
    const description = formData.get('description') as string;
    const techStackStr = formData.get('tech_stack') as string;
    const tech_stack = techStackStr ? techStackStr.split(',').map((s) => s.trim()).filter(Boolean) : ['Python', 'React'];
    const has_documentation = formData.get('has_documentation') === 'on';
    const has_presentation = formData.get('has_presentation') === 'on';
    const has_certificate = formData.get('has_certificate') === 'on';
    const has_custom_domain = formData.get('has_custom_domain') === 'on';
    const demo_url = formData.get('demo_url') as string;
    const image_url = (formData.get('image_url') as string) || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';

    if (editingStudentProj) {
      const updated: StudentProject = {
        ...editingStudentProj,
        title,
        category,
        degree,
        description,
        tech_stack,
        has_documentation,
        has_presentation,
        has_certificate,
        has_custom_domain,
        demo_url,
        image_url,
      };
      await saveStudentProject(updated);
      addToast('success', `Student project "${title}" updated`);
    } else {
      const newProj: StudentProject = {
        id: 'sp-' + Math.random().toString(36).substring(2, 9),
        title,
        category,
        degree,
        description,
        tech_stack,
        has_documentation,
        has_presentation,
        has_certificate,
        has_custom_domain,
        demo_url,
        image_url,
        created_at: new Date().toISOString(),
      };
      await saveStudentProject(newProj);
      addToast('success', `Student project "${title}" created`);
    }

    setStudentProjModalOpen(false);
    setEditingStudentProj(null);
  };

  const handleDeleteStudentProject = async (id: string) => {
    await deleteStudentProject(id);
    addToast('success', 'Student project deleted');
    setDeleteConfirmStudentProj(null);
  };

  const handleLeadStatusChange = async (id: string, newStatus: Lead['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    await updateLeadStatusInSupabase(id, newStatus);
    addToast('success', `Lead status updated to ${newStatus?.toUpperCase()}`);
  };

  const openBlogStudioModal = (post: BlogPost | null) => {
    setEditingBlogPost(post);
    setBlogTitleText(post?.title || '');
    setBlogContentText(post?.content || '');
    setBlogKeywordText(post?.target_keyword || '');
    setBlogExcerptText(post?.excerpt || '');
    setBlogCategoryVal(post?.category || 'seo');
    setBlogAuthorVal(post?.author_name || 'Arusyth Apex Team');
    setBlogCoverUrl(post?.cover_image_url || '');
    setBlogStudioTab('write');
    setBlogModalOpen(true);
  };

  const filteredProjects = projects.filter((p) => {
    const loc = p.client_location || p.client_city || '';
    const matchesSearch =
      p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      p.client_name.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      loc.toLowerCase().includes(portfolioSearch.toLowerCase());

    if (portfolioFilter === 'featured') return matchesSearch && p.is_featured;
    if (portfolioFilter !== 'all') return matchesSearch && p.service_type === portfolioFilter;
    return matchesSearch;
  });

  const filteredLeads = leads.filter((l) => {
    const loc = l.country || l.city || '';
    const matchesSearch =
      l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
      loc.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.includes(leadSearch);

    if (leadStatusFilter === 'closed') return matchesSearch && l.status === 'closed';
    if (leadStatusFilter !== 'all') return matchesSearch && l.status === leadStatusFilter;
    return matchesSearch;
  });

  const filteredBlogPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      post.slug.toLowerCase().includes(blogSearch.toLowerCase()) ||
      (post.target_keyword && post.target_keyword.toLowerCase().includes(blogSearch.toLowerCase())) ||
      (post.city && post.city.toLowerCase().includes(blogSearch.toLowerCase()));

    if (blogCategoryFilter !== 'all') return matchesSearch && post.category === blogCategoryFilter;
    return matchesSearch;
  });

  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const contactedLeadsCount = leads.filter((l) => l.status === 'contacted').length;
  const qualifiedLeadsCount = leads.filter((l) => l.status === 'qualified').length;
  const wonLeadsCount = leads.filter((l) => l.status === 'closed').length;

  // Real-time Writing Studio Metrics
  const studioWordCount = blogContentText ? blogContentText.trim().split(/\s+/).filter(Boolean).length : 0;
  const studioReadTime = Math.max(1, Math.ceil(studioWordCount / 200));
  const hasKeywordInTitle = blogKeywordText && blogTitleText.toLowerCase().includes(blogKeywordText.toLowerCase());

  const NAV_ITEMS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'leads', label: 'Leads Queue', icon: Users },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'student_projects', label: 'Student Projects', icon: GraduationCap },
    { id: 'blog', label: 'Blog Posts', icon: FileText },
    { id: 'media', label: 'Media & Upload', icon: UploadCloud },
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
          <div className="flex items-center gap-2.5 px-1 py-1">
            <ArusythApexLogo size={32} />
            <div>
              <span className="font-extrabold text-base text-[#1C1C1C] tracking-tight block">
                Arusyth<span className="text-[#FF9D00]">Apex</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                Admin Console
              </span>
            </div>
          </div>

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
                  High-level performance snapshot for global leads and projects (USD $)
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
                    <span>PUBLISHED BLOG POSTS</span>
                    <FileText size={16} className="text-[#3B82F6]" />
                  </div>
                  <p className="text-3xl font-extrabold text-[#1C1C1C] font-mono-stats">
                    {blogPosts.filter((b) => b.is_published).length}
                  </p>
                  <p className="text-[11px] text-[#6B7280] mt-1">
                    {blogPosts.length} Total Draft & Live Posts
                  </p>
                </Card>

                <Card className="p-4 bg-white border border-[#E5E7EB]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#6B7280] mb-1">
                    <span>TESTIMONIALS</span>
                    <Star size={16} className="text-[#FFD21E]" />
                  </div>
                  <p className="text-3xl font-extrabold text-[#1C1C1C] font-mono-stats">{testimonials.length}</p>
                  <p className="text-[11px] text-[#6B7280] mt-1">5.0 Star Global Reviews</p>
                </Card>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
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

              <Card className="lg:col-span-7 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-[#1C1C1C]">Latest Global Inquiries</h3>
                  <button onClick={() => setActiveTab('leads')} className="text-xs font-bold text-[#FF9D00] hover:underline">
                    Manage All
                  </button>
                </div>

                <div className="divide-y divide-[#E5E7EB]">
                  {leads.slice(0, 4).map((l) => (
                    <div key={l.id} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-[#1C1C1C]">{l.name}</p>
                        <p className="text-[11px] text-[#6B7280]">{l.email} • {l.country || l.city}</p>
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

        {/* TAB: MEDIA UPLOADER & URL GENERATOR */}
        {activeTab === 'media' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#1C1C1C]">Media Uploader & URL Generator</h1>
                <p className="text-xs text-[#6B7280]">
                  Upload local images to Supabase storage to generate permanent public CDN links
                </p>
              </div>
            </div>

            {/* Dropzone Upload Box */}
            <Card className="p-8 border-2 border-dashed border-[#FFD21E] bg-[#FFF9E6] text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FF9D00] text-white flex items-center justify-center mx-auto shadow-xs">
                <UploadCloud size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#1C1C1C]">Upload Image File</h3>
                <p className="text-xs text-[#6B7280]">
                  Select PNG, JPG, WEBP, or SVG files from your device to generate a copyable URL
                </p>
              </div>

              <div>
                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF9D00] text-white font-bold text-xs shadow-xs hover:bg-[#e08b00] cursor-pointer transition-colors min-h-[44px]">
                  <UploadCloud size={16} />
                  <span>{uploadingMedia ? 'Uploading Image...' : 'Choose Image File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingMedia}
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const url = await uploadImageFile(file);
                        copyToClipboard(url);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </Card>

            {/* Generated URLs List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#1C1C1C]">Uploaded Media Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mediaList.map((item) => (
                  <Card key={item.id} className="p-4 flex items-center gap-4 bg-white border border-[#E5E7EB]">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#F9FAFB] border border-[#E5E7EB] shrink-0">
                      <Image src={item.url} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="font-bold text-xs text-[#1C1C1C] truncate">{item.name}</p>
                      <input
                        type="text"
                        readOnly
                        value={item.url}
                        className="w-full px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-[11px] font-mono text-[#6B7280] truncate"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => copyToClipboard(item.url)}
                        className="px-3 py-2 rounded-lg bg-[#3B82F6] text-white font-bold text-xs flex items-center gap-1.5 hover:bg-[#2563EB] transition-colors min-h-[44px]"
                      >
                        {copiedUrl === item.url ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedUrl === item.url ? 'Copied!' : 'Copy URL'}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteMedia(item.id, item.url)}
                        className="p-2.5 rounded-lg border border-[#E5E7EB] hover:border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        title="Delete Image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PORTFOLIO MANAGER */}
        {activeTab === 'portfolio' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#1C1C1C]">Portfolio Manager</h1>
                <p className="text-xs text-[#6B7280]">Create, edit, or delete global case studies</p>
              </div>
              <Button onClick={() => { setEditingProject(null); setProjectCoverUrl(''); setProjectModalOpen(true); }} variant="primary" size="sm">
                <Plus size={14} />
                <span>Add New Project</span>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#F9FAFB] p-2.5 rounded-lg border border-[#E5E7EB]">
              <div className="relative flex-1 w-full">
                <Search size={14} className="absolute left-3 top-2.5 text-[#9CA3AF]" />
                <input
                  type="text"
                  value={portfolioSearch}
                  onChange={(e) => setPortfolioSearch(e.target.value)}
                  placeholder="Search projects by title, client name, or location..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                <Filter size={14} className="text-[#6B7280] shrink-0" />
                {['all', 'featured', 'web_dev', 'app_dev', 'website_upgrade', 'ugc_ads', 'seo', 'local_business', 'meta_ads', 'sales_growth'].map((st) => (
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

            {loading ? (
              <TableSkeleton rows={4} />
            ) : (
              <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-bold uppercase">
                      <th className="py-2.5 px-3">Case Study Title</th>
                      <th className="py-2.5 px-3">Client & Location</th>
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
                          <p className="text-[11px] text-[#6B7280]">{p.client_location || p.client_city}</p>
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
                            onClick={() => { setEditingProject(p); setProjectCoverUrl(p.cover_image_url); setProjectModalOpen(true); }}
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
                <p className="text-xs text-[#6B7280]">USD ($) budget ranges with country tags</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#F9FAFB] p-2.5 rounded-lg border border-[#E5E7EB]">
              <div className="relative flex-1 w-full">
                <Search size={14} className="absolute left-3 top-2.5 text-[#9CA3AF]" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Search leads by name, email, phone, or country..."
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

            <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-bold uppercase">
                    <th className="py-2.5 px-3">Contact</th>
                    <th className="py-2.5 px-3">Country</th>
                    <th className="py-2.5 px-3">Service</th>
                    <th className="py-2.5 px-3">Budget ($ USD)</th>
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
                        <p className="text-[11px] font-semibold text-[#6B7280]">{l.phone}</p>
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#6B7280]">{l.country || l.city}</td>
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
                <p className="text-xs text-[#6B7280]">Client quotes and 5-star ratings displayed site-wide</p>
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
                      <p className="text-xs text-[#6B7280]">{t.client_company} • {t.client_location || t.client_city}</p>
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

        {/* TAB 5: BLOG POSTS MANAGER */}
        {activeTab === 'blog' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#1C1C1C]">Advanced Blog Studio</h1>
                <p className="text-xs text-[#6B7280]">
                  Write, preview, and optimize SEO articles with live word count & keyword readiness
                </p>
              </div>
              <Button onClick={() => openBlogStudioModal(null)} variant="primary" size="sm">
                <Plus size={14} />
                <span>Open Writing Studio</span>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#F9FAFB] p-2.5 rounded-lg border border-[#E5E7EB]">
              <div className="relative flex-1 w-full">
                <Search size={14} className="absolute left-3 top-2.5 text-[#9CA3AF]" />
                <input
                  type="text"
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  placeholder="Search posts by title, slug, keyword, or city..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                <Filter size={14} className="text-[#6B7280] shrink-0" />
                {['all', 'seo', 'website_upgrade', 'web_dev', 'ugc_ads', 'local_business', 'meta_ads', 'sales_growth', 'general'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setBlogCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-[4px] text-xs font-bold uppercase whitespace-nowrap transition-all ${
                      blogCategoryFilter === cat
                        ? 'bg-[#FF9D00] text-white'
                        : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#1C1C1C]'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-bold uppercase">
                    <th className="py-2.5 px-3">Article Title & Slug</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">SEO Keyword</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredBlogPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-3 px-3">
                        <p className="font-bold text-[#1C1C1C] max-w-sm truncate">{post.title}</p>
                        <p className="text-[11px] text-[#6B7280]">/blog/{post.slug}</p>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-[4px] font-bold uppercase text-[10px] bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20">
                          {post.category.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-semibold text-[#FF9D00]">{post.target_keyword || '—'}</p>
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleTogglePublishPost(post.id)}
                          className={`px-2 py-0.5 rounded-[4px] font-bold text-[10px] border flex items-center gap-1 transition-all ${
                            post.is_published
                              ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
                              : 'bg-[#6B7280]/15 text-[#6B7280] border-[#6B7280]/30'
                          }`}
                        >
                          {post.is_published ? <Eye size={11} /> : <EyeOff size={11} />}
                          <span>{post.is_published ? 'LIVE' : 'Draft'}</span>
                        </button>
                      </td>
                      <td className="py-3 px-3 text-right space-x-2">
                        <button
                          onClick={() => openBlogStudioModal(post)}
                          className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#FF9D00] text-[#1C1C1C] transition-colors"
                          title="Open Writing Studio"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmBlogPost(post)}
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
          </div>
        )}

        {/* TAB 6: TEAM ARCHITECTS MANAGER */}
        {activeTab === 'team' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#1C1C1C]">Team Architects Manager</h1>
                <p className="text-xs text-[#6B7280]">
                  Manage team profiles on the About page ("Meet the Growth Architects")
                </p>
              </div>
              <Button onClick={() => { setEditingTeamMember(null); setTeamProfileUrl(''); setTeamModalOpen(true); }} variant="primary" size="sm">
                <Plus size={14} />
                <span>Add Team Member</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((m) => (
                <Card key={m.id} className="p-4 space-y-3 border border-[#E5E7EB]">
                  <div className="flex items-start gap-3">
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
                      onClick={() => { setEditingTeamMember(m); setTeamProfileUrl(m.profile_image_url || ''); setTeamModalOpen(true); }}
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

        {/* TAB 7: SITE CONTACT SETTINGS MANAGER */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-[#1C1C1C]">Site Contact Settings</h1>
                <p className="text-xs text-[#6B7280]">
                  Edit global address, phone, WhatsApp number, email, and social media links
                </p>
              </div>
            </div>

            <Card className="p-6 max-w-3xl">
              <form onSubmit={handleSaveSiteSettings} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1 flex items-center gap-1.5">
                      <Phone size={14} className="text-[#FF9D00]" />
                      <span>Display Phone Number *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      placeholder="+1 (800) 555-0199"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1 flex items-center gap-1.5">
                      <WhatsAppIcon size={14} fill="#25D366" />
                      <span>WhatsApp Number (Digits only, e.g. 18005550199) *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.whatsapp_number}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                      placeholder="18005550199"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>
                </div>

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
                      placeholder="hello@arusythapex.netlify.app"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1 flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#FF9D00]" />
                      <span>Global Remote HQ Address *</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      placeholder="Global Remote HQ • Austin, TX & International Hubs"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>
                </div>

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
                      placeholder="https://linkedin.com/company/arusyth-apex"
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
                      placeholder="https://twitter.com/arusyth_apex"
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
                      placeholder="https://instagram.com/arusyth_apex"
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

        {/* TAB 8: STUDENT PROJECTS & VIDEO FEEDBACK MANAGER (MSME Learnithm) */}
        {activeTab === 'student_projects' && (
          <div className="space-y-8">
            {/* Header & Overview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21E]/20 text-[#1C1C1C] font-bold text-xs mb-2">
                  <ShieldCheck size={14} className="text-[#FF9D00]" />
                  <span>MSME Registered &ldquo;Learnithm&rdquo;</span>
                </div>
                <h1 className="text-xl font-bold text-[#1C1C1C]">Student Projects & Video Reviews Manager</h1>
                <p className="text-xs text-[#6B7280]">
                  Manage video feedback (YouTube, Shorts, MP4) and CS final-year sample projects (Web Dev, Machine Learning, Deep Learning, Custom Domain)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => { setEditingStudentVideo(null); setStudentVideoModalOpen(true); }}
                  variant="secondary"
                  size="sm"
                >
                  <Video size={14} />
                  <span>+ Add Video Review</span>
                </Button>
                <Button
                  onClick={() => { setEditingStudentProj(null); setStudentProjModalOpen(true); }}
                  variant="primary"
                  size="sm"
                >
                  <Plus size={14} />
                  <span>+ Add Student Project</span>
                </Button>
              </div>
            </div>

            {/* SECTION 1: STUDENT VIDEO REVIEWS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#1C1C1C] flex items-center gap-2">
                  <Video size={18} className="text-[#FF9D00]" />
                  <span>Student Video Feedback & Testimonials ({feedbackVideos.length})</span>
                </h2>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#6B7280] font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3">Student & Branch</th>
                        <th className="p-3">Project Title & Category</th>
                        <th className="p-3">Video Link</th>
                        <th className="p-3">Rating</th>
                        <th className="p-3">Quote</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {feedbackVideos.map((video) => (
                        <tr key={video.id} className="hover:bg-[#F9FAFB] transition-colors">
                          <td className="p-3 font-semibold text-[#1C1C1C]">
                            <div className="font-bold">{video.student_name}</div>
                            <span className="px-2 py-0.5 rounded-md bg-[#FFD21E]/20 text-[#854D0E] text-[10px] font-bold inline-block mt-0.5">
                              {video.degree_branch}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-[#1C1C1C] max-w-xs truncate">{video.project_title}</div>
                            <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">{video.project_category}</span>
                          </td>
                          <td className="p-3">
                            <a
                              href={video.video_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#3B82F6] hover:underline flex items-center gap-1 font-semibold"
                            >
                              <Play size={12} className="fill-[#3B82F6]" />
                              <span>View Video</span>
                              <ExternalLink size={10} />
                            </a>
                          </td>
                          <td className="p-3 font-bold text-[#FF9D00]">
                            {video.rating} / 5 ⭐
                          </td>
                          <td className="p-3 text-[#6B7280] max-w-xs truncate italic">
                            &ldquo;{video.quote}&rdquo;
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => { setEditingStudentVideo(video); setStudentVideoModalOpen(true); }}
                              className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#FF9D00] text-[#1C1C1C]"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmStudentVideo(video)}
                              className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#EF4444] text-[#EF4444]"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* SECTION 2: STUDENT PROJECTS SHOWCASE */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#1C1C1C] flex items-center gap-2">
                  <Code size={18} className="text-[#3B82F6]" />
                  <span>Student Projects Showcase ({studentProjects.length})</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentProjects.map((proj) => (
                  <Card key={proj.id} className="p-4 space-y-3 border border-[#E5E7EB] relative">
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F9FAFB] border border-[#E5E7EB] shrink-0">
                        <Image
                          src={proj.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
                          alt={proj.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-bold text-sm text-[#1C1C1C] truncate">{proj.title}</h3>
                          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#3B82F6]/10 text-[#1D4ED8]">
                            {proj.degree}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7280] line-clamp-2 mt-1">{proj.description}</p>
                      </div>
                    </div>

                    {/* Deliverable Checkbox Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E5E7EB] text-[10px] font-semibold">
                      {proj.has_documentation && <span className="bg-[#10B981]/10 text-[#047857] px-2 py-0.5 rounded-md">IEEE Doc</span>}
                      {proj.has_presentation && <span className="bg-[#3B82F6]/10 text-[#1D4ED8] px-2 py-0.5 rounded-md">PPT Slides</span>}
                      {proj.has_certificate && <span className="bg-[#FFD21E]/30 text-[#854D0E] px-2 py-0.5 rounded-md">MSME Cert</span>}
                      {proj.has_custom_domain && <span className="bg-[#8B5CF6]/10 text-[#6D28D9] px-2 py-0.5 rounded-md">Custom Domain</span>}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]">
                      <div className="text-[11px] text-[#6B7280]">
                        Category: <strong className="text-[#1C1C1C] uppercase">{proj.category}</strong>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingStudentProj(proj); setStudentProjModalOpen(true); }}
                          className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#FF9D00] text-[#1C1C1C]"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmStudentProj(proj)}
                          className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#EF4444] text-[#EF4444]"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ADVANCED BLOG WRITING STUDIO MODAL */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-4xl bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4 my-8 shadow-2xl">
            {/* Modal Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FF9D00] text-white flex items-center justify-center font-bold">
                  <FileText size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1C1C1C]">
                    {editingBlogPost ? 'Edit Article Studio' : 'Advanced Blog Writing Studio'}
                  </h3>
                  <p className="text-xs text-[#6B7280]">Write, structure markdown, and preview live reader UI</p>
                </div>
              </div>

              {/* Studio Tabs Navigation */}
              <div className="flex items-center gap-1.5 bg-[#F9FAFB] p-1 rounded-lg border border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setBlogStudioTab('write')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    blogStudioTab === 'write' ? 'bg-[#FF9D00] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#1C1C1C]'
                  }`}
                >
                  ✍️ Writing Editor
                </button>
                <button
                  type="button"
                  onClick={() => setBlogStudioTab('meta')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    blogStudioTab === 'meta' ? 'bg-[#FF9D00] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#1C1C1C]'
                  }`}
                >
                  ⚙️ Metadata & SEO
                </button>
                <button
                  type="button"
                  onClick={() => setBlogStudioTab('preview')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    blogStudioTab === 'preview' ? 'bg-[#3B82F6] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#1C1C1C]'
                  }`}
                >
                  👁 Live Preview
                </button>
                <button onClick={() => setBlogModalOpen(false)} className="text-[#6B7280] hover:text-[#1C1C1C] p-1">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Real-time Content & SEO Health Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#FFF9E6] border border-[#FFD21E] rounded-xl text-xs">
              <div className="flex items-center gap-4 text-[#1C1C1C] font-semibold">
                <span>📝 Word Count: <strong className="font-mono-stats text-[#FF9D00]">{studioWordCount}</strong></span>
                <span>⏱ Read Time: <strong className="font-mono-stats text-[#FF9D00]">{studioReadTime} min</strong></span>
                <span>🎯 SEO Readiness: <strong className={`font-mono-stats ${hasKeywordInTitle ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>{hasKeywordInTitle ? '92/100 (Optimal)' : '75/100 (Add Keyword in Title)'}</strong></span>
              </div>
              <span className="text-[11px] text-[#6B7280] font-bold">Markdown Format Active</span>
            </div>

            <form onSubmit={handleSaveBlogPost} className="space-y-4">
              {/* TAB 1: WRITING EDITOR */}
              {blogStudioTab === 'write' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Article Title *</label>
                    <input
                      name="title"
                      required
                      value={blogTitleText}
                      onChange={(e) => setBlogTitleText(e.target.value)}
                      placeholder="e.g. Why Is My Website Ranking Dropping? 7 Technical SEO Fixes"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] text-base font-bold text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>

                  {/* Markdown Quick Formatting Toolbar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-[#1C1C1C]">Markdown Content Studio *</label>
                      <div className="flex items-center gap-1 bg-[#F9FAFB] p-1 rounded-md border border-[#E5E7EB]">
                        <button type="button" onClick={() => insertMarkdownToolbar('# ')} className="p-1 hover:bg-white rounded text-xs font-bold" title="H1 Heading"><Heading size={14} /></button>
                        <button type="button" onClick={() => insertMarkdownToolbar('## ')} className="p-1 hover:bg-white rounded text-xs font-bold" title="H2 Section">H2</button>
                        <button type="button" onClick={() => insertMarkdownToolbar('**', '**')} className="p-1 hover:bg-white rounded text-xs font-bold" title="Bold"><Bold size={14} /></button>

                        <button type="button" onClick={() => insertMarkdownToolbar('> ')} className="p-1 hover:bg-white rounded text-xs font-bold" title="Quote"><QuoteIcon size={14} /></button>
                        <button type="button" onClick={() => insertMarkdownToolbar('- ')} className="p-1 hover:bg-white rounded text-xs font-bold" title="Bullet List"><List size={14} /></button>
                        <button type="button" onClick={() => insertMarkdownToolbar('```javascript\n', '\n```')} className="p-1 hover:bg-white rounded text-xs font-bold" title="Code Block"><Code size={14} /></button>
                      </div>
                    </div>

                    <textarea
                      name="content"
                      required
                      rows={12}
                      value={blogContentText}
                      onChange={(e) => setBlogContentText(e.target.value)}
                      placeholder="# Article Heading&#10;&#10;Write detailed markdown article sections here..."
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-xs font-mono text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: METADATA & SEO */}
              {blogStudioTab === 'meta' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">URL Slug</label>
                      <input
                        name="slug"
                        defaultValue={editingBlogPost?.slug || ''}
                        placeholder="why-is-my-website-ranking-dropping"
                        className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Category *</label>
                      <select
                        name="category"
                        value={blogCategoryVal}
                        onChange={(e) => setBlogCategoryVal(e.target.value as BlogCategory)}
                        className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                      >
                        <option value="seo">SEO Optimization</option>
                        <option value="website_upgrade">Speed & SEO Upgrade</option>
                        <option value="web_dev">Web Engineering</option>
                        <option value="ugc_ads">UGC Video Ads</option>
                        <option value="local_business">Local Business Marketing</option>
                        <option value="meta_ads">Meta & LinkedIn Ads</option>
                        <option value="sales_growth">Sales Growth & CRO</option>
                        <option value="general">General Industry</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Target Primary Keyword</label>
                      <input
                        name="target_keyword"
                        value={blogKeywordText}
                        onChange={(e) => setBlogKeywordText(e.target.value)}
                        placeholder="e.g. why is my website ranking dropping"
                        className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Secondary Keywords (Comma-separated)</label>
                      <input
                        name="secondary_keywords"
                        value={blogSecondaryKeywordsText}
                        onChange={(e) => setBlogSecondaryKeywordsText(e.target.value)}
                        placeholder="e.g. Core Web Vitals, technical SEO audit, website speed"
                        className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Target Region</label>
                      <input
                        name="city"
                        defaultValue={editingBlogPost?.city || 'Global'}
                        placeholder="Global"
                        className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Author Name *</label>
                      <input
                        name="author_name"
                        required
                        value={blogAuthorVal}
                        onChange={(e) => setBlogAuthorVal(e.target.value)}
                        placeholder="Arusyth Apex Team"
                        className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Cover Image URL / Upload File *</label>
                    <div className="flex gap-2 items-center">
                      <input
                        name="cover_image_url"
                        value={blogCoverUrl || editingBlogPost?.cover_image_url || ''}
                        onChange={(e) => setBlogCoverUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="flex-1 px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                      />
                      <label className="px-3 py-2 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#FF9D00] text-xs font-bold text-[#1C1C1C] flex items-center gap-1 cursor-pointer transition-colors shrink-0 min-h-[44px]">
                        <UploadCloud size={14} className="text-[#FF9D00]" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              const url = await uploadImageFile(e.target.files[0]);
                              setBlogCoverUrl(url);
                              addToast('success', 'File uploaded and URL inserted!');
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Excerpt / Executive Summary *</label>
                    <textarea
                      name="excerpt"
                      required
                      rows={3}
                      value={blogExcerptText}
                      onChange={(e) => setBlogExcerptText(e.target.value)}
                      placeholder="Brief 1-2 sentence executive summary..."
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: LIVE ARTICLE PREVIEW */}
              {blogStudioTab === 'preview' && (
                <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-4 max-h-[400px] overflow-y-auto">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#3B82F6] text-white px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                      {blogCategoryVal}
                    </span>
                    {blogKeywordText && (
                      <span className="bg-[#FFF9E6] text-[#FF9D00] px-2 py-0.5 rounded text-[11px] font-bold border border-[#FFD21E]">
                        #{blogKeywordText}
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-extrabold text-[#1C1C1C]">{blogTitleText || 'Article Title'}</h1>
                  <p className="text-xs text-[#6B7280] italic border-l-4 border-[#FF9D00] pl-3 py-1">
                    "{blogExcerptText || 'Executive summary...'}"
                  </p>
                  <div className="pt-2 text-xs text-[#1C1C1C] whitespace-pre-line leading-relaxed font-sans border-t border-[#E5E7EB]">
                    {blogContentText || 'Write markdown content to preview...'}
                  </div>
                </div>
              )}

              {/* Publish Toggle & Action Buttons */}
              <div className="pt-3 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    name="is_published"
                    defaultChecked={editingBlogPost?.is_published ?? true}
                    className="w-4 h-4 text-[#FF9D00] rounded-sm focus:ring-[#FF9D00]"
                  />
                  <label htmlFor="is_published" className="text-xs font-bold text-[#1C1C1C]">
                    Publish Article Immediately (Visible to public readers & Google sitemap)
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <Button type="button" onClick={() => setBlogModalOpen(false)} variant="secondary" size="sm">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    <Send size={14} />
                    <span>Save & Publish Article</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG DELETE CONFIRM */}
      {deleteConfirmBlogPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-lg text-[#1C1C1C]">Confirm Delete</h3>
            <p className="text-xs text-[#6B7280]">
              Are you sure you want to delete article <strong className="text-[#1C1C1C]">{deleteConfirmBlogPost.title}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setDeleteConfirmBlogPost(null)} variant="secondary" size="sm">
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteBlogPost(deleteConfirmBlogPost.id)}
                variant="primary"
                size="sm"
                className="bg-[#EF4444] hover:bg-[#dc2626] border-none text-white"
              >
                Delete Article
              </Button>
            </div>
          </div>
        </div>
      )}

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
                    placeholder="e.g. Austin, TX & Global Remote"
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
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Profile Image URL / Upload File *</label>
                <div className="flex gap-2 items-center">
                  <input
                    name="profile_image_url"
                    value={teamProfileUrl || editingTeamMember?.profile_image_url || ''}
                    onChange={(e) => setTeamProfileUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                  <label className="px-3 py-2 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#FF9D00] text-xs font-bold text-[#1C1C1C] flex items-center gap-1 cursor-pointer transition-colors shrink-0 min-h-[44px]">
                    <UploadCloud size={14} className="text-[#FF9D00]" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await uploadImageFile(e.target.files[0]);
                          setTeamProfileUrl(url);
                          addToast('success', 'File uploaded and profile picture set!');
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Bio / Summary *</label>
                <textarea
                  name="bio"
                  required
                  rows={3}
                  defaultValue={editingTeamMember?.bio || ''}
                  placeholder="Briefly describe background..."
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

      {/* TEAM MEMBER DELETE CONFIRM */}
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
                  placeholder="e.g. Fintech SaaS Portal Rebuild"
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
                    placeholder="e.g. ZetaPay Global"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Client Location *</label>
                  <input
                    name="client_location"
                    required
                    defaultValue={editingProject?.client_location || editingProject?.client_city || ''}
                    placeholder="e.g. Austin, USA"
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
                    <option value="web_dev">Website Development</option>
                    <option value="app_dev">App Development</option>
                    <option value="website_upgrade">Old Website Upgrade</option>
                    <option value="ugc_ads">UGC Video Ads</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="local_business">Local Business Marketing</option>
                    <option value="meta_ads">Meta & LinkedIn Ads</option>
                    <option value="sales_growth">Sales Growth & Lead Gen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">URL Slug</label>
                  <input
                    name="slug"
                    defaultValue={editingProject?.slug || ''}
                    placeholder="cred-pay-fintech-portal"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Cover Image URL / Upload File *</label>
                <div className="flex gap-2 items-center">
                  <input
                    name="cover_image_url"
                    value={projectCoverUrl || editingProject?.cover_image_url || ''}
                    onChange={(e) => setProjectCoverUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                  <label className="px-3 py-2 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#FF9D00] text-xs font-bold text-[#1C1C1C] flex items-center gap-1 cursor-pointer transition-colors shrink-0 min-h-[44px]">
                    <UploadCloud size={14} className="text-[#FF9D00]" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await uploadImageFile(e.target.files[0]);
                          setProjectCoverUrl(url);
                          addToast('success', 'File uploaded and project cover set!');
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Live Project Website URL</label>
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
                  placeholder="+340% Qualified Leads | 0.8s Page Speed"
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
                  Mark as Featured Case Study
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
                  placeholder="e.g. David Miller"
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
                    placeholder="CEO, ZetaPay USA"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">Location *</label>
                  <input
                    name="client_location"
                    required
                    defaultValue={editingTestimonial?.client_location || editingTestimonial?.client_city || ''}
                    placeholder="Austin, USA"
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

      {/* STUDENT VIDEO REVIEW FORM MODAL */}
      {studentVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-xl bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <Video className="text-[#FF9D00]" size={20} />
                <h3 className="font-bold text-lg text-[#1C1C1C]">
                  {editingStudentVideo ? 'Edit Student Video Review' : 'Add Student Video Review'}
                </h3>
              </div>
              <button
                onClick={() => setStudentVideoModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStudentVideo} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Student Full Name *</label>
                  <input
                    name="student_name"
                    required
                    defaultValue={editingStudentVideo?.student_name || ''}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Degree / Branch *</label>
                  <input
                    name="degree_branch"
                    required
                    defaultValue={editingStudentVideo?.degree_branch || 'MCA Final Year'}
                    placeholder="e.g. MCA, BCA, B.Sc CS, M.Sc CS"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Project Title *</label>
                <input
                  name="project_title"
                  required
                  defaultValue={editingStudentVideo?.project_title || ''}
                  placeholder="e.g. AI Health Diagnostic System using Deep Learning"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Project Category *</label>
                  <select
                    name="project_category"
                    defaultValue={editingStudentVideo?.project_category || 'web_dev'}
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  >
                    <option value="web_dev">Web & Web Apps</option>
                    <option value="machine_learning">Machine Learning (ML)</option>
                    <option value="deep_learning">Deep Learning (DL)</option>
                    <option value="custom_domain">Custom Domain Setup</option>
                    <option value="full_stack">Full-Stack System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Rating (1 to 5) *</label>
                  <input
                    name="rating"
                    type="number"
                    min={1}
                    max={5}
                    required
                    defaultValue={editingStudentVideo?.rating || 5}
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                  Video Link (YouTube, Shorts, MP4, Vimeo) *
                </label>
                <input
                  name="video_url"
                  type="url"
                  required
                  defaultValue={editingStudentVideo?.video_url || ''}
                  placeholder="https://www.youtube.com/shorts/VIDEO_ID or https://www.youtube.com/watch?v=VIDEO_ID"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Thumbnail Cover Image URL (Optional)</label>
                <input
                  name="thumbnail_url"
                  type="url"
                  defaultValue={editingStudentVideo?.thumbnail_url || ''}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Student Quote / Video Review Summary *</label>
                <textarea
                  name="quote"
                  required
                  rows={3}
                  defaultValue={editingStudentVideo?.quote || ''}
                  placeholder="Write the student feedback quote..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="sv_featured"
                  name="is_featured"
                  defaultChecked={editingStudentVideo?.is_featured ?? true}
                  className="rounded border-[#E5E7EB] text-[#FF9D00] focus:ring-[#FF9D00]"
                />
                <label htmlFor="sv_featured" className="text-xs font-bold text-[#1C1C1C]">
                  Feature on Student Reviews Header
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" onClick={() => setStudentVideoModalOpen(false)} variant="secondary" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Video Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT VIDEO DELETE CONFIRM */}
      {deleteConfirmStudentVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-lg text-[#1C1C1C]">Delete Student Video Review</h3>
            <p className="text-xs text-[#6B7280]">
              Delete review video for student <strong className="text-[#1C1C1C]">{deleteConfirmStudentVideo.student_name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setDeleteConfirmStudentVideo(null)} variant="secondary" size="sm">
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteStudentVideo(deleteConfirmStudentVideo.id)}
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

      {/* STUDENT PROJECT SHOWCASE MODAL */}
      {studentProjModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <Code className="text-[#3B82F6]" size={20} />
                <h3 className="font-bold text-lg text-[#1C1C1C]">
                  {editingStudentProj ? 'Edit Student Sample Project' : 'Add Student Sample Project'}
                </h3>
              </div>
              <button
                onClick={() => setStudentProjModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStudentProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Project Title *</label>
                <input
                  name="title"
                  required
                  defaultValue={editingStudentProj?.title || ''}
                  placeholder="e.g. AI Medical Diagnosis & X-Ray Analysis System"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Domain Category *</label>
                  <select
                    name="category"
                    defaultValue={editingStudentProj?.category || 'web_dev'}
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  >
                    <option value="web_dev">Web & Web Apps</option>
                    <option value="machine_learning">Machine Learning (ML)</option>
                    <option value="deep_learning">Deep Learning (DL)</option>
                    <option value="custom_domain">Custom Domain Setup</option>
                    <option value="full_stack">Full-Stack System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Applicable Degree *</label>
                  <input
                    name="degree"
                    required
                    defaultValue={editingStudentProj?.degree || 'MCA / BCA'}
                    placeholder="e.g. BCA / MCA / B.Sc CS"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Project Description *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={editingStudentProj?.description || ''}
                  placeholder="Summarize project technical architecture, model accuracy, and features..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Tech Stack (Comma Separated) *</label>
                <input
                  name="tech_stack"
                  required
                  defaultValue={editingStudentProj?.tech_stack.join(', ') || 'Python, PyTorch, React, Flask'}
                  placeholder="e.g. Python, TensorFlow, PyTorch, React, Flask"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                />
              </div>

              {/* Package Checkboxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F9FAFB] p-3 rounded-xl border border-[#E5E7EB]">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1C] cursor-pointer">
                  <input
                    type="checkbox"
                    name="has_documentation"
                    defaultChecked={editingStudentProj?.has_documentation ?? true}
                    className="rounded text-[#10B981]"
                  />
                  <span>IEEE Report</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1C] cursor-pointer">
                  <input
                    type="checkbox"
                    name="has_presentation"
                    defaultChecked={editingStudentProj?.has_presentation ?? true}
                    className="rounded text-[#3B82F6]"
                  />
                  <span>PPT Slides</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1C] cursor-pointer">
                  <input
                    type="checkbox"
                    name="has_certificate"
                    defaultChecked={editingStudentProj?.has_certificate ?? true}
                    className="rounded text-[#FF9D00]"
                  />
                  <span>MSME Cert</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1C] cursor-pointer">
                  <input
                    type="checkbox"
                    name="has_custom_domain"
                    defaultChecked={editingStudentProj?.has_custom_domain ?? true}
                    className="rounded text-[#8B5CF6]"
                  />
                  <span>Custom Domain</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Demo Website Link</label>
                  <input
                    name="demo_url"
                    type="url"
                    defaultValue={editingStudentProj?.demo_url || ''}
                    placeholder="https://med-ai-demo.learnithm.in"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Cover Image URL</label>
                  <input
                    name="image_url"
                    type="url"
                    defaultValue={editingStudentProj?.image_url || ''}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" onClick={() => setStudentProjModalOpen(false)} variant="secondary" size="sm">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Student Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT PROJECT DELETE CONFIRM */}
      {deleteConfirmStudentProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-lg text-[#1C1C1C]">Delete Student Project</h3>
            <p className="text-xs text-[#6B7280]">
              Delete student project <strong className="text-[#1C1C1C]">{deleteConfirmStudentProj.title}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setDeleteConfirmStudentProj(null)} variant="secondary" size="sm">
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteStudentProject(deleteConfirmStudentProj.id)}
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
