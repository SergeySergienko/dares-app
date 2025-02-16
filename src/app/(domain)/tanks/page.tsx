import { getTanks } from '@/actions/tank-actions';
import { columns } from '@/components/features/data-table/columns';
import { DataTable } from '@/components/features/data-table/data-table';

export const dynamic = 'force-dynamic'; // TODO: implement revalidatePath('/tanks')

export default async function TanksPage() {
  const tanks = await getTanks();
  const transformedTanks = tanks.map((tank) => ({
    ...tank,
    firstHydrotestDate: tank.firstHydrotestDate.toISOString(),
    lastHydrotestDate: tank.lastHydrotestDate.toISOString(),
    lastInspectionDate: tank.lastInspectionDate.toISOString(),
    lastInventoryDate: tank.lastInventoryDate?.toISOString() || '',
  }));
  return (
    <div className='w-full px-4 pb-4'>
      <DataTable
        columns={columns}
        data={transformedTanks}
        title='List of tanks'
      />
    </div>
  );
}
