import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nebula-ecommerce.vercel.app';
  const products = await getProducts();

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
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...productRoutes];
}
