import { getTanks } from '@/actions/tank-actions';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

export const dynamic = 'force-dynamic';

export default async function HydrotestStatementPage() {
  const tanks = await getTanks();

  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={tanks}
        title='Hydrotest Statement'
        initialSorting={{ id: 'internalNumber', desc: false }}
        searchBy='internalNumber'
        packageEntity='hydrotests'
      />
    </div>
  );
}
