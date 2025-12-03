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
            <Link href="/contractors" className="text-black font-bold hover:underline decoration-2 decoration-black underline-offset-2 mb-6 inline-block">
                &larr; Back to Contractors
            </Link>

            <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_#000] overflow-hidden">
                <div className="bg-blue-400 h-32 border-b-4 border-black"></div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-6 flex items-end justify-between">
                        <div className="flex items-end gap-6">
                            <div className="w-32 h-32 bg-white rounded-full p-2 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                                <div className="w-full h-full bg-gray-100 rounded-full border-2 border-black flex items-center justify-center text-6xl">
                                    {contractor.image}
                                </div>
                            </div>
                            <div className="mb-2">
                                <h1 className="text-4xl font-black flex items-center gap-2">
                                    {contractor.name}
                                    {contractor.verified && (
                                        <span className="bg-blue-200 text-black border-2 border-black text-sm px-2 py-1 rounded font-bold flex items-center shadow-[2px_2px_0px_0px_#000]">
                                            <i className="fas fa-check-circle mr-1"></i>Verified
                                        </span>
                                    )}
                                </h1>
                                <p className="text-black font-bold text-lg">{contractor.service} • {contractor.location}</p>
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className={`px-4 py-2 rounded font-black border-2 border-black shadow-[2px_2px_0px_0px_#000] text-sm ${contractor.available ? 'bg-green-200 text-black' : 'bg-gray-200 text-gray-600'}`}>
                                {contractor.available ? 'Available Now' : 'Currently Busy'}
                            </span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-black mb-4 uppercase tracking-wide">About</h2>
                                <p className="text-black font-medium leading-relaxed text-lg">
                                    {contractor.description || `Experienced ${contractor.service} professional serving the ${contractor.location} area. Committed to high-quality work and customer satisfaction.`}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-black mb-4 uppercase tracking-wide">Stats & Reliability</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-pink-100 border-3 border-black p-4 rounded-lg text-center shadow-[4px_4px_0px_0px_#000] transform -rotate-1 hover:rotate-0 transition-transform">
                                        <div className="text-3xl font-black text-black">{contractor.completed_jobs}</div>
                                        <div className="text-sm text-black font-bold uppercase">Jobs Done</div>
                                    </div>
                                    <div className="bg-yellow-100 border-3 border-black p-4 rounded-lg text-center shadow-[4px_4px_0px_0px_#000] transform rotate-1 hover:rotate-0 transition-transform">
                                        <div className="text-3xl font-black text-black">{contractor.rating}</div>
                                        <div className="text-sm text-black font-bold uppercase">Rating</div>
                                    </div>
                                    <div className="bg-green-100 border-3 border-black p-4 rounded-lg text-center shadow-[4px_4px_0px_0px_#000] transform -rotate-1 hover:rotate-0 transition-transform">
                                        <div className="text-3xl font-black text-black">100%</div>
                                        <div className="text-sm text-black font-bold uppercase">Response Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 border-3 border-black p-6 rounded-xl shadow-[6px_6px_0px_0px_#000]">
                                <h3 className="font-black text-xl mb-4 uppercase">Service Details</h3>
                                <div className="space-y-3 text-base font-medium">
                                    <div className="flex justify-between border-b-2 border-dashed border-gray-300 pb-2">
                                        <span className="text-gray-600">Hourly Rate</span>
                                        <span className="font-black">{contractor.price}</span>
                                    </div>
                                    <div className="flex justify-between border-b-2 border-dashed border-gray-300 pb-2">
                                        <span className="text-gray-600">Experience</span>
                                        <span className="font-black">5+ Years</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">License</span>
                                        <span className="font-black text-green-600">Verified</span>
                                    </div>
                                </div>
                                <button className="w-full mt-6 bg-blue-400 text-black border-2 border-black py-3 rounded-lg font-black shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] hover:bg-blue-500 transition-all text-lg uppercase">
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
