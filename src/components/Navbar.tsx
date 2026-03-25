'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useStore } from '@/lib/store';

export const Navbar = () => {
    const { searchQuery, setSearchQuery, cart, user } = useStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Close menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
                setIsSearchOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);

    return (
        <>
            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Search Bar */}
            {isSearchOpen && (
                <div className="fixed top-16 left-0 right-0 z-40 bg-neutral-900 border-b border-white/10 p-4 lg:hidden">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                        <input 
                            className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-xl text-white placeholder:text-neutral-600 font-headline outline-none focus:border-white/30"
                            placeholder="Search products..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                        <button 
                            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 bg-neutral-900 border-r border-white/10 transition-transform duration-300 lg:hidden ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden">
                            <img src={user.profilePicture} alt="User" className="w-full h-full object-cover grayscale" />
                        </div>
                        <span className="font-headline text-lg font-bold text-white uppercase">{user.name.split('_')[0]}</span>
                    </div>
                    <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-neutral-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Menu Content */}
                <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100%-140px)]">
                    <div>
                        <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-3 px-2">Menu</p>
                        <div className="space-y-1">
                            <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline uppercase tracking-wider text-white bg-white/10">
                                <ShoppingBag size={18} />
                                Shop
                            </Link>
                            <Link href="/deals" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                <span className="text-orange-400">⚡</span>
                                Deals
                            </Link>
                            <Link href="/bulk" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                📦
                                Bulk Orders
                            </Link>
                        </div>
                    </div>

                    <div>
                        <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-3 px-2">Account</p>
                        <div className="space-y-1">
                            <Link href="/account" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                👤
                                Account
                            </Link>
                            <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                📋
                                Orders
                            </Link>
                            <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                ❤️
                                Wishlist
                            </Link>
                            <Link href="/addresses" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                📍
                                Addresses
                            </Link>
                        </div>
                    </div>

                    <div>
                        <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-3 px-2">Business</p>
                        <div className="space-y-1">
                            <Link href="/analytics" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                📊
                                Analytics
                            </Link>
                            <Link href="/logistics" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                🚚
                                Logistics
                            </Link>
                            <Link href="/settings" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                ⚙️
                                Settings
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Cart Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <Link 
                        href="/cart"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-headline text-sm uppercase tracking-wider font-bold rounded-lg"
                    >
                        <ShoppingBag size={18} />
                        Cart {cartCount > 0 && `(${cartCount})`}
                    </Link>
                </div>
            </div>

            {/* Main Navbar */}
            <header className="fixed top-0 left-0 right-0 z-30 bg-neutral-900/95 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-[1920px] mx-auto">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between h-16 px-4 lg:px-6">
                        {/* Left: Menu + Logo */}
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setIsMenuOpen(true)}
                                className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg transition-colors lg:hidden"
                            >
                                <Menu size={24} />
                            </button>

                            <Link href="/" className="font-headline text-lg sm:text-xl lg:text-2xl font-bold tracking-tighter text-white uppercase">
                                NEBULA
                            </Link>
                        </div>

                        {/* Center: Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            <Link href="/shop" className="font-headline text-xs uppercase tracking-wider font-bold text-white hover:text-neutral-300 transition-colors">
                                Marketplace
                            </Link>
                            <Link href="/deals" className="relative font-headline text-xs uppercase tracking-wider font-bold text-orange-400 hover:text-orange-300 transition-colors">
                                Deals
                                <span className="absolute -top-1 -right-4 px-1.5 py-0.5 bg-red-500 text-white text-[8px] font-bold rounded">HOT</span>
                            </Link>
                            <Link href="/bulk" className="font-headline text-xs uppercase tracking-wider font-bold text-neutral-400 hover:text-white transition-colors">
                                Bulk Orders
                            </Link>
                            <Link href="/analytics" className="font-headline text-xs uppercase tracking-wider font-bold text-neutral-400 hover:text-white transition-colors">
                                Analytics
                            </Link>
                        </nav>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Search Button (Mobile) */}
                            <button 
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors lg:hidden"
                            >
                                <Search size={22} />
                            </button>

                            {/* Search (Desktop) */}
                            <div className="hidden lg:block relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                                <input 
                                    className="w-48 xl:w-64 pl-10 pr-4 py-2 bg-neutral-800 border border-white/10 rounded-lg text-xs text-white placeholder:text-neutral-600 font-headline uppercase tracking-wider outline-none focus:border-white/30 transition-all"
                                    placeholder="Search..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Cart */}
                            <Link href="/cart" className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                                <ShoppingBag size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-white text-black text-[10px] font-bold flex items-center justify-center rounded-full px-1">
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* User */}
                            <Link href="/account" className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                                <User size={22} />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Nav Pills */}
                    <div className="flex items-center gap-1 px-4 py-2 border-t border-white/5 overflow-x-auto lg:hidden scrollbar-hide">
                        <Link href="/shop" className="px-4 py-2 text-xs font-headline uppercase tracking-wider font-bold text-white bg-white/10 rounded-full whitespace-nowrap">
                            Shop
                        </Link>
                        <Link href="/deals" className="px-4 py-2 text-xs font-headline uppercase tracking-wider font-bold text-orange-400 whitespace-nowrap">
                            Deals 🔥
                        </Link>
                        <Link href="/bulk" className="px-4 py-2 text-xs font-headline uppercase tracking-wider font-bold text-neutral-400 whitespace-nowrap">
                            Bulk
                        </Link>
                        <Link href="/orders" className="px-4 py-2 text-xs font-headline uppercase tracking-wider font-bold text-neutral-400 whitespace-nowrap">
                            Orders
                        </Link>
                        <Link href="/account" className="px-4 py-2 text-xs font-headline uppercase tracking-wider font-bold text-neutral-400 whitespace-nowrap">
                            Account
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
};
