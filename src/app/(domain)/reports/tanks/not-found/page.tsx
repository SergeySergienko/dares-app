import { getTanksByStatus } from '@/actions/tank-actions';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

export const dynamic = 'force-dynamic';

export default async function TanksNotFoundPage() {
  const tanks = await getTanksByStatus('Not found');

  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={tanks}
        title='Tanks - Not Found'
        initialSorting={{ id: 'internalNumber', desc: false }}
        searchBy='internalNumber'
      />
    </div>
  );
}
