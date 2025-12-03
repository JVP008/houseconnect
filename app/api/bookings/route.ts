import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { data, error: fetchError } = await supabase
            .from('bookings')
            .select('*, contractor:contractors(name, image)')
            .order('date', { ascending: false });

        if (fetchError) throw fetchError;

        return NextResponse.json({ data });
    } catch (_error) {
        return NextResponse.json({ error: 'Error fetching bookings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { data, error: createError } = await supabase
            .from('bookings')
            .insert([body])
            .select();

        if (createError) throw createError;

        return NextResponse.json({ data });
    } catch (_error) {
        return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
    }
}
