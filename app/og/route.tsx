import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { getSiteName } from '@/lib/seo';

// Explicit nodejs runtime: Windows + Turbopack dev builds can fail to "pipe"
// ImageResponse streams when running on the default edge runtime.
export const runtime = 'nodejs';

// Brand colors used elsewhere in the design system.
const DARK = '#1C1C1C';
const YELLOW = '#FFD21E';
const ORANGE = '#FF9D00';
const MUTED = '#94A3B8';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') || getSiteName();
  const description = searchParams.get('description') || '';
  const type = searchParams.get('type') || 'website';
  const siteName = getSiteName();

  const highlightFirstWords = (text: string, words = 3) => {
    const parts = text.split(' ');
    const head = parts.slice(0, words).join(' ');
    const tail = parts.slice(words).join(' ');
    return { head, tail };
  };

  const { head, tail } = highlightFirstWords(title);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: DARK,
          backgroundImage:
            'radial-gradient(circle at 20% 0%, rgba(255,210,30,0.25) 0%, transparent 45%), radial-gradient(circle at 90% 100%, rgba(79,70,229,0.35) 0%, transparent 50%)',
          padding: '64px 72px',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Header: site name top-left + type badge */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: YELLOW,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 800,
                color: DARK,
              }}
            >
              O
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>
              {siteName.toUpperCase()}
            </div>
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: YELLOW,
              textTransform: 'uppercase',
              letterSpacing: 2,
              border: `2px solid ${YELLOW}`,
              borderRadius: 999,
              padding: '8px 20px',
            }}
          >
            {type}
          </div>
        </div>

        {/* Center: title + description */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 800,
              color: '#FFFFFF',
              maxWidth: 1050,
            }}
          >
            <span>
              {head && (
                <>
                  {head}
                  {tail ? ' ' : ''}
                </>
              )}
              {tail && <span style={{ color: YELLOW }}>{tail}</span>}
              {!tail && <span style={{ color: YELLOW }}>.</span>}
            </span>
          </div>
          {description && (
            <div style={{ fontSize: 30, color: MUTED, marginTop: 24, lineHeight: 1.4, maxWidth: 1000 }}>
              {description}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ fontSize: 18, color: '#CBD5E1', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: YELLOW }} />
          {siteName} — Web Development, SEO & Performance Growth
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}