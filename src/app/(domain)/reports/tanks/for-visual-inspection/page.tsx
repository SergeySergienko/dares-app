import { getTanksByProcedureDate } from '@/actions/tank-actions';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

export const dynamic = 'force-dynamic';

export default async function TanksForInspectionPage() {
  const monthsAgo = 11;
  const tanks = await getTanksByProcedureDate('inspection', monthsAgo);

  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={tanks}
        title='Tanks for Visual Inspection'
        initialSorting={{ id: 'internalNumber', desc: false }}
      />
    </div>
  );
}
