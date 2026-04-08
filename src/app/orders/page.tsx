'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { 
    ArrowLeft, 
    History, 
    Package, 
    Truck, 
    CheckCircle2, 
    Clock,
    MapPin,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { getUserOrders, Order } from '@/lib/supabase';

const STATUS_CONFIG = {
    pending: { icon: Clock, label: 'Pending', color: 'text-yellow-500' },
    processing: { icon: Package, label: 'Processing', color: 'text-blue-500' },
    shipped: { icon: Truck, label: 'Shipped', color: 'text-purple-500' },
    delivered: { icon: CheckCircle2, label: 'Delivered', color: 'text-green-500' }
};

export default function OrdersPage() {
    const { user } = useStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user?.id) {
                const data = await getUserOrders(user.id);
                setOrders(data);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [user]);

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 px-4 sm:px-6 max-w-4xl mx-auto pb-12">
                {/* Breadcrumbs */}
                <Link href="/account" className="inline-flex items-center gap-2 text-[10px] font-headline font-bold text-neutral-500 uppercase tracking-widest mb-10 hover:text-white transition-colors group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> BACK TO PROFILE
                </Link>

                <div className="flex items-center gap-4 mb-12">
                    <History size={28} className="text-white" />
                    <h1 className="font-headline text-4xl font-bold tracking-tighter text-white uppercase">Void Logs</h1>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-white animate-spin mb-4" />
                        <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest">Retrieving Transmissions...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const status = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending;
                            const StatusIcon = status.icon;
                            
                            return (
                                <div key={order.id} className="p-8 rounded-2xl bg-surface-container-low border border-white/5 hover:border-white/10 transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-headline text-lg font-bold text-white uppercase truncate max-w-[200px]">{order.id}</h3>
                                                <span className={`flex items-center gap-1.5 text-[10px] font-headline uppercase tracking-widest ${status.color}`}>
                                                    <StatusIcon size={12} />
                                                    {status.label}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest">
                                                {new Date(order.created_at).toLocaleDateString(undefined, { 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-headline text-2xl font-bold text-white">${order.total.toLocaleString()}</p>
                                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Total Value</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                            <div className={`flex-1 h-0.5 ${['delivered', 'shipped', 'processing'].includes(order.status) ? 'bg-green-500' : 'bg-surface-container'}`} />
                                            <div className={`w-3 h-3 rounded-full ${['delivered', 'shipped', 'processing'].includes(order.status) ? 'bg-green-500' : 'bg-surface-container'}`} />
                                            <div className={`flex-1 h-0.5 ${['delivered', 'shipped'].includes(order.status) ? 'bg-green-500' : 'bg-surface-container'}`} />
                                            <div className={`w-3 h-3 rounded-full ${['delivered', 'shipped'].includes(order.status) ? 'bg-green-500' : 'bg-surface-container'}`} />
                                            <div className={`flex-1 h-0.5 ${order.status === 'delivered' ? 'bg-green-500' : 'bg-surface-container'}`} />
                                            <div className={`w-3 h-3 rounded-full ${order.status === 'delivered' ? 'bg-green-500' : 'bg-surface-container'}`} />
                                        </div>
                                        <div className="flex justify-between text-[9px] font-headline text-neutral-600 uppercase tracking-widest">
                                            <span>Accepted</span>
                                            <span>Processed</span>
                                            <span>Shipped</span>
                                            <span>Delivered</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-4 pt-6 border-t border-white/5">
                                        <button className="flex items-center gap-2 px-5 py-3 bg-white/5 rounded-md text-[10px] font-headline uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
                                            <MapPin size={14} /> View Details
                                        </button>
                                        <button className="flex items-center gap-2 px-5 py-3 bg-white/5 rounded-md text-[10px] font-headline uppercase tracking-widest text-neutral-400 hover:bg-white/10 hover:text-white transition-colors">
                                            Support
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {orders.length === 0 && (
                            <div className="py-20 flex flex-col items-center justify-center border border-white/5 rounded-2xl bg-white/[0.02]">
                                <Package className="text-neutral-700 w-12 h-12 mb-6" />
                                <p className="font-headline text-neutral-500 uppercase tracking-[0.5em] text-xs font-bold mb-6">No transmissions logged</p>
                                <Link href="/shop" className="px-6 py-3 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-widest rounded hover:bg-neutral-200 transition-colors haptic-btn">
                                    Start Exploring
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
