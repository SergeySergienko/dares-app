import { CreateInventoryForm } from '@/components/features/CreateInventoryForm';

export default async function CreateInventoryPage({
  params,
}: {
  params: Promise<{ tankNumber: string }>;
}) {
  const { tankNumber } = await params;

  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Create a new Inventory</h1>
      <CreateInventoryForm tankNumber={tankNumber} />
    </div>
  );
}
