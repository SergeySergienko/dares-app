import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { getInventories } from '@/actions/inventory-actions';

export const dynamic = 'force-dynamic'; // TODO: implement revalidatePath('/tanks')

export default async function InventoriesPage() {
  const inventories = await getInventories();

  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={inventories}
        title='List of Inventories'
        initialSorting={{ id: 'date', desc: false }}
      />
    </div>
  );
}
