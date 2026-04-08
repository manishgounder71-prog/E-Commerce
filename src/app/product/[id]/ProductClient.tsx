'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { useStore, Product } from '@/lib/store';
import { 
    ShoppingCart, 
    ShieldCheck, 
    Truck as TruckIcon, 
    Zap, 
    Plus, 
    Minus, 
    CheckCircle2, 
    Heart,
    Star,
    ThumbsUp,
    Share2,
    Clock
} from 'lucide-react';
import Link from 'next/link';

interface ProductClientProps {
    product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
    const { products, addToCart, wishlist, addToWishlist, removeFromWishlist, addToRecentlyViewed, recentlyViewed } = useStore();
    
    const isInWishlist = wishlist.includes(product.id);
    const reviews: any[] = []; // Default to empty until reviews table is ready
    const discount = product.original_price ? Math.round((1 - product.price / product.original_price) * 100) : 0;

    const [quantity, setQuantity] = useState(1);
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        product.variants?.forEach(v => {
            if (v.selected) initial[v.type] = v.selected;
            else if (v.options.length > 0) initial[v.type] = v.options[0];
        });
        return initial;
    });
    const [success, setSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');

    useEffect(() => {
        addToRecentlyViewed(product.id);
    }, [product.id, addToRecentlyViewed]);

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedVariants);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    // Related products
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    // Recently viewed
    const recentProducts = products.filter(p => recentlyViewed.includes(p.id)).slice(0, 4);

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 lg:pt-20 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-headline text-neutral-500 uppercase tracking-wider mb-6">
                    <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
                    <span>/</span>
                    <span>{product.category}</span>
                    <span>/</span>
                    <span className="text-white truncate max-w-[200px]">{product.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left - Image */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24">
                            <div className="relative rounded-2xl overflow-hidden bg-surface-container border border-white/5">
                                <div className="relative w-full aspect-square">
                                    <Image 
                                        src={product.image} 
                                        alt={product.title} 
                                        fill
                                        className="object-cover" 
                                        priority
                                    />
                                </div>
                                
                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {discount > 0 && (
                                        <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg">
                                            {discount}% OFF
                                        </span>
                                    )}
                                    {product.stock === 0 && (
                                        <span className="px-3 py-1.5 bg-neutral-700 text-white text-xs font-bold rounded-lg">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>

                                {/* Share */}
                                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors">
                                    <Share2 size={18} />
                                </button>
                            </div>

                            {/* Thumbnails (simulated) */}
                            <div className="flex gap-3 mt-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <button key={i} className="w-16 h-16 rounded-lg bg-surface-container border border-white/10 overflow-hidden hover:border-white/30 transition-colors">
                                        <div className="relative w-full h-full">
                                            <Image src={product.image} alt="" fill className="object-cover" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Info */}
                    <div className="lg:col-span-7">
                        {/* Title & Brand */}
                        <div className="mb-6">
                            <p className="text-sm text-neutral-500 uppercase tracking-wider mb-2">{product.brand}</p>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-headline font-black text-white uppercase leading-tight mb-3">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-4 mb-4">
                                {product.rating && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star 
                                                    key={star} 
                                                    size={16} 
                                                    className={star <= Math.round(product.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'} 
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-white font-bold">{product.rating}</span>
                                        <span className="text-sm text-neutral-500">({product.review_count || 0} ratings)</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="p-6 bg-surface-container-low rounded-xl border border-white/5 mb-6">
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-3xl sm:text-4xl font-headline font-bold text-white">${product.price.toLocaleString()}</span>
                                {product.original_price && (
                                    <>
                                        <span className="text-lg text-neutral-500 line-through">${product.original_price.toLocaleString()}</span>
                                        <span className="text-sm text-green-500 font-bold">{discount}% off</span>
                                    </>
                                )}
                            </div>
                            <p className="text-xs text-neutral-500">Inclusive of all taxes</p>
                        </div>

                        {/* Variants */}
                        {product.variants?.map((variant) => (
                            <div key={variant.type} className="mb-6">
                                <label className="block font-headline text-sm font-bold text-white uppercase tracking-wider mb-3">
                                    {variant.type}: <span className="text-neutral-500 font-normal">{selectedVariants[variant.type]}</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {variant.options.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => setSelectedVariants({ ...selectedVariants, [variant.type]: option })}
                                            className={`px-4 py-2.5 rounded-lg border font-headline text-xs uppercase tracking-wider font-bold transition-all ${
                                                selectedVariants[variant.type] === option
                                                    ? 'bg-white text-black border-white'
                                                    : 'border-white/20 text-neutral-400 hover:border-white/50'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="flex items-center gap-2 mb-6">
                            {product.stock > 0 ? (
                                <>
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm text-green-500 font-bold uppercase tracking-wider">
                                        In Stock ({product.stock} left)
                                    </span>
                                </>
                            ) : (
                                <>
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="text-sm text-red-500 font-bold uppercase tracking-wider">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex items-center gap-3 bg-surface-container-low border border-white/10 rounded-xl px-4 py-2">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="text-neutral-400 hover:text-white transition-colors p-2"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="font-headline text-lg font-bold text-white w-12 text-center">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="text-neutral-400 hover:text-white transition-colors p-2"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            <button 
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className={`flex-1 py-4 font-headline font-bold uppercase text-sm tracking-wider rounded-xl transition-all flex items-center justify-center gap-3 ${
                                    success 
                                        ? 'bg-green-500 text-white' 
                                        : product.stock === 0
                                            ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                                            : 'bg-white text-black hover:bg-neutral-200'
                                }`}
                            >
                                {success ? (
                                    <>
                                        <CheckCircle2 size={20} />
                                        Added to Cart
                                    </>
                                ) : product.stock === 0 ? (
                                    'Out of Stock'
                                ) : (
                                    <>
                                        <ShoppingCart size={20} />
                                        Add to Cart
                                    </>
                                )}
                            </button>

                            <button 
                                onClick={handleWishlistToggle}
                                className={`px-5 py-4 rounded-xl border font-headline font-bold uppercase text-sm tracking-wider transition-all ${
                                    isInWishlist 
                                        ? 'bg-red-500/20 border-red-500 text-red-500' 
                                        : 'border-white/20 text-neutral-400 hover:border-white/50'
                                }`}
                            >
                                <Heart size={20} className={isInWishlist ? 'fill-current' : ''} />
                            </button>
                        </div>

                        {/* Delivery Info */}
                        <div className="p-5 bg-surface-container-low border border-white/5 rounded-xl mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <TruckIcon size={20} className="text-green-500" />
                                <span className="font-headline text-sm font-bold text-white uppercase tracking-wider">Free Delivery</span>
                            </div>
                            <p className="text-sm text-neutral-500 mb-2">
                                Delivery by <span className="text-white font-bold">
                                    {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                </span>
                            </p>
                            <p className="text-xs text-neutral-600">
                                Free shipping on orders over $50
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-white/10 mb-6">
                            <div className="flex gap-8">
                                {['description', 'reviews', 'shipping'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as typeof activeTab)}
                                        className={`pb-4 font-headline text-sm uppercase tracking-wider font-bold border-b-2 transition-all ${
                                            activeTab === tab 
                                                ? 'text-white border-white' 
                                                : 'text-neutral-500 border-transparent hover:text-white'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[200px]">
                            {activeTab === 'description' && (
                                <div>
                                    <p className="text-neutral-400 leading-relaxed mb-6">{product.description}</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-surface-container-low rounded-lg">
                                            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Brand</p>
                                            <p className="font-headline text-sm text-white">{product.brand}</p>
                                        </div>
                                        <div className="p-4 bg-surface-container-low rounded-lg">
                                            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Seller</p>
                                            <p className="font-headline text-sm text-white">{product.seller}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    {/* Rating Summary */}
                                    <div className="flex items-start gap-8 p-6 bg-surface-container-low rounded-xl">
                                        <div className="text-center">
                                            <p className="text-5xl font-headline font-bold text-white">{product.rating || 0}</p>
                                            <div className="flex items-center gap-1 mt-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} size={14} className={star <= Math.round(product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'} />
                                                ))}
                                            </div>
                                            <p className="text-xs text-neutral-500 mt-1">{product.review_count || 0} reviews</p>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            {[[5, 75], [4, 15], [3, 6], [2, 3], [1, 1]].map(([stars, percent]) => (
                                                <div key={stars} className="flex items-center gap-2">
                                                    <span className="text-xs text-neutral-500 w-8">{stars} ★</span>
                                                    <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-yellow-400 rounded-full"
                                                            style={{ width: `${percent}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-neutral-500 w-8">{percent}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Reviews List */}
                                    {reviews.map((review) => (
                                        <div key={review.id} className="p-5 border border-white/5 rounded-xl">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                                                    <span className="font-headline text-sm font-bold text-white">
                                                        {review.userName.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-headline text-sm font-bold text-white">{review.userName}</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Star key={star} size={10} className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'} />
                                                            ))}
                                                        </div>
                                                        {review.verified && (
                                                            <span className="text-[10px] text-green-500 font-bold uppercase">Verified Purchase</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="ml-auto text-xs text-neutral-600">{review.date}</span>
                                            </div>
                                            <h4 className="font-headline text-sm font-bold text-white mb-2">{review.title}</h4>
                                            <p className="text-sm text-neutral-400 mb-3">{review.comment}</p>
                                            <button className="flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors">
                                                <ThumbsUp size={12} />
                                                Helpful ({review.helpful})
                                            </button>
                                        </div>
                                    ))}

                                    {reviews.length === 0 && (
                                        <div className="text-center py-12">
                                            <p className="font-headline text-neutral-500 uppercase tracking-wider">No reviews yet</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'shipping' && (
                                <div className="space-y-4">
                                    <div className="p-4 bg-surface-container-low rounded-lg flex items-center gap-4">
                                        <TruckIcon size={24} className="text-green-500" />
                                        <div>
                                            <p className="font-headline text-sm font-bold text-white">Free Standard Delivery</p>
                                            <p className="text-xs text-neutral-500">
                                                Delivery by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-surface-container-low rounded-lg flex items-center gap-4">
                                        <Zap size={24} className="text-orange-500" />
                                        <div>
                                            <p className="font-headline text-sm font-bold text-white">Express Delivery</p>
                                            <p className="text-xs text-neutral-500">
                                                Delivery by {new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} ($9.99)
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-surface-container-low rounded-lg flex items-center gap-4">
                                        <ShieldCheck size={24} className="text-blue-500" />
                                        <div>
                                            <p className="font-headline text-sm font-bold text-white">7 Day Returns</p>
                                            <p className="text-xs text-neutral-500">Easy returns within 7 days</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-headline font-bold text-white uppercase tracking-wider mb-6">Related Products</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {relatedProducts.map((p) => (
                                <Link key={p.id} href={`/product/${p.id}`} className="group rounded-xl bg-surface-container-low border border-white/5 hover:border-white/20 transition-all overflow-hidden">
                                    <div className="aspect-square relative overflow-hidden">
                                        <Image 
                                            src={p.image} 
                                            alt={p.title} 
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-headline text-sm font-bold text-white uppercase truncate mb-1">{p.title}</h3>
                                        <p className="font-headline text-base font-bold text-white">${p.price.toLocaleString()}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Recently Viewed */}
                {recentProducts.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-headline font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                            <Clock size={24} />
                            Recently Viewed
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {recentProducts.map((p) => (
                                <Link key={p.id} href={`/product/${p.id}`} className="group rounded-xl bg-surface-container-low border border-white/5 hover:border-white/20 transition-all overflow-hidden">
                                    <div className="aspect-square relative overflow-hidden">
                                        <Image 
                                            src={p.image} 
                                            alt={p.title} 
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-headline text-sm font-bold text-white uppercase truncate mb-1">{p.title}</h3>
                                        <p className="font-headline text-base font-bold text-white">${p.price.toLocaleString()}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
