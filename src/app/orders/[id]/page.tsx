'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Headphones, Package, Box, MapPin, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrackerPage({ params }: { params: { id: string } }) {
    // In a real app, we'd fetch order data by ID from Supabase here
    const orderId = params.id || 'XP-9941-LT';

    return (
        <main className="min-h-screen bg-black text-white pb-32">
            {/* Top Bar */}
            <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 py-5 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/orders" className="text-cyan-400 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="font-headline text-xl font-bold tracking-[0.2em] uppercase text-cyan-400">LOGISTICS_TRACKER</h1>
                </div>
                <button className="text-zinc-500 hover:text-cyan-400 transition-colors">
                    <Headphones size={24} />
                </button>
            </header>

            <div className="pt-32 px-6 max-w-2xl mx-auto">
                {/* Shipment Overview */}
                <section className="mb-12">
                    <div className="bg-zinc-900/30 rounded-3xl p-8 border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                            <Box size={120} className="text-cyan-400 rotate-12" />
                        </div>

                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <p className="text-[10px] font-headline text-cyan-400/60 tracking-[0.3em] mb-1 uppercase">EXPEDITION ID</p>
                                <h2 className="font-headline text-4xl font-bold tracking-tighter text-white">{orderId}</h2>
                            </div>
                            <div className="bg-cyan-400/10 border border-cyan-400/20 px-4 py-1.5 rounded-full">
                                <p className="text-[10px] font-headline font-bold text-cyan-400 uppercase tracking-widest animate-pulse">IN TRANSIT</p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-5 rounded-2xl bg-zinc-800/40 mb-10 border border-white/5 group transition-all hover:bg-zinc-800/60">
                            <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center border border-white/10 group-hover:border-cyan-400/30 transition-colors">
                                <Package className="text-cyan-400/40 group-hover:text-cyan-400 transition-colors" size={32} />
                            </div>
                            <div>
                                <p className="font-headline font-bold text-lg text-zinc-100 uppercase tracking-tight">NEURAL INTERFACE XL</p>
                                <p className="text-xs text-cyan-400/80 tracking-wide font-mono mt-1 uppercase">EST. ARRIVAL: 42 MINS 12 SECS</p>
                            </div>
                        </div>

                        {/* Tracking Timeline */}
                        <div className="relative pl-12 space-y-12">
                            {/* Vertical Line */}
                            <div className="absolute left-[23px] top-2 bottom-2 w-[1px] bg-zinc-800">
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: '60%' }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    className="absolute top-0 w-full bg-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.8)]" 
                                />
                            </div>

                            <TimelineItem 
                                status="ORIGIN NODE SECURED"
                                location="STATION 09 // DEPOT"
                                timestamp="21 MARCH // 23:42 UTC"
                                active
                            />
                            <TimelineItem 
                                status="CLEARED CUSTOMS GATE"
                                location="SECTOR 07 // BORDER"
                                timestamp="22 MARCH // 04:15 UTC"
                                active
                            />
                            <TimelineItem 
                                status="QUANTUM TRANSIT"
                                location="VOID INTERCONNECT"
                                timestamp="DATA PULSE: LATEST_STREAM"
                                active
                                current
                            />
                            <TimelineItem 
                                status="DESTINATION UPLINK"
                                location="NEON DISTRICT // TERMINAL"
                                timestamp="PENDING..."
                                disabled
                            />
                        </div>
                    </div>
                </section>

                {/* Telemetry Data */}
                <section>
                    <h2 className="font-headline text-[10px] tracking-[0.4em] text-cyan-400/40 uppercase mb-6 font-bold flex items-center gap-2">
                        <Activity size={14} />
                        REAL-TIME TELEMETRY
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <TelemetryCard label="SIGNAL STRENGTH" value="99.8%" trend="OPTIMAL" />
                        <TelemetryCard label="TRANSIT LATENCY" value="2.4ms" trend="LOW" />
                    </div>
                </section>
            </div>

            {/* Background Decoration */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-10">
                <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-cyan-500 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-blue-600 blur-[120px] rounded-full"></div>
            </div>
        </main>
    );
}

function TimelineItem({ status, location, timestamp, active, current, disabled }: any) {
    return (
        <div className={`relative ${disabled ? 'opacity-30' : 'opacity-100'}`}>
            <div className={`absolute -left-[33px] top-1 w-4 h-4 rounded-full border-4 border-black transition-all duration-500 ${
                active ? 'bg-cyan-400' : 'bg-zinc-800'
            } ${
                current ? 'shadow-[0_0_20px_rgba(0,229,255,1)] animate-pulse scale-125' : ''
            }`} />
            
            <p className={`text-[10px] font-headline font-black tracking-[0.2em] mb-1 uppercase ${
                active ? 'text-cyan-400' : 'text-zinc-600'
            }`}>
                {status}
            </p>
            <h3 className="font-headline text-lg font-bold text-zinc-100">{location}</h3>
            <p className="text-[10px] text-zinc-500 font-medium mt-1 uppercase font-mono tracking-widest">{timestamp}</p>
        </div>
    );
}

function TelemetryCard({ label, value, trend }: { label: string, value: string, trend: string }) {
    return (
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-cyan-400/20 transition-all group">
            <p className="text-[10px] text-zinc-600 tracking-widest uppercase mb-2 group-hover:text-cyan-400/60 transition-colors">{label}</p>
            <div className="flex items-end justify-between">
                <p className="font-headline text-2xl font-bold text-white tracking-tighter font-mono">{value}</p>
                <div className="flex items-center gap-1">
                    <Zap size={10} className="text-cyan-400" />
                    <span className="text-[8px] font-black text-cyan-400 uppercase tracking-tighter">{trend}</span>
                </div>
            </div>
        </div>
    );
}
