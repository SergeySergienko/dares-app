import { getTanksList } from '@/actions/tank';
import { columns } from '@/components/features/data-table/columns';
import { DataTable } from '@/components/features/data-table/data-table';

export const dynamic = 'force-dynamic';

export default async function TanksPage() {
  const tanks = await getTanksList();

  return (
    <div className='w-full px-4 pb-4'>
      <DataTable columns={columns} data={tanks} title='List of tanks' />
    </div>
  );
}
