import { Database } from './db';

export type Contractor = Database['public']['Tables']['contractors']['Row'];

export interface Booking extends Omit<Database['public']['Tables']['bookings']['Row'], 'status'> {
    status: 'upcoming' | 'completed' | 'cancelled' | 'pending';
    contractor?: {
        name: string;
        image: string | null;
    };
    service?: string;
}

export type Dispute = Database['public']['Tables']['disputes']['Row'] & {
    booking?: {
        service: string;
        contractor?: {
            name: string;
        };
    };
};

export type Job = Database['public']['Tables']['jobs']['Row'];
