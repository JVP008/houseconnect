import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request) {
    try {
        const { data, error } = await supabase
            .from('disputes')
            .select('*, booking:bookings(service, contractor:contractors(name))');

        if (error) throw error;

        return NextResponse.json({ data });
    } catch (_error) {
        return NextResponse.json({ error: 'Error fetching disputes' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('disputes')
            .insert([body])
            .select();

        if (error) throw error;

        return NextResponse.json({ data });
    } catch (_error) {
        return NextResponse.json({ error: 'Error creating dispute' }, { status: 500 });
    }
}
