'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { signIn, signInWithGoogle, getCurrentUser } from '@/lib/auth';
import { useStore } from '@/lib/store';

export default function LoginPage() {
    const router = useRouter();
    const { setUser } = useStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { data, error: authError } = await signIn(email, password);
            
            if (authError) {
                setError(authError.message || 'Invalid email or password');
                setIsLoading(false);
                return;
            }

            if (data.user) {
                const { user } = await getCurrentUser();
                if (user) {
                    setUser({
                        id: user.id,
                        name: user.name || user.email?.split('@')[0] || 'User',
                        email: user.email,
                        profilePicture: user.profile_picture,
                        company: user.company,
                    });
                }
                router.push('/account');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setGoogleLoading(true);

        try {
            const { error: authError } = await signInWithGoogle();
            
            if (authError) {
                setError(authError.message || 'Google sign-in failed');
                setGoogleLoading(false);
            }
            // If successful, Supabase will redirect
        } catch (err) {
            setError('An unexpected error occurred with Google sign-in.');
            setGoogleLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-surface text-white flex">
            {/* Left Panel - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
                <div className="max-w-md w-full mx-auto">
                    <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-white uppercase mb-12 inline-block">
                        NEBULA
                    </Link>

                    <h1 className="font-headline text-3xl sm:text-4xl font-black tracking-tighter text-white uppercase mb-2">
                        Welcome Back
                    </h1>
                    <p className="font-headline text-xs text-neutral-500 uppercase tracking-wider mb-8">
                        Sign in to your account
                    </p>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                            <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-headline text-neutral-400 uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3.5 bg-surface-container-low border border-white/10 rounded-lg text-white placeholder:text-neutral-600 focus:border-white/30 focus:outline-none transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-headline text-neutral-400 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3.5 pr-12 bg-surface-container-low border border-white/10 rounded-lg text-white placeholder:text-neutral-600 focus:border-white/30 focus:outline-none transition-colors"
                                    placeholder="Enter your password"
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
                                <span className="text-xs font-headline text-neutral-500 uppercase tracking-wider">Remember me</span>
                            </label>
                            <Link href="/reset-password" className="text-xs font-headline text-neutral-400 uppercase tracking-wider hover:text-white transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-4 bg-white text-black font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-surface text-neutral-500 font-headline uppercase tracking-wider">Or continue with</span>
                        </div>
                    </div>

                    <button 
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={googleLoading}
                        className="w-full py-4 bg-white/5 border border-white/10 text-white font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                        {googleLoading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                        )}
                        Continue with Google
                    </button>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-sm text-neutral-500">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-white font-semibold hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Visual */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-neutral-900 to-neutral-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="font-headline text-[180px] font-black text-white/5 leading-none">N</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
