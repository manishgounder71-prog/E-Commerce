'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { useStore } from '@/lib/store';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag, ShieldCheck, Truck, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, clearCart } = useStore();
    
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const processing = cart.length > 0 ? 42.00 : 0;
    const total = subtotal + processing;

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
                <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-headline font-bold text-neutral-500 uppercase tracking-wider mb-6 sm:mb-8 lg:mb-10 hover:text-white transition-colors group">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> BACK
                </Link>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-12">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-headline font-bold tracking-tighter text-white uppercase">Transfer Vault</h1>
                            {cart.length > 0 && (
                                <button onClick={() => clearCart()} className="text-neutral-500 hover:text-white text-xs font-headline uppercase tracking-wider transition-colors">
                                    Clear All
                                </button>
                            )}
                        </div>

                        {cart.length === 0 ? (
                            <div className="py-16 sm:py-20 flex flex-col items-center justify-center border border-white/5 rounded-2xl bg-white/[0.02]">
                                <ShoppingBag className="text-neutral-700 w-12 h-12 mb-6" />
                                <p className="font-headline text-neutral-500 uppercase tracking-wider text-sm font-bold mb-6">Manifest empty</p>
                                <Link href="/shop" className="px-6 py-3 bg-white text-black font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors">
                                    Explore Archives
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4 sm:space-y-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 sm:gap-6 pb-6 border-b border-white/5">
                                        <Link href={`/product/${item.id}`} className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-surface-container-lowest rounded-xl overflow-hidden border border-white/5 flex-shrink-0">
                                            <Image 
                                                src={item.image} 
                                                alt={item.title} 
                                                fill
                                                className="object-contain p-2 grayscale hover:grayscale-0 transition-all duration-500" 
                                            />
                                        </Link>
                                        <div className="flex-1 flex flex-col justify-between min-w-0">
                                            <div className="flex justify-between items-start gap-2">
                                                <div>
                                                    <Link href={`/product/${item.id}`} className="font-headline text-sm sm:text-base lg:text-lg font-bold text-white uppercase hover:text-neutral-300 transition-colors truncate block">
                                                        {item.title}
                                                    </Link>
                                                    <p className="text-[10px] uppercase tracking-wider text-neutral-500 mt-1">{item.category}</p>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-neutral-600 hover:text-white transition-colors p-2">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-3 bg-surface-container rounded-lg px-3 py-2">
                                                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="text-white hover:text-neutral-400 transition-colors">
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-headline w-8 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-white hover:text-neutral-400 transition-colors">
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-headline font-bold text-white text-base lg:text-lg">${(item.price * item.quantity).toLocaleString()}</p>
                                                    <p className="text-[9px] text-neutral-600 uppercase tracking-wider">${item.price} / unit</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="w-full lg:w-80 xl:w-96">
                        <div className="bg-surface-container-low p-6 lg:p-8 rounded-2xl border border-white/5 lg:sticky lg:top-24">
                            <h2 className="font-headline uppercase text-xs tracking-widest text-neutral-500 mb-8">Summary</h2>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between">
                                    <span className="text-sm uppercase tracking-wider text-neutral-400">Subtotal</span>
                                    <span className="font-headline text-white">${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm uppercase tracking-wider text-neutral-400">Processing</span>
                                    <span className="font-headline text-white">${processing.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm uppercase tracking-wider text-neutral-400">Shipping</span>
                                    <span className="text-xs font-headline font-bold text-white tracking-wider uppercase">Secured</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 mb-8 flex justify-between items-end">
                                <span className="text-sm uppercase tracking-wider font-headline font-bold text-white">Total</span>
                                <span className="text-3xl font-headline font-bold text-white">${total.toLocaleString()}</span>
                            </div>

                            {cart.length > 0 ? (
                                <Link href="/checkout" className="block w-full py-4 bg-white text-black font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors text-center">
                                    Initiate Transfer
                                </Link>
                            ) : (
                                <button disabled className="w-full py-4 bg-white/30 text-black/50 font-headline font-bold uppercase text-xs tracking-wider rounded-lg cursor-not-allowed">
                                    Initiate Transfer
                                </button>
                            )}

                            <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/5">
                                <div className="flex flex-col items-center gap-2">
                                    <ShieldCheck size={20} className="text-neutral-500" />
                                    <span className="text-[8px] text-neutral-600 uppercase tracking-wider font-headline text-center">Secure</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Truck size={20} className="text-neutral-500" />
                                    <span className="text-[8px] text-neutral-600 uppercase tracking-wider font-headline text-center">Express</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Zap size={20} className="text-neutral-500" />
                                    <span className="text-[8px] text-neutral-600 uppercase tracking-wider font-headline text-center">Instant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
