'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    LayoutGrid, 
    History, 
    Heart, 
    Settings, 
    ShieldCheck, 
    Truck, 
    BarChart3, 
    Users,
    ShoppingBag,
    X
} from 'lucide-react';
import { useStore } from '@/lib/store';

export const Sidebar = () => {
    const { activeCategory, setActiveCategory, isMenuOpen, setMenuOpen, cart, user } = useStore();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const categories = [
        { id: 'ALL', label: 'All Manifests', icon: <LayoutGrid size={18} />, href: '/shop' },
        { id: 'HARDWARE', label: 'Hardware Nodes', icon: <ShieldCheck size={18} />, href: '/shop' },
        { id: 'APPAREL', label: 'Apparel Assets', icon: <Heart size={18} />, href: '/shop' },
        { id: 'OPTICS', label: 'Optics Archives', icon: <History size={18} />, href: '/shop' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-full w-72 max-w-[85vw] z-50 bg-neutral-900/95 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 ease-out lg:hidden ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <span className="font-headline text-lg font-bold text-white uppercase tracking-wider">NEBULA</span>
                    <button 
                        onClick={() => setMenuOpen(false)}
                        className="p-2 text-neutral-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* User */}
                <div className="p-4 border-b border-white/5">
                    <Link href="/account" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-white/20">
                            <Image 
                                alt="User" 
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                                src={user.profilePicture} 
                            />
                        </div>
                        <div>
                            <p className="font-headline text-xs text-neutral-500 uppercase tracking-wider">{user.company || 'Void Agent'}</p>
                            <p className="font-headline text-sm text-white font-bold uppercase truncate max-w-[140px]">{user.name}</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div>
                        <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-[0.2em] mb-3 px-2">Marketplace</p>
                        <div className="space-y-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveCategory(cat.id);
                                        setMenuOpen(false);
                                    }}
                                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-headline text-xs uppercase tracking-wider font-bold transition-all ${
                                        activeCategory === cat.id 
                                            ? 'text-white bg-white/10' 
                                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {cat.icon}
                                    {cat.label}
                                </button>
                            ))}
                            <Link 
                                href="/wishlist"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-headline text-xs uppercase tracking-wider font-bold text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                            >
                                <Heart size={18} />
                                Wishlist Vault
                            </Link>
                            <Link 
                                href="/orders"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-headline text-xs uppercase tracking-wider font-bold text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                            >
                                <History size={18} />
                                Void Logs
                            </Link>
                        </div>
                    </div>

                    <div>
                        <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-[0.2em] mb-3 px-2">Business Suite</p>
                        <div className="space-y-1">
                            <Link href="/analytics" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-headline text-xs uppercase tracking-wider font-bold text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                                <BarChart3 size={18} />
                                Asset Insights
                            </Link>
                            <Link href="/logistics" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-headline text-xs uppercase tracking-wider font-bold text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                                <Truck size={18} />
                                Logistic Nodes
                            </Link>
                            <Link href="/team" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-headline text-xs uppercase tracking-wider font-bold text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                                <Users size={18} />
                                Team Access
                            </Link>
                            <Link href="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-headline text-xs uppercase tracking-wider font-bold text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                                <Settings size={18} />
                                Void Config
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Cart Button */}
                <div className="p-4 border-t border-white/5">
                    <Link 
                        href="/cart"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-headline text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                        <ShoppingBag size={18} />
                        Manifest Cart
                        {cartCount > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-black text-white text-[10px] rounded-full">{cartCount}</span>
                        )}
                    </Link>
                </div>
            </aside>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 z-40 bg-neutral-900/60 backdrop-blur-xl border-r border-white/5 flex-col pt-20 pb-6 px-4 gap-4">
                {/* User */}
                <Link href="/account" className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-white/20">
                        <Image 
                            alt="User" 
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                            src={user.profilePicture} 
                        />
                    </div>
                    <div>
                        <p className="font-headline text-[9px] text-neutral-500 uppercase tracking-wider">{user.company || 'Void Agent'}</p>
                        <p className="font-headline text-[11px] text-white font-bold uppercase tracking-wide truncate max-w-[120px]">{user.name}</p>
                    </div>
                </Link>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto space-y-6">
                    <div>
                        <p className="font-headline text-[9px] text-neutral-500 uppercase tracking-[0.2em] mb-2 px-3">Marketplace</p>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-md font-headline text-[10px] uppercase tracking-wider font-bold transition-all ${
                                    activeCategory === cat.id 
                                        ? 'text-white bg-white/10' 
                                        : 'text-neutral-500 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                        <Link href="/wishlist" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md font-headline text-[10px] uppercase tracking-wider font-bold text-neutral-500 hover:text-white hover:bg-white/5 transition-all">
                            <Heart size={16} />
                            Wishlist Vault
                        </Link>
                        <Link href="/orders" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md font-headline text-[10px] uppercase tracking-wider font-bold text-neutral-500 hover:text-white hover:bg-white/5 transition-all">
                            <History size={16} />
                            Void Logs
                        </Link>
                    </div>

                    <div>
                        <p className="font-headline text-[9px] text-neutral-500 uppercase tracking-[0.2em] mb-2 px-3">Business Suite</p>
                        <Link href="/analytics" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md font-headline text-[10px] uppercase tracking-wider font-bold text-neutral-500 hover:text-white hover:bg-white/5 transition-all">
                            <BarChart3 size={16} />
                            Asset Insights
                        </Link>
                        <Link href="/logistics" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md font-headline text-[10px] uppercase tracking-wider font-bold text-neutral-500 hover:text-white hover:bg-white/5 transition-all">
                            <Truck size={16} />
                            Logistic Nodes
                        </Link>
                        <Link href="/team" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md font-headline text-[10px] uppercase tracking-wider font-bold text-neutral-500 hover:text-white hover:bg-white/5 transition-all">
                            <Users size={16} />
                            Team Access
                        </Link>
                        <Link href="/settings" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md font-headline text-[10px] uppercase tracking-wider font-bold text-neutral-500 hover:text-white hover:bg-white/5 transition-all">
                            <Settings size={16} />
                            Void Config
                        </Link>
                    </div>
                </nav>

                <Link 
                    href="/cart"
                    className="flex items-center justify-center gap-2 py-3 bg-white text-black font-headline text-[10px] uppercase tracking-wider font-bold rounded-md hover:bg-neutral-200 transition-colors"
                >
                    <ShoppingBag size={16} />
                    Manifest Cart
                    {cartCount > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 bg-black text-white text-[9px] rounded-full">{cartCount}</span>
                    )}
                </Link>
            </aside>
        </>
    );
};
