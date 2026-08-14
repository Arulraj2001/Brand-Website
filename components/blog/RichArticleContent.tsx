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
    if (line.startsWith('## ')) {
      const text = line.replace('## ', '').trim();
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

      // H1 Header
      if (line.startsWith('# ')) {
        const text = line.replace('# ', '').trim();
        rawBlocks.push(
          <h1 key={`h1-${keyIndex++}`} className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1C] pb-2 border-b-2 border-[#FFD21E] mt-8 mb-4">
            {text}
          </h1>
        );
        i++;
        continue;
      }

      // H2 Header with ID anchor
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        rawBlocks.push(
          <h2 id={id} key={`h2-${keyIndex++}`} className="text-xl sm:text-2xl font-extrabold text-[#1C1C1C] pt-6 pb-2 mt-8 border-b border-[#E5E7EB] flex items-center gap-2 group scroll-mt-28">
            <span className="w-2.5 h-6 rounded-full bg-[#FF9D00] inline-block shrink-0" />
            <span className="group-hover:text-[#FF9D00] transition-colors">{text}</span>
          </h2>
        );
        i++;
        continue;
      }

      // H3 Header
      if (line.startsWith('### ')) {
        const text = line.replace('### ', '').trim();
        rawBlocks.push(
          <h3 key={`h3-${keyIndex++}`} className="text-lg font-bold text-[#1C1C1C] mt-6 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[#3B82F6] inline-block" />
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
          <blockquote key={`quote-${keyIndex++}`} className="my-6 p-4 sm:p-5 rounded-r-xl border-l-4 border-[#FF9D00] bg-[#FFF9E6] text-[#1C1C1C] font-medium text-sm sm:text-base italic shadow-xs">
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
          <div key={`code-${keyIndex++}`} className="my-6 rounded-xl bg-[#1C1C1C] border border-[#333] overflow-hidden shadow-md">
            <div className="flex items-center justify-between px-4 py-2 bg-[#262626] border-b border-[#333] text-[11px] font-mono text-[#9CA3AF]">
              <span>{lang || 'code'}</span>
              <button
                onClick={() => navigator.clipboard.writeText(codeLines.join('\n'))}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Copy size={12} /> Copy Code
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-[#FFD21E] leading-relaxed">
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
          <div key={`table-${keyIndex++}`} className="my-6 overflow-x-auto border border-[#E5E7EB] rounded-xl shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#1C1C1C] text-white font-bold">
                <tr>
                  {tableHeader.map((th, thIdx) => (
                    <th key={thIdx} className="py-3 px-4 border-b border-[#333]">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] bg-white">
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-3 px-4 text-[#1C1C1C]">
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
              <li key={lIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#1C1C1C] leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-[#FF9D00] mt-2 shrink-0" />
                <div>{formatInlineStyles(item)}</div>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Regular Paragraphs
      rawBlocks.push(
        <p key={`p-${keyIndex++}`} className="my-4 text-sm sm:text-base text-[#374151] leading-relaxed">
          {formatInlineStyles(line)}
        </p>
      );
      i++;
    }

    // Natural Callout Injection Strategy:
    // If category is provided, find a natural insertion point (e.g. before the 2nd/3rd H2 section or after a mid-article paragraph)
    if (category && rawBlocks.length >= 4) {
      const finalBlocks: React.ReactNode[] = [...rawBlocks];
      
      // Find all H2 indices
      const h2Indices: number[] = [];
      rawBlocks.forEach((b, idx) => {
        const keyStr = b?.key ? String(b.key) : '';
        if (keyStr.startsWith('h2-')) {
          h2Indices.push(idx);
        }
      });

      let insertIdx = -1;
      if (h2Indices.length >= 3) {
        // Insert right before the 2nd or 3rd H2 heading
        insertIdx = h2Indices[Math.min(2, Math.floor(h2Indices.length / 2))];
      } else if (h2Indices.length === 2) {
        insertIdx = h2Indices[1];
      } else {
        // Fallback: find a paragraph around 40-50% into the article
        const targetMid = Math.floor(rawBlocks.length * 0.45);
        for (let j = targetMid; j < rawBlocks.length; j++) {
          const keyStr = rawBlocks[j]?.key ? String(rawBlocks[j].key) : '';
          if (keyStr.startsWith('p-')) {
            insertIdx = j + 1; // insert right after paragraph
            break;
          }
        }
      }

      if (insertIdx > 0 && insertIdx <= finalBlocks.length) {
        finalBlocks.splice(
          insertIdx,
          0,
          <BlogMidCallout key="blog-mid-callout" category={category} postSlug={postSlug} />
        );
      }
      return finalBlocks;
    }

    return rawBlocks;
  };

  // Inline formatting helper for **bold**, `code`, [links]
  const formatInlineStyles = (text: string) => {
    // Process **bold**
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-extrabold text-[#1C1C1C]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#FF9D00] font-mono text-xs border border-[#E5E7EB]">
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
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-[#E5E7EB] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#FFD21E] via-[#FF9D00] to-[#3B82F6] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Article Content Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Executive Key Takeaways Box */}
          {excerpt && (
            <div className="p-5 sm:p-6 bg-white border-2 border-[#FFD21E] rounded-2xl shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF9D00] uppercase tracking-wider">
                <BookOpen size={15} /> Executive Summary & Key Takeaways
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#1C1C1C] leading-relaxed">
                {excerpt}
              </p>
            </div>
          )}

          {/* Rendered Rich Markdown Content */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-xs">
            {parseMarkdownToBlocks(content)}
          </div>

          {/* Share & Back To Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-[#E5E7EB] rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#6B7280]">Share Article:</span>
              <button
                onClick={copyArticleLink}
                className="px-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-bold text-[#1C1C1C] hover:border-[#FF9D00] transition-colors flex items-center gap-1.5"
              >
                {copiedLink ? <Check size={14} className="text-[#10B981]" /> : <Share2 size={14} />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs font-bold text-[#FF9D00] hover:underline flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Sidebar Table of Contents (4 Cols) */}
        {tocItems.length > 0 && (
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block space-y-4">
            <div className="p-5 bg-white border border-[#E5E7EB] rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB]">
                <List size={16} className="text-[#FF9D00]" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1C1C1C]">
                  Table of Contents
                </h4>
              </div>

              <nav className="space-y-1.5 text-xs">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`block py-1.5 px-2.5 rounded-lg transition-colors leading-snug ${
                      activeTocId === item.id
                        ? 'bg-[#FFF9E6] text-[#FF9D00] font-bold border-l-2 border-[#FF9D00]'
                        : 'text-[#6B7280] hover:text-[#1C1C1C] hover:bg-[#F9FAFB]'
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
