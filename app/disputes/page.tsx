'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/Toast';
import DisputeCard from '@/components/disputes/DisputeCard';
import { Dispute, Booking } from '@/types';

export default function DisputesPage() {
    const [disputes, setDisputes] = useState<Dispute[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [disputeType, setDisputeType] = useState('');
    const [formData, setFormData] = useState({
        bookingId: '',
        description: '',
        resolution: 'refund'
    });
    const { showToast } = useToast();

    const fetchData = useCallback(async () => {
        const { data: disputesData } = await supabase
            .from('disputes')
            .select('*, booking:bookings(service, contractor:contractors(name))');
        setDisputes(disputesData || []);

        const { data: bookingsData } = await supabase
            .from('bookings')
            .select('*, contractor:contractors(name)')
            .in('status', ['completed']); // Only completed bookings can be disputed
        setBookings(bookingsData || []);
    }, []);

    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            fetchData();
        };
        checkAuth();
    }, [fetchData]);

    const handleShowForm = (type: string) => {
        setDisputeType(type);
        setShowForm(true);
    };

    const handleSubmit = async () => {
        if (!formData.bookingId || !formData.description) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        const { error } = await supabase
            .from('disputes')
            .insert([{
                booking_id: formData.bookingId,
                type: disputeType,
                description: formData.description,
                status: 'In Review',
                user_id: (await supabase.auth.getUser()).data.user?.id
            }]);

        if (error) console.warn('Dispute failed', error);

        setShowForm(false);
        setFormData({ bookingId: '', description: '', resolution: 'refund' });
        showToast('Dispute submitted successfully.');
        fetchData();
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Link href="/" className="text-black font-bold hover:underline decoration-2 decoration-black underline-offset-2 mb-4 inline-block">&larr; Back to Home</Link>
            <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_#000] p-8">
                <h2 className="text-3xl font-black mb-2 uppercase tracking-wide">Support & Dispute Resolution</h2>
                <p className="text-black font-medium mb-8 text-lg">We&apos;re here to help resolve any issues with your bookings</p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-100 border-3 border-black p-6 rounded-xl text-center cursor-pointer shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] transition-all" onClick={() => handleShowForm('refund')}>
                        <div className="w-16 h-16 bg-white border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_0px_#000]">
                            <i className="fas fa-money-bill-wave text-3xl text-black"></i>
                        </div>
                        <h3 className="font-black text-lg uppercase">Payment Issue</h3>
                        <p className="text-sm text-black font-bold mt-1">Refunds, billing questions</p>
                    </div>
                    <div className="bg-orange-100 border-3 border-black p-6 rounded-xl text-center cursor-pointer shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] transition-all" onClick={() => handleShowForm('quality')}>
                        <div className="w-16 h-16 bg-white border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_0px_#000]">
                            <i className="fas fa-tools text-3xl text-black"></i>
                        </div>
                        <h3 className="font-black text-lg uppercase">Service Quality</h3>
                        <p className="text-sm text-black font-bold mt-1">Work not as expected</p>
                    </div>
                    <div className="bg-red-100 border-3 border-black p-6 rounded-xl text-center cursor-pointer shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] transition-all" onClick={() => handleShowForm('noshow')}>
                        <div className="w-16 h-16 bg-white border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_0px_#000]">
                            <i className="fas fa-user-times text-3xl text-black"></i>
                        </div>
                        <h3 className="font-black text-lg uppercase">No Show</h3>
                        <p className="text-sm text-black font-bold mt-1">Contractor didn&apos;t arrive</p>
                    </div>
                </div>

                {showForm && (
                    <div className="border-t-4 border-black pt-8 animate-fade-in">
                        <h3 className="font-black text-2xl mb-6 uppercase">Report an Issue</h3>

                        <div className="mb-6">
                            <label className="block text-black font-black text-lg mb-2 uppercase">Select Booking</label>
                            <select
                                value={formData.bookingId}
                                onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
                                className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
                            >
                                <option value="">Choose a booking</option>
                                {bookings.map(b => (
                                    <option key={b.id} value={b.id}>
                                        {b.service || 'Service'} - {b.contractor?.name} ({b.date})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-black font-black text-lg mb-2 uppercase">Describe the Issue</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-medium"
                                placeholder="Please provide details..."
                            ></textarea>
                        </div>

                        <button onClick={handleSubmit} className="w-full bg-blue-400 text-black border-3 border-black py-4 rounded-lg font-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-blue-500 transition-all text-xl uppercase">
                            Submit Dispute
                        </button>
                    </div>
                )}

                {/* Active Disputes */}
                <div className="mt-12 border-t-4 border-black pt-8">
                    <h3 className="font-black text-2xl mb-6 uppercase">Your Active Cases</h3>
                    <div className="space-y-4">
                        {disputes.length > 0 ? disputes.map(d => (
                            <DisputeCard key={d.id} dispute={d} />
                        )) : (
                            <div className="bg-gray-50 border-3 border-black p-6 rounded-xl text-center shadow-[4px_4px_0px_0px_#000]">
                                <p className="text-black font-bold text-lg">No active disputes</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
