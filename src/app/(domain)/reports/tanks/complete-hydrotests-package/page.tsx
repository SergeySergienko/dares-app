import { CompleteHydrotestsPackageForm } from '@/components/features/CompleteHydrotestsPackageForm';

export default async function CompleteHydrotestsPage({
  searchParams,
}: {
  searchParams: Promise<{ tanks: string }>;
}) {
  const tanksString = (await searchParams).tanks;

  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Hydrotests Package Complete Form</h1>
      <CompleteHydrotestsPackageForm tanksString={tanksString} />
    </div>
  );
}
