'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useStore, Address } from '@/lib/store';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    MapPin, 
    Phone, 
    User,
    CheckCircle2,
    X,
    Home,
    Building2
} from 'lucide-react';

export default function AddressesPage() {
    const { addresses, addAddress, removeAddress, updateAddress, defaultAddress, setDefaultAddress } = useStore();
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        type: 'home' as 'home' | 'work' | 'other'
    });

    const resetForm = () => {
        setFormData({ name: '', phone: '', address: '', city: '', state: '', zip: '', type: 'home' });
        setEditingId(null);
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.zip) {
            alert('Please fill all fields');
            return;
        }

        if (editingId) {
            updateAddress(editingId, formData);
        } else {
            addAddress({ ...formData, isDefault: addresses.length === 0 });
        }
        setShowModal(false);
        resetForm();
    };

    const handleEdit = (addr: Address) => {
        setFormData({
            name: addr.name,
            phone: addr.phone,
            address: addr.address,
            city: addr.city,
            state: addr.state,
            zip: addr.zip,
            type: 'home'
        });
        setEditingId(addr.id);
        setShowModal(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this address?')) {
            removeAddress(id);
        }
    };

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 px-4 sm:px-6 max-w-4xl mx-auto pb-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-headline font-black text-white uppercase tracking-tight">Manage Addresses</h1>
                        <p className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-wider mt-1">Your delivery locations</p>
                    </div>
                    <button 
                        onClick={() => { resetForm(); setShowModal(true); }}
                        className="flex items-center gap-2 px-5 py-3 bg-white text-black font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                        <Plus size={16} />
                        Add New
                    </button>
                </div>

                {/* Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                        <div key={addr.id} className={`p-6 rounded-2xl border transition-all ${
                            defaultAddress === addr.id 
                                ? 'bg-surface-container-low border-green-500/50' 
                                : 'bg-surface-container-low border-white/5 hover:border-white/20'
                        }`}>
                            {/* Default Badge */}
                            {defaultAddress === addr.id && (
                                <div className="flex items-center gap-2 mb-4">
                                    <CheckCircle2 size={14} className="text-green-500" />
                                    <span className="text-xs text-green-500 font-bold uppercase tracking-wider">Default Address</span>
                                </div>
                            )}

                            {/* Type & Actions */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    {addr.type === 'work' ? <Building2 size={18} className="text-blue-400" /> : <Home size={18} className="text-orange-400" />}
                                    <span className="font-headline text-sm font-bold text-white uppercase">{addr.type}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleEdit(addr)} className="p-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(addr.id)} className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Address Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3">
                                    <User size={14} className="text-neutral-500" />
                                    <span className="font-headline text-sm text-white">{addr.name}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin size={14} className="text-neutral-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-headline text-sm text-neutral-300">{addr.address}</p>
                                        <p className="font-headline text-sm text-neutral-400">{addr.city}, {addr.state} - {addr.zip}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={14} className="text-neutral-500" />
                                    <span className="font-headline text-sm text-neutral-300">{addr.phone}</span>
                                </div>
                            </div>

                            {/* Set Default Button */}
                            {defaultAddress !== addr.id && (
                                <button 
                                    onClick={() => setDefaultAddress(addr.id)}
                                    className="w-full py-3 border border-white/20 text-white font-headline text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    Set as Default
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Add New Card */}
                    <button 
                        onClick={() => { resetForm(); setShowModal(true); }}
                        className="min-h-[250px] p-6 rounded-2xl border-2 border-dashed border-white/10 hover:border-white/30 transition-all flex flex-col items-center justify-center gap-4 text-neutral-500 hover:text-white"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                            <Plus size={32} />
                        </div>
                        <span className="font-headline text-sm uppercase tracking-wider font-bold">Add New Address</span>
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-surface-container-low border border-white/10 rounded-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h3 className="font-headline text-xl font-bold text-white uppercase">{editingId ? 'Edit Address' : 'New Address'}</h3>
                            <button onClick={() => { setShowModal(false); resetForm(); }} className="text-neutral-500 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                            <div>
                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-surface-container border border-white/10 rounded-lg text-white font-headline text-sm outline-none focus:border-white/30"
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-surface-container border border-white/10 rounded-lg text-white font-headline text-sm outline-none focus:border-white/30"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>
                            <div>
                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-2">Address</label>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-4 py-3 bg-surface-container border border-white/10 rounded-lg text-white font-headline text-sm outline-none focus:border-white/30 resize-none h-24"
                                    placeholder="House/Flat No., Street, Landmark"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-2">City</label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-4 py-3 bg-surface-container border border-white/10 rounded-lg text-white font-headline text-sm outline-none focus:border-white/30"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-2">State</label>
                                    <input
                                        type="text"
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full px-4 py-3 bg-surface-container border border-white/10 rounded-lg text-white font-headline text-sm outline-none focus:border-white/30"
                                        placeholder="State"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-2">PIN Code</label>
                                <input
                                    type="text"
                                    value={formData.zip}
                                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                    className="w-full px-4 py-3 bg-surface-container border border-white/10 rounded-lg text-white font-headline text-sm outline-none focus:border-white/30"
                                    placeholder="6 digit PIN code"
                                    maxLength={6}
                                />
                            </div>
                            <div>
                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-2">Address Type</label>
                                <div className="flex gap-3">
                                    {(['home', 'work', 'other'] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setFormData({ ...formData, type })}
                                            className={`flex-1 py-3 rounded-lg border font-headline text-xs uppercase tracking-wider font-bold transition-all ${
                                                formData.type === type 
                                                    ? 'bg-white text-black border-white' 
                                                    : 'border-white/20 text-neutral-400 hover:border-white/40'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-white/5 flex gap-4">
                            <button 
                                onClick={() => { setShowModal(false); resetForm(); }}
                                className="flex-1 py-3 border border-white/20 text-white font-headline text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSubmit}
                                className="flex-1 py-3 bg-white text-black font-headline text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-neutral-200 transition-colors"
                            >
                                {editingId ? 'Update' : 'Save'} Address
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
