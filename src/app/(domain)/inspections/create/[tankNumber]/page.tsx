import { getTankByInternalNumber } from '@/actions/tank-actions';
import { InspectionForm } from '@/components/features/InspectionForm';
import { notFound } from 'next/navigation';

export default async function CreateInspectionPage({
  params,
}: {
  params: Promise<{ tankNumber: string }>;
}) {
  const { tankNumber } = await params;
  const tank = await getTankByInternalNumber(+tankNumber);
  if (!tank) notFound();

  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Create a new Inspection</h1>
      <InspectionForm tank={tank} />
    </div>
  );
}
