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
        <nav className="bg-white border-b-4 border-black sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 cursor-pointer group">
                        <div className="w-10 h-10 border-2 border-black bg-yellow-300 rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#000] group-hover:translate-y-[-2px] transition-transform">
                            <i className="fas fa-home text-xl text-black"></i>
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-black group-hover:underline decoration-2 decoration-wavy decoration-blue-400">HomeConnect Pro</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className={`text-lg font-bold hover:text-blue-600 transition border-b-2 ${isActive('/') ? 'border-black text-blue-600' : 'border-transparent'}`}>Home</Link>
                        <Link href="/post-job" className={`text-lg font-bold hover:text-blue-600 transition border-b-2 ${isActive('/post-job') ? 'border-black text-blue-600' : 'border-transparent'}`}>Post a Job</Link>
                        <Link href="/contractors" className={`text-lg font-bold hover:text-blue-600 transition border-b-2 ${isActive('/contractors') ? 'border-black text-blue-600' : 'border-transparent'}`}>Find Pros</Link>
                        <Link href="/bookings" className={`text-lg font-bold hover:text-blue-600 transition border-b-2 ${isActive('/bookings') ? 'border-black text-blue-600' : 'border-transparent'}`}>My Bookings</Link>
                        <Link href="/disputes" className={`text-lg font-bold hover:text-blue-600 transition border-b-2 ${isActive('/disputes') ? 'border-black text-blue-600' : 'border-transparent'}`}>Support</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-sm font-bold bg-gray-100 px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_#000]">
                                    {user.email?.split('@')[0]}
                                </span>
                                <button onClick={handleLogout} className="text-sm font-bold hover:underline decoration-2 decoration-red-400">Logout</button>
                                <div className="w-10 h-10 bg-blue-200 border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                                    <i className="fas fa-user text-black"></i>
                                </div>
                            </>
                        ) : (
                            <Link href="/login" className="bg-white text-black border-2 border-black px-4 py-2 rounded-lg font-bold shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-yellow-200 transition-all">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
