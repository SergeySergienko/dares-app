import { CreateTerminationForm } from '@/components/features/CreateTerminationForm';

export default async function CreateTerminationPage({
  params,
}: {
  params: Promise<{ tankNumber: string }>;
}) {
  const { tankNumber } = await params;

  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Scrapping Form</h1>
      <CreateTerminationForm tankNumber={tankNumber} />
    </div>
  );
}
