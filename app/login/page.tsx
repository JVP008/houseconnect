'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const router = useRouter();
    const { showToast } = useToast();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isSignUp) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;

                // Create profile in public.users
                if (data.user) {
                    const { error: profileError } = await supabase
                        .from('users')
                        .insert([{ id: data.user.id, name: email.split('@')[0], email }]);

                    if (profileError) console.warn('Profile creation failed', profileError);
                }

                showToast('Signup successful! Check your email.');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                showToast('Login successful!');
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            showToast((error as Error).message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                <div>
                    <div className="w-20 h-20 bg-yellow-300 rounded-full border-3 border-black flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_#000]">
                        <i className="fas fa-user text-4xl text-black"></i>
                    </div>
                    <h2 className="mt-2 text-center text-3xl font-black text-black uppercase tracking-wide">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="mt-2 text-center text-gray-600 font-medium">
                        {isSignUp ? 'Join our community of homeowners' : 'Sign in to manage your bookings'}
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleAuth}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-black font-black mb-1 uppercase text-sm">Email Address</label>
                            <input
                                type="email"
                                required
                                className="appearance-none block w-full px-3 py-3 border-3 border-black placeholder-gray-400 text-black rounded-lg focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold sm:text-sm"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-black font-black mb-1 uppercase text-sm">Password</label>
                            <input
                                type="password"
                                required
                                className="appearance-none block w-full px-3 py-3 border-3 border-black placeholder-gray-400 text-black rounded-lg focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold sm:text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border-3 border-black text-lg font-black rounded-lg text-black bg-blue-400 hover:bg-blue-500 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] shadow-[4px_4px_0px_0px_#000] transition-all focus:outline-none disabled:opacity-70 uppercase tracking-wide"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
                                </span>
                            ) : (isSignUp ? 'Sign Up' : 'Sign In')}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <button
                        className="text-sm font-bold text-black hover:underline decoration-2 decoration-black underline-offset-2"
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                    </button>
                </div>
            </div>
        </div>
    );
}
