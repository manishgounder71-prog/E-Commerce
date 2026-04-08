'use client';

import React, { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/lib/store';

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const { setProducts, setIsLoading, setUser, updateUser } = useStore();

    useEffect(() => {
        // 1. Initial Data Fetch
        const initData = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase.from('products').select('*');
                if (!error && data && data.length > 0) {
                    setProducts(data);
                } else {
                    // Use mock data if no products in database
                    console.log('Using mock products - configure Supabase for live data');
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
            } finally {
                setIsLoading(false);
            }
        };

        initData();

        // 2. Auth Session Sync
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                // Fetch user profile from database
                const { data: profile } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (profile) {
                    setUser({
                        id: session.user.id,
                        name: profile.name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                        email: session.user.email || '',
                        phone: profile.phone || '',
                        profilePicture: profile.profile_picture || session.user.user_metadata?.avatar_url || '',
                        company: profile.company || '',
                    });
                } else {
                    // Fallback to auth metadata
                    setUser({
                        id: session.user.id,
                        name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                        email: session.user.email || '',
                        profilePicture: session.user.user_metadata?.avatar_url || '',
                    });
                }
            } else {
                setUser(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [setProducts, setIsLoading, setUser]);

    return <>{children}</>;
};
