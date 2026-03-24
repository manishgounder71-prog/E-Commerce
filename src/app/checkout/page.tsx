'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useStore } from '@/lib/store';
import { 
    ArrowLeft, 
    CreditCard, 
    Truck, 
    CheckCircle2,
    Lock,
    ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const { cart, clearCart } = useStore();
    const [step, setStep] = useState<'shipping' | 'payment' | 'confirm'>('shipping');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    
    const [shipping, setShipping] = useState({
        fullName: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States'
    });
    
    const [payment, setPayment] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        nameOnCard: ''
    });

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const processing = 42.00;
    const total = subtotal + processing;

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('payment');
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('confirm');
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setOrderComplete(true);
        clearCart();
    };

    if (orderComplete) {
        return (
            <main className="min-h-screen bg-surface text-white">
                <Navbar />
                <div className="pt-20 px-4 sm:px-6 max-w-2xl mx-auto pb-12">
                    <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8 animate-pulse">
                        <CheckCircle2 size={48} className="text-white" />
                    </div>
                    <h1 className="font-headline text-5xl font-bold tracking-tighter text-white uppercase mb-4">Transfer Complete</h1>
                    <p className="font-headline text-[10px] tracking-[0.4em] text-neutral-500 uppercase font-bold mb-12">Quantum encryption verified // manifest secured</p>
                    
                    <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5 text-left mb-12">
                        <p className="text-[10px] font-headline text-neutral-500 tracking-widest uppercase mb-4">Order Reference</p>
                        <p className="font-headline text-2xl font-bold text-white">NBL-VERIFY42</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/account" className="px-8 py-4 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-widest rounded-md hover:bg-neutral-200 transition-colors haptic-btn">
                            View Void Logs
                        </Link>
                        <Link href="/shop" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-headline font-bold uppercase text-[10px] tracking-widest rounded-md hover:bg-white/10 transition-colors haptic-btn">
                            Continue Exploring
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 px-4 sm:px-6 max-w-4xl mx-auto pb-12">
                {/* Breadcrumbs */}
                <Link href="/cart" className="inline-flex items-center gap-2 text-[10px] font-headline font-bold text-neutral-500 uppercase tracking-widest mb-10 hover:text-white transition-colors group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> BACK TO VAULT
                </Link>

                {/* Progress Steps */}
                <div className="flex items-center gap-4 mb-16">
                    <StepIndicator 
                        number="01" 
                        label="Destination" 
                        active={step === 'shipping'} 
                        completed={step === 'payment' || step === 'confirm'} 
                    />
                    <div className="flex-1 h-px bg-white/10" />
                    <StepIndicator 
                        number="02" 
                        label="Payment" 
                        active={step === 'payment'} 
                        completed={step === 'confirm'} 
                    />
                    <div className="flex-1 h-px bg-white/10" />
                    <StepIndicator 
                        number="03" 
                        label="Confirm" 
                        active={step === 'confirm'} 
                        completed={false} 
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Form Section */}
                    <div className="flex-1">
                        {step === 'shipping' && (
                            <form onSubmit={handleShippingSubmit}>
                                <div className="flex items-center gap-4 mb-10">
                                    <Truck size={24} className="text-white" />
                                    <h2 className="font-headline text-2xl font-bold tracking-tighter text-white uppercase">Destination Node</h2>
                                </div>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={shipping.fullName}
                                            onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                                            className="w-full px-5 py-4 bg-surface-container-low border border-white/10 rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors"
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">Street Address</label>
                                        <input
                                            type="text"
                                            required
                                            value={shipping.street}
                                            onChange={(e) => setShipping({ ...shipping, street: e.target.value })}
                                            className="w-full px-5 py-4 bg-surface-container-low border border-white/10 rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors"
                                            placeholder="Enter street address"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">City</label>
                                            <input
                                                type="text"
                                                required
                                                value={shipping.city}
                                                onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                                                className="w-full px-5 py-4 bg-surface-container-low border border-white/10 rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors"
                                                placeholder="City"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">State</label>
                                            <input
                                                type="text"
                                                required
                                                value={shipping.state}
                                                onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                                                className="w-full px-5 py-4 bg-surface-container-low border border-white/10 rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors"
                                                placeholder="State"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">ZIP</label>
                                            <input
                                                type="text"
                                                required
                                                value={shipping.zip}
                                                onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                                                className="w-full px-5 py-4 bg-surface-container-low border border-white/10 rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors"
                                                placeholder="ZIP"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="w-full mt-12 py-5 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-[0.2em] rounded-md hover:bg-neutral-200 transition-colors haptic-btn">
                                    Continue to Payment
                                </button>
                            </form>
                        )}

                        {step === 'payment' && (
                            <form onSubmit={handlePaymentSubmit}>
                                <div className="flex items-center gap-4 mb-10">
                                    <CreditCard size={24} className="text-white" />
                                    <h2 className="font-headline text-2xl font-bold tracking-tighter text-white uppercase">Payment Protocol</h2>
                                </div>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">Card Number</label>
                                        <input
                                            type="text"
                                            required
                                            maxLength={19}
                                            value={payment.cardNumber}
                                            onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim() })}
                                            className="w-full px-5 py-4 bg-surface-container-low border border-white/10 rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors"
                                            placeholder="0000 0000 0000 0000"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">Expiry Date</label>
                                            <input
                                                type="text"
                                                required
                                                maxLength={5}
                                                value={payment.expiry}
                                                onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                                                className="w-full px-5 py-4 bg-surface-container-low border border-white/10 rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors"
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">CVV</label>
                                            <input
                                                type="text"
                                                required
                                                maxLength={4}
                                                value={payment.cvv}
                                                onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, '') })}
                                                className="w-full px-5 py-4 bg-surface-container-low border border-white/10 rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors"
                                                placeholder="CVV"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-3">Name on Card</label>
                                        <input
                                            type="text"
                                            required
                                            value={payment.nameOnCard}
                                            onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                                            className="w-full px-5 py-4 bg-surface-container-low border border-white/10 rounded-lg text-white font-headline text-sm focus:border-white/30 focus:outline-none transition-colors"
                                            placeholder="Enter name as on card"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-12">
                                    <button 
                                        type="button"
                                        onClick={() => setStep('shipping')}
                                        className="flex-1 py-5 bg-white/5 border border-white/10 text-white font-headline font-bold uppercase text-[10px] tracking-[0.2em] rounded-md hover:bg-white/10 transition-colors haptic-btn"
                                    >
                                        Back
                                    </button>
                                    <button type="submit" className="flex-1 py-5 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-[0.2em] rounded-md hover:bg-neutral-200 transition-colors haptic-btn">
                                        Review Order
                                    </button>
                                </div>
                            </form>
                        )}

                        {step === 'confirm' && (
                            <div>
                                <div className="flex items-center gap-4 mb-10">
                                    <ShieldCheck size={24} className="text-white" />
                                    <h2 className="font-headline text-2xl font-bold tracking-tighter text-white uppercase">Order Confirmation</h2>
                                </div>

                                <div className="space-y-8">
                                    {/* Shipping Info */}
                                    <div className="p-6 rounded-xl bg-surface-container-low border border-white/5">
                                        <p className="text-[10px] font-headline text-neutral-500 tracking-widest uppercase mb-3">Destination Node</p>
                                        <p className="font-headline text-sm text-white">{shipping.fullName}</p>
                                        <p className="text-xs text-neutral-400 mt-1">{shipping.street}</p>
                                        <p className="text-xs text-neutral-400">{shipping.city}, {shipping.state} {shipping.zip}</p>
                                    </div>

                                    {/* Payment Info */}
                                    <div className="p-6 rounded-xl bg-surface-container-low border border-white/5">
                                        <p className="text-[10px] font-headline text-neutral-500 tracking-widest uppercase mb-3">Payment Protocol</p>
                                        <p className="font-headline text-sm text-white">Card ending in {payment.cardNumber.slice(-4)}</p>
                                        <p className="text-xs text-neutral-400 mt-1">{payment.nameOnCard}</p>
                                    </div>

                                    {/* Items */}
                                    <div className="p-6 rounded-xl bg-surface-container-low border border-white/5">
                                        <p className="text-[10px] font-headline text-neutral-500 tracking-widest uppercase mb-4">Manifest Items</p>
                                        <div className="space-y-4">
                                            {cart.map((item) => (
                                                <div key={item.id} className="flex justify-between items-center">
                                                    <div className="flex items-center gap-4">
                                                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                                                        <div>
                                                            <p className="font-headline text-sm text-white uppercase">{item.title}</p>
                                                            <p className="text-[10px] text-neutral-500">Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-headline font-bold text-white">${(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-12">
                                    <button 
                                        onClick={() => setStep('payment')}
                                        className="flex-1 py-5 bg-white/5 border border-white/10 text-white font-headline font-bold uppercase text-[10px] tracking-[0.2em] rounded-md hover:bg-white/10 transition-colors haptic-btn"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        onClick={handlePlaceOrder}
                                        disabled={isProcessing}
                                        className="flex-1 py-5 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-[0.2em] rounded-md hover:bg-neutral-200 transition-colors haptic-btn disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? 'Processing...' : 'Place Order'}
                                    </button>
                                </div>

                                <div className="flex items-center justify-center gap-2 mt-8 text-neutral-600">
                                    <Lock size={12} />
                                    <p className="text-[9px] font-headline uppercase tracking-widest">256-bit Quantum Encryption Active</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-96">
                        <div className="bg-surface-container-low p-8 rounded-2xl border border-white/5 sticky top-32">
                            <h2 className="font-headline uppercase text-[10px] tracking-[0.3em] text-neutral-500 mb-8">Summary Manifest</h2>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between">
                                    <span className="text-xs uppercase tracking-widest text-neutral-400">Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                    <span className="text-sm font-headline text-white">${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs uppercase tracking-widest text-neutral-400">Processing</span>
                                    <span className="text-sm font-headline text-white">${processing.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs uppercase tracking-widest text-neutral-400">Logistics</span>
                                    <span className="text-[10px] font-headline font-bold text-white tracking-widest uppercase">Secured</span>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10 mb-8 flex justify-between items-end">
                                <span className="text-xs uppercase tracking-[0.2em] font-headline font-bold text-white">Full Total</span>
                                <span className="text-3xl font-headline font-bold text-white">${total.toLocaleString()}</span>
                            </div>

                            {/* Mini Item Preview */}
                            <div className="space-y-3">
                                {cart.slice(0, 3).map((item) => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded bg-surface-container overflow-hidden">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-headline text-white uppercase truncate">{item.title}</p>
                                            <p className="text-[9px] text-neutral-500">x{item.quantity}</p>
                                        </div>
                                        <p className="text-[10px] font-headline text-white">${(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                                {cart.length > 3 && (
                                    <p className="text-[10px] text-neutral-500 text-center font-headline">
                                        +{cart.length - 3} more items
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function StepIndicator({ number, label, active, completed }: { number: string; label: string; active: boolean; completed: boolean }) {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-headline font-bold text-xs ${
                completed 
                    ? 'bg-white text-black' 
                    : active 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'bg-surface-container-low text-neutral-600'
            }`}>
                {completed ? <CheckCircle2 size={16} /> : number}
            </div>
            <span className={`font-headline text-[10px] uppercase tracking-widest ${
                active || completed ? 'text-white' : 'text-neutral-600'
            }`}>
                {label}
            </span>
        </div>
    );
}
