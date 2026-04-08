'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ARCHIVE_ITEMS = [
    {
        id: 1,
        title: 'LIQUID NEON',
        description: 'SYNTHETIC FABRICS ENGINEERED TO REFLECT THE PULSE OF THE CITY. WATERPROOF MEMBRANES WITH INTEGRATED FIBER OPTICS.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC39E82RW9xOF8AG2UNRljekzblc6hiPZFHJ928yf5NlrARr5i0Ino0yGcn12tOY2QHazSlUPSdgVHQAo2pZ5pNDtHp8S-RazFathl11qoAg5huSrEgVxQftl3KCBHkbD4SQJ52c0yPDqEjFpRBL6ZPMSGNqJbQGxT9TEpLJqI6fkucDtvjCOv-SW80rGqbS4nAjR9nCOzNLeZseqg4vPqxixg5rInKxIY_3-xFJJ579afBZb01ajmV1tmzNrEeyMVHETp7oiwnuHk',
        ref: 'REF // 0048-A',
        variant: 'large'
    },
    {
        id: 2,
        title: 'VOID COLLECTIVE',
        description: 'Exploring the boundary between the physical garment and the digital aura.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsxgv_RmJO7yz58sB5yfKQmeVpdVUOs7VpXXtPoOMQENVloydZ6KF-3OR9IjeHMWGO9lI94IIhuh7zDAe0x810aCo8DVFukHVYYk0dnElthXie78Wv9S7ZRcbWuexFBIS7BG3wTD54DUIbrycdwoCkEJJ9We8j0XfoiOXNOMSssMay_q8hjIQLomPpLaRUwVe7M406bfC2NvuzAd_xfWXeL0sr0Q2RMYY3hltItqENQktGrhFibKJFjG1idsObaWNnS_opFfci-do',
        ref: 'REF // 0092-B',
        variant: 'wide'
    },
    {
        id: 3,
        title: 'NEURAL WEAVE',
        description: 'Biometric feedback integrated directly into the thread structure.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv7-ja9iGGOOfpS1MoFSDEa5wbQoWZQ9ghHaF9PqZuE2xlNXEMUs0IB65WANLdypFhCAXS8nmz7lkGdwO75pXdSvSJM5nJRgHb1IXzQpVX1zmyjnFbEx_SQAwyA74dB94LMwFcpDyf6NLi3niMWq1iovj6adGEO_4illLadEiY5xGMSQKd6C_Ptqi6uGk0pGW5_GrSEIWkoyx8xyayltJaXq-zkiCc31HTW2Ka6_7aavL6OavW6K30btjf2Ea9B4SkMVa0OFHX7ow',
        ref: 'REF // 0105-C',
        variant: 'square'
    }
];

export default function ArchivePage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-48 overflow-x-hidden">
            {/* Hero Section */}
            <section className="px-6 md:px-24 mb-32 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-bold text-6xl md:text-9xl uppercase tracking-tighter leading-[0.85] text-white"
                    >
                        ARCHIVE <br/> <span className="text-cyan-400">NOIR_01</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 text-lg md:text-2xl uppercase tracking-widest max-w-xl text-zinc-500"
                    >
                        A retrospective of digital artifacts and subterranean silhouettes.
                    </motion.p>
                </div>
                {/* Decorative Accent */}
                <div className="absolute -top-10 -right-20 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full"></div>
            </section>

            {/* Scrapbook Grid */}
            <section className="max-w-screen-2xl mx-auto px-6 mb-40">
                <div className="grid grid-cols-12 gap-8 md:gap-16">
                    {/* Item 1 - Large Editorial */}
                    <div className="col-span-12 md:col-span-8 relative group">
                        <motion.div 
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 40 }}
                            viewport={{ once: true }}
                            className="aspect-[4/5] overflow-hidden rounded-sm border border-white/5 relative shadow-2xl"
                        >
                            <img 
                                src={ARCHIVE_ITEMS[0].imageUrl} 
                                alt={ARCHIVE_ITEMS[0].title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                            />
                        </motion.div>
                        <motion.div 
                            whileInView={{ x: 0, opacity: 1 }}
                            initial={{ x: 40, opacity: 0 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-10 -right-4 md:-right-20 bg-zinc-900 border border-white/10 p-8 max-w-sm shadow-[0_0_40px_rgba(0,0,0,0.8)] z-20"
                        >
                            <h3 className="text-3xl font-bold uppercase mb-4 text-cyan-400">{ARCHIVE_ITEMS[0].title}</h3>
                            <p className="text-xs tracking-widest leading-relaxed uppercase text-zinc-400">
                                {ARCHIVE_ITEMS[0].description}
                            </p>
                        </motion.div>
                    </div>

                    {/* Item 3 - Side Detail */}
                    <div className="col-span-12 md:col-span-4 mt-20 md:mt-40">
                        <motion.div 
                            whileInView={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            viewport={{ once: true }}
                            className="aspect-square overflow-hidden rounded-sm border border-white/5 relative mb-6"
                        >
                            <img 
                                src={ARCHIVE_ITEMS[2].imageUrl} 
                                alt={ARCHIVE_ITEMS[2].title}
                                className="w-full h-full object-cover opacity-60"
                            />
                        </motion.div>
                        <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600">{ARCHIVE_ITEMS[2].ref}</span>
                    </div>

                    {/* Full Width Banner */}
                    <div className="col-span-12 mt-32 bg-zinc-900/40 border-y border-white/5 py-32 relative overflow-hidden">
                        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                            <div className="w-full md:w-1/2">
                                <h2 className="text-5xl md:text-7xl font-bold uppercase mb-8 leading-none">
                                    THE <br/> <span className="text-cyan-400">VOID</span> COLLECTIVE
                                </h2>
                                <p className="text-lg uppercase tracking-widest mb-12 text-zinc-500">
                                    Exploring the boundary between the physical garment and the digital aura.
                                </p>
                                <Link 
                                    href="/shop"
                                    className="px-10 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
                                >
                                    VIEW COLLECTION
                                </Link>
                            </div>
                            <div className="w-full md:w-1/2 relative">
                                <div className="aspect-video bg-zinc-900 rounded-sm overflow-hidden relative shadow-2xl border border-white/5">
                                    <img 
                                        src={ARCHIVE_ITEMS[1].imageUrl} 
                                        alt="Void Collective" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                                </div>
                                <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 hidden md:block">
                                    <div className="rotate-90 origin-left font-mono text-[10px] tracking-[0.5em] text-zinc-700 uppercase whitespace-nowrap">
                                        ESTABLISHED // 20XX // TOKYO CORE
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
