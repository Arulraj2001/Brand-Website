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
    <div className="min-h-screen bg-[#05060A] text-white relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#FFB800]/10 blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#00F0FF]/5 blur-[200px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/[0.08] relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Learnithm Portal Link Pill */}
            <div>
              <a
                href="https://learnithm.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl cyber-glass border border-white/[0.1] hover:border-[#FFB800]/50 shadow-lg hover:shadow-[#FFB800]/10 transition-all group text-xs md:text-sm font-mono text-gray-200"
              >
                <div className="w-6 h-6 rounded-lg bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles size={14} />
                </div>
                <span>Official Academic LMS Portal:</span>
                <span className="text-[#FFB800] font-bold flex items-center gap-1 underline">
                  learnithm.vercel.app
                  <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            </div>

            {/* MSME Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-gray-200 text-xs md:text-sm font-mono shadow-xs">
              <ShieldCheck size={16} className="text-[#FFB800]" />
              <span>MSME Registered Enterprise &bull; &ldquo;Learnithm&rdquo;</span>
              <span className="bg-[#FFB800] text-black px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono">Verified</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Final Year CS Projects, IEEE Reports &amp; <GradientText>MSME Certifications</GradientText>
            </h1>

            <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
              Complete final year engineering mentorship for <strong className="text-white font-semibold">BCA, MCA, B.Sc CS, M.Sc CS, B.Tech CS</strong> &amp; IT branches under MSME-registered <strong className="text-white font-semibold">Learnithm</strong>. 
              Over <strong className="text-[#FFB800] font-mono">80+ students</strong> cleared their IEEE Viva with full source code, architecture reports, viva slides, custom domains &amp; verified certificates.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setLeadModalOpen(true)}
                className="px-7 py-3.5 rounded-xl bg-[#FFB800] hover:bg-[#FFD21E] text-black font-mono font-bold text-sm shadow-lg shadow-[#FFB800]/25 transition-transform hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap size={18} />
                <span>Request Project Guidance</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="#video-feedback"
                className="px-6 py-3.5 rounded-xl cyber-glass border border-white/[0.1] hover:border-[#FFB800]/50 text-white font-mono text-sm shadow-md transition-colors flex items-center gap-2"
              >
                <Play size={15} className="text-[#FFB800] fill-[#FFB800]" />
                <span>Watch 80+ Student Reviews</span>
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/[0.08]">
              <div className="p-5 rounded-2xl cyber-glass border border-white/[0.08] shadow-xl text-center">
                <div className="text-3xl md:text-4xl font-black text-white font-mono">
                  <StatCounter value={80} suffix="+" />
                </div>
                <div className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wider">Students Guided</div>
              </div>
              <div className="p-5 rounded-2xl cyber-glass border border-white/[0.08] shadow-xl text-center">
                <div className="text-3xl md:text-4xl font-black text-[#FFB800] font-mono">
                  <StatCounter value={100} suffix="%" />
                </div>
                <div className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wider">Viva Pass Rate</div>
              </div>
              <div className="p-5 rounded-2xl cyber-glass border border-white/[0.08] shadow-xl text-center">
                <div className="text-3xl md:text-4xl font-black text-[#00F0FF] font-mono">MSME</div>
                <div className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wider">Govt Registered</div>
              </div>
              <div className="p-5 rounded-2xl cyber-glass border border-white/[0.08] shadow-xl text-center">
                <div className="text-3xl md:text-4xl font-black text-[#10B981] font-mono flex items-center justify-center gap-1">
                  <span>4.9</span>
                  <Star size={20} className="fill-[#10B981] text-[#10B981]" />
                </div>
                <div className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wider">Student Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DOMAIN PILLARS SECTION */}
      <section className="py-20 border-b border-white/[0.08] relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="text-[#FFB800] text-xs font-mono font-bold uppercase tracking-wider">Specialized Disciplines</span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Supported Project Domains &amp; Technical Stacks
            </h2>
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
              Every project is constructed strictly to university guidelines with production-grade architecture and full viva explanation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Website Engineering */}
            <div className="p-6 rounded-3xl cyber-glass border border-white/[0.08] hover:border-[#FFB800]/40 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Code2 size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Websites &amp; Web Apps</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                Full-stack portals, e-commerce, LMS systems built with React, Next.js, Node.js, Python Flask/Django &amp; Supabase databases.
              </p>
              <ul className="space-y-2 text-xs text-gray-300 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                  <span>Responsive UI &amp; Admin Dashboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                  <span>Auth &amp; Payment API Integration</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Machine Learning */}
            <div className="p-6 rounded-3xl cyber-glass border border-white/[0.08] hover:border-[#FFB800]/40 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Brain size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Machine Learning (ML)</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                Predictive models, classification pipelines, sales forecasting, churn prediction using Scikit-Learn, XGBoost &amp; Pandas.
              </p>
              <ul className="space-y-2 text-xs text-gray-300 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                  <span>Jupyter Notebooks + Clean Datasets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                  <span>Interactive Streamlit / Web UI</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Deep Learning */}
            <div className="p-6 rounded-3xl cyber-glass border border-white/[0.08] hover:border-[#FFB800]/40 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Cpu size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Deep Learning (DL)</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                Computer Vision, CNN image recognition, YOLO object detection, medical imaging using PyTorch, TensorFlow &amp; OpenCV.
              </p>
              <ul className="space-y-2 text-xs text-gray-300 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                  <span>95%+ Model Test Accuracy</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                  <span>Real-time Webcam / API Inference</span>
                </li>
              </ul>
            </div>

            {/* Pillar 4: Custom Domain */}
            <div className="p-6 rounded-3xl cyber-glass border border-white/[0.08] hover:border-[#FFB800]/40 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Globe size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Live Cloud Deployment</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                Cloud hosting with your custom domain (e.g., studentproject.com), SSL certificates, and active examiner demo URL.
              </p>
              <ul className="space-y-2 text-xs text-gray-300 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                  <span>Vercel / AWS / Netlify Production</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                  <span>Live URL for External Examiners</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT IS INCLUDED PACKAGE CARD */}
      <section className="py-20 border-b border-white/[0.08] relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="cyber-glass-glow border border-[#FFB800]/30 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden">
            {/* Background Accent glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB800]/10 rounded-full filter blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[#FFB800] text-xs uppercase font-mono font-bold tracking-widest bg-[#FFB800]/10 px-3.5 py-1.5 rounded-full border border-[#FFB800]/30 inline-block mb-4 shadow-xs">
                All-In-One Academic Deliverable Kit
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
                Everything Delivered Under MSME Registered &ldquo;Learnithm&rdquo;
              </h2>
              <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-10 max-w-2xl">
                We equip you with every artifact required to ace your evaluation, score top grades with external examiners, and accelerate your engineering portfolio.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div className="flex items-start gap-4 cyber-glass border border-white/[0.08] hover:border-[#FFB800]/40 p-5 rounded-2xl shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-[#FFB800] transition-colors">Full Source Code</h4>
                    <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">Clean, commented, modular code repository with installation steps.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 cyber-glass border border-white/[0.08] hover:border-[#FFB800]/40 p-5 rounded-2xl shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-[#FFB800] transition-colors">IEEE &amp; SRS Report</h4>
                    <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">Complete project documentation report as per university guidelines.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 cyber-glass border border-white/[0.08] hover:border-[#FFB800]/40 p-5 rounded-2xl shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Presentation size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-[#FFB800] transition-colors">PPT Presentation</h4>
                    <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">Professional PowerPoint defense slides for viva presentation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 cyber-glass border border-white/[0.08] hover:border-[#FFB800]/40 p-5 rounded-2xl shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-[#FFB800] transition-colors">MSME Certificate</h4>
                    <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">Official project completion certificate from Learnithm (MSME Govt Reg).</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 cyber-glass border border-white/[0.08] hover:border-[#FFB800]/40 p-5 rounded-2xl shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-[#FFB800] transition-colors">Custom Domain Host</h4>
                    <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">Live custom domain URL hosting for online examiner review.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 cyber-glass border border-white/[0.08] hover:border-[#FFB800]/40 p-5 rounded-2xl shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-[#FFB800] transition-colors">1-on-1 Viva Prep</h4>
                    <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">Personal code explanation session so you answer all viva questions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STUDENT VIDEO FEEDBACK SECTION */}
      <section id="video-feedback" className="py-20 md:py-28 border-b border-white/[0.08] overflow-hidden relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] font-mono font-bold text-xs mb-2.5 border border-[#FFB800]/25">
                <Video size={14} className="text-[#FFB800]" />
                <span>Continuous Video Feed &bull; 80+ Testimonials</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Student Video Reviews &amp; Success Stories
              </h2>
              <p className="text-sm text-gray-400 font-light mt-1">
                Hover over any review card to pause motion and click to play the student&apos;s testimonial.
              </p>
            </div>

            {/* Controls: Branch Filter & Pause/Resume Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                className="px-3.5 py-1.5 rounded-xl cyber-glass border border-white/[0.1] hover:border-[#FFB800] text-xs font-mono font-bold text-white flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer mr-2"
                aria-label={isMarqueePaused ? 'Resume video review motion' : 'Pause video review motion'}
              >
                {isMarqueePaused ? (
                  <>
                    <Play size={13} className="text-[#10B981] fill-[#10B981]" />
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <Pause size={13} className="text-[#FFB800]" />
                    <span>Pause</span>
                  </>
                )}
              </button>

              {branches.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => setSelectedBranchFilter(branch.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedBranchFilter === branch.id
                      ? 'bg-[#FFB800] text-black font-bold shadow-lg shadow-[#FFB800]/20'
                      : 'cyber-glass text-gray-400 border border-white/[0.08] hover:text-white'
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
          <div className="max-w-[1240px] mx-auto px-4 text-center py-16 cyber-glass rounded-3xl border border-dashed border-white/10">
            <Video className="mx-auto text-gray-500 mb-2" size={32} />
            <p className="text-sm font-mono text-gray-400">No video reviews found for this branch filter.</p>
            <button
              onClick={() => setSelectedBranchFilter('all')}
              className="mt-2 text-xs font-mono font-bold text-[#FFB800] hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div
            className="relative w-full overflow-hidden py-4 border-y border-white/[0.08]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left to Right Moving Track */}
            <div
              className="animate-marquee-ltr gap-6 px-4"
              style={{ animationPlayState: (isMarqueePaused || isHovered) ? 'paused' : 'running' }}
            >
              {marqueeVideos.map((video, idx) => {
                const isDuplicateTrackItem = idx >= filteredVideos.length;
                return (
                  <div
                    key={`${video.id}-${idx}`}
                    aria-hidden={isDuplicateTrackItem ? 'true' : undefined}
                    tabIndex={isDuplicateTrackItem ? -1 : undefined}
                    className="w-[320px] md:w-[350px] shrink-0 cyber-glass border border-white/[0.08] hover:border-[#FFB800]/50 rounded-3xl overflow-hidden shadow-2xl transition-all flex flex-col group cursor-pointer"
                    onClick={() => setActiveVideoModal(video)}
                  >
                    {/* Video Poster Container */}
                    <div className="relative aspect-video bg-[#090A12] overflow-hidden group">
                      {video.thumbnail_url ? (
                        <Image
                          src={video.thumbnail_url}
                          alt={video.student_name}
                          fill
                          sizes="(max-width: 768px) 100vw, 350px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#0D0F19] flex items-center justify-center text-white">
                          <Video size={40} className="text-[#FFB800]" />
                        </div>
                      )}

                      {/* Play Overlay Button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-[#FFB800] text-black flex items-center justify-center shadow-lg shadow-[#FFB800]/30 group-hover:scale-110 transition-transform">
                          <Play size={22} className="fill-black ml-1" />
                        </div>
                      </div>

                      <span className="absolute top-3 left-3 cyber-glass text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                        <GraduationCap size={12} className="text-[#FFB800]" />
                        {video.degree_branch}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: video.rating || 5 }).map((_, i) => (
                            <Star key={i} size={14} className="fill-[#FFB800] text-[#FFB800]" />
                          ))}
                        </div>

                        <h3 className="font-bold text-white text-base leading-snug line-clamp-2 group-hover:text-[#FFB800] transition-colors">
                          {video.project_title}
                        </h3>

                        <p className="text-xs text-gray-400 font-light italic mt-2 line-clamp-3 bg-white/[0.02] p-3 rounded-xl border border-white/[0.06]">
                          &ldquo;{video.quote}&rdquo;
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xs text-white">{video.student_name}</div>
                          <div className="text-[11px] font-mono text-gray-400">{video.degree_branch}</div>
                        </div>

                        <span className="text-xs font-mono font-bold text-[#FFB800] flex items-center gap-1">
                          <span>Play Video</span>
                          <Play size={11} className="fill-[#FFB800]" />
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
      <section className="py-20 border-b border-white/[0.08] relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#FFB800] text-xs uppercase font-mono font-bold tracking-wider">
                Production-Tested Repositories
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-1">
                Completed Final Year Project Showcase
              </h2>
              <p className="text-sm text-gray-400 font-light mt-1">
                Explore real projects built for BCA, MCA, B.Sc CS, and M.Sc CS students with source code &amp; custom domain.
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
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      selectedDomainFilter === cat.id
                        ? 'bg-[#FFB800] text-black font-bold shadow-lg shadow-[#FFB800]/20'
                        : 'cyber-glass border border-white/[0.08] text-gray-400 hover:text-white'
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
                className="cyber-glass border border-white/[0.08] rounded-3xl overflow-hidden shadow-xl hover:border-[#FFB800]/40 transition-all flex flex-col md:flex-row group"
              >
                {/* Project Image */}
                <div className="relative w-full md:w-52 h-48 md:h-auto shrink-0 bg-[#090A12]">
                  <Image
                    src={project.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  />
                  <span className="absolute top-3 left-3 cyber-glass text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-white/10">
                    {project.degree}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-lg leading-snug group-hover:text-[#FFB800] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mt-2">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tech_stack.map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono bg-white/[0.04] border border-white/[0.08] text-gray-300 px-2 py-0.5 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Included Badges */}
                  <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-2 text-[11px] font-mono text-gray-300">
                    {project.has_documentation && (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                        <Check size={12} /> IEEE Report
                      </span>
                    )}
                    {project.has_presentation && (
                      <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                        <Check size={12} /> PPT Included
                      </span>
                    )}
                    {project.has_certificate && (
                      <span className="bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20 px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                        <Award size={12} /> MSME Cert
                      </span>
                    )}
                    {project.has_custom_domain && (
                      <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                        <Globe size={12} /> Live Domain
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION / LEAD FORM SECTION */}
      <section className="py-20 md:py-28 relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="cyber-glass-glow border border-[#FFB800]/30 rounded-3xl p-8 md:p-14 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Column Text */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB800]/15 text-[#FFB800] text-xs font-mono font-bold border border-[#FFB800]/30">
                <GraduationCap size={16} />
                <span>Submit Your Requirements</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Need Help with Your Final Year CS Project?
              </h2>

              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                Whether you need assistance with <strong className="text-white font-semibold">Web Development, Machine Learning, Deep Learning, Live Domain Deployment</strong>, or IEEE reports — our mentors at <strong className="text-white font-semibold">Learnithm (MSME Registered)</strong> will guide you step-by-step.
              </p>

              <div className="space-y-2.5 pt-2 text-xs md:text-sm font-mono text-gray-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                  <span>100% Viva Pass Guarantee &amp; 1-on-1 Code Explanation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                  <span>Official MSME Registered &ldquo;Learnithm&rdquo; Certificate</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                  <span>Full IEEE Project Report &amp; Slide Deck Included</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Learnithm! I am a final year student looking for project guidance.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#25D366] text-black font-mono font-bold text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-[#25D366]/20 hover:bg-[#20ba5a] transition-all hover:scale-105"
                >
                  <WhatsAppIcon size={18} fill="black" />
                  <span>Direct WhatsApp Channel</span>
                </a>
              </div>
            </div>

            {/* Right Column Form */}
            <div className="cyber-glass border border-white/[0.08] p-6 md:p-8 rounded-2xl shadow-xl">
              <h3 className="font-black text-lg text-white mb-1">Request Free Project Consultation</h3>
              <p className="text-xs font-mono text-gray-400 mb-6">Fill in your degree &amp; domain to receive a free synopsis &amp; demo link.</p>

              {inquirySubmitted ? (
                <div className="p-6 bg-emerald-500/[0.05] border border-emerald-500/25 rounded-xl text-center space-y-2 font-mono">
                  <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-sm text-white">Request Dispatched Successfully!</h4>
                  <p className="text-xs text-gray-300">Our Learnithm mentor will connect on WhatsApp within 1 hour.</p>
                </div>
              ) : (
                <form onSubmit={handleStudentFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-300 mb-1.5">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Verma"
                        value={studentForm.name}
                        onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs font-mono border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#FFB800] bg-white/[0.04] text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-300 mb-1.5">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={studentForm.phone}
                        onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs font-mono border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#FFB800] bg-white/[0.04] text-white placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-300 mb-1.5">Branch / Degree *</label>
                      <select
                        value={studentForm.degree}
                        onChange={(e) => setStudentForm({ ...studentForm, degree: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs font-mono border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#FFB800] bg-[#0D0F19] text-white cursor-pointer"
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
                      <label className="block text-xs font-mono font-bold text-gray-300 mb-1.5">Project Domain *</label>
                      <select
                        value={studentForm.domain}
                        onChange={(e) => setStudentForm({ ...studentForm, domain: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs font-mono border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#FFB800] bg-[#0D0F19] text-white cursor-pointer"
                      >
                        <option value="web_dev">Website &amp; Web App</option>
                        <option value="machine_learning">Machine Learning (ML)</option>
                        <option value="deep_learning">Deep Learning (DL)</option>
                        <option value="custom_domain">Custom Domain Deployment</option>
                        <option value="full_stack">Full-Stack System</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-300 mb-1.5">Project Requirements / Title Idea</label>
                    <textarea
                      rows={3}
                      placeholder="Mention your university requirements, deadlines, or preferred title..."
                      value={studentForm.requirements}
                      onChange={(e) => setStudentForm({ ...studentForm, requirements: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-mono border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#FFB800] bg-white/[0.04] text-white placeholder-gray-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingForm}
                    className="w-full py-3 bg-[#FFB800] hover:bg-[#FFD21E] text-black font-mono font-bold text-xs rounded-xl shadow-lg shadow-[#FFB800]/20 transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl cyber-glass border border-white/[0.15] text-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/[0.08] bg-[#0D0F19]">
              <div>
                <h4 className="font-bold text-sm text-white">{activeVideoModal.student_name} ({activeVideoModal.degree_branch})</h4>
                <p className="text-xs font-mono text-gray-400">{activeVideoModal.project_title}</p>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
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
                    <div className="text-center p-6 space-y-3 font-mono">
                      <p className="text-xs text-gray-300">Direct playback link: {activeVideoModal.video_url}</p>
                      <a
                        href={activeVideoModal.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#FFB800] text-black text-xs font-bold rounded-xl inline-block"
                      >
                        Open External Video
                      </a>
                    </div>
                  );
                }
              })()}
            </div>

            {/* Quote Bottom */}
            <div className="p-4 bg-[#0D0F19] border-t border-white/[0.08] text-xs text-gray-300 font-light italic">
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