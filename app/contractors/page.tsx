import { supabase } from '@/lib/supabaseClient';
import ContractorList from '@/components/contractors/ContractorList';

export const revalidate = 0; // Disable caching for demo

export default async function ContractorsPage() {
    const { data: contractors } = await supabase
        .from('contractors')
        .select('*');

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <ContractorList initialContractors={contractors || []} />
        </div>
    );
}
