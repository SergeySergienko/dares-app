import { CreatePartForm } from '@/components/features/CreatePartForm';

export default async function CreatePartPage() {
  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Create a new Part</h1>
      <CreatePartForm />
    </div>
  );
}
