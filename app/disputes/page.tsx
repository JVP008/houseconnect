'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-2">Support & Dispute Resolution</h2>
                <p className="text-gray-500 mb-8">We&apos;re here to help resolve any issues with your bookings</p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-xl text-center cursor-pointer hover:bg-blue-100 transition" onClick={() => handleShowForm('refund')}>
                        <i className="fas fa-money-bill-wave text-3xl text-blue-600 mb-3"></i>
                        <h3 className="font-semibold">Payment Issue</h3>
                        <p className="text-sm text-gray-600">Refunds, billing questions</p>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-xl text-center cursor-pointer hover:bg-orange-100 transition" onClick={() => handleShowForm('quality')}>
                        <i className="fas fa-tools text-3xl text-orange-600 mb-3"></i>
                        <h3 className="font-semibold">Service Quality</h3>
                        <p className="text-sm text-gray-600">Work not as expected</p>
                    </div>
                    <div className="bg-red-50 p-6 rounded-xl text-center cursor-pointer hover:bg-red-100 transition" onClick={() => handleShowForm('noshow')}>
                        <i className="fas fa-user-times text-3xl text-red-600 mb-3"></i>
                        <h3 className="font-semibold">No Show</h3>
                        <p className="text-sm text-gray-600">Contractor didn&apos;t arrive</p>
                    </div>
                </div>

                {showForm && (
                    <div className="border-t pt-6 animate-fade-in">
                        <h3 className="font-semibold text-lg mb-4">Report an Issue</h3>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Select Booking</label>
                            <select
                                value={formData.bookingId}
                                onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="">Choose a booking</option>
                                {bookings.map(b => (
                                    <option key={b.id} value={b.id}>
                                        {b.service || 'Service'} - {b.contractor?.name} ({b.date})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Describe the Issue</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="Please provide details..."
                            ></textarea>
                        </div>

                        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition">
                            Submit Dispute
                        </button>
                    </div>
                )}

                {/* Active Disputes */}
                <div className="mt-8 border-t pt-6">
                    <h3 className="font-semibold text-lg mb-4">Your Active Cases</h3>
                    <div className="space-y-4">
                        {disputes.length > 0 ? disputes.map(d => (
                            <DisputeCard key={d.id} dispute={d} />
                        )) : (
                            <p className="text-gray-500">No active disputes</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
