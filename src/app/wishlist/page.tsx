'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { useStore, MOCK_PRODUCTS } from '@/lib/store';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
    const { wishlist, addToCart, removeFromWishlist } = useStore();
    
    const wishlistProducts = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id));

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 px-4 sm:px-6 max-w-7xl mx-auto pb-12">
                {/* Breadcrumbs */}
                <Link href="/account" className="inline-flex items-center gap-2 text-[10px] font-headline font-bold text-neutral-500 uppercase tracking-widest mb-10 hover:text-white transition-colors group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> BACK TO PROFILE
                </Link>

                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <Heart size={28} className="text-white" />
                        <h1 className="font-headline text-4xl font-bold tracking-tighter text-white uppercase">Wishlist Vault</h1>
                    </div>
                    <p className="font-headline text-[10px] tracking-[0.4em] text-neutral-500 uppercase font-bold">
                        {wishlistProducts.length} Assets Archived
                    </p>
                </div>

                {wishlistProducts.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center border border-white/5 rounded-2xl bg-white/[0.02]">
                        <Heart className="text-neutral-700 w-12 h-12 mb-6" />
                        <p className="font-headline text-neutral-500 uppercase tracking-[0.5em] text-xs font-bold mb-6">Archive empty</p>
                        <Link href="/shop" className="px-6 py-3 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-widest rounded hover:bg-neutral-200 transition-colors haptic-btn">
                            Explore Archives
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistProducts.map((product) => (
                            <div key={product.id} className="group relative bg-surface-container-low rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all">
                                <Link href={`/product/${product.id}`} className="block">
                                    <div className="aspect-[4/5] overflow-hidden">
                                        <img 
                                            src={product.image} 
                                            alt={product.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                                        />
                                    </div>
                                </Link>
                                
                                {/* Remove Button */}
                                <button
                                    onClick={() => removeFromWishlist(product.id)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-neutral-400 hover:text-white hover:bg-black transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>

                                {/* Add to Cart */}
                                <button
                                    onClick={() => addToCart(product)}
                                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-neutral-200 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ShoppingCart size={16} />
                                </button>

                                <div className="p-5">
                                    <Link href={`/product/${product.id}`}>
                                        <h3 className="font-headline text-sm font-bold text-white uppercase tracking-tight mb-1 hover:text-neutral-300 transition-colors">
                                            {product.title}
                                        </h3>
                                    </Link>
                                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-3">{product.category}</p>
                                    <p className="font-headline font-bold text-white">${product.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
