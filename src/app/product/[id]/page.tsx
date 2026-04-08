import { Metadata, ResolvingMetadata } from 'next';
import { getProduct } from '@/lib/supabase';
import ProductClient from './ProductClient';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | NEBULA`,
      description: product.description,
      images: [product.image, ...previousImages],
      type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.description,
        images: [product.image],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  // Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image,
    description: product.description,
    sku: product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'NEBULA',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: (product.stock > 0) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://nebula-ecommerce.vercel.app/product/${id}`,
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'NEBULA',
      },
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.review_count || 0,
      bestRating: '5',
      worstRating: '1',
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient product={product} />
    </>
  );
}
