'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageSquare, Share2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FEED_ITEMS = [
    {
        id: 1,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhVD2A0xDPx9L5xOcBejhVeFckIM08lIS0hj564md2amdkArXsIK7dkhRVjUbkdO3iM_R29oCQ6__Y_Tuajm7S_QHh4QJP4t40-wghJhfmd6Hfz_nqSKRCu5sKUANQKXDA4ZCiNJAumzq8CMRRZ8QeReDjwKI8xIbUxa_QkBe3_P2PT7xzc0cogqguarfOuJFi0rQretnAPhj1vZ9HOD9qNnn4UlBbwNvTewXXtkkx3F0L4Ahb16fOFLekZnUmZw6TVD94DZyxZ8Q',
        curator: 'CURATOR_01',
        curatorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8XLC5b5ncZHym87itqLuzp8LzX_x7G73ePKwL5eaK8rj-9r4RodGeyHLJGi4CTX8M62_d3BtriFQkS9bQgJjuNo0HKUSF4l9mKzgscSfZ0zFjU1jlqG56PqGaIMNLRakUr4FnVOGVMsCD21w8GTKvG74HUKeLVXRZCnXStpnsyGcWqWy-IDrxdg3DVlw9aRGKiqO3WCs47xytkx8Q9O9fmzk6TcFCrwtpkEoJMHeLUW8i-hQ0Nh0QMHZ0ZkT36-D25_mYDUH02ak',
        series: 'Midnight Protocol Series',
        description: 'Exploring the intersection of brutalist architecture and wearable technology. The #MidnightProtocol series launches tonight. ⚡',
        likes: '12.4K',
        comments: '842',
        tags: [
            { id: 't1', x: '60%', y: '35%', name: 'CYBER STRIDER X1', price: '$420' },
            { id: 't2', x: '30%', y: '65%', name: 'NEON WEAVE VEST', price: '$890' },
        ]
    },
    {
        id: 2,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8rC5lu4Y0qB4dlRyuINIQHJqAGcxaaIpuPDT_6qsXdIABRw9XcdzgqV9boFOLpwlAc-q_3E7m2PMli3q4RJyWHGk9bkNhWkcUs7obdpYySEsUNwM6L6bBztlb3dDsy5WXiZrvbIgI4E9uTRmCBkQd1b8MW1giZJoOTNxlVhsiS7YkfwOr4kaHG3E8RA7K9mgZgm20Mm_pzcSsvwU87f67fxoWOROk-haEybWhHPtryogbJRIea4O6deUIR3VIrdKcR69gAxB5V8E',
        curator: 'NOIR_ARCHITECT',
        curatorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlPcDD1hslCkum5f3BpRHuQK7h48rDJ8FTcbTsvCaO9ALXt5rOXJwaOOe2qRsxMxnweWOdkupuKbIpoZu1_wAWJfAWkKmnSVorAOVe7ql7PdcIxY6Zig2E4xhKyldFoG8y-N607Dn2xz3eg49h8bN2oIHRl2EMC5R-MhxuJvlu7BBSMzkeFpnEowhW44XGJcsY1MRfoaFrbVlUzVYaoPNrJW-4NQCtdorXypJuIYxIcbvAsVun_OO96TolJAwLIX7gr4O7LjoixE',
        series: 'Void Aesthetics Studio',
        description: 'Minimalism is not the absence of things, but the perfect presence of the essential. Void Coat MK.II in obsidian black.',
        likes: '8.1K',
        comments: '312',
        tags: [
            { id: 't3', x: '45%', y: '45%', name: 'VOID COAT MK.II', price: '$1,150' },
        ]
    }
];

export default function DiscoverPage() {
    return (
        <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none bg-black">
            {FEED_ITEMS.map((item) => (
                <FeedItem key={item.id} item={item} />
            ))}
        </main>
    );
}

function FeedItem({ item }: { item: typeof FEED_ITEMS[0] }) {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    return (
        <section className="relative h-screen w-full snap-start overflow-hidden group">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src={item.imageUrl} 
                    alt={item.description}
                    fill
                    className="object-cover opacity-80 scale-105 group-hover:scale-100 transition-transform duration-[10s] ease-linear"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
            </div>

            {/* Product Tags Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {item.tags.map((tag) => (
                    <div 
                        key={tag.id}
                        className="absolute pointer-events-auto"
                        style={{ left: tag.x, top: tag.y }}
                    >
                        <div className="relative group/tag">
                            {/* Pulsing Dot */}
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(0,229,255,0.8)] cursor-pointer"
                                onMouseEnter={() => setActiveTag(tag.id)}
                                onMouseLeave={() => setActiveTag(null)}
                            />
                            
                            {/* Tag Info Card */}
                            <AnimatePresence>
                                {activeTag === tag.id && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 24 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="absolute top-1/2 -translate-y-1/2 bg-zinc-900/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl whitespace-nowrap"
                                    >
                                        <p className="font-bold text-xs text-cyan-300">{tag.name}</p>
                                        <p className="text-[10px] text-zinc-400">{tag.price}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>

            {/* Side Actions */}
            <div className="absolute right-6 bottom-32 z-30 flex flex-col items-center gap-6">
                <ActionButton icon={<Heart size={24} />} count={item.likes} hoverClass="hover:text-red-500" />
                <ActionButton icon={<MessageSquare size={24} />} count={item.comments} hoverClass="hover:text-cyan-400" />
                <ActionButton icon={<Share2 size={24} />} hoverClass="hover:text-cyan-400" />
            </div>

            {/* Bottom Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 pointer-events-none">
                <div className="max-w-xl pointer-events-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full border border-cyan-400/30 overflow-hidden bg-zinc-900 relative">
                            <Image 
                                src={item.curatorAvatar} 
                                alt={item.curator} 
                                fill 
                                className="object-cover" 
                            />
                        </div>
                        <div>
                            <p className="font-bold text-cyan-400 tracking-wider text-sm">{item.curator}</p>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{item.series}</p>
                        </div>
                        <button className="ml-4 px-4 py-1 rounded-full border border-cyan-400/20 text-[10px] font-bold text-cyan-400 hover:bg-cyan-400/10 transition-colors uppercase">
                            FOLLOW
                        </button>
                    </div>
                    
                    <p className="text-sm text-zinc-300 leading-relaxed mb-6 drop-shadow-md">
                        {item.description}
                    </p>

                    <Link 
                        href="/shop"
                        className="w-full md:w-auto px-10 py-4 rounded-full bg-cyan-400 text-black font-bold text-xs tracking-[0.2em] inline-flex items-center justify-center gap-2 uppercase shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        <ShoppingBag size={16} />
                        SHOP THE LOOK
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ActionButton({ icon, count, hoverClass }: { icon: React.ReactNode, count?: string, hoverClass?: string }) {
    return (
        <button className="flex flex-col items-center gap-1 group">
            <div className={`w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/5 flex items-center justify-center text-zinc-300 transition-all duration-300 group-active:scale-90 ${hoverClass}`}>
                {icon}
            </div>
            {count && <span className="text-[10px] font-bold text-zinc-500">{count}</span>}
        </button>
    );
}
