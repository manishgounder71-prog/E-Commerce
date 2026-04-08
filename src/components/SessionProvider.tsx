'use client';

import React, { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/lib/store';

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const { setProducts, setIsLoading, updateUser } = useStore();

    useEffect(() => {
        // 1. Initial Data Fetch
        const initData = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase.from('products').select('*');
                if (!error && data) {
                    setProducts(data);
                }
            } catch (err) {
                console.error('Failed to pre-fetch products:', err);
            } finally {
                setIsLoading(false);
            }
        };

        initData();

        // 2. Auth Session Sync
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                updateUser({
                    id: session.user.id,
                    email: session.user.email || '',
                    name: session.user.user_metadata?.full_name || 'Void Agent',
                    profilePicture: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1587&auto=format&fit=crop',
                });
            } else {
                updateUser(null as any);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [setProducts, setIsLoading, updateUser]);

    return <>{children}</>;
};
