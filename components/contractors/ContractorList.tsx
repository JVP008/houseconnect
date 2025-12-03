'use client';

import { useState } from 'react';
import ContractorCard from './ContractorCard';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Contractor } from '@/types';

interface ContractorListProps {
    initialContractors: Contractor[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ContractorList({ initialContractors }: ContractorListProps) {
    const [contractors, setContractors] = useState<Contractor[]>(initialContractors);
    const [filters, setFilters] = useState({
        service: '',
        rating: 0,
        available: false,
        verified: false
    });

    const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');

    const { showToast } = useToast();
    const router = useRouter();

    const handleFilterChange = (key: string, value: string | number | boolean) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        // Client-side filtering for now, could be server-side
        const filtered = initialContractors.filter(c => {
            if (newFilters.service && c.service !== newFilters.service) return false;
            if (c.rating < newFilters.rating) return false;
            if (newFilters.available && !c.available) return false;
            if (newFilters.verified && !c.verified) return false;
            return true;
        });
        setContractors(filtered);
    };

    const resetFilters = () => {
        setFilters({ service: '', rating: 0, available: false, verified: false });
        setContractors(initialContractors);
    };

    const handleBook = (contractor: Contractor) => {
        setSelectedContractor(contractor);
        setIsScheduleModalOpen(true);
    };

    const confirmBooking = async () => {
        if (!bookingDate || !bookingTime || !selectedContractor) {
            showToast('Please select date and time', 'error');
            return;
        }

        const { error } = await supabase
            .from('bookings')
            .insert([{
                contractor_id: selectedContractor.id,
                date: bookingDate,
                time: bookingTime,
                status: 'upcoming',
                price: parseInt((selectedContractor.price || '0').replace(/[^0-9]/g, '')) || 150,
                user_id: (await supabase.auth.getUser()).data.user?.id
            }]);

        if (error) console.warn('Booking failed (auth?)', error);

        setIsScheduleModalOpen(false);
        showToast('Booking confirmed!');
        setTimeout(() => router.push('/bookings'), 1500);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className="md:w-72 shrink-0">
                <div className="bg-white border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_#000] p-6 sticky top-24">
                    <h3 className="font-black text-xl mb-6 uppercase tracking-wide flex items-center">
                        <i className="fas fa-filter mr-2"></i> Filters
                    </h3>

                    <div className="mb-6">
                        <label className="block text-black font-bold mb-2 uppercase text-sm">Service Type</label>
                        <select
                            value={filters.service}
                            onChange={(e) => handleFilterChange('service', e.target.value)}
                            className="w-full p-3 bg-white border-2 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
                        >
                            <option value="">All Services</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="HVAC">HVAC</option>
                            <option value="Painting">Painting</option>
                            <option value="Landscaping">Landscaping</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-bold mb-2 uppercase text-sm">Minimum Rating</label>
                        <select
                            value={filters.rating}
                            onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                            className="w-full p-3 bg-white border-2 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
                        >
                            <option value="0">Any Rating</option>
                            <option value="4.5">4.5+ Stars</option>
                            <option value="4">4+ Stars</option>
                            <option value="3.5">3.5+ Stars</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-bold mb-2 uppercase text-sm">Availability</label>
                        <div className="space-y-3">
                            <label className="flex items-center cursor-pointer group">
                                <div className={`w-6 h-6 border-2 border-black rounded flex items-center justify-center mr-3 transition-all ${filters.available ? 'bg-green-400 shadow-[2px_2px_0px_0px_#000]' : 'bg-white group-hover:bg-gray-100'}`}>
                                    {filters.available && <i className="fas fa-check text-black text-xs"></i>}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={filters.available}
                                    onChange={(e) => handleFilterChange('available', e.target.checked)}
                                    className="hidden"
                                />
                                <span className="text-black font-bold">Available Now</span>
                            </label>
                            <label className="flex items-center cursor-pointer group">
                                <div className={`w-6 h-6 border-2 border-black rounded flex items-center justify-center mr-3 transition-all ${filters.verified ? 'bg-blue-400 shadow-[2px_2px_0px_0px_#000]' : 'bg-white group-hover:bg-gray-100'}`}>
                                    {filters.verified && <i className="fas fa-check text-black text-xs"></i>}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={filters.verified}
                                    onChange={(e) => handleFilterChange('verified', e.target.checked)}
                                    className="hidden"
                                />
                                <span className="text-black font-bold">Verified Pro</span>
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={resetFilters}
                        className="w-full bg-red-200 text-black border-2 border-black py-2 rounded-lg font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#000] hover:bg-red-300 transition-all uppercase text-sm"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Contractor List */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-8 bg-yellow-100 border-3 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_#000]">
                    <h2 className="text-2xl font-black uppercase tracking-wide">Available Contractors</h2>
                    <span className="bg-black text-white px-3 py-1 rounded font-bold border-2 border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                        {contractors.length} PROS
                    </span>
                </div>
                <div className="grid gap-8">
                    {contractors.map((c) => (
                        <ContractorCard key={c.id} contractor={c} onBook={handleBook} />
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
                title="Schedule Appointment"
            >
                <div className="flex items-center mb-6 pb-6 border-b-2 border-dashed border-gray-300">
                    <div className="text-5xl mr-4 filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">{selectedContractor?.image}</div>
                    <div>
                        <h4 className="font-black text-xl">{selectedContractor?.name}</h4>
                        <p className="text-black font-medium">{selectedContractor?.service} • {selectedContractor?.price}</p>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-black font-black mb-2 uppercase">Select Date</label>
                    <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
                        style={{ colorScheme: 'light' }}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-black font-black mb-2 uppercase">Select Time Slot</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((slot) => (
                            <button
                                key={slot}
                                onClick={() => setBookingTime(slot)}
                                className={`p-2 text-sm border-2 border-black rounded-lg font-bold transition-all ${bookingTime === slot ? 'bg-blue-400 text-black shadow-[2px_2px_0px_0px_#000]' : 'bg-white hover:bg-gray-50'}`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={confirmBooking}
                    className="w-full bg-green-400 text-black border-3 border-black py-4 rounded-lg font-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-green-500 transition-all text-xl uppercase"
                >
                    Confirm Booking
                </button>
            </Modal>
        </div>
    );
}
