'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Contractor } from '@/types';

interface ContractorCardProps {
    contractor: Contractor;
    onBook: (contractor: Contractor) => void;
}

const ContractorCard = memo(({ contractor, onBook }: ContractorCardProps) => {
    return (
        <div className="bg-white border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_#000] p-6 hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] transition-all">
            <div className="flex items-start gap-4">
                <div className="text-5xl filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">{contractor.image}</div>
                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-black text-xl flex items-center gap-2">
                                <Link href={`/contractors/${contractor.id}`} className="hover:text-blue-600 transition underline decoration-2 decoration-black underline-offset-2">
                                    {contractor.name}
                                </Link>
                                {contractor.verified && (
                                    <span className="bg-blue-200 text-black border-2 border-black text-xs px-2 py-1 rounded font-bold flex items-center shadow-[2px_2px_0px_0px_#000]">
                                        <i className="fas fa-check-circle mr-1"></i>Verified
                                    </span>
                                )}
                            </h3>
                            <p className="text-black font-medium text-sm mt-1">{contractor.service} • {contractor.location}</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center text-yellow-400 justify-end drop-shadow-[1px_1px_0px_#000]">
                                <i className="fas fa-star mr-1 text-lg"></i>
                                <span className="font-black text-black text-lg">{contractor.rating}</span>
                                <span className="text-gray-600 text-sm ml-1 font-bold">({contractor.reviews})</span>
                            </div>
                            <p className="text-sm text-black font-bold">{contractor.completed_jobs} jobs</p>
                        </div>
                    </div>
                    <p className="text-gray-800 mt-3 font-medium leading-relaxed">{contractor.description}</p>
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-4">
                            <span className="text-black font-black text-lg bg-yellow-200 px-2 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">{contractor.price}</span>
                            <span className={`flex items-center font-bold border-2 border-black px-2 py-1 rounded shadow-[2px_2px_0px_0px_#000] ${contractor.available ? 'bg-green-200 text-black' : 'bg-gray-200 text-gray-600'}`}>
                                <span className={`w-3 h-3 rounded-full border-2 border-black ${contractor.available ? 'bg-green-500' : 'bg-gray-400'} mr-2`}></span>
                                {contractor.available ? 'Available' : 'Busy'}
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <Link href={`/contractors/${contractor.id}`} className="px-4 py-2 bg-white border-2 border-black text-black font-bold rounded-lg shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] hover:bg-gray-50 transition-all inline-block">
                                View Profile
                            </Link>
                            <button
                                onClick={() => onBook(contractor)}
                                disabled={!contractor.available}
                                className={`px-4 py-2 bg-blue-400 border-2 border-black text-black font-bold rounded-lg shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] hover:bg-blue-500 transition-all ${!contractor.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

ContractorCard.displayName = 'ContractorCard';

export default ContractorCard;
