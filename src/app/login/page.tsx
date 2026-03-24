'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Zap } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            window.location.href = '/account';
        } catch {
            setError('Authentication failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-surface text-white flex">
            {/* Left Panel - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-32">
                <div className="max-w-md w-full mx-auto">
                    <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-white uppercase mb-16 inline-block hover:animate-drift">
                        NEBULA
                    </Link>

                    <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-4">
                        ACCESS VOID
                    </h1>
                    <p className="font-headline text-[10px] tracking-[0.4em] text-neutral-500 uppercase font-bold mb-12">
                        Enter your architectural credentials
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                                <p className="text-[10px] font-headline text-red-400 uppercase tracking-widest">{error}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">
                                Nexus ID / Email
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-4 bg-surface-container-low border border-white/10 rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors"
                                placeholder="architect@nebula.void"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">
                                Security Phrase
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-4 bg-surface-container-low border border-white/10 rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors"
                                    placeholder="Enter security phrase"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded bg-surface-container-low border-white/20 text-white focus:ring-white/30" />
                                <span className="text-[10px] font-headline text-neutral-500 uppercase tracking-widest">Remember Node</span>
                            </label>
                            <button type="button" className="text-[10px] font-headline text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">
                                Reset Access
                            </button>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-5 bg-white text-black font-headline font-bold uppercase text-[11px] tracking-[0.2em] rounded-md hover:bg-neutral-200 transition-colors haptic-btn flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Zap size={16} className="animate-pulse" />
                                    Establishing Link...
                                </>
                            ) : (
                                <>
                                    Authenticate
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-white/5 text-center">
                        <p className="text-[10px] font-headline text-neutral-500 uppercase tracking-widest">
                            New to the Void?
                        </p>
                        <Link href="/register" className="inline-flex items-center gap-2 mt-3 text-white font-headline text-sm uppercase tracking-widest hover:text-neutral-300 transition-colors group">
                            Create Architect Identity
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Panel - Visual */}
            <div className="hidden lg:block w-1/2 bg-gradient-to-br from-surface-container-low to-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="font-headline text-[200px] font-black text-white/5 leading-none">N</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
