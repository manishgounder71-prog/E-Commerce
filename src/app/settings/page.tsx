'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { 
    User,
    Bell,
    Shield,
    Palette,
    Save,
    CheckCircle2,
    Eye,
    EyeOff
} from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [saved, setSaved] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const [profile, setProfile] = useState({
        name: 'NEBULA_CURATOR_01',
        email: 'nexus@nebula.void',
        company: 'Global Architecture Corp',
        phone: '+1 (555) 000-0000'
    });

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

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { id: 'security', label: 'Security', icon: <Shield size={18} /> },
        { id: 'preferences', label: 'Preferences', icon: <Palette size={18} /> },
    ];

    const handleSave = () => {
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
                            <div className="p-8 rounded-2xl bg-surface-container-low border border-white/5">
                                <h2 className="font-headline text-xl font-bold text-white uppercase mb-8">Profile Settings</h2>
                                
                                <div className="space-y-6">
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
                                        <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Email Address</label>
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            className="w-full px-5 py-4 bg-surface-container border border-white/10 rounded-lg text-white font-headline focus:border-white/20 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Company</label>
                                        <input
                                            type="text"
                                            value={profile.company}
                                            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                            className="w-full px-5 py-4 bg-surface-container border border-white/10 rounded-lg text-white font-headline focus:border-white/20 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Phone</label>
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            className="w-full px-5 py-4 bg-surface-container border border-white/10 rounded-lg text-white font-headline focus:border-white/20 outline-none"
                                        />
                                    </div>
                                </div>

                                <button 
                                    onClick={handleSave}
                                    className="mt-8 flex items-center gap-2 px-6 py-4 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-widest rounded-md hover:bg-neutral-200 transition-colors"
                                >
                                    {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
                                    {saved ? 'Saved!' : 'Save Changes'}
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
