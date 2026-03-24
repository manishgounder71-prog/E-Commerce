'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { 
    Truck, 
    Package, 
    MapPin, 
    Clock,
    CheckCircle2,
    Navigation,
    AlertCircle
} from 'lucide-react';

const MOCK_SHIPMENTS = [
    { 
        id: 'TRK-7832910',
        orderId: 'NBL-X7K9M2',
        status: 'delivered',
        carrier: 'VOID EXPRESS',
        estimated: 'Delivered',
        actual: 'March 18, 2026',
        location: 'Sector 9, Node Alpha',
        progress: 100
    },
    { 
        id: 'TRK-7832911',
        orderId: 'NBL-Q4P8N1',
        status: 'in_transit',
        carrier: 'NEBULA LOGISTICS',
        estimated: 'March 22, 2026',
        location: 'Void Transit Hub B-7',
        progress: 65
    },
    { 
        id: 'TRK-7832912',
        orderId: 'NBL-R2W5L3',
        status: 'processing',
        carrier: 'QUANTUM FREIGHT',
        estimated: 'March 25, 2026',
        location: 'Origin Node: Sector 12',
        progress: 15
    }
];

const STATUS_CONFIG = {
    processing: { label: 'Processing', color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
    in_transit: { label: 'In Transit', color: 'text-blue-500', bg: 'bg-blue-500/20' },
    delivered: { label: 'Delivered', color: 'text-green-500', bg: 'bg-green-500/20' }
};

export default function LogisticsPage() {
    const [selectedShipment, setSelectedShipment] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 px-4 sm:px-6 max-w-4xl mx-auto pb-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-2">Logistic Nodes</h1>
                    <p className="font-headline text-[10px] tracking-[0.4em] text-neutral-500 uppercase font-black">
                        Real-time shipment tracking // Enterprise sync
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Active Shipments', value: '3', icon: <Truck size={20} /> },
                        { label: 'In Transit', value: '1', icon: <Navigation size={20} /> },
                        { label: 'Delivered Today', value: '2', icon: <CheckCircle2 size={20} /> },
                        { label: 'Avg Delivery', value: '4.2 days', icon: <Clock size={20} /> },
                    ].map((stat, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-surface-container-low border border-white/5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="text-neutral-500">{stat.icon}</div>
                                <span className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <p className="font-headline text-3xl font-bold text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Shipments List */}
                <div className="space-y-6">
                    {MOCK_SHIPMENTS.map((shipment) => {
                        const status = STATUS_CONFIG[shipment.status as keyof typeof STATUS_CONFIG];
                        const isSelected = selectedShipment === shipment.id;
                        
                        return (
                            <div 
                                key={shipment.id}
                                className={`rounded-2xl border transition-all cursor-pointer ${
                                    isSelected 
                                        ? 'bg-surface-container-low border-white/20' 
                                        : 'bg-surface-container-low border-white/5 hover:border-white/10'
                                }`}
                                onClick={() => setSelectedShipment(isSelected ? null : shipment.id)}
                            >
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-start gap-6">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${status.bg}`}>
                                                <Truck size={24} className={status.color} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-headline text-lg font-bold text-white uppercase">{shipment.id}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-headline uppercase tracking-widest ${status.bg} ${status.color}`}>
                                                        {status.label}
                                                    </span>
                                                </div>
                                                <p className="font-headline text-sm text-neutral-400">Order: {shipment.orderId}</p>
                                                <p className="font-headline text-[10px] text-neutral-600 uppercase tracking-widest mt-1">{shipment.carrier}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="text-left md:text-right">
                                            <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Estimated</p>
                                            <p className="font-headline text-lg font-bold text-white">{shipment.estimated}</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-6">
                                        <div className="flex justify-between text-[10px] font-headline text-neutral-600 uppercase tracking-widest mb-2">
                                            <span>Origin</span>
                                            <span>In Transit</span>
                                            <span>Destination</span>
                                        </div>
                                        <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-500 ${
                                                    shipment.status === 'delivered' ? 'bg-green-500' : 'bg-white'
                                                }`}
                                                style={{ width: `${shipment.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {isSelected && (
                                    <div className="px-6 pb-6 pt-0 border-t border-white/5">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                            <div className="flex items-start gap-3">
                                                <MapPin size={16} className="text-neutral-500 mt-1" />
                                                <div>
                                                    <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Current Location</p>
                                                    <p className="font-headline text-sm text-white">{shipment.location}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Clock size={16} className="text-neutral-500 mt-1" />
                                                <div>
                                                    <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-1">{shipment.status === 'delivered' ? 'Delivered On' : 'Expected Delivery'}</p>
                                                    <p className="font-headline text-sm text-white">{shipment.actual || shipment.estimated}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Package size={16} className="text-neutral-500 mt-1" />
                                                <div>
                                                    <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Tracking Updates</p>
                                                    <p className="font-headline text-sm text-white">{shipment.progress}% Complete</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6 p-4 rounded-xl bg-surface-container border border-white/5">
                                            <div className="flex items-center gap-3 mb-4">
                                                <AlertCircle size={16} className="text-neutral-500" />
                                                <span className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest">Tracking Timeline</span>
                                            </div>
                                            <div className="space-y-3">
                                                {[
                                                    { time: 'Mar 18, 08:42', event: 'Package departed transit hub', completed: true },
                                                    { time: 'Mar 17, 14:20', event: 'Package arrived at transit hub', completed: true },
                                                    { time: 'Mar 16, 09:00', event: 'Package picked up by carrier', completed: true },
                                                    { time: 'Mar 15, 22:00', event: 'Order processed at origin facility', completed: shipment.status !== 'processing' },
                                                ].map((update, index) => (
                                                    <div key={index} className="flex items-center gap-4">
                                                        <div className={`w-2 h-2 rounded-full ${update.completed ? 'bg-green-500' : 'bg-surface-container-high'}`} />
                                                        <span className="font-headline text-[10px] text-neutral-600 w-28">{update.time}</span>
                                                        <span className={`font-headline text-sm ${update.completed ? 'text-white' : 'text-neutral-600'}`}>{update.event}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
