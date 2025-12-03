'use client';

import { Dispute } from '@/types';

export default function DisputeCard({ dispute }: { dispute: Dispute }) {
    return (
        <div className="border rounded-lg p-4 flex items-center justify-between bg-white">
            <div>
                <h4 className="font-semibold">{dispute.booking?.service || 'Service'} - {dispute.booking?.contractor?.name || 'Contractor'}</h4>
                <p className="text-sm text-gray-500">Submitted: {dispute.created_at ? new Date(dispute.created_at).toLocaleDateString() : 'Unknown Date'}</p>
                <p className="text-xs text-gray-400 mt-1">Type: {dispute.type}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-600">
                {dispute.status}
            </span>
        </div>
    );
}
