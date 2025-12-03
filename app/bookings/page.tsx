'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
            <Link href="/" className="text-black font-bold hover:underline decoration-2 decoration-black underline-offset-2 mb-4 inline-block">&larr; Back to Home</Link>
            <h2 className="text-4xl font-black mb-8 uppercase tracking-wide text-center">My Bookings</h2>

            <div className="flex flex-wrap gap-4 mb-8 justify-center">
                {['all', 'upcoming', 'completed', 'pending'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-2 rounded-lg font-black uppercase tracking-wide border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] ${filter === f ? 'bg-blue-400 text-black' : 'bg-white text-black hover:bg-gray-50'}`}
                    >
                        {f === 'pending' ? 'Pending Payment' : f}
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                {loading ? (
                    <div className="text-center py-12">
                        <i className="fas fa-spinner fa-spin text-4xl text-black mb-4"></i>
                        <p className="text-xl font-bold">Loading bookings...</p>
                    </div>
                ) : filteredBookings.length > 0 ? (
                    filteredBookings.map((b) => (
                        <BookingCard
                            key={b.id}
                            booking={{ ...b, service: 'Service Request' } as Booking} // Service name missing in DB schema, defaulting
                            onPay={handlePay}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-100 border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_#000]">
                        <div className="text-6xl mb-4">📅</div>
                        <p className="text-black font-black text-2xl uppercase">No bookings found</p>
                        <p className="text-gray-600 font-medium mt-2">Looks like you haven't booked any services yet.</p>
                        <Link href="/post-job" className="inline-block mt-6 bg-yellow-300 text-black border-2 border-black px-6 py-3 rounded-lg font-black shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] uppercase">
                            Book a Pro Now
                        </Link>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                title="Secure Payment"
            >
                <div className="bg-yellow-50 border-2 border-black rounded-lg p-4 mb-6 shadow-[3px_3px_0px_0px_#000]">
                    <div className="flex justify-between mb-2 font-medium">
                        <span className="text-black">Service Fee</span>
                        <span className="font-bold">${(selectedBooking?.price || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2 font-medium">
                        <span className="text-black">Platform Fee</span>
                        <span className="font-bold">${((selectedBooking?.price || 0) * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-black text-xl border-t-2 border-black pt-2 mt-2">
                        <span>Total</span>
                        <span>${((selectedBooking?.price || 0) * 1.1).toFixed(2)}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-black font-black mb-2 uppercase">Card Number</label>
                    <div className="relative">
                        <input type="text" className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold pl-12" placeholder="1234 5678 9012 3456" />
                        <i className="fas fa-credit-card absolute left-4 top-4 text-gray-400 text-lg"></i>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-black font-black mb-2 uppercase">Expiry</label>
                        <input type="text" className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold" placeholder="MM/YY" />
                    </div>
                    <div>
                        <label className="block text-black font-black mb-2 uppercase">CVV</label>
                        <input type="text" className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold" placeholder="123" />
                    </div>
                </div>

                <button onClick={processPayment} className="w-full bg-green-400 text-black border-3 border-black py-4 rounded-lg font-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-green-500 transition-all text-xl uppercase flex items-center justify-center">
                    <i className="fas fa-lock mr-2"></i>Pay Securely
                </button>
            </Modal>
        </div>
    );
}
