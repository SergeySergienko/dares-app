import { get } from '@/actions/inspection';
import { InspectionTable } from '@/components/InspectionTable';

export const dynamic = 'force-dynamic';

export default async function ViewInspectionPage() {
  const inspections = await get();
  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Inspection List</h1>
      <InspectionTable data={inspections} />
    </div>
  );
}
