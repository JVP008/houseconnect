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
                satisfaction: 0 // No metric yet
            });
        };
        fetchStats();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">{stats.contractors}+</div>
                    <div className="text-gray-500">Verified Pros</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">{stats.satisfaction}%</div>
                    <div className="text-gray-500">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600">{stats.jobs}+</div>
                    <div className="text-gray-500">Jobs Posted</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600">{stats.rating.toFixed(1)}</div>
                    <div className="text-gray-500">Average Rating</div>
                </div>
            </div>
        </div>
    );
}
