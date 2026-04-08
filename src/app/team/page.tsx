'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { 
    Shield, 
    Crown,
    UserPlus,
    Search,
    MoreVertical,
    Mail,
    X
} from 'lucide-react';

const TEAM_MEMBERS = [
    { id: '1', name: 'Nexus Prime', email: 'nexus@nebula.void', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200', status: 'online' },
    { id: '2', name: 'Architect_02', email: 'arch02@nebula.void', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200', status: 'online' },
    { id: '3', name: 'Synthwave_X', email: 'synth@nebula.void', role: 'Member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200', status: 'away' },
    { id: '4', name: 'VoidRunner_9', email: 'void9@nebula.void', role: 'Member', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200', status: 'offline' },
];

const ROLES = [
    { id: 'admin', label: 'Admin', permissions: ['Full Access', 'Team Management', 'Billing', 'Settings'] },
    { id: 'manager', label: 'Manager', permissions: ['Order Management', 'Inventory', 'Reports', 'Analytics'] },
    { id: 'member', label: 'Member', permissions: ['View Products', 'Create Orders', 'View Own Orders'] },
];

export default function TeamPage() {
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('member');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTeam = TEAM_MEMBERS.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInvite = () => {
        if (inviteEmail) {
            alert(`Invitation sent to ${inviteEmail} as ${inviteRole}`);
            setInviteEmail('');
            setShowInviteModal(false);
        }
    };

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 px-4 sm:px-6 max-w-5xl mx-auto pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-2">Team Access</h1>
                        <p className="font-headline text-[10px] tracking-[0.4em] text-neutral-500 uppercase font-black">
                            Multi-entity authentication // Neural collective sync
                        </p>
                    </div>
                    
                    <button 
                        onClick={() => setShowInviteModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-widest rounded-md hover:bg-neutral-200 transition-colors"
                    >
                        <UserPlus size={16} />
                        Invite Member
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Members', value: '4' },
                        { label: 'Online Now', value: '2' },
                        { label: 'Pending Invites', value: '1' },
                        { label: 'Roles', value: '3' },
                    ].map((stat, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-surface-container-low border border-white/5">
                            <p className="font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-2">{stat.label}</p>
                            <p className="font-headline text-3xl font-bold text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search team members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-white/5 rounded-xl text-white font-headline focus:border-white/20 outline-none transition-colors"
                    />
                </div>

                {/* Team List */}
                <div className="space-y-4">
                    {filteredTeam.map((member) => (
                        <div key={member.id} className="p-6 rounded-2xl bg-surface-container-low border border-white/5 hover:border-white/10 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 relative">
                                        <Image 
                                            src={member.avatar} 
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface-container-low ${
                                        member.status === 'online' ? 'bg-green-500' :
                                        member.status === 'away' ? 'bg-yellow-500' : 'bg-neutral-600'
                                    }`} />
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-headline text-lg font-bold text-white uppercase">{member.name}</h3>
                                        {member.role === 'Admin' && <Crown size={14} className="text-yellow-500" />}
                                    </div>
                                    <p className="font-headline text-sm text-neutral-500">{member.email}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-2 rounded-full text-[10px] font-headline uppercase tracking-widest ${
                                        member.role === 'Admin' ? 'bg-yellow-500/20 text-yellow-500' :
                                        member.role === 'Manager' ? 'bg-blue-500/20 text-blue-500' :
                                        'bg-neutral-500/20 text-neutral-400'
                                    }`}>
                                        {member.role}
                                    </span>
                                    
                                    <div className="flex items-center gap-2">
                                        <button className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors">
                                            <Mail size={16} />
                                        </button>
                                        <button className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Role Permissions */}
                <section className="mt-16">
                    <h2 className="font-headline text-2xl font-bold text-white uppercase mb-8">Role Permissions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ROLES.map((role) => (
                            <div key={role.id} className="p-6 rounded-2xl bg-surface-container-low border border-white/5">
                                <div className="flex items-center gap-3 mb-6">
                                    <Shield size={20} className={
                                        role.id === 'admin' ? 'text-yellow-500' :
                                        role.id === 'manager' ? 'text-blue-500' : 'text-neutral-500'
                                    } />
                                    <h3 className="font-headline text-lg font-bold text-white uppercase">{role.label}</h3>
                                </div>
                                <div className="space-y-2">
                                    {role.permissions.map((perm, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                            <span className="font-headline text-sm text-neutral-400">{perm}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                    <div className="w-full max-w-md p-8 rounded-2xl bg-surface-container-low border border-white/10">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-headline text-xl font-bold text-white uppercase">Invite Member</h3>
                            <button 
                                onClick={() => setShowInviteModal(false)}
                                className="text-neutral-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Email Address</label>
                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    placeholder="architect@nebula.void"
                                    className="w-full px-4 py-3 bg-surface-container border border-white/10 rounded-lg text-white font-headline focus:border-white/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Role</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {ROLES.map((role) => (
                                        <button
                                            key={role.id}
                                            onClick={() => setInviteRole(role.id)}
                                            className={`p-3 rounded-lg border text-center transition-all ${
                                                inviteRole === role.id 
                                                    ? 'bg-white text-black border-white' 
                                                    : 'bg-transparent border-white/10 text-neutral-400 hover:border-white/20'
                                            }`}
                                        >
                                            <span className="font-headline text-xs uppercase">{role.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={handleInvite}
                                className="w-full py-4 bg-white text-black font-headline font-bold uppercase text-[10px] tracking-widest rounded-md hover:bg-neutral-200 transition-colors"
                            >
                                Send Invitation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
