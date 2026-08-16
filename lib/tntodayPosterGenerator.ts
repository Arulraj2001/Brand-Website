import { BlogCategory } from '@/types';

/**
 * Checks if a cover image value is a text description prompt rather than an actual image URL
 */
export function isImagePrompt(val?: string | null): boolean {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed.length === 0) return false;

  // Real image URLs start with http://, https://, or data:image/
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image/')) {
    return false;
  }

  // Relative filepaths
  if (
    trimmed.startsWith('/') &&
    (trimmed.endsWith('.jpg') || trimmed.endsWith('.png') || trimmed.endsWith('.webp') || trimmed.endsWith('.svg'))
  ) {
    return false;
  }

  return true;
}

export interface PosterTheme {
  bgGrad: [string, string, string, string];
  ribbonGold: string;
  ribbonAccent: string;
  badgeBg: string;
  badgeBorder: string;
  subheadColor: string;
  stampColor: string;
  verifiedColor: string;
}

export const CATEGORY_EMOJIS: Record<string, { label: string; emoji: string }> = {
  seo: { label: 'SEO & Organic Growth', emoji: '🚀' },
  web_dev: { label: 'Web Engineering', emoji: '💻' },
  app_dev: { label: 'App Development', emoji: '📱' },
  website_upgrade: { label: 'Platform Upgrade', emoji: '⚡' },
  local_business: { label: 'Local Business', emoji: '🏪' },
  meta_ads: { label: 'Paid Meta Ads', emoji: '🎯' },
  ugc_ads: { label: 'UGC Video Marketing', emoji: '🎬' },
  sales_growth: { label: 'Sales & Conversion', emoji: '📈' },
  ai_automation: { label: 'AI & Automation', emoji: '🤖' },
  cybersecurity: { label: 'Security & Cloud', emoji: '🛡️' },
  ecommerce: { label: 'E-Commerce Stores', emoji: '🛒' },
  brand_design: { label: 'UI/UX & Branding', emoji: '🎨' },
  content_marketing: { label: 'Content Strategy', emoji: '📝' },
  saas_growth: { label: 'SaaS & B2B Tech', emoji: '⚡' },
  analytics_data: { label: 'Data Analytics & CRO', emoji: '📊' },
  general: { label: 'Agency Insights', emoji: '💎' },
};

