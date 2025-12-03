'use client';

import { Dispute } from '@/types';

export default function DisputeCard({ dispute }: { dispute: Dispute }) {
    return (
        <div className="bg-white border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_#000] p-4 flex items-center justify-between mb-4">
            <div>
                <h4 className="font-black text-lg">{dispute.booking?.service || 'Service'} - {dispute.booking?.contractor?.name || 'Contractor'}</h4>
                <p className="text-sm text-black font-medium">Submitted: {dispute.created_at ? new Date(dispute.created_at).toLocaleDateString() : 'Unknown Date'}</p>
                <p className="text-xs text-gray-600 mt-1 font-bold uppercase tracking-wide">Type: {dispute.type}</p>
            </div>
            <span className="px-3 py-1 rounded font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] text-sm bg-yellow-200 text-black">
                {dispute.status}
            </span>
        </div>
    );
}
