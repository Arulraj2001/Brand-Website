'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Play,
  Pause,
  Code2,
  Brain,
  Cpu,
  Globe,
  FileText,
  Presentation,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  Send,
  X,
  Check,
  Video,
  ExternalLink,
} from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import StatCounter from '@/components/ui/StatCounter';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import LeadFormModal from '@/components/ui/LeadFormModal';
import { useStudentData, useSiteSettings } from '@/lib/useSiteData';
import { StudentFeedbackVideo } from '@/types';
import { submitLead } from '@/lib/supabase/data';

// Helper to convert any YouTube, YouTube Shorts, Vimeo, or MP4 URL into embeddable format
export function parseVideoEmbed(url: string): { type: 'youtube' | 'vimeo' | 'mp4' | 'unknown'; embedUrl: string } {
  if (!url) return { type: 'unknown', embedUrl: '' };

  // YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch && shortsMatch[1]) {
    return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=1&rel=0` };
  }

  // YouTube standard watch: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&rel=0` };
  }

  // YouTube Embed: https://www.youtube.com/embed/VIDEO_ID
  if (url.includes('youtube.com/embed/')) {
    return { type: 'youtube', embedUrl: url };
  }

  // Vimeo: https://vimeo.com/VIDEO_ID
  const vimeoMatch = url.match(/vimeo\.com\/([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return { type: 'vimeo', embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1` };
  }

  // MP4 Direct Video URL
  if (url.endsWith('.mp4') || url.includes('.mp4?')) {
    return { type: 'mp4', embedUrl: url };
  }

  return { type: 'unknown', embedUrl: url };
}

export default function StudentProjectsClient() {
  const { feedbackVideos, projects } = useStudentData();
  const { settings } = useSiteSettings();

  // Filters state
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>('all');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');

  // Marquee pause state
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Video modal player state
  const [activeVideoModal, setActiveVideoModal] = useState<StudentFeedbackVideo | null>(null);

  // Lead Modal state
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Student Form local state
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    degree: 'MCA',
    domain: 'web_dev',
    requirements: '',
  });
  const [submittingForm, setSubmittingForm] = useState(false);

  const activeSettings = settings;
  const cleanPhone = activeSettings.whatsapp_number.replace(/[^0-9]/g, '');

  const branches = [
    { id: 'all', label: 'All Branches' },
    { id: 'BCA', label: 'BCA' },
    { id: 'MCA', label: 'MCA' },
    { id: 'B.Sc CS', label: 'B.Sc CS' },
    { id: 'M.Sc CS', label: 'M.Sc CS' },
    { id: 'B.Tech', label: 'B.Tech CS' },
  ];

  const domainCategories = [
    { id: 'all', label: 'All Domains', icon: Globe },
    { id: 'web_dev', label: 'Web & Web Apps', icon: Code2 },
    { id: 'machine_learning', label: 'Machine Learning', icon: Brain },
    { id: 'deep_learning', label: 'Deep Learning', icon: Cpu },
    { id: 'custom_domain', label: 'Custom Domain Setup', icon: Globe },
  ];

  // Filter video feedback
  const filteredVideos = feedbackVideos.filter((video) => {
    if (selectedBranchFilter === 'all') return true;
    return video.degree_branch.toLowerCase().includes(selectedBranchFilter.toLowerCase());
  });

  // Duplicate video feedback list for seamless infinite left-to-right marquee animation
  const marqueeVideos = [...filteredVideos, ...filteredVideos, ...filteredVideos, ...filteredVideos];

  // Filter student projects
  const filteredProjects = projects.filter((project) => {
    if (selectedDomainFilter === 'all') return true;
    return project.category === selectedDomainFilter;
  });

  const handleStudentFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingForm(true);

    const leadPayload = {
      name: studentForm.name,
      email: studentForm.email,
      phone: studentForm.phone,
      country: `Student (${studentForm.degree})`,
      service_interested: `Student Project - ${studentForm.domain.toUpperCase()}`,
      budget_range: 'Academic Guidance',
      message: `Branch/Degree: ${studentForm.degree} | Domain: ${studentForm.domain} | Details: ${studentForm.requirements}`,
    };

    await submitLead(leadPayload);
    setSubmittingForm(false);
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setLeadModalOpen(false);
      setStudentForm({
        name: '',
        email: '',
        phone: '',
        degree: 'MCA',
        domain: 'web_dev',
        requirements: '',
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1C1C1C]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FFFDF5] via-white to-[#FAFAFA] border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            
            {/* Minimal Styled Card for learnithm.vercel.app */}
            <div>
              <a
                href="https://learnithm.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FFD21E] shadow-xs hover:shadow-md transition-all group text-xs md:text-sm font-semibold text-[#1C1C1C]"
              >
                <div className="w-6 h-6 rounded-lg bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles size={14} />
                </div>
                <span>Official Learnithm LMS & Academic Portal:</span>
                <span className="text-[#FF9D00] font-bold flex items-center gap-1 underline">
                  learnithm.vercel.app
                  <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            </div>

            {/* MSME Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD21E]/20 border border-[#FFD21E]/50 text-[#1C1C1C] text-xs md:text-sm font-bold shadow-xs">
              <ShieldCheck size={16} className="text-[#FF9D00]" />
              <span>MSME Registered Enterprise • &ldquo;Learnithm&rdquo;</span>
              <span className="bg-[#FF9D00] text-white px-2 py-0.5 rounded-full text-[11px]">Verified</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#1C1C1C] tracking-tight leading-[1.15]">
              Final Year CS Projects, IEEE Reports & <GradientText>MSME Certifications</GradientText>
            </h1>

            <p className="text-base md:text-lg text-[#6B7280] leading-relaxed">
              Complete final year project guidance for <strong className="text-[#1C1C1C]">BCA, MCA, B.Sc CS, M.Sc CS, B.Tech CS</strong> & IT branches under MSME registered <strong className="text-[#1C1C1C]">Learnithm</strong>. 
              Over <strong className="text-[#FF9D00]">80+ students</strong> successfully cleared their Viva with full Source Code, Documentation, Presentations, Custom Domains & MSME Certificates.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setLeadModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-[#FFD21E] hover:bg-[#FFC000] text-[#1C1C1C] font-bold text-sm shadow-md transition-transform hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap size={18} />
                <span>Get Project Guidance</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="#video-feedback"
                className="px-6 py-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#FF9D00] text-[#1C1C1C] font-semibold text-sm shadow-xs transition-colors flex items-center gap-2"
              >
                <Play size={16} className="text-[#FF9D00] fill-[#FF9D00]" />
                <span>Watch 80+ Student Reviews</span>
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-[#E5E7EB]">
              <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-[#1C1C1C]">
                  <StatCounter value={80} suffix="+" />
                </div>
                <div className="text-xs text-[#6B7280] font-medium mt-1">Students Guided</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-[#FF9D00]">
                  <StatCounter value={100} suffix="%" />
                </div>
                <div className="text-xs text-[#6B7280] font-medium mt-1">Viva Pass Rate</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-[#3B82F6]">MSME</div>
                <div className="text-xs text-[#6B7280] font-medium mt-1">Govt Registered</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-[#10B981] flex items-center justify-center gap-1">
                  <span>4.9</span>
                  <Star size={18} className="fill-[#10B981] text-[#10B981]" />
                </div>
                <div className="text-xs text-[#6B7280] font-medium mt-1">Student Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DOMAIN PILLARS SECTION */}
      <section className="py-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight">
              Supported Project Domains & Technical Specializations
            </h2>
            <p className="text-sm md:text-base text-[#6B7280]">
              We build custom projects tailored to university requirements with complete source code and viva explanation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Website Engineering */}
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] hover:border-[#FFD21E] transition-all hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-[#FFD21E]/20 border border-[#FFD21E] text-[#1C1C1C] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code2 size={24} className="text-[#FF9D00]" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">Websites & Web Apps</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                Full-stack portals, e-commerce, LMS systems built with React, Next.js, Node.js, Python Flask/Django & Supabase databases.
              </p>
              <ul className="space-y-1.5 text-xs text-[#1C1C1C]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>Responsive UI & Admin Dashboards</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>Payment Gateway & Auth Integration</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Machine Learning */}
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] hover:border-[#FFD21E] transition-all hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">Machine Learning (ML)</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                Predictive models, classification pipelines, sales forecasting, churn prediction using Scikit-Learn, XGBoost & Pandas.
              </p>
              <ul className="space-y-1.5 text-xs text-[#1C1C1C]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>Jupyter Notebooks + Clean Datasets</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>Interactive Streamlit / Web UI</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Deep Learning */}
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] hover:border-[#FFD21E] transition-all hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#8B5CF6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">Deep Learning (DL)</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                Computer Vision, CNN image recognition, YOLO object detection, medical image analysis using PyTorch, TensorFlow & OpenCV.
              </p>
              <ul className="space-y-1.5 text-xs text-[#1C1C1C]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>95%+ Model Test Accuracy</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>Real-time Webcam / API inference</span>
                </li>
              </ul>
            </div>

            {/* Pillar 4: Custom Domain */}
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] hover:border-[#FFD21E] transition-all hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">Custom Domain Deployment</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                Live cloud hosting with your custom domain (e.g., studentproject.com), SSL certificates, and active online demo links.
              </p>
              <ul className="space-y-1.5 text-xs text-[#1C1C1C]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>Vercel / AWS / Netlify Deployment</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>Live URL for External Examiners</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT IS INCLUDED PACKAGE CARD - CLEAN HIGH-CONTRAST BRAND COLOR SCHEME */}
      <section className="py-16 bg-[#F9FAFB] border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-gradient-to-r from-[#FFFDF5] via-[#FFF9E6] to-[#FFFDF5] border border-[#FFD21E] rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
            {/* Background Accent glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD21E]/15 rounded-full filter blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[#1C1C1C] text-xs uppercase font-extrabold tracking-widest bg-[#FFD21E] px-3.5 py-1.5 rounded-full border border-[#E5E7EB] inline-block mb-3 shadow-xs">
                All-In-One Student Academic Kit
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mb-3">
                Everything Delivered Under MSME Registered &ldquo;Learnithm&rdquo;
              </h2>
              <p className="text-[#6B7280] text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
                We don't just send code — we equip you with everything needed to ace your project evaluation, impress your external examiner, and build your career portfolio.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div className="flex items-start gap-3.5 bg-white border border-[#E5E7EB] hover:border-[#FF9D00] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD21E]/20 border border-[#FFD21E]/50 text-[#1C1C1C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Code2 size={20} className="text-[#FF9D00]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1C1C1C] text-sm group-hover:text-[#FF9D00] transition-colors">Full Source Code</h4>
                    <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">Clean, commented, modular code repository with installation steps.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-white border border-[#E5E7EB] hover:border-[#FF9D00] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD21E]/20 border border-[#FFD21E]/50 text-[#1C1C1C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FileText size={20} className="text-[#FF9D00]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1C1C1C] text-sm group-hover:text-[#FF9D00] transition-colors">IEEE & SRS Report</h4>
                    <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">Complete project documentation report as per university guidelines.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-white border border-[#E5E7EB] hover:border-[#FF9D00] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD21E]/20 border border-[#FFD21E]/50 text-[#1C1C1C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Presentation size={20} className="text-[#FF9D00]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1C1C1C] text-sm group-hover:text-[#FF9D00] transition-colors">PPT Presentation</h4>
                    <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">Professional PowerPoint presentation slides for viva defense.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-white border border-[#E5E7EB] hover:border-[#FF9D00] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD21E]/20 border border-[#FFD21E]/50 text-[#1C1C1C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Award size={20} className="text-[#FF9D00]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1C1C1C] text-sm group-hover:text-[#FF9D00] transition-colors">MSME Certificate</h4>
                    <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">Official project completion certificate from Learnithm (MSME Govt Reg).</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-white border border-[#E5E7EB] hover:border-[#FF9D00] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD21E]/20 border border-[#FFD21E]/50 text-[#1C1C1C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Globe size={20} className="text-[#FF9D00]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1C1C1C] text-sm group-hover:text-[#FF9D00] transition-colors">Custom Domain Host</h4>
                    <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">Live custom domain URL hosting for online examiner review.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-white border border-[#E5E7EB] hover:border-[#FF9D00] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD21E]/20 border border-[#FFD21E]/50 text-[#1C1C1C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap size={20} className="text-[#FF9D00]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1C1C1C] text-sm group-hover:text-[#FF9D00] transition-colors">1-on-1 Viva Prep</h4>
                    <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">Personal code explanation session so you answer all viva questions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STUDENT VIDEO FEEDBACK SECTION - LEFT TO RIGHT MOVING CAROUSEL WITH PAUSE & PLAY */}
      <section id="video-feedback" className="py-16 md:py-24 bg-white border-b border-[#E5E7EB] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21E]/20 text-[#1C1C1C] font-bold text-xs mb-2">
                <Video size={14} className="text-[#FF9D00]" />
                <span>Video Testimonials • Continuous Motion</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight">
                Student Video Reviews & Success Stories
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Hover over any review card to pause motion and click to play the video.
              </p>
            </div>

            {/* Controls: Branch Filter & Pause/Resume Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#FF9D00] text-xs font-bold text-[#1C1C1C] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer mr-2"
                aria-label={isMarqueePaused ? 'Resume video review motion' : 'Pause video review motion'}
              >
                {isMarqueePaused ? (
                  <>
                    <Play size={13} className="text-[#10B981] fill-[#10B981]" />
                    <span>Resume Motion</span>
                  </>
                ) : (
                  <>
                    <Pause size={13} className="text-[#FF9D00]" />
                    <span>Pause Motion</span>
                  </>
                )}
              </button>

              {branches.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => setSelectedBranchFilter(branch.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedBranchFilter === branch.id
                      ? 'bg-[#1C1C1C] text-white shadow-xs'
                      : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {branch.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Moving Marquee Container */}
        {filteredVideos.length === 0 ? (
          <div className="max-w-[1200px] mx-auto px-4 text-center py-12 bg-[#FAFAFA] rounded-2xl border border-dashed border-[#E5E7EB]">
            <Video className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-sm font-semibold text-[#1C1C1C]">No video reviews found for this branch filter.</p>
            <button
              onClick={() => setSelectedBranchFilter('all')}
              className="mt-2 text-xs font-bold text-[#FF9D00] hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div
            className="relative w-full overflow-hidden py-4 bg-[#FAFAFA]/50 border-y border-[#E5E7EB]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left to Right Moving Track */}
            <div
              className="animate-marquee-ltr gap-6 px-4"
              style={{ animationPlayState: (isMarqueePaused || isHovered) ? 'paused' : 'running' }}
            >
              {marqueeVideos.map((video, idx) => {
                return (
                  <div
                    key={`${video.id}-${idx}`}
                    className="w-[320px] md:w-[350px] shrink-0 bg-white border border-[#E5E7EB] hover:border-[#FFD21E] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group cursor-pointer"
                    onClick={() => setActiveVideoModal(video)}
                  >
                    {/* Video Poster Container */}
                    <div className="relative aspect-video bg-black overflow-hidden group">
                      {video.thumbnail_url ? (
                        <Image
                          src={video.thumbnail_url}
                          alt={video.student_name}
                          fill
                          sizes="(max-width: 768px) 100vw, 350px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white">
                          <Video size={40} className="text-[#FFD21E]" />
                        </div>
                      )}

                      {/* Play Overlay Button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play size={24} className="fill-[#1C1C1C] ml-1" />
                        </div>
                      </div>

                      <span className="absolute top-3 left-3 bg-[#1C1C1C]/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <GraduationCap size={12} className="text-[#FFD21E]" />
                        {video.degree_branch}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: video.rating || 5 }).map((_, i) => (
                            <Star key={i} size={14} className="fill-[#FF9D00] text-[#FF9D00]" />
                          ))}
                        </div>

                        <h3 className="font-extrabold text-[#1C1C1C] text-base leading-snug line-clamp-2 group-hover:text-[#FF9D00] transition-colors">
                          {video.project_title}
                        </h3>

                        <p className="text-xs text-[#6B7280] italic mt-2 line-clamp-3 bg-[#F9FAFB] p-3 rounded-lg border border-[#E5E7EB]">
                          &ldquo;{video.quote}&rdquo;
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xs text-[#1C1C1C]">{video.student_name}</div>
                          <div className="text-[11px] text-[#6B7280]">{video.degree_branch}</div>
                        </div>

                        <span className="text-xs font-bold text-[#FF9D00] flex items-center gap-1">
                          <span>Play Video</span>
                          <Play size={12} className="fill-[#FF9D00]" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* 5. SAMPLE PROJECTS SHOWCASE */}
      <section className="py-16 bg-[#FAFAFA] border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[#FF9D00] text-xs uppercase font-extrabold tracking-wider">
                Ready-to-Deploy Codebases
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight mt-1">
                Completed Final Year Project Showcase
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Explore real projects built for BCA, MCA, B.Sc CS, and M.Sc CS students with source code & custom domain.
              </p>
            </div>

            {/* Domain Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {domainCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedDomainFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      selectedDomainFilter === cat.id
                        ? 'bg-[#FFD21E] text-[#1C1C1C] font-bold shadow-xs'
                        : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:border-[#FF9D00]'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row group"
              >
                {/* Project Image */}
                <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 bg-slate-100">
                  <Image
                    src={project.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-[#1C1C1C]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {project.degree}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-[#1C1C1C] text-lg leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mt-2">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tech_stack.map((tech, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-[#F3F4F6] text-[#374151] px-2 py-0.5 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Included Badges */}
                  <div className="pt-3 border-t border-[#E5E7EB] flex flex-wrap items-center gap-2 text-[11px] font-medium text-[#4B5563]">
                    {project.has_documentation && (
                      <span className="bg-[#10B981]/10 text-[#047857] px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                        <Check size={12} /> IEEE Report
                      </span>
                    )}
                    {project.has_presentation && (
                      <span className="bg-[#3B82F6]/10 text-[#1D4ED8] px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                        <Check size={12} /> PPT Included
                      </span>
                    )}
                    {project.has_certificate && (
                      <span className="bg-[#FFD21E]/30 text-[#854D0E] px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                        <Award size={12} /> MSME Cert
                      </span>
                    )}
                    {project.has_custom_domain && (
                      <span className="bg-[#8B5CF6]/10 text-[#6D28D9] px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                        <Globe size={12} /> Custom Domain
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION / LEAD FORM SECTION - BUDGET REMOVED */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-gradient-to-r from-[#FFFDF5] to-[#FFF9E6] border border-[#FFD21E] rounded-3xl p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Column Text */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21E] text-[#1C1C1C] text-xs font-extrabold">
                <GraduationCap size={16} />
                <span>Submit Your Requirements</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight">
                Need Help with Your Final Year CS Project?
              </h2>

              <p className="text-sm md:text-base text-[#6B7280] leading-relaxed">
                Whether you need assistance with <strong className="text-[#1C1C1C]">Website Development, Machine Learning, Deep Learning, Custom Domain Hosting</strong>, or documentation — our team at <strong className="text-[#1C1C1C]">Learnithm (MSME Registered)</strong> will guide you step-by-step.
              </p>

              <div className="space-y-2 pt-2 text-xs md:text-sm font-semibold text-[#1C1C1C]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#10B981]" />
                  <span>100% Viva Pass Guarantee & 1-on-1 Code Explanation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#10B981]" />
                  <span>Official MSME Registered &ldquo;Learnithm&rdquo; Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#10B981]" />
                  <span>Full IEEE Project Report & Slide Deck Included</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Learnithm! I am a final year student looking for project guidance.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs md:text-sm flex items-center gap-2 shadow-md hover:bg-[#20ba5a] transition-all"
                >
                  <WhatsAppIcon size={18} fill="white" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right Column Form */}
            <div className="bg-white border border-[#E5E7EB] p-6 md:p-8 rounded-2xl shadow-md">
              <h3 className="font-bold text-lg text-[#1C1C1C] mb-1">Request Free Project Consultation</h3>
              <p className="text-xs text-[#6B7280] mb-6">Fill out your degree & domain details to receive a free synopsis & demo link.</p>

              {inquirySubmitted ? (
                <div className="p-6 bg-[#ECFDF5] border border-[#10B981] rounded-xl text-center space-y-2">
                  <CheckCircle2 size={36} className="text-[#10B981] mx-auto" />
                  <h4 className="font-bold text-sm text-[#065F46]">Request Submitted Successfully!</h4>
                  <p className="text-xs text-[#047857]">Our Learnithm academic mentor will reach out on WhatsApp/Email within 1 hour.</p>
                </div>
              ) : (
                <form onSubmit={handleStudentFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Verma"
                        value={studentForm.name}
                        onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1C1C1C] mb-1">WhatsApp / Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={studentForm.phone}
                        onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Branch / Degree *</label>
                      <select
                        value={studentForm.degree}
                        onChange={(e) => setStudentForm({ ...studentForm, degree: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
                      >
                        <option value="BCA">BCA Final Year</option>
                        <option value="MCA">MCA Final Year</option>
                        <option value="B.Sc CS">B.Sc CS</option>
                        <option value="M.Sc CS">M.Sc CS</option>
                        <option value="B.Tech CS">B.Tech CS</option>
                        <option value="Other CS Branch">Other CS / IT Branch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Project Domain *</label>
                      <select
                        value={studentForm.domain}
                        onChange={(e) => setStudentForm({ ...studentForm, domain: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
                      >
                        <option value="web_dev">Website & Web App</option>
                        <option value="machine_learning">Machine Learning (ML)</option>
                        <option value="deep_learning">Deep Learning (DL)</option>
                        <option value="custom_domain">Custom Domain Deployment</option>
                        <option value="full_stack">Full-Stack System</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">Project Requirements / Title Idea</label>
                    <textarea
                      rows={3}
                      placeholder="Mention your university requirements, deadlines, or preferred title..."
                      value={studentForm.requirements}
                      onChange={(e) => setStudentForm({ ...studentForm, requirements: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingForm}
                    className="w-full py-3 bg-[#FFD21E] hover:bg-[#FFC000] text-[#1C1C1C] font-extrabold text-xs rounded-xl shadow-md transition-transform flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submittingForm ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO PLAYER MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-[#1C1C1C] text-white rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-slate-900">
              <div>
                <h4 className="font-bold text-sm text-white">{activeVideoModal.student_name} ({activeVideoModal.degree_branch})</h4>
                <p className="text-xs text-gray-400">{activeVideoModal.project_title}</p>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {(() => {
                const parsed = parseVideoEmbed(activeVideoModal.video_url);
                if (parsed.type === 'youtube' || parsed.type === 'vimeo') {
                  return (
                    <iframe
                      src={parsed.embedUrl}
                      title={activeVideoModal.project_title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                } else if (parsed.type === 'mp4') {
                  return (
                    <video
                      src={parsed.embedUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  );
                } else {
                  return (
                    <div className="text-center p-6 space-y-3">
                      <p className="text-xs text-gray-300">Direct playback link: {activeVideoModal.video_url}</p>
                      <a
                        href={activeVideoModal.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold rounded-lg inline-block"
                      >
                        Open External Video
                      </a>
                    </div>
                  );
                }
              })()}
            </div>

            {/* Quote Bottom */}
            <div className="p-4 bg-slate-900 border-t border-gray-800 text-xs text-gray-300 italic">
              &ldquo;{activeVideoModal.quote}&rdquo;
            </div>
          </div>
        </div>
      )}

      {/* LEAD CONSULTATION MODAL */}
      <LeadFormModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultService="Student Project - Web Development"
        hideBudget={true}
        isStudentModal={true}
      />
    </div>
  );
}