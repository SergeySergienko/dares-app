import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { getParts } from '@/actions/part-actions';

export default async function PartsPage() {
  const parts = await getParts();
  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={parts}
        title='List of Parts'
        initialSorting={{ id: 'itemNumber', desc: false }}
      />
    </div>
  );
}
