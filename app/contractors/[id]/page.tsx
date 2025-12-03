import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function ContractorDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data: contractor, error } = await supabase
        .from('contractors')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !contractor) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Link href="/contractors" className="text-blue-600 hover:underline mb-6 inline-block">
                &larr; Back to Contractors
            </Link>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-blue-600 h-32"></div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-6 flex items-end justify-between">
                        <div className="flex items-end gap-6">
                            <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-6xl">
                                    {contractor.image}
                                </div>
                            </div>
                            <div className="mb-2">
                                <h1 className="text-3xl font-bold flex items-center gap-2">
                                    {contractor.name}
                                    {contractor.verified && (
                                        <span className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded-full flex items-center">
                                            <i className="fas fa-check-circle mr-1"></i>Verified
                                        </span>
                                    )}
                                </h1>
                                <p className="text-gray-600">{contractor.service} • {contractor.location}</p>
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${contractor.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {contractor.available ? 'Available Now' : 'Currently Busy'}
                            </span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-xl font-bold mb-4">About</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {contractor.description || `Experienced ${contractor.service} professional serving the ${contractor.location} area. Committed to high-quality work and customer satisfaction.`}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4">Stats & Reliability</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-blue-600">{contractor.completed_jobs}</div>
                                        <div className="text-sm text-gray-500">Jobs Done</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-yellow-500">{contractor.rating}</div>
                                        <div className="text-sm text-gray-500">Rating</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-green-600">100%</div>
                                        <div className="text-sm text-gray-500">Response Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="font-bold mb-4">Service Details</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Hourly Rate</span>
                                        <span className="font-semibold">{contractor.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Experience</span>
                                        <span className="font-semibold">5+ Years</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">License</span>
                                        <span className="font-semibold text-green-600">Verified</span>
                                    </div>
                                </div>
                                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                                    Contact Pro
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
