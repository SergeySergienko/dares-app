import { fetchTankByInternalNumber } from '@/actions/tank';
import { CreateInspectionForm } from '@/components/features/CreateInspectionForm';

export default async function CreateInspectionPage({ params }) {
  const { tankNumber } = await params;
  const tank = await fetchTankByInternalNumber(tankNumber);
  if (!tank) {
    throw new Error(`Tank with internal number ${tankNumber} not found`);
  }

  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Create a new Inspection</h1>
      <CreateInspectionForm tank={tank} />
    </div>
  );
}