export const CATEGORY_THEMES: Record<string, PosterTheme> = {
  seo: {
    bgGrad: ['#041B15', '#0A2E25', '#047857', '#10B981'],
    ribbonGold: '#F59E0B',
    ribbonAccent: '#10B981',
    badgeBg: 'rgba(16, 185, 129, 0.22)',
    badgeBorder: 'rgba(110, 231, 183, 0.45)',
    subheadColor: '#6EE7B7',
    stampColor: '#F59E0B',
    verifiedColor: '#10B981',
  },
  web_dev: {
    bgGrad: ['#0A1128', '#101B3B', '#1E3A8A', '#3B82F6'],
    ribbonGold: '#FF9D00',
    ribbonAccent: '#3B82F6',
    badgeBg: 'rgba(59, 130, 246, 0.22)',
    badgeBorder: 'rgba(147, 197, 253, 0.45)',
    subheadColor: '#FFD21E',
    stampColor: '#FF9D00',
    verifiedColor: '#10B981',
  },
  app_dev: {
    bgGrad: ['#12092B', '#1F1147', '#6B21A8', '#A855F7'],
    ribbonGold: '#38BDF8',
    ribbonAccent: '#EC4899',
    badgeBg: 'rgba(168, 85, 247, 0.22)',
    badgeBorder: 'rgba(216, 180, 254, 0.45)',
    subheadColor: '#38BDF8',
    stampColor: '#C084FC',
    verifiedColor: '#10B981',
  },
  website_upgrade: {
    bgGrad: ['#051923', '#0A2A3A', '#0E7490', '#00A6FB'],
    ribbonGold: '#00A6FB',
    ribbonAccent: '#0582CA',
    badgeBg: 'rgba(0, 166, 251, 0.22)',
    badgeBorder: 'rgba(144, 224, 239, 0.45)',
    subheadColor: '#90E0EF',
    stampColor: '#00A6FB',
    verifiedColor: '#10B981',
  },
  local_business: {
    bgGrad: ['#061D21', '#0E363D', '#0F766E', '#14B8A6'],
    ribbonGold: '#FACC15',
    ribbonAccent: '#14B8A6',
    badgeBg: 'rgba(20, 184, 166, 0.22)',
    badgeBorder: 'rgba(153, 246, 228, 0.45)',
    subheadColor: '#5EEAD4',
    stampColor: '#FACC15',
    verifiedColor: '#10B981',
  },
  meta_ads: {
    bgGrad: ['#1A0A0F', '#2E101B', '#BE123C', '#F43F5E'],
    ribbonGold: '#F59E0B',
    ribbonAccent: '#F43F5E',
    badgeBg: 'rgba(244, 63, 94, 0.22)',
    badgeBorder: 'rgba(253, 164, 175, 0.45)',
    subheadColor: '#FCD34D',
    stampColor: '#FB7185',
    verifiedColor: '#10B981',
  },
  ugc_ads: {
    bgGrad: ['#200814', '#3A1024', '#BE185D', '#EC4899'],
    ribbonGold: '#F59E0B',
    ribbonAccent: '#EC4899',
    badgeBg: 'rgba(236, 72, 153, 0.22)',
    badgeBorder: 'rgba(249, 168, 212, 0.45)',
    subheadColor: '#FBCFE8',
    stampColor: '#F59E0B',
    verifiedColor: '#10B981',
  },
  sales_growth: {
    bgGrad: ['#1C0620', '#340C3B', '#7C2D12', '#EA580C'],
    ribbonGold: '#F59E0B',
    ribbonAccent: '#EA580C',
    badgeBg: 'rgba(234, 88, 12, 0.22)',
    badgeBorder: 'rgba(253, 186, 116, 0.45)',
    subheadColor: '#FDE047',
    stampColor: '#F59E0B',
    verifiedColor: '#10B981',
  },
  ai_automation: {
    bgGrad: ['#0F0C29', '#24243E', '#302B63', '#0F0C29'],
    ribbonGold: '#38BDF8',
    ribbonAccent: '#A855F7',
    badgeBg: 'rgba(168, 85, 247, 0.25)',
    badgeBorder: 'rgba(192, 132, 252, 0.5)',
    subheadColor: '#38BDF8',
    stampColor: '#C084FC',
    verifiedColor: '#10B981',
  },
  cybersecurity: {
    bgGrad: ['#0B1021', '#111827', '#1F2937', '#1E40AF'],
    ribbonGold: '#60A5FA',
    ribbonAccent: '#3B82F6',
    badgeBg: 'rgba(59, 130, 246, 0.25)',
    badgeBorder: 'rgba(147, 197, 253, 0.5)',
    subheadColor: '#93C5FD',
    stampColor: '#60A5FA',
    verifiedColor: '#10B981',
  },
  ecommerce: {
    bgGrad: ['#1A0C00', '#381A00', '#7C2D12', '#F59E0B'],
    ribbonGold: '#F59E0B',
    ribbonAccent: '#FB923C',
    badgeBg: 'rgba(245, 158, 11, 0.25)',
    badgeBorder: 'rgba(253, 211, 77, 0.5)',
    subheadColor: '#FDE047',
    stampColor: '#F59E0B',
    verifiedColor: '#10B981',
  },
  brand_design: {
    bgGrad: ['#200418', '#4A0E34', '#831843', '#EC4899'],
    ribbonGold: '#F472B6',
    ribbonAccent: '#EC4899',
    badgeBg: 'rgba(236, 72, 153, 0.25)',
    badgeBorder: 'rgba(249, 168, 212, 0.5)',
    subheadColor: '#FBCFE8',
    stampColor: '#F472B6',
    verifiedColor: '#10B981',
  },
  content_marketing: {
    bgGrad: ['#06191D', '#0F3942', '#134E4A', '#2DD4BF'],
    ribbonGold: '#2DD4BF',
    ribbonAccent: '#14B8A6',
    badgeBg: 'rgba(45, 212, 191, 0.25)',
    badgeBorder: 'rgba(153, 246, 228, 0.5)',
    subheadColor: '#99F6E4',
    stampColor: '#2DD4BF',
    verifiedColor: '#10B981',
  },
  saas_growth: {
    bgGrad: ['#090D2A', '#131A4A', '#1D2671', '#C33764'],
    ribbonGold: '#FF9D00',
    ribbonAccent: '#C33764',
    badgeBg: 'rgba(195, 55, 100, 0.25)',
    badgeBorder: 'rgba(244, 114, 182, 0.5)',
    subheadColor: '#FBCFE8',
    stampColor: '#FF9D00',
    verifiedColor: '#10B981',
  },
  analytics_data: {
    bgGrad: ['#041D17', '#0A3B30', '#065F46', '#34D399'],
    ribbonGold: '#34D399',
    ribbonAccent: '#10B981',
    badgeBg: 'rgba(52, 211, 153, 0.25)',
    badgeBorder: 'rgba(167, 243, 208, 0.5)',
    subheadColor: '#A7F3D0',
    stampColor: '#34D399',
    verifiedColor: '#10B981',
  },
  general: {
    bgGrad: ['#0F172A', '#1E293B', '#334155', '#64748B'],
    ribbonGold: '#FF9D00',
    ribbonAccent: '#3B82F6',
    badgeBg: 'rgba(255, 255, 255, 0.12)',
    badgeBorder: 'rgba(255, 255, 255, 0.35)',
    subheadColor: '#FFD21E',
    stampColor: '#FF9D00',
    verifiedColor: '#10B981',
  },
};

