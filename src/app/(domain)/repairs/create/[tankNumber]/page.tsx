import { getParts } from '@/actions/part-actions';
import { CreateRepairForm } from '@/components/features/CreateRepairForm';

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
      <CreateRepairForm tankNumber={tankNumber} parts={parts} />
    </div>
  );
}
