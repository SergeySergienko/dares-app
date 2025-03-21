import { getTanksByProcedureDate } from '@/actions/tank-actions';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

export const dynamic = 'force-dynamic';

export default async function TanksForHydrotestPage() {
  const monthsAgo = 57;
  const tanks = await getTanksByProcedureDate('hydrotest', monthsAgo);

  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={tanks}
        title='Tanks for Hydrotest'
        initialSorting={{ id: 'internalNumber', desc: false }}
      />
    </div>
  );
}