/**
 * Intelligently detects appropriate emblem emoji from prompt description or title text
 */
export function detectPromptEmoji(text?: string): string {
  if (!text) return '';
  const lower = text.toLowerCase();

  if (/robot|ai|machine|gpt|claude|agent|autom|neural|bot|llm/i.test(lower)) return '🤖';
  if (/security|cyber|shield|firewall|protect|auth|pass|hack|crypto/i.test(lower)) return '🛡️';
  if (/cloud|server|host|aws|infra|devops|docker|kubernetes/i.test(lower)) return '☁️';
  if (/shop|store|e-?commerce|cart|stripe|pay|checkout|buy/i.test(lower)) return '🛒';
  if (/chart|analytic|metric|roi|conversion|cro|data|stat/i.test(lower)) return '📊';
  if (/design|ui|ux|figma|brand|logo|paint|art|graphic/i.test(lower)) return '🎨';
  if (/video|reel|tiktok|youtube|ugc|film|movie|camera/i.test(lower)) return '🎬';
  if (/write|copy|content|article|blog|post|edit|text/i.test(lower)) return '📝';
  if (/phone|mobile|app|ios|android|flutter|native/i.test(lower)) return '📱';
  if (/code|web|dev|react|next|node|tech|soft|api/i.test(lower)) return '💻';
  if (/target|ad|ads|campaign|meta|facebook|ppc|pixel/i.test(lower)) return '🎯';
  if (/local|store|shop|city|near|map|place/i.test(lower)) return '🏪';
  if (/grow|sale|lead|funnel|revenue|profit|scale|deal/i.test(lower)) return '📈';
  if (/speed|fast|perf|vitals|upgrade|boost|bolt|flash/i.test(lower)) return '⚡';
  if (/seo|rank|google|search|organic|traffic|keyword/i.test(lower)) return '🚀';

  return '';
}

/**
 * Text word wrap helper for Canvas context
 */
function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

export interface GeneratePosterOptions {
  title: string;
  category?: string;
  subtitle?: string;
  city?: string;
  bgImage?: HTMLImageElement | null;
  layoutStyle?: 'banner' | 'square_box';
}

/**
 * Generates a high-definition 1200x630 Branded News/Blog Poster JPEG Data URL
 * Adapted directly from TNToday / Namma TN poster engine
 */
