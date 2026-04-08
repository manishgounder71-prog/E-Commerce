'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Loader2, Mail, Lock, User } from 'lucide-react';
import { signUp, resendVerificationEmail } from '@/lib/auth';
import { useStore } from '@/lib/store';

export default function RegisterPage() {
    const router = useRouter();
    const { setUser } = useStore();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [verificationSent, setVerificationSent] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep2()) return;
        
        setIsLoading(true);
        setErrors({});

        try {
            const { data, error } = await signUp(formData.email, formData.password, formData.name);
            
            if (error) {
                setErrors({ submit: error.message });
                setIsLoading(false);
                return;
            }

                // Check if email confirmation is required
            if (data.user && !data.user.email_confirmed_at) {
                setVerificationSent(true);
            } else if (data.user) {
                // User created and confirmed
                setUser({
                    id: data.user.id,
                    name: formData.name,
                    email: formData.email,
                });
                router.push('/account');
            }
        } catch (err) {
            setErrors({ submit: 'An unexpected error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendVerification = async () => {
        setResendLoading(true);
        const { error } = await resendVerificationEmail(formData.email);
        setResendLoading(false);
        
        if (error) {
            setErrors({ submit: error.message });
        } else {
            setErrors({});
            alert('Verification email sent! Please check your inbox.');
        }
    };

    if (verificationSent) {
        return (
            <main className="min-h-screen bg-surface text-white flex items-center justify-center px-4">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail size={40} className="text-green-500" />
                        </div>
                        <h1 className="text-3xl font-headline font-bold text-white uppercase tracking-wider mb-4">
                            Check Your Email
                        </h1>
                        <p className="text-neutral-400 mb-2">
                            We've sent a verification link to
                        </p>
                        <p className="text-white font-semibold mb-6">{formData.email}</p>
                        <p className="text-neutral-500 text-sm mb-8">
                            Click the link in the email to verify your account. If you don't see it, check your spam folder.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={handleResendVerification}
                                disabled={resendLoading}
                                className="w-full py-4 bg-white text-black font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {resendLoading ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    'Resend Verification Email'
                                )}
                            </button>
                            <Link 
                                href="/login"
                                className="block w-full py-4 bg-white/5 border border-white/10 text-white font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-surface text-white flex">
            {/* Left Panel - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
                <div className="max-w-md w-full mx-auto">
                    <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-white uppercase mb-12 inline-block">
                        NEBULA
                    </Link>

                    <div className="flex items-center gap-2 mb-6">
                        {step > 1 && (
                            <button onClick={() => setStep(1)} className="text-neutral-500 hover:text-white transition-colors">
                                <ArrowLeft size={16} />
                            </button>
                        )}
                        <h1 className="font-headline text-3xl sm:text-4xl font-black tracking-tighter text-white uppercase">
                            Create Account
                        </h1>
                    </div>
                    <p className="font-headline text-xs text-neutral-500 uppercase tracking-wider mb-8">
                        {step === 1 ? 'Enter your details to get started' : 'Set up your password'}
                    </p>

                    {/* Progress */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-headline font-bold text-xs ${step >= 1 ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-600'}`}>
                            {step > 1 ? <CheckCircle2 size={14} /> : '1'}
                        </div>
                        <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-white' : 'bg-neutral-800'}`} />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-headline font-bold text-xs ${step >= 2 ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-600'}`}>
                            2
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-xs font-headline text-neutral-400 uppercase tracking-wider mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className={`w-full pl-12 pr-4 py-3.5 bg-neutral-900 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-neutral-600 focus:border-white/30 focus:outline-none transition-colors`}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-headline text-neutral-400 uppercase tracking-wider mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className={`w-full pl-12 pr-4 py-3.5 bg-neutral-900 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-neutral-600 focus:border-white/30 focus:outline-none transition-colors`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <button 
                                    type="button" 
                                    onClick={handleNext}
                                    className="w-full py-4 bg-white text-black font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    Continue
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-5">
                                {errors.submit && (
                                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                                        <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-red-400">{errors.submit}</p>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs font-headline text-neutral-400 uppercase tracking-wider mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className={`w-full pl-12 pr-12 py-3.5 bg-neutral-900 border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-neutral-600 focus:border-white/30 focus:outline-none transition-colors`}
                                            placeholder="Minimum 8 characters"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-headline text-neutral-400 uppercase tracking-wider mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                                        <input
                                            type="password"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className={`w-full pl-12 pr-4 py-3.5 bg-neutral-900 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-neutral-600 focus:border-white/30 focus:outline-none transition-colors`}
                                            placeholder="Confirm your password"
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>

                                <div className="p-4 rounded-lg bg-neutral-900 border border-white/5">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={formData.acceptTerms}
                                            onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                            className="w-4 h-4 mt-0.5 rounded bg-neutral-900 border-white/20 text-white focus:ring-white/30" 
                                        />
                                        <span className="text-xs text-neutral-400 leading-relaxed">
                                            I agree to the{' '}
                                            <Link href="/terms" className="text-white hover:underline">Terms of Service</Link>
                                            {' '}and{' '}
                                            <Link href="/privacy" className="text-white hover:underline">Privacy Policy</Link>
                                        </span>
                                    </label>
                                    {errors.acceptTerms && <p className="text-red-400 text-xs mt-2">{errors.acceptTerms}</p>}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full py-4 bg-white text-black font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-sm text-neutral-500">
                            Already have an account?{' '}
                            <Link href="/login" className="text-white font-semibold hover:underline">
                                Sign in
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
