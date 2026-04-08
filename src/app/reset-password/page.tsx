'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate password reset email
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setSent(true);
        setLoading(false);
    };

    if (sent) {
        return (
            <main className="min-h-screen bg-surface text-white flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-surface-container-low border border-white/5 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={32} className="text-green-500" />
                        </div>
                        <h1 className="text-2xl font-headline font-bold text-white uppercase tracking-wider mb-4">
                            Check Your Email
                        </h1>
                        <p className="text-neutral-400 mb-6">
                            We have sent password reset instructions to <span className="text-white font-semibold">{email}</span>
                        </p>
                        <p className="text-neutral-500 text-sm mb-8">
                            If you don't see the email, check your spam folder or try again.
                        </p>
                        <div className="space-y-3">
                            <Link href="/login" className="block w-full py-4 bg-white text-black font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors text-center">
                                Back to Login
                            </Link>
                            <button 
                                onClick={() => setSent(false)}
                                className="block w-full py-4 bg-white/5 border border-white/10 text-white font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Try Different Email
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-surface text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="mb-8">
                    <Link href="/login" className="inline-flex items-center gap-2 text-xs font-headline text-neutral-500 uppercase tracking-wider hover:text-white transition-colors">
                        <ArrowLeft size={14} /> Back to Login
                    </Link>
                </div>

                <div className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock size={28} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-headline font-bold text-white uppercase tracking-wider mb-2">
                            Forgot Password?
                        </h1>
                        <p className="text-neutral-500 text-sm">
                            Enter your email and we'll send you reset instructions
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-headline text-neutral-400 uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-surface border border-white/10 rounded-xl text-white placeholder:text-neutral-600 font-headline uppercase tracking-wider outline-none focus:border-white/30 transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <AlertCircle size={16} className="text-red-500" />
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-white text-black font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>

                    <p className="text-center text-neutral-500 text-xs mt-6">
                        Remember your password?{' '}
                        <Link href="/login" className="text-white hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
