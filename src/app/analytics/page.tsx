'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { 
    BarChart3, 
    TrendingUp, 
    Package, 
    DollarSign, 
    Users,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Activity
} from 'lucide-react';

const LIVE_ANALYTICS_DATA = {
    totalRevenue: 45890,
    totalOrders: 127,
    avgOrderValue: 361.34,
    activeUsers: 89,
    monthlyData: [
        { month: 'Jan', revenue: 4200, orders: 12 },
        { month: 'Feb', revenue: 5800, orders: 18 },
        { month: 'Mar', revenue: 5100, orders: 15 },
        { month: 'Apr', revenue: 7200, orders: 22 },
        { month: 'May', revenue: 6800, orders: 19 },
        { month: 'Jun', revenue: 8400, orders: 25 },
    ],
    topProducts: [
        { name: 'SONIC VOID X1', sales: 45, revenue: 58050 },
        { name: 'NEURAL LINK PRO', sales: 32, revenue: 76800 },
        { name: 'GRAPHITE ARMOR', sales: 28, revenue: 23800 },
        { name: 'OBSIDIAN LENS', sales: 21, revenue: 20580 },
        { name: 'VOID RUNNERS', sales: 18, revenue: 5760 },
    ]
};

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

    const stats = [
        { 
            label: 'Total Revenue', 
            value: `$${LIVE_ANALYTICS_DATA.totalRevenue.toLocaleString()}`, 
            change: '+12.5%', 
            positive: true,
            icon: <DollarSign size={20} />
        },
        { 
            label: 'Total Orders', 
            value: LIVE_ANALYTICS_DATA.totalOrders, 
            change: '+8.2%', 
            positive: true,
            icon: <Package size={20} />
        },
        { 
            label: 'Avg Order Value', 
            value: `$${LIVE_ANALYTICS_DATA.avgOrderValue.toFixed(2)}`, 
            change: '-2.1%', 
            positive: false,
            icon: <TrendingUp size={20} />
        },
        { 
            label: 'Active Users', 
            value: LIVE_ANALYTICS_DATA.activeUsers, 
            change: '+15.3%', 
            positive: true,
            icon: <Users size={20} />
        },
    ];

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 px-4 sm:px-6 max-w-7xl mx-auto pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-2">Asset Insights</h1>
                        <p className="font-headline text-[10px] tracking-[0.4em] text-neutral-500 uppercase font-black">
                            Real-time business intelligence // Sector 9
                        </p>
                    </div>
                    
                    <div className="flex gap-2">
                        {(['week', 'month', 'year'] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-md font-headline text-[10px] uppercase tracking-widest transition-all ${
                                    timeRange === range 
                                        ? 'bg-white text-black' 
                                        : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                                }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-surface-container-low border border-white/5 hover:border-white/10 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-neutral-500">{stat.icon}</div>
                                <div className={`flex items-center gap-1 text-[10px] font-headline uppercase tracking-widest ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                                    {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {stat.change}
                                </div>
                            </div>
                            <p className="font-headline text-3xl font-bold text-white mb-1">{stat.value}</p>
                            <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Revenue Chart */}
                    <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-headline text-lg font-bold text-white uppercase mb-1">Revenue Flow</h3>
                                <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest">Last 6 months</p>
                            </div>
                            <Activity size={20} className="text-neutral-500" />
                        </div>
                        
                        {/* Simple Bar Chart */}
                        <div className="flex items-end justify-between gap-4 h-48">
                            {LIVE_ANALYTICS_DATA.monthlyData.map((data: { month: string; revenue: number }, index: number) => {
                                const maxRevenue = Math.max(...LIVE_ANALYTICS_DATA.monthlyData.map((d: { revenue: number }) => d.revenue));
                                const height = (data.revenue / maxRevenue) * 100;
                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                        <div className="w-full bg-surface-container-high rounded-t-md relative group" style={{ height: `${height}%`, minHeight: '20px' }}>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-headline px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                ${data.revenue.toLocaleString()}
                                            </div>
                                        </div>
                                        <span className="font-headline text-[10px] text-neutral-500">{data.month}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-headline text-lg font-bold text-white uppercase mb-1">Top Assets</h3>
                                <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest">Best performing manifests</p>
                            </div>
                            <BarChart3 size={20} className="text-neutral-500" />
                        </div>
                        
                        <div className="space-y-4">
                            {LIVE_ANALYTICS_DATA.topProducts.map((product: { name: string; sales: number; revenue: number }, index: number) => (
                                <div key={index} className="flex items-center gap-4">
                                    <span className="font-headline text-[10px] text-neutral-600 w-4">{index + 1}</span>
                                    <div className="flex-1">
                                        <p className="font-headline text-sm text-white uppercase mb-1">{product.name}</p>
                                        <div className="h-1 bg-surface-container rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-white rounded-full transition-all"
                                                style={{ width: `${(product.sales / LIVE_ANALYTICS_DATA.topProducts[0].sales) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-headline text-sm font-bold text-white">{product.sales}</p>
                                        <p className="font-headline text-[9px] text-neutral-500">sales</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-headline text-lg font-bold text-white uppercase mb-1">Recent Transmissions</h3>
                            <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest">Latest system activity</p>
                        </div>
                        <Calendar size={20} className="text-neutral-500" />
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { time: '2 min ago', action: 'New order placed', detail: 'NBL-X7K9M2 - $1,542.00' },
                            { time: '15 min ago', action: 'User registered', detail: 'architect@nebula.void' },
                            { time: '1 hour ago', action: 'Bulk order processed', detail: '50x SONIC VOID X1' },
                            { time: '3 hours ago', action: 'Shipment dispatched', detail: 'TRK-7832911' },
                            { time: '5 hours ago', action: 'New review submitted', detail: 'VOID RUNNERS - 5 stars' },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                <div className="flex-1">
                                    <p className="font-headline text-sm text-white">{activity.action}</p>
                                    <p className="font-headline text-[10px] text-neutral-500">{activity.detail}</p>
                                </div>
                                <span className="font-headline text-[10px] text-neutral-600 uppercase tracking-widest">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
