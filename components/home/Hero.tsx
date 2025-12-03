'use client';

import { memo } from 'react';
import Link from 'next/link';

const Hero = memo(() => {
    return (
        <div className="bg-blue-100 border-b-4 border-black py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-6xl font-black mb-6 tracking-tight text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">Find Trusted Pros in Minutes</h1>
                <p className="text-2xl text-black font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
                    AI-powered matching connects you with the best-rated local contractors based on your specific needs, location, and availability.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <Link href="/post-job" className="bg-yellow-300 text-black border-3 border-black px-8 py-4 rounded-lg font-bold shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-yellow-400 transition-all text-xl flex items-center justify-center animate-wiggle">
                        <i className="fas fa-plus-circle mr-3"></i>POST A JOB
                    </Link>
                    <Link href="/contractors" className="bg-white text-black border-3 border-black px-8 py-4 rounded-lg font-bold shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-gray-50 transition-all text-xl flex items-center justify-center animate-wiggle">
                        <i className="fas fa-search mr-3"></i>BROWSE PROS
                    </Link>
                </div>
            </div>
        </div>
    );
});

Hero.displayName = 'Hero';

export default Hero;
