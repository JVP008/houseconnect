import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('jobs')
            .insert([body])
            .select();

        if (error) throw error;

        return NextResponse.json({ data });
    } catch (_error) {
        return NextResponse.json({ error: 'Error creating job' }, { status: 500 });
    }
}
