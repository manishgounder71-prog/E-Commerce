'use client';

import React, { Component, ReactNode } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen bg-surface text-white flex items-center justify-center px-4">
                    <div className="max-w-md text-center">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={40} className="text-red-500" />
                        </div>
                        <h1 className="text-2xl font-headline font-bold text-white uppercase tracking-wider mb-4">
                            Something Went Wrong
                        </h1>
                        <p className="text-neutral-400 mb-8">
                            We encountered an unexpected error. Please try again or return to the homepage.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={this.handleRetry}
                                className="w-full py-4 bg-white text-black font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={16} /> Try Again
                            </button>
                            <Link 
                                href="/"
                                className="block w-full py-4 bg-white/5 border border-white/10 text-white font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Go to Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
