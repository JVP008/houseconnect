'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="gradient-bg text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 cursor-pointer">
                        <i className="fas fa-home text-2xl"></i>
                        <span className="text-xl font-bold">HomeConnect Pro</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className={`hover:text-blue-200 transition ${isActive('/') ? 'text-blue-200 font-semibold' : ''}`}>Home</Link>
                        <Link href="/post-job" className={`hover:text-blue-200 transition ${isActive('/post-job') ? 'text-blue-200 font-semibold' : ''}`}>Post a Job</Link>
                        <Link href="/contractors" className={`hover:text-blue-200 transition ${isActive('/contractors') ? 'text-blue-200 font-semibold' : ''}`}>Find Pros</Link>
                        <Link href="/bookings" className={`hover:text-blue-200 transition ${isActive('/bookings') ? 'text-blue-200 font-semibold' : ''}`}>My Bookings</Link>
                        <Link href="/disputes" className={`hover:text-blue-200 transition ${isActive('/disputes') ? 'text-blue-200 font-semibold' : ''}`}>Support</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-sm">Welcome, {user.email?.split('@')[0]}</span>
                                <button onClick={handleLogout} className="text-sm hover:text-blue-200">Logout</button>
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <i className="fas fa-user"></i>
                                </div>
                            </>
                        ) : (
                            <Link href="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
