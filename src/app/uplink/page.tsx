'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Receipt, Activity, Package, Cpu, Shield, Download, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UplinkPage() {
    return (
        <main className="min-h-screen bg-black text-white pb-32">
            {/* Top Bar */}
            <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-cyan-500/10 px-6 py-4 flex items-center justify-between shadow-[0_4px_20px_rgba(0,229,255,0.05)]">
                <div className="flex items-center gap-4">
                    <Link href="/discover" className="text-cyan-400 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold text-cyan-400 tracking-widest uppercase">UPLINK CONFIRMATION</h1>
                </div>
                <button className="text-cyan-400 hover:text-white transition-colors">
                    <Receipt size={24} />
                </button>
            </header>

            <div className="pt-32 px-6 max-w-2xl mx-auto">
                {/* Status Hero */}
                <section className="mb-12">
                    <div className="flex justify-between items-end border-b border-white/10 pb-8">
                        <div>
                            <p className="text-[10px] tracking-[0.3em] text-cyan-400/60 mb-2 uppercase">TRANSMISSION STATUS</p>
                            <motion.h2 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-6xl font-black text-cyan-400 tracking-tighter drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                            >
                                DELIVERED
                            </motion.h2>
                            <p className="text-zinc-500 mt-2 text-sm tracking-widest font-mono">ORDER ID: #CN-77402</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-zinc-600 font-medium tracking-widest mb-1 uppercase font-mono">TIMESTAMP</p>
                            <p className="font-bold text-lg font-mono text-zinc-300">23:14:02 UTC</p>
                        </div>
                    </div>
                </section>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    <InfoCard 
                        icon={<Activity className="text-cyan-400" size={24} />}
                        title="RECIPIENT NODE"
                        value="STATION 09-ALPHA"
                        sub="SECTOR SEVEN • NEURAL GRID"
                    />
                    <InfoCard 
                        icon={<Package className="text-cyan-400" size={24} />}
                        title="FULFILLMENT METHOD"
                        value="VOID-DROP DELIVERY"
                        sub="INSTANT QUANTUM TUNNELING"
                    />
                </div>

                {/* Artifact Manifest */}
                <section className="mb-12">
                    <h3 className="text-[10px] tracking-[0.3em] text-cyan-400 uppercase mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.8)]"></span>
                        ITEMIZED ARTIFACTS
                    </h3>
                    <div className="space-y-4">
                        <ArtifactItem 
                            icon={<Cpu size={24} />}
                            name="NOCTURNE NEURAL LINK"
                            serial="NL-840-X"
                            price="$840.00"
                        />
                        <ArtifactItem 
                            icon={<Shield size={24} />}
                            name="AETHER SHELL V.2"
                            serial="AS-V2-1250"
                            price="$1,250.00"
                        />
                    </div>
                </section>

                {/* Financial Breakdown */}
                <section className="bg-zinc-900/40 p-8 rounded-sm border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                    
                    <div className="space-y-4 mb-8">
                        <BreakdownRow label="SUBTOTAL" value="$2,090.00" />
                        <BreakdownRow label="DELIVERY PROTOCOL" value="FREE" highlight />
                        <BreakdownRow label="TAXES" value="$124.50" />
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-white/10">
                        <span className="text-lg font-bold tracking-[0.2em] text-cyan-400">TOTAL SECURED</span>
                        <span className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] font-mono">$2,214.50</span>
                    </div>
                </section>

                {/* CTAs */}
                <div className="mt-12 flex flex-col gap-4">
                    <button className="w-full bg-cyan-400 text-black py-5 rounded-full font-black tracking-widest uppercase shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3">
                        <Wallet size={20} />
                        EXPORT TO VAULT
                    </button>
                    <button className="w-full py-4 rounded-full font-bold tracking-widest uppercase text-zinc-400 border border-white/10 hover:bg-zinc-900 transition-colors flex items-center justify-center gap-3">
                        <Download size={20} />
                        DOWNLOAD MANIFEST
                    </button>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-10">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 blur-[100px] rounded-full"></div>
            </div>
        </main>
    );
}

function InfoCard({ icon, title, value, sub }: { icon: React.ReactNode, title: string, value: string, sub: string }) {
    return (
        <div className="p-6 rounded-sm bg-zinc-900/50 border border-white/5 hover:border-cyan-400/30 transition-all group">
            <div className="mb-4">{icon}</div>
            <h3 className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3>
            <p className="text-xl font-bold text-white">{value}</p>
            <p className="text-[10px] text-zinc-600 mt-1 uppercase tracking-tight font-mono">{sub}</p>
        </div>
    );
}

function ArtifactItem({ icon, name, serial, price }: { icon: React.ReactNode, name: string, serial: string, price: string }) {
    return (
        <div className="flex items-center justify-between p-5 rounded-sm bg-zinc-900/20 border border-white/5 hover:bg-zinc-900/60 transition-all group">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded bg-black flex items-center justify-center text-zinc-600 group-hover:text-cyan-400 transition-colors border border-white/5">
                    {icon}
                </div>
                <div>
                    <p className="font-bold text-zinc-200 group-hover:text-white transition-colors">{name}</p>
                    <p className="text-[9px] text-zinc-600 tracking-[0.2em] font-mono uppercase mt-1">QTY: 01 // SERIAL: {serial}</p>
                </div>
            </div>
            <p className="font-bold text-zinc-300 font-mono">{price}</p>
        </div>
    );
}

function BreakdownRow({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
    return (
        <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-500 tracking-widest">{label}</span>
            <span className={`font-mono ${highlight ? 'text-cyan-400 font-bold' : 'text-zinc-300'}`}>{value}</span>
        </div>
    );
}
