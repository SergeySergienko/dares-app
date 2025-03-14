import { CreateHydrotestForm } from '@/components/features/CreateHydrotestForm';

export default async function CreateHydrotestPage({
  params,
}: {
  params: Promise<{ tankNumber: string }>;
}) {
  const { tankNumber } = await params;

  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Create a new Hydrotest</h1>
      <CreateHydrotestForm tankNumber={tankNumber} />
    </div>
  );
}
