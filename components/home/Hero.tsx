'use client';

import Link from 'next/link';

export default function Hero() {
    return (
        <div className="gradient-bg text-white py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-6">Find Trusted Pros in Minutes</h1>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    AI-powered matching connects you with the best-rated local contractors based on your specific needs, location, and availability.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link href="/post-job" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition text-lg flex items-center justify-center">
                        <i className="fas fa-plus-circle mr-2"></i>Post a Job
                    </Link>
                    <Link href="/contractors" className="border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition text-lg flex items-center justify-center">
                        <i className="fas fa-search mr-2"></i>Browse Contractors
                    </Link>
                </div>
            </div>
        </div>
    );
}
