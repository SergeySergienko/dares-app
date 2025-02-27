import { CreateTankForm } from '@/components/features/CreateTankForm';

export default async function CreateTankPage() {
  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Create a new Tank</h1>
      <CreateTankForm />
    </div>
  );
}
