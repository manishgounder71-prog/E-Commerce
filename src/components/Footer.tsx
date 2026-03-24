'use client';

import React from 'react';
import Link from 'next/link';
import { Link2, Globe, Zap } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-neutral-950 border-t border-white/5 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="font-headline text-xl font-bold text-white uppercase tracking-wider">
                            NEBULA
                        </Link>
                        <p className="text-neutral-500 text-sm mt-4 leading-relaxed">
                            Next-generation B2B architectural protocol. Scale your manifests with precision.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-neutral-600 hover:text-white transition-colors">
                                <Globe size={18} />
                            </a>
                            <a href="#" className="text-neutral-600 hover:text-white transition-colors">
                                <Link2 size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider mb-4">Marketplace</h4>
                        <ul className="space-y-3">
                            <li><Link href="/shop" className="text-neutral-500 text-sm hover:text-white transition-colors">All Assets</Link></li>
                            <li><Link href="/deals" className="text-neutral-500 text-sm hover:text-white transition-colors">Flash Deals</Link></li>
                            <li><Link href="/wishlist" className="text-neutral-500 text-sm hover:text-white transition-colors">Wishlist Vault</Link></li>
                            <li><Link href="/orders" className="text-neutral-500 text-sm hover:text-white transition-colors">Void Logs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider mb-4">Business</h4>
                        <ul className="space-y-3">
                            <li><Link href="/bulk" className="text-neutral-500 text-sm hover:text-white transition-colors">Bulk Logistics</Link></li>
                            <li><Link href="/logistics" className="text-neutral-500 text-sm hover:text-white transition-colors">Shipment Tracking</Link></li>
                            <li><Link href="/analytics" className="text-neutral-500 text-sm hover:text-white transition-colors">Asset Insights</Link></li>
                            <li><Link href="/team" className="text-neutral-500 text-sm hover:text-white transition-colors">Team Access</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider mb-4">Account</h4>
                        <ul className="space-y-3">
                            <li><Link href="/account" className="text-neutral-500 text-sm hover:text-white transition-colors">Profile</Link></li>
                            <li><Link href="/addresses" className="text-neutral-500 text-sm hover:text-white transition-colors">Addresses</Link></li>
                            <li><Link href="/settings" className="text-neutral-500 text-sm hover:text-white transition-colors">Void Config</Link></li>
                            <li><Link href="/login" className="text-neutral-500 text-sm hover:text-white transition-colors">Access Void</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-600 text-xs font-headline">
                        2026 NEBULA ARCHITECTURAL PROTOCOL // ALL MANIFESTS SECURED
                    </p>
                    <div className="flex items-center gap-2">
                        <Zap size={14} className="text-neutral-600" />
                        <span className="text-neutral-600 text-xs font-headline">QUANTUM ENCRYPTION ACTIVE</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
