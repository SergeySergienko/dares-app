import { getTanksList } from '@/actions/tank';
import { columns } from '@/components/features/data-table/columns';
import { DataTable } from '@/components/features/data-table/data-table';
import { formatToHeader } from '@/lib/utils';

export default async function TanksPage() {
  const tanks = await getTanksList();

  return (
    <div className='w-full px-4 pb-4'>
      <DataTable columns={columns} data={tanks} title='List of tanks' />
    </div>
  );
}
