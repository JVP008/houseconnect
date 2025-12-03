'use client';

import { Booking } from '@/types';

interface BookingCardProps {
    booking: Booking;
    onPay?: (booking: Booking) => void;
    onReview?: (booking: Booking) => void;
    onDispute?: (booking: Booking) => void;
}

export default function BookingCard({ booking, onPay, onReview, onDispute }: BookingCardProps) {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'upcoming': return 'bg-blue-200 text-black border-2 border-black';
            case 'completed': return 'bg-green-200 text-black border-2 border-black';
            case 'pending': return 'bg-yellow-200 text-black border-2 border-black';
            default: return 'bg-gray-200 text-black border-2 border-black';
        }
    };

    return (
        <div className="bg-white border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_#000] p-6 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="text-4xl filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">{booking.contractor?.image || '👤'}</div>
                    <div>
                        <h3 className="font-black text-xl">{booking.service || 'Service Request'}</h3>
                        <p className="text-black font-bold">{booking.contractor?.name || 'Unknown Contractor'}</p>
                        <p className="text-sm text-gray-600 font-medium"><i className="far fa-calendar mr-1"></i>{booking.date} at {booking.time}</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded font-bold shadow-[2px_2px_0px_0px_#000] text-sm ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <p className="mt-2 font-black text-xl">${booking.price}</p>
                    <div className="mt-2 flex gap-2 justify-end">
                        {booking.status === 'upcoming' && (
                            <>
                                <button className="text-sm text-black font-bold hover:underline decoration-2 decoration-black underline-offset-2">Reschedule</button>
                                <button className="text-sm text-red-600 font-bold hover:underline decoration-2 decoration-red-600 underline-offset-2">Cancel</button>
                            </>
                        )}
                        {booking.status === 'pending' && onPay && (
                            <button onClick={() => onPay(booking)} className="text-sm bg-green-400 border-2 border-black text-black font-bold px-3 py-1 rounded shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#000] transition-all">Pay Now</button>
                        )}
                        {booking.status === 'completed' && (
                            <>
                                {onReview && <button onClick={() => onReview(booking)} className="text-sm text-blue-600 font-bold hover:underline decoration-2 decoration-blue-600 underline-offset-2">Leave Review</button>}
                                {onDispute && <button onClick={() => onDispute(booking)} className="text-sm text-gray-600 font-bold hover:underline decoration-2 decoration-gray-600 underline-offset-2">Report Issue</button>}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
