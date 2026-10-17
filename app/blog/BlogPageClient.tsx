'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, BookOpen, MapPin, ChevronLeft, ChevronRight, Search, Sparkles, User, Tag, TrendingUp, ShieldCheck, ArrowUpDown } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BlogPost } from '@/types';
import { getBlogPosts, getBlogPostTimestamp } from '@/lib/supabase/data';

const POSTS_PER_PAGE = 6;

export type BlogSortOption = 'recent' | 'oldest' | 'alphabetical';

function getReadTimeMinutes(content?: string): number {
  const wordCount = content ? content.trim().split(/\s+/).filter(Boolean).length : 300;
  return Math.max(2, Math.ceil(wordCount / 200));
}

interface BlogPageClientProps {
  initialPosts?: BlogPost[];
}

export default function BlogPageClient({ initialPosts = [] }: BlogPageClientProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<BlogSortOption>('recent');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(initialPosts.length === 0);

  useEffect(() => {
    if (initialPosts && initialPosts.length > 0) {
      return;
    }

    let isMounted = true;
    async function loadData() {
      const data = await getBlogPosts(true);
      if (isMounted) {
        if (data) {
          setPosts(data);
        }
        setLoading(false);
      }
    }
    loadData();

    return () => {
      isMounted = false;
    };
  }, [initialPosts]);

  useEffect(() => {
    const handleUpdate = () => {
      getBlogPosts(true).then((data) => {
        if (data) setPosts(data);
      });
    };
    window.addEventListener('ostrune_blog_updated', handleUpdate);
    return () => window.removeEventListener('ostrune_blog_updated', handleUpdate);
  }, []);

  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    setCurrentPage(1);
  };

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.target_keyword && p.target_keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'recent') {
      const timeA = getBlogPostTimestamp(a);
      const timeB = getBlogPostTimestamp(b);
      if (timeB !== timeA) return timeB - timeA;
      const createA = new Date(a.created_at || 0).getTime();
      const createB = new Date(b.created_at || 0).getTime();
      if (createB !== createA) return createB - createA;
      return (b.slug || b.id || '').localeCompare(a.slug || a.id || '');
    }
    if (sortBy === 'oldest') {
      const timeA = getBlogPostTimestamp(a);
      const timeB = getBlogPostTimestamp(b);
      if (timeA !== timeB) return timeA - timeB;
      const createA = new Date(a.created_at || 0).getTime();
      const createB = new Date(b.created_at || 0).getTime();
      if (createA !== createB) return createA - createB;
      return (a.slug || a.id || '').localeCompare(b.slug || b.id || '');
    }
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const featuredPost = sortedPosts.find((p) => p.is_published) || sortedPosts[0];
  const gridPosts = sortedPosts.filter((p) => p.id !== featuredPost?.id);

  const totalPages = Math.max(1, Math.ceil(gridPosts.length / POSTS_PER_PAGE));
  const effectiveCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (effectiveCurrentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = gridPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const featuredReadTimeMinutes = getReadTimeMinutes(featuredPost?.content);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  return (
    <div className="pt-32 pb-24 bg-[#05060A] text-white min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#FFB800]/10 blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#00F0FF]/5 blur-[200px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] text-[#FFB800] text-xs font-mono font-bold border border-white/[0.1] shadow-xs">
            <Sparkles size={14} className="text-[#FFB800]" />
            Engineering Telemetry &amp; Growth Intelligence Hub
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Engineering Blueprints &amp; <GradientText>Growth Protocols</GradientText>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            In-depth engineering teardowns on Next.js runtime performance, legacy architecture migrations, high-ROAS creative systems, and technical SEO architecture.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <span className="flex items-center gap-2 cyber-glass px-3.5 py-1.5 rounded-full border border-white/[0.08] text-xs font-mono text-gray-300">
              <TrendingUp size={13} className="text-[#10B981]" /> Actionable Technical Blueprints
            </span>
            <span className="flex items-center gap-2 cyber-glass px-3.5 py-1.5 rounded-full border border-white/[0.08] text-xs font-mono text-gray-300">
              <ShieldCheck size={13} className="text-[#00F0FF]" /> Peer-Reviewed Architecture
            </span>
          </div>
        </div>

        {/* Featured Article Banner */}
        {!loading && featuredPost && (
          <div className="relative overflow-hidden border border-[#FFB800]/30 cyber-glass-glow shadow-2xl rounded-3xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Image */}
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[380px] overflow-hidden bg-[#090A12]">
                <Image
                  src={
                    featuredPost.cover_image_url ||
                    `/api/blog-banner?title=${encodeURIComponent(featuredPost.title)}&category=${encodeURIComponent(featuredPost.category)}&excerpt=${encodeURIComponent(featuredPost.excerpt || '')}&city=${encodeURIComponent(featuredPost.city || 'Global')}`
                  }
                  alt=""
                  fill
                  className="object-cover blur-xl opacity-30 scale-110"
                />
                <Image
                  src={
                    featuredPost.cover_image_url ||
                    `/api/blog-banner?title=${encodeURIComponent(featuredPost.title)}&category=${encodeURIComponent(featuredPost.category)}&excerpt=${encodeURIComponent(featuredPost.excerpt || '')}&city=${encodeURIComponent(featuredPost.city || 'Global')}`
                  }
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain p-4 relative z-10 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060A]/90 via-transparent to-transparent pointer-events-none z-15" />
                <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#FFB800] text-black text-xs font-mono font-bold uppercase shadow-lg shadow-[#FFB800]/20">
                    Flagship Dossier
                  </span>
                  <span className="px-3 py-1 rounded-full cyber-glass text-white text-xs font-mono border border-white/20">
                    {featuredPost.category.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Right Details */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-[#FFB800]" /> {new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-[#00F0FF]" /> {featuredReadTimeMinutes} min read
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#FFB800] transition-colors leading-tight">
                    <Link href={`/blog/${featuredPost.slug}`} prefetch={true}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  {featuredPost.target_keyword && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1 rounded-full border border-[#00F0FF]/25">
                      <Tag size={11} /> #{featuredPost.target_keyword.replace(/\s+/g, '-')}
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center font-bold text-xs">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{featuredPost.author_name}</p>
                      <p className="text-[10px] font-mono text-gray-400">Principal Architect</p>
                    </div>
                  </div>

                  <Button href={`/blog/${featuredPost.slug}`} prefetch={true} variant="primary" size="sm">
                    <span>Read Dossier</span>
                    <ArrowUpRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Keyword Search Bar & Sort Dropdown */}
        <div className="space-y-4">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search telemetry by title, keyword, or architecture..."
                className="w-full pl-11 pr-14 py-3 rounded-2xl cyber-glass border border-white/[0.1] text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800] transition-colors shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-xs font-mono font-bold text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Control Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
              <div className="relative inline-flex items-center cyber-glass border border-white/[0.1] rounded-2xl px-4 py-3 text-xs font-mono text-gray-300 hover:border-[#FFB800]/40 transition-colors">
                <ArrowUpDown size={14} className="text-[#FFB800] mr-2 shrink-0" />
                <span className="text-gray-400 mr-1 hidden md:inline">Sort:</span>
                <select
                  aria-label="Sort articles"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as BlogSortOption);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent font-mono font-bold text-xs text-white focus:outline-none cursor-pointer pr-1"
                >
                  <option value="recent" className="bg-[#0D0F19] text-white">Most Recent (Default)</option>
                  <option value="oldest" className="bg-[#0D0F19] text-white">Oldest First</option>
                  <option value="alphabetical" className="bg-[#0D0F19] text-white">Alphabetical (A–Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Standardized Filter Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            {[
              { id: 'all', label: 'All Articles' },
              { id: 'seo', label: 'SEO' },
              { id: 'web_dev', label: 'Web Dev' },
              { id: 'app_dev', label: 'App Dev' },
              { id: 'website_upgrade', label: 'Website Upgrade' },
              { id: 'local_business', label: 'Local Business' },
              { id: 'meta_ads', label: 'Meta Ads' },
              { id: 'ugc_ads', label: 'UGC Ads' },
              { id: 'sales_growth', label: 'Sales Growth' },
              { id: 'general', label: 'General' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleFilterChange(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all min-h-[40px] ${
                  filter === item.id
                    ? 'bg-[#FFB800] text-black shadow-lg shadow-[#FFB800]/20'
                    : 'cyber-glass text-gray-400 border border-white/[0.08] hover:text-white hover:border-white/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        {loading ? (
          <div className="py-20 text-center text-gray-400 font-mono text-xs uppercase tracking-widest">
            Decrypting published articles...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16 space-y-3 cyber-glass rounded-3xl border border-white/[0.08] p-8 max-w-lg mx-auto">
            <BookOpen size={36} className="mx-auto text-[#FFB800]" />
            <h3 className="text-lg font-black text-white">No Matching Records</h3>
            <p className="text-xs text-gray-400 font-light">Try searching with a different term or resetting the filter category.</p>
          </div>
        ) : gridPosts.length === 0 ? null : (
          <div className="space-y-10">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              <AnimatePresence mode="popLayout">
                {paginatedPosts.map((post) => {
                  const pubDate = post.published_at || post.created_at;
                  const formattedDate = pubDate
                    ? new Date(pubDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Recent';

                  const readTimeMinutes = getReadTimeMinutes(post.content);

                  return (
                    <motion.div
                      layout
                      key={post.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                      className="flex col-span-1"
                    >
                      <div className="cyber-glass rounded-3xl border border-white/[0.08] hover:border-[#FFB800]/40 transition-all duration-300 flex flex-col justify-between w-full overflow-hidden group shadow-xl">
                        {/* Cover Image Container */}
                        <div className="relative h-52 w-full overflow-hidden bg-[#090A12]">
                          <Image
                            src={
                              post.cover_image_url ||
                              `/api/blog-banner?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&excerpt=${encodeURIComponent(post.excerpt || '')}&city=${encodeURIComponent(post.city || 'Global')}`
                            }
                            alt=""
                            fill
                            className="object-cover blur-lg opacity-30 scale-110"
                          />
                          <Image
                            src={
                              post.cover_image_url ||
                              `/api/blog-banner?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&excerpt=${encodeURIComponent(post.excerpt || '')}&city=${encodeURIComponent(post.city || 'Global')}`
                            }
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-contain p-3 relative z-10 group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#05060A]/80 via-transparent to-transparent pointer-events-none z-15" />

                          {/* Category Badge */}
                          <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5">
                            <span className="bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase backdrop-blur-md">
                              {post.category.replace('_', ' ')}
                            </span>
                          </div>

                          {post.city && (
                            <div className="absolute top-3 right-3 z-30 cyber-glass text-white text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10">
                              <MapPin size={10} className="text-[#00F0FF]" />
                              {post.city}
                            </div>
                          )}
                        </div>

                        {/* Content Body */}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar size={11} className="text-[#FFB800]" /> {formattedDate}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock size={11} className="text-[#00F0FF]" /> {readTimeMinutes} min read
                              </span>
                            </div>

                            <h3 className="font-bold text-white group-hover:text-[#FFB800] transition-colors text-base line-clamp-2 leading-snug">
                              <Link href={`/blog/${post.slug}`} prefetch={true}>
                                {post.title}
                              </Link>
                            </h3>

                            <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>

                            {post.target_keyword && (
                              <div className="text-[10px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-0.5 rounded-full border border-[#00F0FF]/20 inline-block">
                                #{post.target_keyword.replace(/\s+/g, '-')}
                              </div>
                            )}
                          </div>

                          {/* Author & Read Link Bar */}
                          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                            <span className="text-[11px] font-mono text-gray-400 truncate max-w-[120px]">
                              By {post.author_name}
                            </span>
                            <Link
                              href={`/blog/${post.slug}`}
                              prefetch={true}
                              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#FFB800] group-hover:text-[#FFD21E] transition-colors"
                            >
                              <span>Read Dossier</span>
                              <ArrowUpRight size={13} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls Bar */}
            {totalPages > 1 && (
              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs font-mono text-gray-400">
                  Displaying <strong className="text-white font-bold">{startIndex + 1}</strong> to{' '}
                  <strong className="text-white font-bold">
                    {Math.min(startIndex + POSTS_PER_PAGE, gridPosts.length)}
                  </strong>{' '}
                  of <strong className="text-white font-bold">{gridPosts.length}</strong> dossiers
                </p>

                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(effectiveCurrentPage - 1)}
                    disabled={effectiveCurrentPage === 1}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all min-h-[40px] ${
                      effectiveCurrentPage === 1
                        ? 'opacity-30 cursor-not-allowed cyber-glass text-gray-500 border border-white/[0.04]'
                        : 'cyber-glass text-white border border-white/[0.08] hover:border-[#FFB800] hover:text-[#FFB800]'
                    }`}
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>

                  {/* Numbered Page Buttons */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all ${
                          effectiveCurrentPage === pageNum
                            ? 'bg-[#FFB800] text-black shadow-lg shadow-[#FFB800]/20'
                            : 'cyber-glass text-gray-400 border border-white/[0.08] hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(effectiveCurrentPage + 1)}
                    disabled={effectiveCurrentPage === totalPages}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all min-h-[40px] ${
                      effectiveCurrentPage === totalPages
                        ? 'opacity-30 cursor-not-allowed cyber-glass text-gray-500 border border-white/[0.04]'
                        : 'cyber-glass text-white border border-white/[0.08] hover:border-[#FFB800] hover:text-[#FFB800]'
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
