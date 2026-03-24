'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, ArrowLeft, Zap, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        company: '',
        acceptTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Required';
        if (!formData.email.trim()) newErrors.email = 'Required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid format';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.password) newErrors.password = 'Required';
        else if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Phrases do not match';
        if (!formData.acceptTerms) newErrors.acceptTerms = 'Required';
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
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            window.location.href = '/account';
        } catch {
            setErrors({ submit: 'Registration failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-surface text-white flex">
            {/* Left Panel - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-32">
                <div className="max-w-md w-full mx-auto">
                    <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-white uppercase mb-8 inline-block hover:animate-drift">
                        NEBULA
                    </Link>

                    <div className="flex items-center gap-2 mb-6">
                        {step > 1 && (
                            <button onClick={() => setStep(1)} className="text-neutral-500 hover:text-white transition-colors">
                                <ArrowLeft size={16} />
                            </button>
                        )}
                        <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">
                            {step === 1 ? 'IDENTITY' : 'SECURE'}
                        </h1>
                    </div>
                    <p className="font-headline text-[10px] tracking-[0.4em] text-neutral-500 uppercase font-bold mb-12">
                        {step === 1 ? 'Establish your architectural identity' : 'Configure access credentials'}
                    </p>

                    {/* Progress */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-headline font-bold text-xs ${step >= 1 ? 'bg-white text-black' : 'bg-surface-container text-neutral-600'}`}>
                            {step > 1 ? <CheckCircle2 size={14} /> : '01'}
                        </div>
                        <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-white' : 'bg-surface-container'}`} />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-headline font-bold text-xs ${step >= 2 ? 'bg-white text-black' : 'bg-surface-container text-neutral-600'}`}>
                            02
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">
                                        Architect Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full px-5 py-4 bg-surface-container-low border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors`}
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && <p className="text-[9px] text-red-400 mt-1 font-headline uppercase">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">
                                        Nexus ID / Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full px-5 py-4 bg-surface-container-low border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors`}
                                        placeholder="architect@nebula.void"
                                    />
                                    {errors.email && <p className="text-[9px] text-red-400 mt-1 font-headline uppercase">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">
                                        Organization (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-5 py-4 bg-surface-container-low border border-white/10 rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors"
                                        placeholder="Company name"
                                    />
                                </div>

                                <button 
                                    type="button" 
                                    onClick={handleNext}
                                    className="w-full py-5 bg-white text-black font-headline font-bold uppercase text-[11px] tracking-[0.2em] rounded-md hover:bg-neutral-200 transition-colors haptic-btn flex items-center justify-center gap-2"
                                >
                                    Continue
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                {errors.submit && (
                                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <p className="text-[10px] font-headline text-red-400 uppercase tracking-widest">{errors.submit}</p>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">
                                        Security Phrase
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className={`w-full px-5 py-4 bg-surface-container-low border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors`}
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
                                    {errors.password && <p className="text-[9px] text-red-400 mt-1 font-headline uppercase">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">
                                        Confirm Phrase
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className={`w-full px-5 py-4 bg-surface-container-low border ${errors.confirmPassword ? 'border-red-500' : 'border-white/10'} rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors`}
                                        placeholder="Confirm security phrase"
                                    />
                                    {errors.confirmPassword && <p className="text-[9px] text-red-400 mt-1 font-headline uppercase">{errors.confirmPassword}</p>}
                                </div>

                                <div className="p-5 rounded-lg bg-surface-container-low border border-white/5">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={formData.acceptTerms}
                                            onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                            className="w-4 h-4 mt-0.5 rounded bg-surface-container-low border-white/20 text-white focus:ring-white/30" 
                                        />
                                        <span className="text-[10px] font-headline text-neutral-400 leading-relaxed">
                                            I accept the <span className="text-white">Architect Protocol</span> and <span className="text-white">Void Terms</span>. My data will be processed under quantum encryption standards.
                                        </span>
                                    </label>
                                    {errors.acceptTerms && <p className="text-[9px] text-red-400 mt-2 font-headline uppercase">{errors.acceptTerms}</p>}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full py-5 bg-white text-black font-headline font-bold uppercase text-[11px] tracking-[0.2em] rounded-md hover:bg-neutral-200 transition-colors haptic-btn flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <>
                                            <Zap size={16} className="animate-pulse" />
                                            Creating Identity...
                                        </>
                                    ) : (
                                        <>
                                            Initialize Access
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </form>

                    <div className="mt-12 pt-8 border-t border-white/5 text-center">
                        <p className="text-[10px] font-headline text-neutral-500 uppercase tracking-widest">
                            Already initiated?
                        </p>
                        <Link href="/login" className="inline-flex items-center gap-2 mt-3 text-white font-headline text-sm uppercase tracking-widest hover:text-neutral-300 transition-colors group">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Return to Access
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
