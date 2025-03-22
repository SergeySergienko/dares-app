import { getScrappedTanks } from '@/actions/tank-actions';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

export default async function ScrappedTanksPage() {
  const tanks = await getScrappedTanks();

  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={tanks}
        title='Scrapped Tanks'
        initialSorting={{ id: 'serialNumber', desc: false }}
        searchBy='serialNumber'
      />
    </div>
  );
}
