import { CreateInventoriesPackageForm } from '@/components/features/CreateInventoriesPackageForm';

export default async function CreateInventoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ tanks: string }>;
}) {
  const tanksString = (await searchParams).tanks;

  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Inventories Package Creation Form</h1>
      <CreateInventoriesPackageForm tanksString={tanksString} />
    </div>
  );
}
