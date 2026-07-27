'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, BookOpen, MapPin, ChevronLeft, ChevronRight, Search, Sparkles, User, Tag, TrendingUp, ShieldCheck } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BlogPost } from '@/types';
import { getBlogPosts } from '@/lib/supabase/data';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getBlogPosts(true);
      setPosts(data);
      setLoading(false);
    }
    loadData();
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

  const featuredPost = posts.find((p) => p.is_published) || posts[0];
  const gridPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = gridPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  return (
    <div className="pt-28 pb-20 bg-[#F9FAFB] min-h-screen bg-line-pattern">
      <div className="max-w-[1200px] mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
            <Sparkles size={14} className="text-[#1C1C1C]" />
            ApexPulse Engineering & Growth Knowledge Hub
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1C1C] tracking-tight">
            Technical Insights & <GradientText>Search Dominance Guides</GradientText>
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed">
            Actionable strategies on sub-second web speed, old website overhauls, high-ROAS UGC video ads, and global SEO positioning.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#6B7280] pt-1">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E5E7EB]">
              <TrendingUp size={13} className="text-[#10B981]" /> Verified Growth Case Studies
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E5E7EB]">
              <ShieldCheck size={13} className="text-[#3B82F6]" /> Written by Senior Engineers
            </span>
          </div>
        </div>

        {/* Featured Article Banner (High-Impact Hero Card) */}
        {!loading && featuredPost && (
          <Card className="p-0 overflow-hidden border-2 border-[#FFD21E] bg-white shadow-md rounded-2xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Image (7 Cols) */}
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[380px] overflow-hidden bg-[#1C1C1C]">
                <Image
                  src={featuredPost.cover_image_url}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-[4px] bg-[#FF9D00] text-white text-xs font-extrabold uppercase shadow-xs">
                    Featured Masterclass
                  </span>
                  <span className="px-3 py-1 rounded-[4px] bg-[#1C1C1C]/80 text-white text-xs font-semibold backdrop-blur-xs border border-white/20">
                    {featuredPost.category.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Right Details (5 Cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> {new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> 5 min read
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1C] group-hover:text-[#FF9D00] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  {featuredPost.target_keyword && (
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-[4px]">
                      <Tag size={11} /> #{featuredPost.target_keyword.replace(/\s+/g, '-')}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FFF9E6] border border-[#FFD21E] text-[#FF9D00] flex items-center justify-center font-bold text-xs">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1C1C1C]">{featuredPost.author_name}</p>
                      <p className="text-[10px] text-[#6B7280]">Technical Growth Strategist</p>
                    </div>
                  </div>

                  <Button href={`/blog/${featuredPost.slug}`} variant="primary" size="sm">
                    <span>Read Article</span>
                    <ArrowUpRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Live Keyword Search Bar & Category Filter Bar */}
        <div className="space-y-4">
          <div className="max-w-xl mx-auto relative">
            <Search size={16} className="absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search guides by title, target keyword, or topic (e.g. speed, SEO, ads)..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs sm:text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs font-bold text-[#6B7280] hover:text-[#1C1C1C]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            {[
              { id: 'all', label: 'All Articles' },
              { id: 'seo', label: 'SEO' },
              { id: 'website_upgrade', label: 'Speed & SEO Upgrade' },
              { id: 'web_dev', label: 'Web Engineering' },
              { id: 'ugc_ads', label: 'UGC Ads' },
              { id: 'local_business', label: 'Local Business' },
              { id: 'meta_ads', label: 'Meta Ads' },
              { id: 'sales_growth', label: 'Sales Growth' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleFilterChange(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[44px] ${
                  filter === item.id
                    ? 'bg-[#FF9D00] text-white shadow-xs'
                    : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#1C1C1C]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        {loading ? (
          <div className="py-16 text-center text-[#6B7280] font-medium text-sm">
            Loading published articles...
          </div>
        ) : gridPosts.length === 0 ? (
          <div className="text-center py-12 space-y-3 bg-white rounded-2xl border border-[#E5E7EB] p-8">
            <BookOpen size={32} className="mx-auto text-[#FF9D00]" />
            <h3 className="text-lg font-bold text-[#1C1C1C]">No Articles Found</h3>
            <p className="text-xs text-[#6B7280]">Try searching with a different keyword or resetting filters.</p>
          </div>
        ) : (
          <div className="space-y-10">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              <AnimatePresence mode="wait">
                {paginatedPosts.map((post) => {
                  const pubDate = post.published_at || post.created_at;
                  const formattedDate = pubDate
                    ? new Date(pubDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Recent';

                  const wordCount = post.content ? post.content.split(/\s+/).length : 300;
                  const readTimeMinutes = Math.max(2, Math.ceil(wordCount / 200));

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
                      <Card className="flex flex-col justify-between w-full p-0 overflow-hidden group hover:border-[#FF9D00] transition-colors">
                        {/* Cover Image Container */}
                        <div className="relative h-48 w-full overflow-hidden bg-[#F9FAFB]">
                          <Image
                            src={
                              post.cover_image_url ||
                              'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
                            }
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/60 via-transparent to-transparent opacity-80" />

                          {/* Category Badge */}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            <span className="bg-[#3B82F6] text-white px-2 py-0.5 rounded-[4px] text-[11px] font-bold uppercase">
                              {post.category.replace('_', ' ')}
                            </span>
                          </div>

                          {post.city && (
                            <div className="absolute top-2.5 right-2.5 bg-[#1C1C1C]/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-[4px] flex items-center gap-1 backdrop-blur-xs">
                              <MapPin size={10} className="text-[#3B82F6]" />
                              {post.city}
                            </div>
                          )}
                        </div>

                        {/* Content Body */}
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[11px] text-[#6B7280] font-semibold">
                              <span className="flex items-center gap-1">
                                <Calendar size={11} /> {formattedDate}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock size={11} /> {readTimeMinutes} min read
                              </span>
                            </div>

                            <h3 className="font-bold text-[#1C1C1C] group-hover:text-[#FF9D00] transition-colors text-base line-clamp-2 leading-snug">
                              {post.title}
                            </h3>

                            <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>

                            {post.target_keyword && (
                              <div className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded inline-block">
                                #{post.target_keyword.replace(/\s+/g, '-')}
                              </div>
                            )}
                          </div>

                          {/* Author & Read Link Bar */}
                          <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-[#6B7280] truncate max-w-[120px]">
                              By {post.author_name}
                            </span>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#1C1C1C] group-hover:text-[#FF9D00] transition-colors min-h-[44px]"
                            >
                              <span>Read Article</span>
                              <ArrowUpRight size={13} />
                            </Link>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls Bar */}
            {totalPages > 1 && (
              <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#6B7280] font-semibold">
                  Showing <strong className="text-[#1C1C1C] font-bold">{startIndex + 1}</strong> to{' '}
                  <strong className="text-[#1C1C1C] font-bold">
                    {Math.min(startIndex + POSTS_PER_PAGE, gridPosts.length)}
                  </strong>{' '}
                  of <strong className="text-[#1C1C1C] font-bold">{gridPosts.length}</strong> articles
                </p>

                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-all min-h-[44px] ${
                      currentPage === 1
                        ? 'opacity-40 cursor-not-allowed bg-white text-[#9CA3AF] border border-[#E5E7EB]'
                        : 'bg-white text-[#1C1C1C] border border-[#E5E7EB] hover:border-[#FF9D00] hover:text-[#FF9D00]'
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
                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-[#FF9D00] text-white shadow-xs'
                            : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#1C1C1C]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-all min-h-[44px] ${
                      currentPage === totalPages
                        ? 'opacity-40 cursor-not-allowed bg-white text-[#9CA3AF] border border-[#E5E7EB]'
                        : 'bg-white text-[#1C1C1C] border border-[#E5E7EB] hover:border-[#FF9D00] hover:text-[#FF9D00]'
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
