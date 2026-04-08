'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { useStore } from '@/lib/store';
import { 
    User,
    Bell,
    Shield,
    Palette,
    Save,
    CheckCircle2,
    Eye,
    EyeOff,
    Camera,
    MapPin,
    Plus
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SettingsPage() {
    const { user, updateUser, addresses, defaultAddress } = useStore();
    const [activeTab, setActiveTab] = useState('profile');
    const [saved, setSaved] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        company: user?.company || '',
        phone: user?.phone || '',
        profilePicture: user?.profilePicture || ''
    });

    useEffect(() => {
        if (user) {
            setProfile({
                name: user.name,
                email: user.email,
                company: user.company || '',
                phone: user.phone || '',
                profilePicture: user.profilePicture || ''
            });
        }
    }, [user]);

    const [notifications, setNotifications] = useState({
        orders: true,
        promotions: false,
        newsletter: true,
        security: true
    });

    const [preferences, setPreferences] = useState({
        darkMode: true,
        compactView: false,
        autoSync: true
    });

    if (!user) {
        return (
            <main className="min-h-screen bg-surface text-white flex items-center justify-center">
                <Navbar />
                <div className="text-center">
                    <p className="font-headline text-[10px] tracking-[0.4em] text-neutral-500 uppercase font-black mb-4">Unauthorized Access</p>
                    <Link href="/discover" className="font-headline text-sm text-white border-b border-white hover:text-neutral-400 transition-colors uppercase tracking-widest">Return to Grid</Link>
                </div>
            </main>
        );
    }

    const activeAddress = addresses.find(a => a.id === defaultAddress) || addresses[0];

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { id: 'security', label: 'Security', icon: <Shield size={18} /> },
        { id: 'preferences', label: 'Preferences', icon: <Palette size={18} /> },
    ];

    const handleSave = () => {
        updateUser(profile);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 px-4 sm:px-6 max-w-4xl mx-auto pb-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-2">Void Config</h1>
                    <p className="font-headline text-[10px] tracking-[0.4em] text-neutral-500 uppercase font-black">
                        System parameters // Configuration interface
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Tabs */}
                    <div className="lg:w-64">
                        <nav className="space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-headline text-sm uppercase tracking-widest transition-all ${
                                        activeTab === tab.id 
                                            ? 'bg-white text-black' 
                                            : 'bg-surface-container-low text-neutral-400 hover:bg-surface-container-high'
                                    }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                {/* Profile Picture */}
                                <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                                    <h2 className="font-headline text-xl font-bold text-white uppercase mb-8">Identity Matrix</h2>
                                    <div className="flex flex-col sm:flex-row items-center gap-8">
                                        <div className="relative group">
                                            <div className="w-32 h-32 rounded-full border-2 border-white/10 p-1 overflow-hidden">
                                                <Image 
                                                    src={profile.profilePicture || '/default-avatar.png'} 
                                                    alt="Profile" 
                                                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                                                    width={128}
                                                    height={128}
                                                />
                                            </div>
                                            <label className="absolute bottom-0 right-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors shadow-xl">
                                                <Camera size={18} />
                                                <input 
                                                    type="file" 
                                                    className="hidden" 
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            // Mock upload - in a real app, upload to storage
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setProfile({ ...profile, profilePicture: reader.result as string });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <p className="font-headline text-sm text-white uppercase mb-1">Upload New Manifest</p>
                                            <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-4">JPG, PNG or GIF. Max size 5MB.</p>
                                            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                                <button 
                                                    onClick={() => setProfile({ ...profile, profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1587&auto=format&fit=crop' })}
                                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded font-headline text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors"
                                                >
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Display Name</label>
                                                <input
                                                    type="text"
                                                    value={profile.name}
                                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                    className="w-full px-5 py-4 bg-surface-container border border-white/10 rounded-lg text-white font-headline focus:border-white/20 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Phone Node</label>
                                                <input
                                                    type="tel"
                                                    value={profile.phone}
                                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                    className="w-full px-5 py-4 bg-surface-container border border-white/10 rounded-lg text-white font-headline focus:border-white/20 outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Email Transmission</label>
                                            <input
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                className="w-full px-5 py-4 bg-surface-container border border-white/10 rounded-lg text-white font-headline focus:border-white/20 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Corporate Sector</label>
                                            <input
                                                type="text"
                                                value={profile.company}
                                                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                                className="w-full px-5 py-4 bg-surface-container border border-white/10 rounded-lg text-white font-headline focus:border-white/20 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Address Section */}
                                <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="font-headline text-xl font-bold text-white uppercase">Postal Nodes</h2>
                                        <Link href="/addresses" className="flex items-center gap-2 text-[10px] font-headline uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                                            <Plus size={14} />
                                            Manage All
                                        </Link>
                                    </div>
                                    
                                    {activeAddress && (
                                        <div className="p-6 rounded-xl bg-surface-container border border-white/10 flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400">
                                                    <MapPin size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-headline text-sm text-white font-bold uppercase mb-1">{activeAddress.name}</p>
                                                    <p className="font-headline text-xs text-neutral-500 leading-relaxed max-w-xs transition-all">
                                                        {activeAddress.address}, {activeAddress.city}, {activeAddress.state} {activeAddress.zip}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="px-2 py-0.5 bg-white/10 text-[8px] font-headline uppercase tracking-widest rounded text-neutral-400">Default</span>
                                        </div>
                                    )}
                                </div>

                                <button 
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-8 py-4 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-widest rounded-md hover:bg-neutral-200 transition-all haptic-btn w-full sm:w-auto justify-center"
                                >
                                    {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
                                    {saved ? 'Manifest Updated!' : 'Synchronize Profile'}
                                </button>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                                <h2 className="font-headline text-xl font-bold text-white uppercase mb-8">Notification Preferences</h2>
                                
                                <div className="space-y-6">
                                    {[
                                        { key: 'orders', label: 'Order Updates', desc: 'Get notified when orders are shipped or delivered' },
                                        { key: 'promotions', label: 'Promotions', desc: 'Receive offers, discounts, and special deals' },
                                        { key: 'newsletter', label: 'Newsletter', desc: 'Weekly digest of new products and updates' },
                                        { key: 'security', label: 'Security Alerts', desc: 'Important security notifications and warnings' },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                                            <div>
                                                <p className="font-headline text-sm text-white uppercase mb-1">{item.label}</p>
                                                <p className="font-headline text-xs text-neutral-500">{item.desc}</p>
                                            </div>
                                            <button
                                                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                                                className={`w-14 h-8 rounded-full transition-all relative ${
                                                    notifications[item.key as keyof typeof notifications] ? 'bg-white' : 'bg-surface-container-high'
                                                }`}
                                            >
                                                <div className={`absolute top-1 w-6 h-6 rounded-full transition-all ${
                                                    notifications[item.key as keyof typeof notifications] 
                                                        ? 'left-7 bg-black' 
                                                        : 'left-1 bg-neutral-500'
                                                }`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                                    <h2 className="font-headline text-xl font-bold text-white uppercase mb-6">Change Password</h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="w-full px-5 py-4 bg-surface-container border border-white/10 rounded-lg text-white font-headline focus:border-white/20 outline-none pr-12"
                                                />
                                                <button
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-3">New Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-5 py-4 bg-surface-container border border-white/10 rounded-lg text-white font-headline focus:border-white/20 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-5 py-4 bg-surface-container border border-white/10 rounded-lg text-white font-headline focus:border-white/20 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <button className="mt-6 flex items-center gap-2 px-6 py-4 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-widest rounded-md hover:bg-neutral-200 transition-colors">
                                        <Shield size={16} />
                                        Update Password
                                    </button>
                                </div>

                                <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                                    <h2 className="font-headline text-xl font-bold text-white uppercase mb-4">Two-Factor Authentication</h2>
                                    <p className="font-headline text-sm text-neutral-500 mb-6">Add an extra layer of security to your account</p>
                                    
                                    <button className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white font-headline font-bold uppercase text-[10px] tracking-widest rounded-md hover:bg-white/10 transition-colors">
                                        <Shield size={16} />
                                        Enable 2FA
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'preferences' && (
                            <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                                <h2 className="font-headline text-xl font-bold text-white uppercase mb-8">App Preferences</h2>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                                        <div>
                                            <p className="font-headline text-sm text-white uppercase mb-1">Dark Mode</p>
                                            <p className="font-headline text-xs text-neutral-500">Use dark theme throughout the interface</p>
                                        </div>
                                        <button
                                            onClick={() => setPreferences({ ...preferences, darkMode: !preferences.darkMode })}
                                            className={`w-14 h-8 rounded-full transition-all relative ${
                                                preferences.darkMode ? 'bg-white' : 'bg-surface-container-high'
                                            }`}
                                        >
                                            <div className={`absolute top-1 w-6 h-6 rounded-full transition-all ${
                                                preferences.darkMode ? 'left-7 bg-black' : 'left-1 bg-neutral-500'
                                            }`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                                        <div>
                                            <p className="font-headline text-sm text-white uppercase mb-1">Compact View</p>
                                            <p className="font-headline text-xs text-neutral-500">Show more items in smaller cards</p>
                                        </div>
                                        <button
                                            onClick={() => setPreferences({ ...preferences, compactView: !preferences.compactView })}
                                            className={`w-14 h-8 rounded-full transition-all relative ${
                                                preferences.compactView ? 'bg-white' : 'bg-surface-container-high'
                                            }`}
                                        >
                                            <div className={`absolute top-1 w-6 h-6 rounded-full transition-all ${
                                                preferences.compactView ? 'left-7 bg-black' : 'left-1 bg-neutral-500'
                                            }`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                                        <div>
                                            <p className="font-headline text-sm text-white uppercase mb-1">Auto Sync</p>
                                            <p className="font-headline text-xs text-neutral-500">Automatically sync data across devices</p>
                                        </div>
                                        <button
                                            onClick={() => setPreferences({ ...preferences, autoSync: !preferences.autoSync })}
                                            className={`w-14 h-8 rounded-full transition-all relative ${
                                                preferences.autoSync ? 'bg-white' : 'bg-surface-container-high'
                                            }`}
                                        >
                                            <div className={`absolute top-1 w-6 h-6 rounded-full transition-all ${
                                                preferences.autoSync ? 'left-7 bg-black' : 'left-1 bg-neutral-500'
                                            }`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between py-4">
                                        <div>
                                            <p className="font-headline text-sm text-white uppercase mb-1">Language</p>
                                            <p className="font-headline text-xs text-neutral-500">Select your preferred language</p>
                                        </div>
                                        <select className="px-4 py-2 bg-surface-container border border-white/10 rounded-lg text-white font-headline focus:border-white/20 outline-none">
                                            <option>English</option>
                                            <option>Spanish</option>
                                            <option>Japanese</option>
                                        </select>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleSave}
                                    className="mt-8 flex items-center gap-2 px-6 py-4 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-widest rounded-md hover:bg-neutral-200 transition-colors"
                                >
                                    {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
                                    {saved ? 'Saved!' : 'Save Preferences'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
