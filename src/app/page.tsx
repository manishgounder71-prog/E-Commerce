'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { ArrowRight, Box, Zap, Cpu, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 sm:pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center px-4 sm:px-8 lg:px-16 xl:px-20 overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#1f1f1f_0%,#131313_100%)]">
                    <div className="relative z-10 max-w-2xl lg:max-w-3xl mt-8 sm:mt-12">
                        <span className="font-headline uppercase text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-neutral-500 mb-4 sm:mb-6 block font-bold">
                            B2B ARCHITECTURAL PROTOCOL / 2024
                        </span>
                        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none mb-6 sm:mb-8 lg:mb-10 text-white">
                            STRUCTURAL<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600 animate-drift inline-block">
                                AUTHORITY
                            </span>
                        </h1>
                        <p className="font-body text-neutral-400 text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 lg:mb-12 max-w-md leading-relaxed">
                            Supply chain precision for the monochromatic era. Scale your architectural manifests with high-fidelity B2B acquisition.
                        </p>
                        
                        <div className="flex flex-wrap gap-3 sm:gap-5">
                            <Link href="/shop" className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-white text-black font-headline font-bold uppercase text-[9px] sm:text-[10px] lg:text-[11px] tracking-widest rounded-lg hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-2xl shadow-white/10">
                                ENTER MARKETPLACE
                            </Link>
                            <Link href="/bulk" className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-white/5 border border-white/10 text-white font-headline font-bold uppercase text-[9px] sm:text-[10px] lg:text-[11px] tracking-widest rounded-lg hover:bg-white/10 transition-colors active:scale-[0.98]">
                                BULK LOGISTICS
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="absolute right-[-20%] sm:right-[-15%] lg:right-[-10%] top-1/2 -translate-y-1/2 w-[80%] h-full pointer-events-none opacity-40 mix-blend-screen blur-[2px] hover:blur-none transition-all duration-700 hidden sm:block">
                        <img 
                            src="https://placehold.co/1200x800/1f1f1f/666666?text=NEBULA+ARCHITECTURE"
                            alt="Hero"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </section>

                {/* Category Bento */}
                <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-8 lg:px-16 xl:px-20 bg-surface">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-8 sm:mb-12 lg:mb-16">
                        <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white uppercase">
                            CORE<br />SECTORS
                        </h2>
                        <p className="font-headline text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.5em] text-neutral-600 uppercase font-black">
                            MULTI-VENDOR / PROTOCOL
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[250px] sm:auto-rows-[300px]">
                        <CategoryCard 
                            title="Hardware Evolution"
                            desc="Tier-1 processing units and kinetic enclosures."
                            image="https://placehold.co/800x600/1a1a1a/ffffff?text=HARDWARE"
                            colSpan="sm:col-span-2"
                        />
                        <CategoryCard 
                            title="Soft-Asset Apparel"
                            desc="Structural textiles with neural fiber integration."
                            image="https://placehold.co/600x600/2d2d2d/ffffff?text=APPAREL"
                        />
                        <div className="glass-panel p-6 sm:p-8 lg:p-10 flex flex-col justify-center gap-4 sm:gap-6 rounded-xl border-white/10 hover:border-white/20 transition-all">
                            <Zap className="text-white w-6 h-6 sm:w-8" />
                            <h3 className="font-headline text-xl sm:text-2xl font-bold text-white uppercase tracking-tight leading-tight">
                                ENTERPRISE LOGISTICS
                            </h3>
                            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
                                Real-time manifested inventory tracking for multi-national architectural firms.
                            </p>
                            <Link href="/logistics" className="text-white text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 group mt-2 sm:mt-4">
                                OPEN PROMISES <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <CategoryCard 
                            title="Visual Interfaces"
                            desc="Retinal-mapped projection systems."
                            image="https://placehold.co/800x600/1a1a1a/ffffff?text=INTERFACES"
                            colSpan="sm:col-span-2"
                        />
                        <CategoryCard 
                            title="Kinetic Module"
                            desc="Advanced mechanical systems and motion control units."
                            image="https://placehold.co/600x600/2d2d2d/ffffff?text=KINETIC"
                        />
                    </div>
                </section>

                {/* Seller CTA */}
                <section className="py-12 sm:py-16 lg:py-32 px-4 sm:px-8 lg:px-16 xl:px-20 border-t border-white/5 bg-neutral-950 flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-20 items-center">
                    <div className="max-w-xl">
                        <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white mb-6 sm:mb-8 uppercase leading-tight">
                            BECOME A<br />MANIFEST SELLLER
                        </h2>
                        <p className="text-neutral-500 text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 leading-relaxed font-body">
                            Join the world&apos;s most exclusive architectural supply network.
                        </p>
                        <button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-white text-black font-headline font-bold uppercase text-[9px] sm:text-[10px] lg:text-[11px] tracking-widest rounded-lg hover:bg-neutral-200 transition-colors">
                            CREATE SELLER ACCOUNT
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-96">
                        <StatsCard icon={<Globe />} label="Global Nodes" value="4.2k" />
                        <StatsCard icon={<Cpu />} label="Asset Syncs" value="12M" />
                        <StatsCard icon={<Box />} label="Fulfillments" value="99.9%" />
                        <StatsCard icon={<Zap />} label="Latency" value="12ms" />
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="w-full border-t border-white/5 bg-black py-8 sm:py-12 lg:py-16 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-8">
                    <div className="font-headline text-xl sm:text-2xl font-black text-white tracking-widest">NEBULA</div>
                    <div className="flex gap-6 sm:gap-12 font-headline text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] font-bold text-neutral-600 uppercase">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
                    </div>
                    <p className="font-headline text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] text-neutral-800 uppercase font-bold">
                        © 2024 NEBULA PROTOCOLS
                    </p>
                </div>
            </footer>
        </main>
    );
}

function CategoryCard({ title, desc, image, colSpan = "" }: { title: string, desc: string, image: string, colSpan?: string }) {
    return (
        <div className={`group relative overflow-hidden rounded-xl border border-white/5 hover:border-white/20 transition-all ${colSpan}`}>
            <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8">
                <h3 className="font-headline text-base sm:text-lg lg:text-2xl font-bold text-white uppercase tracking-tight mb-1 sm:mb-2">{title}</h3>
                <p className="text-neutral-400 text-[10px] sm:text-xs font-body mb-3 sm:mb-4 lg:mb-6 max-w-xs">{desc}</p>
                <Link href="/shop" className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-bold tracking-widest text-white uppercase border-b border-white/30 pb-0.5 hover:border-white transition-colors text-xs">
                    EXPLORE <ArrowRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    );
}

function StatsCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="p-4 sm:p-6 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
            <div className="text-neutral-500 mb-2 sm:mb-3">{icon}</div>
            <div className="font-headline text-lg sm:text-xl lg:text-2xl font-black text-white mb-0.5 uppercase tracking-tighter">{value}</div>
            <div className="font-headline text-[7px] sm:text-[8px] tracking-[0.2em] text-neutral-600 uppercase font-black">{label}</div>
        </div>
    );
}
