import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface ThemeConfig {
  bgStart: string;
  bgMid: string;
  bgEnd: string;
  glowColor: string;
  leftStripe: [string, string, string]; // Mixed 3-gradient accent colors
  subHeadlineColor: string;
  metaColor: string;
  badgeBorder: string;
}

const PALETTES: Record<string, ThemeConfig> = {
  // Theme 1: Gold & Midnight Blue (Default / Web Dev)
  gold: {
    bgStart: '#0A1128',
    bgMid: '#101B3B',
    bgEnd: '#070C1B',
    glowColor: '#FF9D00',
    leftStripe: ['#3B82F6', '#FF9D00', '#10B981'],
    subHeadlineColor: '#FFD21E',
    metaColor: '#FF9D00',
    badgeBorder: '#FFD21E',
  },
  // Theme 2: Cyber Purple & Neon Cyan (App Dev & AI Tech)
  purple: {
    bgStart: '#12092B',
    bgMid: '#1F1147',
    bgEnd: '#0A051A',
    glowColor: '#A855F7',
    leftStripe: ['#06B6D4', '#9333EA', '#EC4899'],
    subHeadlineColor: '#38BDF8',
    metaColor: '#C084FC',
    badgeBorder: '#C084FC',
  },
  // Theme 3: Emerald Mint & Gold (SEO & Organic Growth)
  emerald: {
    bgStart: '#041B15',
    bgMid: '#0A2E25',
    bgEnd: '#02100C',
    glowColor: '#10B981',
    leftStripe: ['#34D399', '#14B8A6', '#F59E0B'],
    subHeadlineColor: '#6EE7B7',
    metaColor: '#34D399',
    badgeBorder: '#34D399',
  },
  // Theme 4: Sunset Crimson & Amber Gold (UGC Ads & Video Marketing)
  crimson: {
    bgStart: '#1A0A0F',
    bgMid: '#2E101B',
    bgEnd: '#100508',
    glowColor: '#F43F5E',
    leftStripe: ['#F43F5E', '#FB923C', '#FBBF24'],
    subHeadlineColor: '#FCD34D',
    metaColor: '#FB7185',
    badgeBorder: '#FB7185',
  },
  // Theme 5: Ocean Sapphire & Electric Cyan (Local Business & Speed)
  ocean: {
    bgStart: '#051923',
    bgMid: '#0A2A3A',
    bgEnd: '#030E16',
    glowColor: '#00A6FB',
    leftStripe: ['#00A6FB', '#0582CA', '#006494'],
    subHeadlineColor: '#90E0EF',
    metaColor: '#00A6FB',
    badgeBorder: '#00A6FB',
  },
  // Theme 6: Electric Violet & Magenta (Sales Growth & Lead Gen)
  violet: {
    bgStart: '#1C0620',
    bgMid: '#340C3B',
    bgEnd: '#100314',
    glowColor: '#EC4899',
    leftStripe: ['#8B5CF6', '#EC4899', '#F59E0B'],
    subHeadlineColor: '#F472B6',
    metaColor: '#F472B6',
    badgeBorder: '#F472B6',
  },
};

const CATEGORY_THEME_MAP: Record<string, string> = {
  web_dev: 'gold',
  app_dev: 'purple',
  seo: 'emerald',
  ugc_ads: 'crimson',
  website_upgrade: 'ocean',
  local_business: 'ocean',
  meta_ads: 'crimson',
  sales_growth: 'violet',
};

function selectTheme(queryTheme: string | null, category: string, title: string): ThemeConfig {
  if (queryTheme && PALETTES[queryTheme.toLowerCase()]) {
    return PALETTES[queryTheme.toLowerCase()];
  }

  const catLower = category.toLowerCase().replace(/ /g, '_');
  if (CATEGORY_THEME_MAP[catLower] && PALETTES[CATEGORY_THEME_MAP[catLower]]) {
    return PALETTES[CATEGORY_THEME_MAP[catLower]];
  }

  // Fallback hash selection based on title
  const keys = Object.keys(PALETTES);
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % keys.length;
  return PALETTES[keys[idx]];
}

