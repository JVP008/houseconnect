'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Stats() {
    const [stats, setStats] = useState({
        contractors: 0,
        jobs: 0,
        rating: 0,
        satisfaction: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const { count: contractorCount } = await supabase.from('contractors').select('*', { count: 'exact', head: true });
            const { count: jobCount } = await supabase.from('jobs').select('*', { count: 'exact', head: true });

            // For rating and satisfaction, we could calculate real averages if we had reviews table, 
            // but for now we'll use the contractors table average rating.
            const { data: contractors } = await supabase.from('contractors').select('rating');
            const avgRating = (contractors || []).reduce((acc, c) => acc + (c.rating || 0), 0) / ((contractors || []).length || 1);

            setStats({
                contractors: contractorCount || 0,
                jobs: jobCount || 0,
                rating: avgRating || 0,
                satisfaction: 98 // Hardcoded for demo vibe
            });
        };
        fetchStats();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 border-2 border-black bg-pink-100 rounded-lg shadow-[4px_4px_0px_0px_#000] transform -rotate-2 hover:rotate-0 transition-transform animate-float" style={{ animationDelay: '0s' }}>
                    <div className="text-4xl font-black text-black">{stats.contractors}+</div>
                    <div className="text-black font-bold uppercase">Verified Pros</div>
                </div>
                <div className="text-center p-4 border-2 border-black bg-green-100 rounded-lg shadow-[4px_4px_0px_0px_#000] transform rotate-1 hover:rotate-0 transition-transform animate-float" style={{ animationDelay: '1s' }}>
                    <div className="text-4xl font-black text-black">{stats.satisfaction}%</div>
                    <div className="text-black font-bold uppercase">Satisfaction</div>
                </div>
                <div className="text-center p-4 border-2 border-black bg-blue-100 rounded-lg shadow-[4px_4px_0px_0px_#000] transform -rotate-1 hover:rotate-0 transition-transform animate-float" style={{ animationDelay: '2s' }}>
                    <div className="text-4xl font-black text-black">{stats.jobs}+</div>
                    <div className="text-black font-bold uppercase">Jobs Posted</div>
                </div>
                <div className="text-center p-4 border-2 border-black bg-yellow-100 rounded-lg shadow-[4px_4px_0px_0px_#000] transform rotate-2 hover:rotate-0 transition-transform animate-float" style={{ animationDelay: '3s' }}>
                    <div className="text-4xl font-black text-black">{stats.rating.toFixed(1)}</div>
                    <div className="text-black font-bold uppercase">Avg Rating</div>
                </div>
            </div>
        </div>
    );
}
