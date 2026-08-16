import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

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

  // Add ellipsis if text was truncated
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

  const titleLines = wrapText(rawTitle, 38, 3);
  const excerptLines = wrapText(rawExcerpt, 75, 2);

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1128" />
      <stop offset="50%" stop-color="#101B3B" />
      <stop offset="100%" stop-color="#070C1B" />
    </linearGradient>

    <radialGradient id="bottomGlow" cx="18%" cy="85%" r="50%">
      <stop offset="0%" stop-color="#FF9D00" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#FF9D00" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="leftStripe" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="45%" stop-color="#FF9D00" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>

    <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="15" cy="15" r="1.2" fill="#FFFFFF" fill-opacity="0.04" />
    </pattern>

    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Base Dark Background -->
  <rect width="1200" height="630" fill="url(#bg)" />

  <!-- Grid Dot Overlay -->
  <rect width="1200" height="630" fill="url(#dotGrid)" />

  <!-- Ambient Gold Radial Light Glow -->
  <rect width="1200" height="630" fill="url(#bottomGlow)" />

  <!-- Left Accent Color Bar -->
  <rect x="0" y="0" width="16" height="630" fill="url(#leftStripe)" />

  <!-- TOP BAR -->
  <!-- Category Pill Badge -->
  <rect x="60" y="48" width="165" height="38" rx="19" fill="#FFFFFF" fill-opacity="0.07" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="1.5" />
  <text x="78" y="73" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">📋 ${escapeXml(rawCategory)}</text>

  <!-- Top Right Metadata -->
  <text x="1140" y="72" text-anchor="end" fill="#FF9D00" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" letter-spacing="2">● AGENCY REPORT ● ${escapeXml(rawCity.toUpperCase())}</text>

  <!-- MAIN TITLE (Wrapped up to 3 lines) -->
  <g filter="url(#shadow)">
    ${titleLines
      .map(
        (line, i) =>
          `<text x="60" y="${175 + i * 58}" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" letter-spacing="-0.5">${escapeXml(line)}</text>`
      )
      .join('\n    ')}
  </g>

  <!-- SUB-HEADLINE / EXCERPT (Yellow Gold Accent Text) -->
  <g>
    ${excerptLines
      .map(
        (line, i) =>
          `<text x="60" y="${375 + titleLines.length * 15 + i * 32}" fill="#FFD21E" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="600" letter-spacing="0.2">${escapeXml(line)}</text>`
      )
      .join('\n    ')}
  </g>

  <!-- FOOTER SEPARATOR LINE -->
  <line x1="60" y1="545" x2="1140" y2="545" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.5" />

  <!-- FOOTER BAR -->
  <!-- Left Brand Signature -->
  <text x="60" y="582" fill="#FF9D00" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" letter-spacing="1">OSTRUNE DIGITAL <tspan fill="#9CA3AF" font-weight="500" letter-spacing="0.5">• Digital Media &amp; Engineering</tspan></text>

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