function wrapText(text: string, maxCharsPerLine: number, maxLines: number): string[] {
  if (!text) return [];
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
      if (lines.length === maxLines - 1) {
        break;
      }
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (lines.length === maxLines && words.length > 0) {
    const joined = lines.join(' ');
    if (joined.length < text.length) {
      lines[lines.length - 1] = lines[lines.length - 1].replace(/[.,;!?]?$/, '...');
    }
  }

  return lines;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawTitle = searchParams.get('title') || 'Ostrune Agency Insights & Strategic Analysis';
  const rawCategory = (searchParams.get('category') || 'INSIGHTS').toUpperCase().replace('_', ' ');
  const rawExcerpt = searchParams.get('excerpt') || 'Empowering brands with high-performance web systems and automated lead engines.';
  const rawCity = searchParams.get('city') || 'GLOBAL';
  const rawTheme = searchParams.get('theme');

  const theme = selectTheme(rawTheme, rawCategory, rawTitle);
  const titleLines = wrapText(rawTitle, 38, 3);
  const excerptLines = wrapText(rawExcerpt, 75, 2);

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.bgStart}" />
      <stop offset="50%" stop-color="${theme.bgMid}" />
      <stop offset="100%" stop-color="${theme.bgEnd}" />
    </linearGradient>

    <radialGradient id="bottomGlow" cx="18%" cy="85%" r="50%">
      <stop offset="0%" stop-color="${theme.glowColor}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${theme.glowColor}" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="leftStripe" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${theme.leftStripe[0]}" />
      <stop offset="50%" stop-color="${theme.leftStripe[1]}" />
      <stop offset="100%" stop-color="${theme.leftStripe[2]}" />
    </linearGradient>

    <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="15" cy="15" r="1.2" fill="#FFFFFF" fill-opacity="0.04" />
    </pattern>

    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Base Dark Mixed Gradient Background -->
  <rect width="1200" height="630" fill="url(#bg)" />

  <!-- Grid Dot Overlay -->
  <rect width="1200" height="630" fill="url(#dotGrid)" />

  <!-- Ambient Radial Light Glow -->
  <rect width="1200" height="630" fill="url(#bottomGlow)" />

  <!-- Left Accent Mixed Color Stripe -->
  <rect x="0" y="0" width="16" height="630" fill="url(#leftStripe)" />

  <!-- TOP BAR -->
  <!-- Category Pill Badge -->
  <rect x="60" y="48" width="170" height="38" rx="19" fill="#FFFFFF" fill-opacity="0.08" stroke="${theme.badgeBorder}" stroke-opacity="0.3" stroke-width="1.5" />
  <text x="78" y="73" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">📋 ${escapeXml(rawCategory)}</text>

  <!-- Top Right Metadata -->
  <text x="1140" y="72" text-anchor="end" fill="${theme.metaColor}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" letter-spacing="2">● AGENCY REPORT ● ${escapeXml(rawCity.toUpperCase())}</text>

  <!-- MAIN TITLE (Wrapped up to 3 lines) -->
  <g filter="url(#shadow)">
    ${titleLines
      .map(
        (line, i) =>
          `<text x="60" y="${175 + i * 58}" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" letter-spacing="-0.5">${escapeXml(line)}</text>`
      )
      .join('\n    ')}
  </g>

  <!-- SUB-HEADLINE / EXCERPT (Vibrant Accent Color Text) -->
  <g>
    ${excerptLines
      .map(
        (line, i) =>
          `<text x="60" y="${375 + titleLines.length * 15 + i * 32}" fill="${theme.subHeadlineColor}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="600" letter-spacing="0.2">${escapeXml(line)}</text>`
      )
      .join('\n    ')}
  </g>

  <!-- FOOTER SEPARATOR LINE -->
  <line x1="60" y1="545" x2="1140" y2="545" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.5" />

  <!-- FOOTER BAR -->
  <!-- Left Brand Signature -->
  <text x="60" y="582" fill="${theme.metaColor}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" letter-spacing="1">OSTRUNE DIGITAL <tspan fill="#9CA3AF" font-weight="500" letter-spacing="0.5">• Digital Media &amp; Engineering</tspan></text>

  <!-- Right Verified Badge -->
  <text x="1140" y="582" text-anchor="end" fill="#10B981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" letter-spacing="1">✓ OFFICIAL VERIFIED INSIGHT</text>
</svg>
  `.trim();

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
