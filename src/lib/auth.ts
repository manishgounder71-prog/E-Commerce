import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    company?: string;
    profile_picture?: string;
    role?: string;
    created_at?: string;
    email_confirmed_at?: string;
}

export interface AuthError {
    message: string;
    status?: number;
}

export interface AuthResponse {
    data: any;
    error: AuthError | null;
}

// Sign up with email and password
export async function signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
            },
        },
    });

    if (error) {
        return { data: null, error: { message: error.message } };
    }

    return { data, error: null };
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { data: null, error: { message: error.message } };
    }

    return { data, error: null };
}

// Sign out
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        return { error: { message: error.message } };
    }
    return { error: null };
}

// Get current user
export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
        return { user: null, error };
    }

    // Fetch additional user profile data
    const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    return { user: profile || user, error: profileError };
}

// Send password reset email
export async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
        return { error: { message: error.message } };
    }

    return { error: null };
}

// Update user password
export async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) {
        return { error: { message: error.message } };
    }

    return { error: null };
}

// Update user profile
export async function updateProfile(updates: Partial<User>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        return { error: { message: 'Not authenticated' } };
    }

    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

    if (error) {
        return { data: null, error: { message: error.message } };
    }

    return { data, error: null };
}

// Verify email with OTP
export async function verifyEmail(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
        type: 'email',
        email,
        token,
    });

    if (error) {
        return { data: null, error: { message: error.message } };
    }

    return { data, error: null };
}

// Resend verification email
export async function resendVerificationEmail(email: string) {
    const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
    });

    if (error) {
        return { error: { message: error.message } };
    }

    return { error: null };
}

// Sign in with Google
export async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/api/auth/callback`,
        },
    });

    if (error) {
        return { data: null, error: { message: error.message } };
    }

    return { data, error: null };
}

// Listen to auth state changes
export function onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
}

// Get session
export async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
        return { session: null, error };
    }

    return { session, error: null };
}
