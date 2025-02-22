import { getTanks } from '@/actions/tank-actions';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

export default async function TanksPage() {
  const tanks = await getTanks();

  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={tanks}
        title='List of tanks'
        initialSorting={{ id: 'internalNumber', desc: false }}
        searchBy='internalNumber'
      />
    </div>
  );
}
