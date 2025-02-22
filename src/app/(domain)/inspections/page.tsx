import { getInspections } from '@/actions/inspection-actions';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

export default async function InspectionsPage() {
  const inspections = await getInspections();
  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={inspections}
        title='List of Inspections'
        initialSorting={{ id: 'date', desc: true }}
        searchBy='tankNumber'
      />
    </div>
  );
}
