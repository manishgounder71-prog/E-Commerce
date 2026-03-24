'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useStore, MOCK_PRODUCTS } from '@/lib/store';
import { 
    Package, 
    Truck, 
    Calculator,
    CheckCircle2,
    Minus,
    Plus,
    Shield,
    Clock
} from 'lucide-react';

export default function BulkPage() {
    const { addToCart } = useStore();
    const [selectedProduct, setSelectedProduct] = useState<string>('');
    const [quantity, setQuantity] = useState(50);
    const [bulkCart, setBulkCart] = useState<{ productId: string; quantity: number }[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [bulkOrderRef] = useState(() => `BULK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);

    const currentProduct = MOCK_PRODUCTS.find(p => p.id === selectedProduct);

    const bulkDiscounts = [
        { min: 10, max: 49, discount: 0 },
        { min: 50, max: 99, discount: 10 },
        { min: 100, max: 249, discount: 15 },
        { min: 250, max: 499, discount: 20 },
        { min: 500, max: null, discount: 25 },
    ];

    const getDiscount = (qty: number) => {
        const tier = bulkDiscounts.find(d => qty >= d.min && (d.max === null || qty <= d.max));
        return tier?.discount || 0;
    };

    const calculatePrice = () => {
        if (!currentProduct) return { subtotal: 0, discount: 0, total: 0 };
        const discount = getDiscount(quantity);
        const subtotal = currentProduct.price * quantity;
        const discountAmount = subtotal * (discount / 100);
        const total = subtotal - discountAmount;
        return { subtotal, discount, total, discountAmount };
    };

    const { subtotal, discount, total, discountAmount } = calculatePrice();

    const addToBulkCart = () => {
        if (selectedProduct && quantity >= 10) {
            setBulkCart([...bulkCart, { productId: selectedProduct, quantity }]);
            setSelectedProduct('');
            setQuantity(50);
        }
    };

    const removeFromBulkCart = (index: number) => {
        setBulkCart(bulkCart.filter((_, i) => i !== index));
    };

    const submitBulkOrder = () => {
        if (bulkCart.length > 0) {
            bulkCart.forEach(item => {
                const product = MOCK_PRODUCTS.find(p => p.id === item.productId);
                if (product) {
                    addToCart(product, item.quantity);
                }
            });
            setSubmitted(true);
        }
    };

    const bulkOrderTotal = bulkCart.reduce((acc, item) => {
        const product = MOCK_PRODUCTS.find(p => p.id === item.productId);
        if (product) {
            const itemDiscount = getDiscount(item.quantity);
            const itemTotal = product.price * item.quantity * (1 - itemDiscount / 100);
            return acc + itemTotal;
        }
        return acc;
    }, 0);

    if (submitted) {
        return (
            <main className="min-h-screen bg-surface text-white">
                <Navbar />
                <div className="pt-20 px-4 sm:px-6 max-w-4xl mx-auto pb-12">
                    <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} className="text-green-500" />
                    </div>
                    <h1 className="font-headline text-5xl font-black tracking-tighter text-white uppercase mb-4">Bulk Order Initiated</h1>
                    <p className="font-headline text-[10px] tracking-[0.4em] text-neutral-500 uppercase font-black mb-12">
                        Manifest processed // awaiting confirmation
                    </p>
                    
                    <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5 text-left mb-12">
                        <p className="text-[10px] font-headline text-neutral-500 uppercase tracking-widest mb-2">Reference Code</p>
                        <p className="font-headline text-3xl font-bold text-white">{bulkOrderRef}</p>
                    </div>

                    <button 
                        onClick={() => { setSubmitted(false); setBulkCart([]); }}
                        className="px-8 py-4 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-widest rounded-md hover:bg-neutral-200 transition-colors"
                    >
                        New Bulk Order
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 px-4 sm:px-6 max-w-4xl mx-auto pb-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-2">Bulk Logistics</h1>
                    <p className="font-headline text-[10px] tracking-[0.4em] text-neutral-500 uppercase font-black">
                        High-volume acquisition protocol // Tier pricing active
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Bulk Calculator */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Product Selection */}
                        <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <Package size={24} className="text-white" />
                                <h2 className="font-headline text-xl font-bold text-white uppercase">Select Asset</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {MOCK_PRODUCTS.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => setSelectedProduct(product.id)}
                                        className={`p-4 rounded-xl border transition-all text-left ${
                                            selectedProduct === product.id 
                                                ? 'bg-white/10 border-white/30' 
                                                : 'bg-surface-container border-white/5 hover:border-white/10'
                                        }`}
                                    >
                                        <p className="font-headline text-sm font-bold text-white uppercase mb-1">{product.title}</p>
                                        <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest">{product.category}</p>
                                        <p className="font-headline text-lg font-bold text-white mt-2">${product.price.toLocaleString()}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <Calculator size={24} className="text-white" />
                                <h2 className="font-headline text-xl font-bold text-white uppercase">Quantity</h2>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <button 
                                    onClick={() => setQuantity(Math.max(10, quantity - 10))}
                                    className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                >
                                    <Minus size={20} />
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(10, parseInt(e.target.value) || 10))}
                                    className="w-32 text-center px-4 py-3 bg-surface-container border border-white/10 rounded-lg font-headline text-2xl font-bold text-white focus:border-white/30 outline-none"
                                />
                                <button 
                                    onClick={() => setQuantity(quantity + 10)}
                                    className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                                <span className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest">Min: 10 units</span>
                            </div>

                            {/* Discount Tiers */}
                            <div className="mt-8">
                                <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-4">Volume Discounts</p>
                                <div className="grid grid-cols-5 gap-2">
                                    {bulkDiscounts.map((tier, index) => (
                                        <div 
                                            key={index}
                                            className={`p-3 rounded-lg text-center ${
                                                quantity >= tier.min && (tier.max === null || quantity <= tier.max)
                                                    ? 'bg-white text-black'
                                                    : 'bg-white/5'
                                            }`}
                                        >
                                            <p className="font-headline text-[10px] text-neutral-500 uppercase mb-1">
                                                {tier.max ? `${tier.min}-${tier.max}` : `${tier.min}+`}
                                            </p>
                                            <p className={`font-headline text-lg font-bold ${
                                                quantity >= tier.min && (tier.max === null || quantity <= tier.max)
                                                    ? 'text-black'
                                                    : 'text-white'
                                            }`}>
                                                {tier.discount > 0 ? `-${tier.discount}%` : '-'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bulk Cart */}
                        {bulkCart.length > 0 && (
                            <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                                <h2 className="font-headline text-xl font-bold text-white uppercase mb-6">Bulk Manifest</h2>
                                
                                <div className="space-y-4 mb-6">
                                    {bulkCart.map((item, index) => {
                                        const product = MOCK_PRODUCTS.find(p => p.id === item.productId);
                                        const itemDiscount = getDiscount(item.quantity);
                                        const itemTotal = product ? product.price * item.quantity * (1 - itemDiscount / 100) : 0;
                                        return (
                                            <div key={index} className="flex items-center gap-4 p-4 bg-surface-container rounded-xl">
                                                <div className="flex-1">
                                                    <p className="font-headline text-sm text-white uppercase">{product?.title}</p>
                                                    <p className="font-headline text-[10px] text-neutral-500">{item.quantity} units @ ${product?.price.toLocaleString()} (-{itemDiscount}%)</p>
                                                </div>
                                                <p className="font-headline font-bold text-white">${itemTotal.toLocaleString()}</p>
                                                <button 
                                                    onClick={() => removeFromBulkCart(index)}
                                                    className="text-neutral-500 hover:text-white transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                                    <span className="font-headline text-sm text-neutral-500 uppercase tracking-widest">Bulk Total</span>
                                    <span className="font-headline text-2xl font-bold text-white">${bulkOrderTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    <div className="space-y-6">
                        <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5 sticky top-32">
                            <h3 className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-6">Order Summary</h3>
                            
                            {currentProduct ? (
                                <>
                                    <div className="mb-6">
                                        <img src={currentProduct.image} alt={currentProduct.title} className="w-full aspect-square object-cover rounded-xl mb-4" />
                                        <p className="font-headline text-lg font-bold text-white uppercase">{currentProduct.title}</p>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-xs text-neutral-400 uppercase tracking-widest">Quantity</span>
                                            <span className="font-headline text-white">{quantity} units</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-neutral-400 uppercase tracking-widest">Unit Price</span>
                                            <span className="font-headline text-white">${currentProduct.price.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-neutral-400 uppercase tracking-widest">Subtotal</span>
                                            <span className="font-headline text-white">${subtotal.toLocaleString()}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-green-500">
                                                <span className="text-xs uppercase tracking-widest">Volume Discount</span>
                                                <span className="font-headline">-${(discountAmount || 0).toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-6 border-t border-white/10 mb-6">
                                        <div className="flex justify-between items-end">
                                            <span className="text-xs uppercase tracking-widest text-white">Total</span>
                                            <span className="font-headline text-3xl font-bold text-white">${total.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={addToBulkCart}
                                        disabled={quantity < 10}
                                        className="w-full py-4 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-widest rounded-md hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                                    >
                                        Add to Manifest
                                    </button>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <Package size={48} className="text-neutral-700 mx-auto mb-4" />
                                    <p className="font-headline text-neutral-500 text-sm uppercase tracking-widest">Select an asset</p>
                                </div>
                            )}

                            {bulkCart.length > 0 && (
                                <button 
                                    onClick={submitBulkOrder}
                                    className="w-full py-4 bg-green-500 text-white font-headline font-bold uppercase text-[10px] tracking-widest rounded-md hover:bg-green-600 transition-colors"
                                >
                                    Submit Bulk Order
                                </button>
                            )}

                            {/* Benefits */}
                            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Truck size={16} className="text-neutral-500" />
                                    <span className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest">Express logistics</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield size={16} className="text-neutral-500" />
                                    <span className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest">Bulk warranty</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock size={16} className="text-neutral-500" />
                                    <span className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest">Priority support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
