/**
 * next-sitemap configuration.
 * Generates static sitemap files after `next build` via the `postbuild` script:
 *   "postbuild": "next-sitemap"
 * The Site URL comes from the NEXT_PUBLIC_SITE_URL env var (falling back to production).
 * app/sitemap.ts acts as the canonical/dynamic sitemap (Next.js first-party) — this config
 * provides a build-time snapshot that also works on static hosts.
 */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ostrune.netlify.app',
  generateRobotsTxt: false, // We maintain robots.ts ourselves (with /_next/ etc.)
  generateIndexSitemap: false,
  outDir: '.next', // Write post-build; avoids clobbering the app/sitemap.ts route at runtime.
  exclude: ['/admin', '/admin/*', '/api', '/api/*', '/private', '/private/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin/', '/api/', '/private/', '/_next/'] },
    ],
  },
  // Per-route priority / change-frequency hints applied by next-sitemap.
  transform: async (config, path) => {
    // Default conservative fallback for anything not matched below.
    let priority = 0.5;
    let changefreq = 'weekly';

    if (path === '/' || path === '/portfolio' || path === '/student-projects') {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.startsWith('/services')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/about' || path === '/contact') {
      priority = 0.7;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date(),
      alternateRefs: config.alternateRefs,
    };
  },
};