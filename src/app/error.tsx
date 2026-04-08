'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global error:', error);
    }, [error]);

    return (
        <html lang="en">
            <body className="bg-neutral-950 text-white min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle size={40} className="text-red-500" />
                    </div>
                    <h1 className="text-3xl font-headline font-black uppercase tracking-tight mb-4">
                        System Failure
                    </h1>
                    <p className="text-neutral-400 mb-2 font-headline text-sm uppercase tracking-wider">
                        Error Code: {error.digest || 'UNKNOWN'}
                    </p>
                    <p className="text-neutral-500 mb-8 text-sm">
                        {error.message || 'An unexpected error occurred. Our team has been notified.'}
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={reset}
                            className="w-full py-4 bg-white text-black font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={16} /> Retry
                        </button>
                        <Link 
                            href="/"
                            className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 border border-white/10 text-white font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <Home size={16} /> Return Home
                        </Link>
                    </div>
                </div>
            </body>
        </html>
    );
}