export function generateTnTodayPoster({
  title = 'Ostrune News Update',
  category = 'general',
  subtitle = '',
  city = 'Global',
  bgImage = null,
  layoutStyle = 'banner',
}: GeneratePosterOptions): string {
  if (typeof window === 'undefined') return '';

  const width = 1200;
  const height = 630;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const catKey = (category || 'general').toLowerCase().replace(/\s+/g, '_');
  const catObj = CATEGORY_EMOJIS[catKey] || CATEGORY_EMOJIS.general;
  const theme = CATEGORY_THEMES[catKey] || CATEGORY_THEMES.general;

  const hasPhoto = bgImage && bgImage.complete && bgImage.naturalWidth > 0;
  const isPhotoBg = (layoutStyle === 'banner' || layoutStyle === undefined) && hasPhoto;

  // 1. Draw Background
  if (isPhotoBg) {
    const imgRatio = bgImage.naturalWidth / bgImage.naturalHeight;
    const canvasRatio = width / height;
    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      drawH = height;
      drawW = height * imgRatio;
      drawX = -(drawW - width) / 2;
      drawY = 0;
    } else {
      drawW = width;
      drawH = width / imgRatio;
      drawX = 0;
      drawY = -(drawH - height) / 2;
    }
    ctx.drawImage(bgImage, drawX, drawY, drawW, drawH);

    // Apply 75% Dark Linear Vignette
    const darkOverlay = ctx.createLinearGradient(0, 0, width, 0);
    darkOverlay.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
    darkOverlay.addColorStop(0.6, 'rgba(15, 23, 42, 0.85)');
    darkOverlay.addColorStop(1, 'rgba(15, 23, 42, 0.65)');
    ctx.fillStyle = darkOverlay;
    ctx.fillRect(0, 0, width, height);
  } else {
    // Rich 4-Stop Deep Category Gradient Background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, theme.bgGrad[0]);
    bgGrad.addColorStop(0.4, theme.bgGrad[1]);
    bgGrad.addColorStop(0.8, theme.bgGrad[2]);
    bgGrad.addColorStop(1, theme.bgGrad[3]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Draw Decorative Ambient Glow Circles
  ctx.save();
  ctx.globalAlpha = 0.35;
  const glow1 = ctx.createRadialGradient(width - 150, 100, 10, width - 150, 100, 400);
  glow1.addColorStop(0, theme.bgGrad[3]);
  glow1.addColorStop(1, 'transparent');
  ctx.fillStyle = glow1;
  ctx.beginPath();
  ctx.arc(width - 150, 100, 400, 0, Math.PI * 2);
  ctx.fill();

  const glow2 = ctx.createRadialGradient(200, height - 100, 10, 200, height - 100, 300);
  glow2.addColorStop(0, theme.ribbonGold);
  glow2.addColorStop(1, 'transparent');
  ctx.fillStyle = glow2;
  ctx.beginPath();
  ctx.arc(200, height - 100, 300, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 3. Draw Digital Dot-Grid Texture
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  const dotSpacing = 32;
  for (let x = 40; x < width - 40; x += dotSpacing) {
    for (let y = 40; y < height - 40; y += dotSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // 4. Draw Double Ribbon Border Bar on Left
  ctx.fillStyle = theme.ribbonGold;
  ctx.fillRect(0, 0, 10, height);
  ctx.fillStyle = theme.ribbonAccent;
  ctx.fillRect(10, 0, 8, height);

  // 5. Draw Header Bar: Category Pill Badge (Left) & Location Stamp (Right)
  const badgeX = 70;
  const badgeY = 60;

  const badgeText = `${catObj.emoji}  ${catObj.label.toUpperCase()}`;
  ctx.font = "bold 19px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const badgeWidth = ctx.measureText(badgeText).width + 36;
  const badgeHeight = 44;

  ctx.save();
  ctx.fillStyle = theme.badgeBg;
  ctx.strokeStyle = theme.badgeBorder;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 22);
  } else {
    ctx.rect(badgeX, badgeY, badgeWidth, badgeHeight);
  }
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(badgeText, badgeX + 18, badgeY + 28);
  ctx.restore();

  // Top-Right Metadata Stamp
  ctx.save();
  const stampText = `AGENCY REPORT • ${city.toUpperCase()}`;
  ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = 'right';
  ctx.fillStyle = theme.stampColor;
  ctx.fillText('● ' + stampText, width - 70, badgeY + 28);
  ctx.restore();

  // 6. IF SQUARE BOX MODE: Draw Right-Bottom Square Inset Box
  const isSquareMode = layoutStyle === 'square_box';
  const boxX = 810;
  const boxY = 220;
  const boxW = 320;
  const boxH = 300;
  const boxRadius = 20;

  if (isSquareMode) {
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;

    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(boxX, boxY, boxW, boxH, boxRadius);
    } else {
      ctx.rect(boxX, boxY, boxW, boxH);
    }
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.save();
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(boxX, boxY, boxW, boxH, boxRadius);
    } else {
      ctx.rect(boxX, boxY, boxW, boxH);
    }
    ctx.clip();

    if (hasPhoto) {
      const imgRatio = bgImage.naturalWidth / bgImage.naturalHeight;
      const boxRatio = boxW / boxH;
      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (imgRatio > boxRatio) {
        drawH = boxH;
        drawW = boxH * imgRatio;
        drawX = boxX - (drawW - boxW) / 2;
        drawY = boxY;
      } else {
        drawW = boxW;
        drawH = boxW / imgRatio;
        drawX = boxX;
        drawY = boxY - (drawH - boxH) / 2;
      }
      ctx.drawImage(bgImage, drawX, drawY, drawW, drawH);

      const photoGrad = ctx.createLinearGradient(0, boxY + boxH - 80, 0, boxY + boxH);
      photoGrad.addColorStop(0, 'transparent');
      photoGrad.addColorStop(1, 'rgba(15, 23, 42, 0.6)');
      ctx.fillStyle = photoGrad;
      ctx.fillRect(boxX, boxY, boxW, boxH);
    } else {
      // 3D Glassmorphic Graphic Container inside Square Box
      const boxGrad = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH);
      boxGrad.addColorStop(0, theme.bgGrad[1]);
      boxGrad.addColorStop(0.5, theme.bgGrad[2]);
      boxGrad.addColorStop(1, theme.bgGrad[3]);
      ctx.fillStyle = boxGrad;
      ctx.fillRect(boxX, boxY, boxW, boxH);

      ctx.save();
      const glowGrad = ctx.createRadialGradient(boxX + boxW / 2, boxY + boxH / 2, 10, boxX + boxW / 2, boxY + boxH / 2, 130);
      glowGrad.addColorStop(0, theme.ribbonGold);
      glowGrad.addColorStop(0.5, theme.ribbonAccent);
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(boxX + boxW / 2, boxY + boxH / 2, 130, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(boxX + 20, boxY + 20, boxW - 40, boxH - 40, 16);
      } else {
        ctx.rect(boxX + 20, boxY + 20, boxW - 40, boxH - 40);
      }
      ctx.fill();
      ctx.stroke();

      const sheenGrad = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH);
      sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      sheenGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.02)');
      sheenGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sheenGrad;
      ctx.fill();
      ctx.restore();

      // Large 3D Graphic Emblem (intelligently matches prompt keywords or category)
      const promptEmoji = detectPromptEmoji(subtitle || title);
      const displayEmoji = promptEmoji || catObj.emoji;
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
      ctx.shadowBlur = 28;
      ctx.shadowOffsetY = 12;
      ctx.font = "150px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(displayEmoji, boxX + boxW / 2, boxY + boxH / 2 + 10);
      ctx.restore();
    }
    ctx.restore();

    // Outer Gold Border Stroke
    const boxGoldGrad = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH);
    boxGoldGrad.addColorStop(0, '#F59E0B');
    boxGoldGrad.addColorStop(0.5, '#D4AF37');
    boxGoldGrad.addColorStop(1, '#9A7B1C');
    ctx.strokeStyle = boxGoldGrad;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(boxX, boxY, boxW, boxH, boxRadius);
    } else {
      ctx.rect(boxX, boxY, boxW, boxH);
    }
    ctx.stroke();
    ctx.restore();
  }

  // 7. Draw Headline Title
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 6;

  const maxTextWidth = isSquareMode ? 700 : width - 160;

  let fontSize = isSquareMode ? 46 : 52;
  ctx.font = `800 ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
  let titleLines = wrapCanvasText(ctx, title, maxTextWidth);

  if (titleLines.length > 3) {
    fontSize = isSquareMode ? 38 : 42;
    ctx.font = `800 ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
    titleLines = wrapCanvasText(ctx, title, maxTextWidth);
  }
  if (titleLines.length > 4) {
    titleLines = titleLines.slice(0, 4);
    titleLines[3] = titleLines[3].replace(/\s+\S*$/, '...');
  }

  const startY = 185;
  const lineHeight = fontSize * 1.22;
  titleLines.forEach((line, idx) => {
    ctx.fillText(line, 70, startY + idx * lineHeight);
  });
  ctx.restore();

  // 8. Draw Subtitle / Executive Summary Quote Block
  if (subtitle && subtitle.trim()) {
    ctx.save();
    ctx.fillStyle = theme.subheadColor;
    ctx.font = "700 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const subY = startY + titleLines.length * lineHeight + 18;
    const subLines = wrapCanvasText(ctx, subtitle.trim(), maxTextWidth);
    if (subLines.length > 0 && subY < height - 110) {
      ctx.fillText(subLines[0] + (subLines.length > 1 ? '...' : ''), 70, subY);
    }
    ctx.restore();
  }

  // 9. Signature Ostrune Footer Brand Bar
  ctx.save();
  const footerY = height - 55;

  const divGrad = ctx.createLinearGradient(70, 0, width - 70, 0);
  divGrad.addColorStop(0, theme.ribbonGold);
  divGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)');
  divGrad.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(70, footerY - 22);
  ctx.lineTo(width - 70, footerY - 22);
  ctx.stroke();

  ctx.fillStyle = theme.ribbonGold;
  ctx.font = "900 25px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText('OSTRUNE DIGITAL', 70, footerY);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.font = "600 19px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText('• Digital Media & Engineering', 320, footerY);

  ctx.fillStyle = theme.verifiedColor;
  ctx.font = "700 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = 'right';
  ctx.fillText('✓ OFFICIAL VERIFIED REPORT', width - 70, footerY);

  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.85);
}

