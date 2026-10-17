'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Share2, List, BookOpen, ArrowUp } from 'lucide-react';
import BlogMidCallout from './BlogMidCallout';
import { BlogCategory } from '@/types';

interface RichArticleContentProps {
  content: string;
  excerpt?: string;
  title: string;
  category?: BlogCategory;
  postSlug?: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function RichArticleContent({
  content,
  excerpt,
  category,
  postSlug,
}: RichArticleContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // ToC Active Item Detection
      const headings = Array.from(document.querySelectorAll('h2[id]'));
      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 250) {
          setActiveTocId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyArticleLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Extract Table of Contents from H2 headings in markdown
  const tocItems: TocItem[] = [];
  const lines = content.split('\n');
  lines.forEach((line) => {
    if (line.startsWith('## ') || line.startsWith('# ')) {
      const text = line.replace(/^#{1,2}\s+/, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      tocItems.push({ id, text, level: 2 });
    }
  });

  // Custom Markdown parsing engine
  const parseMarkdownToBlocks = (mdText: string) => {
    const rawBlocks: React.ReactElement[] = [];
    const lines = mdText.split('\n');

    let i = 0;
    let keyIndex = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Empty lines
      if (!line.trim()) {
        i++;
        continue;
      }

      // Headings: Normalize both # and ## to H2 to guarantee strictly ONE H1 per page (the article title)
      if (line.startsWith('# ') || line.startsWith('## ')) {
        const text = line.replace(/^#{1,2}\s+/, '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        rawBlocks.push(
          <h2 id={id} key={`h2-${keyIndex++}`} className="text-xl sm:text-2xl font-black text-white pt-8 pb-3 mt-10 border-b border-white/[0.08] flex items-center gap-3 group scroll-mt-28">
            <span className="w-2.5 h-6 rounded-full bg-[#FFB800] inline-block shrink-0 shadow-lg shadow-[#FFB800]/30" />
            <span className="group-hover:text-[#FFB800] transition-colors">{text}</span>
          </h2>
        );
        i++;
        continue;
      }

      // H3 Header
      if (line.startsWith('### ')) {
        const text = line.replace('### ', '').trim();
        rawBlocks.push(
          <h3 key={`h3-${keyIndex++}`} className="text-lg font-bold text-white mt-8 mb-3 flex items-center gap-2.5">
            <span className="w-1.5 h-4 rounded-full bg-[#00F0FF] inline-block" />
            {text}
          </h3>
        );
        i++;
        continue;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].startsWith('> ')) {
          quoteLines.push(lines[i].replace('> ', '').trim());
          i++;
        }
        rawBlocks.push(
          <blockquote key={`quote-${keyIndex++}`} className="my-6 p-5 rounded-2xl border-l-4 border-[#FFB800] bg-white/[0.02] text-gray-200 font-light text-sm sm:text-base italic shadow-lg">
            &ldquo;{quoteLines.join(' ')}&rdquo;
          </blockquote>
        );
        continue;
      }

      // Code blocks ```
      if (line.startsWith('```')) {
        const lang = line.replace('```', '').trim();
        i++;
        const codeLines: string[] = [];
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```

        rawBlocks.push(
          <div key={`code-${keyIndex++}`} className="my-6 rounded-2xl bg-[#090A12] border border-white/[0.1] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.08] text-[11px] font-mono text-gray-400">
              <span className="text-[#FFB800]">{lang || 'code'}</span>
              <button
                onClick={() => navigator.clipboard.writeText(codeLines.join('\n'))}
                className="hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono font-bold"
              >
                <Copy size={12} /> Copy Code
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-[#00F0FF] leading-relaxed">
              <code>{codeLines.join('\n')}</code>
            </pre>
          </div>
        );
        continue;
      }

      // Markdown Tables | Header | Header |
      if (line.includes('|') && lines[i + 1] && lines[i + 1].includes('|---')) {
        const tableHeader = line.split('|').filter(Boolean).map((s) => s.trim());
        i += 2; // skip header & separator line

        const tableRows: string[][] = [];
        while (i < lines.length && lines[i].includes('|')) {
          const rowCells = lines[i].split('|').filter(Boolean).map((s) => s.trim());
          tableRows.push(rowCells);
          i++;
        }

        rawBlocks.push(
          <div key={`table-${keyIndex++}`} className="my-6 overflow-x-auto border border-white/[0.08] rounded-2xl shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-white/[0.04] text-white font-bold border-b border-white/[0.08]">
                <tr>
                  {tableHeader.map((th, thIdx) => (
                    <th key={thIdx} className="py-3.5 px-4 font-mono text-xs uppercase tracking-wider text-gray-300">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-3.5 px-4 text-gray-300 font-light">
                        {formatInlineStyles(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Unordered Lists (- or *)
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItems: string[] = [];
        while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
          listItems.push(lines[i].replace(/^[-*]\s+/, '').trim());
          i++;
        }
        rawBlocks.push(
          <ul key={`list-${keyIndex++}`} className="my-4 space-y-2.5 pl-2">
            {listItems.map((item, lIdx) => (
              <li key={lIdx} className="flex items-start gap-3 text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-[#FFB800] mt-2 shrink-0 shadow-xs shadow-[#FFB800]" />
                <div>{formatInlineStyles(item)}</div>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Regular Paragraphs
      rawBlocks.push(
        <p key={`p-${keyIndex++}`} className="my-4 text-sm sm:text-base text-gray-300 font-light leading-relaxed">
          {formatInlineStyles(line)}
        </p>
      );
      i++;
    }

    // Natural Callout Injection Strategy:
    const effectiveCategory: BlogCategory = category || 'web_dev';
    if (rawBlocks.length >= 4) {
      const finalBlocks: React.ReactNode[] = [...rawBlocks];
      
      const h2Indices: number[] = [];
      rawBlocks.forEach((b, idx) => {
        const keyStr = b?.key ? String(b.key) : '';
        if (keyStr.startsWith('h2-')) {
          h2Indices.push(idx);
        }
      });

      let insertIdx = -1;
      if (h2Indices.length >= 3) {
        insertIdx = h2Indices[Math.min(2, Math.floor(h2Indices.length / 2))];
      } else if (h2Indices.length === 2) {
        insertIdx = h2Indices[1];
      } else {
        const targetMid = Math.floor(rawBlocks.length * 0.45);
        for (let j = targetMid; j < rawBlocks.length; j++) {
          const keyStr = rawBlocks[j]?.key ? String(rawBlocks[j].key) : '';
          if (keyStr.startsWith('p-')) {
            insertIdx = j + 1;
            break;
          }
        }
      }

      if (insertIdx > 0 && insertIdx <= finalBlocks.length) {
        finalBlocks.splice(
          insertIdx,
          0,
          <BlogMidCallout key="blog-mid-callout" category={effectiveCategory} postSlug={postSlug} />
        );
      }
      return finalBlocks;
    }

    return rawBlocks;
  };

  // Inline formatting helper for **bold**, `code`, [links]
  const formatInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[#FFB800] font-mono text-xs border border-white/[0.1]">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Top Scroll Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/[0.08] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#FFB800] via-[#00F0FF] to-[#3B82F6] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Article Content Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Executive Key Takeaways Box */}
          {excerpt && (
            <div className="p-6 sm:p-8 cyber-glass-glow border border-[#FFB800]/30 rounded-3xl shadow-2xl space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFB800] to-transparent opacity-80" />
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFB800] uppercase tracking-wider">
                <BookOpen size={15} /> Executive Summary &amp; Key Takeaways
              </div>
              <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed">
                {excerpt}
              </p>
            </div>
          )}

          {/* Rendered Rich Markdown Content */}
          <div className="cyber-glass border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-2">
            {parseMarkdownToBlocks(content)}
          </div>

          {/* Share & Back To Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 cyber-glass border border-white/[0.08] rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-gray-400">Share Telemetry:</span>
              <button
                onClick={copyArticleLink}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs font-mono font-bold text-white hover:border-[#FFB800] hover:text-[#FFB800] transition-colors flex items-center gap-2"
              >
                {copiedLink ? <Check size={14} className="text-[#10B981]" /> : <Share2 size={14} />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs font-mono font-bold text-[#FFB800] hover:text-[#FFD21E] flex items-center gap-1.5 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Sidebar Table of Contents (4 Cols) */}
        {tocItems.length > 0 && (
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block space-y-4">
            <div className="p-6 cyber-glass border border-white/[0.08] rounded-3xl shadow-2xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08]">
                <List size={16} className="text-[#FFB800]" />
                <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-white">
                  Table of Contents
                </h4>
              </div>

              <nav className="space-y-1.5 text-xs font-mono">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`block py-2 px-3 rounded-xl transition-all leading-snug ${
                      activeTocId === item.id
                        ? 'bg-[#FFB800]/10 text-[#FFB800] font-bold border border-[#FFB800]/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}
