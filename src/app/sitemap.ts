import type { MetadataRoute } from 'next';
import { MOCK_PRODUCTS } from '@/lib/store';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nebula-ecommerce.vercel.app';

  // Core static routes
  const routes = [
    '',
    '/shop',
    '/deals',
    '/about',
    '/contact',
    '/team',
    '/logistics',
    '/analytics',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic product routes
  const productRoutes = MOCK_PRODUCTS.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...productRoutes];
}