/**
 * Fetches an AI photo from Pollinations AI (free)
 */
export async function fetchAiPhotoFromPrompt(promptText: string): Promise<string> {
  if (!promptText) return '';
  const cleanPrompt = promptText.trim().slice(0, 250);
  const encoded = encodeURIComponent(`Digital media photography: ${cleanPrompt}, realistic photo`);
  const seed = Math.floor(Math.random() * 100000);
  const primaryUrl = `https://image.pollinations.ai/prompt/${encoded}?width=600&height=600&seed=${seed}&nologo=true`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    const res = await fetch(primaryUrl, { signal: controller.signal }).catch(() => null);
    clearTimeout(timer);

    if (res && res.ok) {
      const blob = await res.blob();
      if (blob.size > 1000) {
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = () => resolve(primaryUrl);
          reader.readAsDataURL(blob);
        });
      }
    }
  } catch {
    // fallback
  }

  return primaryUrl;
}

export interface AsyncPosterOptions extends GeneratePosterOptions {
  promptText?: string;
  imageUrl?: string;
}

/**
 * Async version of generateTnTodayPoster that automatically fetches a photographic image and blends it into the poster
 */
export async function generateTnTodayPosterAsync({
  title = '',
  category = 'general',
  subtitle = '',
  city = 'Global',
  promptText = '',
  imageUrl = '',
  layoutStyle = 'banner',
}: AsyncPosterOptions): Promise<string> {
  if (typeof window === 'undefined') return '';

  let targetUrl = imageUrl;

  if (!targetUrl || isImagePrompt(targetUrl)) {
    try {
      const promptToUse = (isImagePrompt(targetUrl) ? targetUrl : promptText) || title;
      targetUrl = await fetchAiPhotoFromPrompt(promptToUse);
    } catch {
      // ignore
    }
  }

  if (targetUrl) {
    try {
      const img = new Image();
      if (!targetUrl.startsWith('data:') && !targetUrl.startsWith('blob:')) {
        img.crossOrigin = 'anonymous';
      }
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Timeout loading image')), 4500);
        img.onload = () => {
          clearTimeout(timer);
          resolve();
        };
        img.onerror = () => {
          clearTimeout(timer);
          reject();
        };
        img.src = targetUrl;
      });
      return generateTnTodayPoster({ title, category, subtitle, city, bgImage: img, layoutStyle });
    } catch {
      // Safe fallback without photo
    }
  }

  return generateTnTodayPoster({ title, category, subtitle, city, layoutStyle });
}
