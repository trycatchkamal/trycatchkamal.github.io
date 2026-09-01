import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *
Allow: /
Disallow: /speaking

Sitemap: ${new URL('sitemap.xml', site).href}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
