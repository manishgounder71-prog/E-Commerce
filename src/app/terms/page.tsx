'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';

export default function TermsPage() {
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
                    Terms of Service
                </h1>
                
                <p className="text-neutral-500 text-sm mb-8">Last updated: March 25, 2026</p>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">1. Acceptance of Terms</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            By accessing or using the NEBULA Store website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">2. Products and Pricing</h2>
                        <p className="text-neutral-400 leading-relaxed mb-4">
                            All products are subject to availability. We reserve the right to limit quantities, discontinue products, or change pricing at any time without notice. Product images are for illustrative purposes only.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">3. Orders and Payment</h2>
                        <p className="text-neutral-400 leading-relaxed mb-4">
                            By placing an order, you agree to provide accurate and complete information. We accept various payment methods including credit cards and PayPal. All payments are processed securely through our payment partners.
                        </p>
                        <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
                            <li>Orders are subject to verification and acceptance</li>
                            <li>Prices are in USD unless otherwise specified</li>
                            <li>Shipping costs are calculated at checkout</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">4. Shipping and Delivery</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            Delivery times are estimates only and do not include processing time. We are not responsible for delays caused by carriers, customs, or events beyond our control. Risk of loss passes to you upon delivery.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">5. Returns and Refunds</h2>
                        <p className="text-neutral-400 leading-relaxed mb-4">
                            Our return policy allows returns within 30 days of delivery for most items. Products must be unused and in original packaging. Refunds will be processed within 5-7 business days after receiving the returned item.
                        </p>
                        <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
                            <li>Some products may not be eligible for return</li>
                            <li>Return shipping costs are the responsibility of the customer</li>
                            <li>Refunds are issued to the original payment method</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">6. Intellectual Property</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            All content on this website, including text, graphics, logos, and images, is the property of NEBULA Store or its content suppliers and is protected by copyright laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">7. Limitation of Liability</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            NEBULA Store shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or products.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">8. Changes to Terms</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-headline font-bold text-white uppercase tracking-wider mb-4">9. Contact Information</h2>
                        <p className="text-neutral-400 leading-relaxed">
                            For questions about these Terms of Service, please contact us at legal@nebulastore.com.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
