'use client';

import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { useStore } from '@/lib/store';
import { 
    ShoppingBag, 
    History, 
    Shield, 
    Settings,
    ChevronRight,
    LogOut,
    MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
    const { cart, wishlist } = useStore();
    const totalSpent = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('[data-reveal]');
        revealElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 px-4 sm:px-6 pb-12 max-w-4xl mx-auto">
                {/* Profile Hero */}
                <section className="text-center mb-16" data-reveal>
                    <div className="inline-block relative mb-8 group">
                        <div className="w-40 h-40 rounded-full border border-white/10 p-2 glass-panel overflow-hidden">
                            <img 
                                alt="User Avatar" 
                                className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" 
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1587&auto=format&fit=crop" 
                            />
                        </div>
                        <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-black border-4 border-surface cursor-pointer hover:bg-neutral-200 transition-colors haptic-btn">
                            <Settings size={16} />
                        </div>
                    </div>
                    <h1 className="font-headline text-5xl font-bold tracking-tighter text-white uppercase mb-2">NEBULA_CURATOR_01</h1>
                    <p className="font-headline text-[10px] tracking-[0.4em] text-neutral-500 uppercase font-bold">Prestige Level 4 // Structural Architect</p>
                </section>

                {/* Bento Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20" data-reveal>
                    <Link href="/cart" className="p-6 rounded-2xl bg-surface-container-lowest border border-white/5 text-center group hover:bg-white transition-all duration-300">
                        <p className="text-[10px] font-headline text-neutral-500 group-hover:text-black tracking-widest uppercase mb-2">Assets Secured</p>
                        <p className="font-headline text-4xl font-bold text-white group-hover:text-black tracking-tighter">{cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                    </Link>
                    <div className="p-6 rounded-2xl bg-surface-container-lowest border border-white/5 text-center group hover:bg-white transition-all duration-300">
                        <p className="text-[10px] font-headline text-neutral-500 group-hover:text-black tracking-widest uppercase mb-2">Void Rank</p>
                        <p className="font-headline text-4xl font-bold text-white group-hover:text-black tracking-tighter">S-7</p>
                    </div>
                    <Link href="/wishlist" className="p-6 rounded-2xl bg-surface-container-lowest border border-white/5 text-center group hover:bg-white transition-all duration-300">
                        <p className="text-[10px] font-headline text-neutral-500 group-hover:text-black tracking-widest uppercase mb-2">Wishlist</p>
                        <p className="font-headline text-4xl font-bold text-white group-hover:text-black tracking-tighter">{wishlist.length}</p>
                    </Link>
                    <div className="p-6 rounded-2xl bg-surface-container-lowest border border-white/5 text-center group hover:bg-white transition-all duration-300">
                        <p className="text-[10px] font-headline text-neutral-500 group-hover:text-black tracking-widest uppercase mb-2">Spent</p>
                        <p className="font-headline text-4xl font-bold text-white group-hover:text-black tracking-tighter">${(totalSpent / 1000).toFixed(1)}K</p>
                    </div>
                </div>

                {/* Menu Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-reveal>
                    <Link href="/shop" className="flex items-center justify-between p-8 rounded-2xl bg-surface-container-low border border-white/5 hover:bg-surface-container-high transition-all haptic-btn">
                        <div className="flex items-center gap-6">
                            <ShoppingBag size={28} className="text-white" />
                            <span className="font-headline font-bold uppercase tracking-widest text-sm">New Directives</span>
                        </div>
                        <ChevronRight size={20} className="text-neutral-700" />
                    </Link>
                    
                    <Link href="/addresses" className="flex items-center justify-between p-8 rounded-2xl bg-surface-container-low border border-white/5 hover:bg-surface-container-high transition-all haptic-btn">
                        <div className="flex items-center gap-6">
                            <MapPin size={28} className="text-white" />
                            <span className="font-headline font-bold uppercase tracking-widest text-sm">Manage Addresses</span>
                        </div>
                        <ChevronRight size={20} className="text-neutral-700" />
                    </Link>
                    
                    <Link href="/orders" className="flex items-center justify-between p-8 rounded-2xl bg-surface-container-low border border-white/5 hover:bg-surface-container-high transition-all haptic-btn">
                        <div className="flex items-center gap-6">
                            <History size={28} className="text-white" />
                            <span className="font-headline font-bold uppercase tracking-widest text-sm">Void Logs</span>
                        </div>
                        <ChevronRight size={20} className="text-neutral-700" />
                    </Link>
                    
                    <Link href="/settings" className="flex items-center justify-between p-8 rounded-2xl bg-surface-container-low border border-white/5 hover:bg-surface-container-high transition-all haptic-btn">
                        <div className="flex items-center gap-6">
                            <Shield size={28} className="text-white" />
                            <span className="font-headline font-bold uppercase tracking-widest text-sm">Security Node</span>
                        </div>
                        <ChevronRight size={20} className="text-neutral-700" />
                    </Link>
                </div>

                {/* Quick Stats Section */}
                <section className="mt-20 pt-16 border-t border-white/5">
                    <h2 className="font-headline text-2xl font-bold tracking-tighter text-white uppercase mb-10">Activity Pulse</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-xl bg-surface-container-low border border-white/5">
                            <p className="text-[10px] font-headline text-neutral-500 tracking-widest uppercase mb-3">Recent Activity</p>
                            <p className="font-headline text-sm text-white">Added to Vault</p>
                            <p className="text-[10px] text-neutral-600 mt-1">SONIC VOID X1</p>
                        </div>
                        <div className="p-6 rounded-xl bg-surface-container-low border border-white/5">
                            <p className="text-[10px] font-headline text-neutral-500 tracking-widest uppercase mb-3">Pending Orders</p>
                            <p className="font-headline text-sm text-white">2 Transfers</p>
                            <p className="text-[10px] text-neutral-600 mt-1">Processing</p>
                        </div>
                        <div className="p-6 rounded-xl bg-surface-container-low border border-white/5">
                            <p className="text-[10px] font-headline text-neutral-500 tracking-widest uppercase mb-3">Member Since</p>
                            <p className="font-headline text-sm text-white">Sector 9</p>
                            <p className="text-[10px] text-neutral-600 mt-1">March 2024</p>
                        </div>
                    </div>
                </section>

                {/* Sign Out */}
                <div className="mt-20 pt-16 border-t border-white/5">
                    <button className="flex items-center gap-4 text-neutral-500 hover:text-white transition-colors group">
                        <LogOut size={20} className="group-hover:text-white" />
                        <span className="font-headline text-sm uppercase tracking-widest">Sign Out</span>
                    </button>
                </div>
            </div>
        </main>
    );
}
