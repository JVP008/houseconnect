import Link from 'next/link';
import { Contractor } from '@/types';

interface ContractorCardProps {
    contractor: Contractor;
    onBook: (contractor: Contractor) => void;
}

export default function ContractorCard({ contractor, onBook }: ContractorCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 card-hover transition">
            <div className="flex items-start gap-4">
                <div className="text-5xl">{contractor.image}</div>
                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <Link href={`/contractors/${contractor.id}`} className="hover:text-blue-600 transition">
                                    {contractor.name}
                                </Link>
                                {contractor.verified && (
                                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center">
                                        <i className="fas fa-check-circle mr-1"></i>Verified
                                    </span>
                                )}
                            </h3>
                            <p className="text-gray-500 text-sm">{contractor.service} • {contractor.location}</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center text-yellow-500 justify-end">
                                <i className="fas fa-star mr-1"></i>
                                <span className="font-bold text-gray-800">{contractor.rating}</span>
                                <span className="text-gray-400 text-sm ml-1">({contractor.reviews})</span>
                            </div>
                            <p className="text-sm text-gray-500">{contractor.completed_jobs} jobs</p>
                        </div>
                    </div>
                    <p className="text-gray-600 mt-2">{contractor.description}</p>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                            <span className="text-blue-600 font-semibold">{contractor.price}</span>
                            <span className={`flex items-center ${contractor.available ? 'text-green-600' : 'text-gray-400'}`}>
                                <span className={`w-2 h-2 rounded-full ${contractor.available ? 'bg-green-500 pulse-dot' : 'bg-gray-400'} mr-2`}></span>
                                {contractor.available ? 'Available' : 'Busy'}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/contractors/${contractor.id}`} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition inline-block">
                                View Profile
                            </Link>
                            <button
                                onClick={() => onBook(contractor)}
                                disabled={!contractor.available}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${!contractor.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
