import { getInspections } from '@/actions/inspection-actions';
import { InspectionsTable } from '@/components/features/InspectionsTable';

export const dynamic = 'force-dynamic'; // TODO: implement revalidatePath('/tanks')

export default async function InspectionsPage() {
  const inspections = await getInspections();
  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Inspection List</h1>
      <InspectionsTable data={inspections} />
    </div>
  );
}
