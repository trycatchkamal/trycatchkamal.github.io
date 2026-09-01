import type { APIRoute } from 'astro';

// Hand-rolled rather than pulling in @astrojs/sitemap: five pages, and the
// redirect stub at /speaking must stay out of it.
const pages = [
  { path: '/', priority: '1.0' },
  { path: '/services', priority: '0.9' },
  { path: '/published-work', priority: '0.8' },
  { path: '/talks', priority: '0.8' },
  { path: '/open-source', priority: '0.7' }
];

export const GET: APIRoute = ({ site }) => {
  const lastmod = new Date().toISOString().split('T')[0];
  const urls = pages
    .map(({ path, priority }) => {
      const loc = new URL(path, site).href;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
};
