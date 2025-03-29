import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { getHydrotests } from '@/actions/hydrotest-actions';

export default async function HydrotestsPage() {
  const hydrotests = await getHydrotests();

  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={hydrotests}
        title='List of Hydrotests'
        initialSorting={{ id: 'startDate', desc: true }}
        searchBy='tankNumber'
      />
    </div>
  );
}
