'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookingCard from '@/components/bookings/BookingCard';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import { Booking } from '@/types';

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const { showToast } = useToast();

    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const fetchBookings = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('bookings')
            .select('*, contractor:contractors(name, image)')
            .order('date', { ascending: false });

        setBookings(data || []);
        setLoading(false);
    };

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUser(user);
            fetchBookings();
        };
        checkAuth();
    }, []);

    const handlePay = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsPaymentModalOpen(true);
    };

    const processPayment = async () => {

        // Update booking status
        if (!selectedBooking) return;

        await supabase
            .from('bookings')
            .update({ status: 'upcoming' }) // Paid -> Upcoming
            .eq('id', selectedBooking.id);

        setIsPaymentModalOpen(false);
        showToast('Payment processed successfully!');
        fetchBookings();
    };

    const filteredBookings = filter === 'all'
        ? bookings
        : bookings.filter(b => b.status === filter);

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-8">My Bookings</h2>

            <div className="flex gap-4 mb-6">
                {['all', 'upcoming', 'completed', 'pending'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg capitalize ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {f === 'pending' ? 'Pending Payment' : f}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {loading ? (
                    <p>Loading bookings...</p>
                ) : filteredBookings.length > 0 ? (
                    filteredBookings.map((b) => (
                        <BookingCard
                            key={b.id}
                            booking={{ ...b, service: 'Service Request' } as Booking} // Service name missing in DB schema, defaulting
                            onPay={handlePay}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-8">No bookings found</p>
                )}
            </div>

            <Modal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                title="Secure Payment"
            >
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Service Fee</span>
                        <span>${(selectedBooking?.price || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Platform Fee</span>
                        <span>${((selectedBooking?.price || 0) * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                        <span>Total</span>
                        <span>${((selectedBooking?.price || 0) * 1.1).toFixed(2)}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Card Number</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Expiry</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="MM/YY" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">CVV</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="123" />
                    </div>
                </div>

                <button onClick={processPayment} className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition">
                    <i className="fas fa-lock mr-2"></i>Pay Securely
                </button>
            </Modal>
        </div>
    );
}
