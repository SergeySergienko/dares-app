import { CreateHydrotestsPackageForm } from '@/components/features/CreateHydrotestsPackageForm';

export default async function CreateHydrotestsPage({
  searchParams,
}: {
  searchParams: Promise<{ tanks: string }>;
}) {
  const tanksString = (await searchParams).tanks;

  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Hydrotests Package Creation Form</h1>
      <CreateHydrotestsPackageForm tanksString={tanksString} />
    </div>
  );
}
