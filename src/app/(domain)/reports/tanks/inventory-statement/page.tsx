import { getTanks } from '@/actions/tank-actions';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

export default async function InventoryStatementPage() {
  const tanks = await getTanks();

  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={tanks}
        title='Inventory Statement'
        initialSorting={{ id: 'internalNumber', desc: false }}
        searchBy='internalNumber'
      />
    </div>
  );
}
