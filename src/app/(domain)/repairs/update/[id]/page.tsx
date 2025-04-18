import { getParts } from '@/actions/part-actions';
import { getRepair } from '@/actions/repair-actions';
import { RepairForm } from '@/components/features/RepairForm';
import { notFound } from 'next/navigation';

export default async function UpdateRepairPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const repair = await getRepair(id);
  if (!repair) notFound();
  const parts = await getParts();

  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Update Repair</h1>
      <RepairForm
        tankNumber={repair.tankNumber}
        parts={parts}
        repair={repair}
      />
    </div>
  );
}
