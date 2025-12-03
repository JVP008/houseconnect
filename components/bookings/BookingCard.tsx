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
            case 'upcoming': return 'bg-blue-100 text-blue-600';
            case 'completed': return 'bg-green-100 text-green-600';
            case 'pending': return 'bg-yellow-100 text-yellow-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="text-4xl">{booking.contractor?.image || '👤'}</div>
                    <div>
                        <h3 className="font-bold text-lg">{booking.service || 'Service Request'}</h3>
                        <p className="text-gray-500">{booking.contractor?.name || 'Unknown Contractor'}</p>
                        <p className="text-sm text-gray-400"><i className="far fa-calendar mr-1"></i>{booking.date} at {booking.time}</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <p className="mt-2 font-bold text-lg">${booking.price}</p>
                    <div className="mt-2 flex gap-2 justify-end">
                        {booking.status === 'upcoming' && (
                            <>
                                <button className="text-sm text-gray-500 hover:text-gray-700">Reschedule</button>
                                <button className="text-sm text-red-500 hover:text-red-700">Cancel</button>
                            </>
                        )}
                        {booking.status === 'pending' && onPay && (
                            <button onClick={() => onPay(booking)} className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Pay Now</button>
                        )}
                        {booking.status === 'completed' && (
                            <>
                                {onReview && <button onClick={() => onReview(booking)} className="text-sm text-blue-600 hover:text-blue-800">Leave Review</button>}
                                {onDispute && <button onClick={() => onDispute(booking)} className="text-sm text-gray-500 hover:text-gray-700">Report Issue</button>}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
