'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="text-xs font-headline text-neutral-500 uppercase tracking-wider hover:text-white transition-colors">
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="text-4xl sm:text-5xl font-headline font-black text-white uppercase tracking-tight mb-6">
                    Privacy Policy
                </h1>
                
                <p className="text-neutral-500 text-sm mb-8">Last updated: March 25, 2026</p>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">1. Information We Collect</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            We collect information you provide directly to us, such as when you create an account, make a purchase, subscribe to our newsletter, or contact us for support. This includes: name, email address, postal address, phone number, payment information, and any other information you choose to provide.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">2. How We Use Your Information</h2>
                        <p className="text-neutral-400 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
                            <li>Process transactions and send related information</li>
                            <li>Send promotional communications (with your consent)</li>
                            <li>Improve our website and services</li>
                            <li>Respond to your comments and questions</li>
                            <li>Monitor and analyze trends and usage</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">3. Information Sharing</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with service providers who assist us in operating our website, conducting our business, or servicing you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">4. Data Security</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">5. Your Rights</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            You have the right to access, correct, or delete your personal information. You may also opt out of receiving promotional communications at any time by contacting us or using the unsubscribe feature.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">6. Cookies</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">7. Contact Us</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at privacy@nebulastore.com.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
