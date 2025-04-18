import { getInspection } from '@/actions/inspection-actions';
import { getTankByInternalNumber } from '@/actions/tank-actions';
import { InspectionForm } from '@/components/features/InspectionForm';
import { notFound } from 'next/navigation';

export default async function UpdateInspectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inspection = await getInspection(id);
  if (!inspection) notFound();

  const tank = await getTankByInternalNumber(inspection.tankNumber);
  if (!tank) notFound();

  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Update Inspection</h1>
      <InspectionForm tank={tank} inspection={inspection} />
    </div>
  );
}
