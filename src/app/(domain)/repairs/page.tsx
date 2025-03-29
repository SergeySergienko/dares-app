import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { getRepairs } from '@/actions/repair-actions';

export default async function RepairsPage() {
  const repairs = await getRepairs();
  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={repairs}
        title='List of Repairs'
        initialSorting={{ id: 'date', desc: true }}
        searchBy='tankNumber'
      />
    </div>
  );
}
