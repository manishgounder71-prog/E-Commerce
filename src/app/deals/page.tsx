'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { useStore, MOCK_PRODUCTS, MOCK_DEALS } from '@/lib/store';
import { 
    Zap, 
    Clock, 
    ShoppingCart, 
    Heart,
    ArrowRight,
    Flame
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DealsPage() {
    const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useStore();
    const [timeLeft, setTimeLeft] = useState<Record<string, { h: number; m: number; s: number }>>({});

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft: Record<string, { h: number; m: number; s: number }> = {};
            MOCK_DEALS.forEach(deal => {
                const diff = Math.max(0, deal.endTime - Date.now());
                newTimeLeft[deal.id] = {
                    h: Math.floor(diff / 3600000),
                    m: Math.floor((diff % 3600000) / 60000),
                    s: Math.floor((diff % 60000) / 1000),
                };
            });
            setTimeLeft(newTimeLeft);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const getDealProducts = (productIds: string[]) => {
        return MOCK_PRODUCTS.filter(p => productIds.includes(p.id));
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://nebula-ecommerce.vercel.app/',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Deals',
                item: 'https://nebula-ecommerce.vercel.app/deals',
            },
        ],
    };

    return (
        <main className="min-h-screen bg-surface text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            <div className="pt-20 px-4 sm:px-6 max-w-7xl mx-auto pb-12">
                {/* Hero Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/20 p-8 sm:p-12 mb-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.15)_0%,transparent_50%)]" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Flame className="text-orange-500" size={32} />
                            <span className="font-headline text-xs sm:text-sm uppercase tracking-widest text-orange-400 font-bold">Limited Time Offers</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-black text-white uppercase tracking-tight mb-4">
                            BIG SAVINGS DAY
                        </h1>
                        <p className="text-neutral-400 text-sm sm:text-base max-w-xl mb-6">
                            Save up to 50% off on top brands. Flash deals, daily offers, and exclusive discounts for Prime members.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-orange-400">
                                <Clock size={18} />
                                <span className="font-headline text-sm font-bold uppercase tracking-wider">Deal ends in 5 hours</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deals Grid */}
                <div className="space-y-12">
                    {MOCK_DEALS.map((deal) => {
                        const products = getDealProducts(deal.products);
                        const dealTime = timeLeft[deal.id];
                        
                        return (
                            <div key={deal.id} className="rounded-2xl bg-surface-container-low border border-white/5 overflow-hidden">
                                {/* Deal Header */}
                                <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                            <Zap size={28} className="text-white" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h2 className="font-headline text-xl sm:text-2xl font-bold text-white uppercase">{deal.title}</h2>
                                                <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                                                    {deal.discount}% OFF
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                                <div className="flex items-center gap-1 text-orange-400">
                                                    <Clock size={14} />
                                                    <span className="font-headline font-bold">
                                                        {dealTime ? `${String(dealTime.h).padStart(2, '0')}:${String(dealTime.m).padStart(2, '0')}:${String(dealTime.s).padStart(2, '0')}` : '--:--:--'}
                                                    </span>
                                                </div>
                                                <span className="text-neutral-500 text-xs">Ends soon!</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Products */}
                                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => {
                                        const isInWishlist = wishlist.includes(product.id);
                                        const discount = product.originalPrice 
                                            ? Math.round((1 - product.price / product.originalPrice) * 100) 
                                            : 0;
                                        
                                        return (
                                            <div key={product.id} className="group rounded-xl bg-surface-container border border-white/5 hover:border-white/20 transition-all overflow-hidden">
                                                <Link href={`/product/${product.id}`} className="block">
                                                    <div className="relative aspect-square overflow-hidden bg-surface-container-low">
                                                        <Image 
                                                            src={product.image} 
                                                            alt={product.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                        />
                                                        {discount > 0 && (
                                                            <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                                                                -{discount}%
                                                            </span>
                                                        )}
                                                    </div>
                                                </Link>
                                                
                                                <div className="p-4">
                                                    <Link href={`/product/${product.id}`}>
                                                        <h3 className="font-headline text-sm font-bold text-white uppercase mb-1 hover:text-neutral-300 transition-colors line-clamp-1">
                                                            {product.title}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-3">{product.brand}</p>
                                                    
                                                    <div className="flex items-center gap-2 mb-3">
                                                        {product.rating && (
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-yellow-400 text-xs">★</span>
                                                                <span className="text-xs text-white font-bold">{product.rating}</span>
                                                                <span className="text-[10px] text-neutral-500">({product.reviewCount})</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-2 mb-4">
                                                        <span className="font-headline text-lg font-bold text-white">
                                                            ₹{product.price.toLocaleString()}
                                                        </span>
                                                        {product.originalPrice && (
                                                            <>
                                                                <span className="text-sm text-neutral-500 line-through">
                                                                    ₹{product.originalPrice.toLocaleString()}
                                                                </span>
                                                                <span className="text-xs text-green-500 font-bold">
                                                                    {discount}% off
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={() => addToCart(product)}
                                                            className="flex-1 py-2.5 bg-white text-black font-headline text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                                                        >
                                                            <ShoppingCart size={14} /> Add
                                                        </button>
                                                        <button 
                                                            onClick={() => isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product.id)}
                                                            className={`p-2.5 rounded-lg border transition-colors ${
                                                                isInWishlist 
                                                                    ? 'bg-red-500/20 border-red-500 text-red-500' 
                                                                    : 'border-white/10 text-neutral-400 hover:border-white/30'
                                                            }`}
                                                        >
                                                            <Heart size={16} className={isInWishlist ? 'fill-current' : ''} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* All Products Link */}
                <div className="mt-12 text-center">
                    <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-headline font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-neutral-200 transition-colors">
                        View All Products <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </main>
    );
}
