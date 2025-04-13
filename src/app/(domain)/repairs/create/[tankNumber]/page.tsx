import { getParts } from '@/actions/part-actions';
import { RepairForm } from '@/components/features/RepairForm';

export default async function CreateRepairPage({
  params,
}: {
  params: Promise<{ tankNumber: string }>;
}) {
  const { tankNumber } = await params;
  const parts = await getParts();

  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Create a new Repair</h1>
      <RepairForm tankNumber={Number(tankNumber)} parts={parts} />
    </div>
  );
}
