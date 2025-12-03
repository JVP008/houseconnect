import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const service = searchParams.get('service');

        let query = supabase.from('contractors').select('*');

        if (service) {
            query = query.eq('service', service);
        }

        const { data, error } = await query;

        if (error) throw error;

        return NextResponse.json({ data });
    } catch (_error) {
        return NextResponse.json({ error: 'Error fetching contractors' }, { status: 500 });
    }
}
