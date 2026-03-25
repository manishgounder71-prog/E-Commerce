import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account', '/cart', '/checkout', '/orders', '/settings', '/api'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://nebula-ecommerce.vercel.app/sitemap.xml',
  };
}
