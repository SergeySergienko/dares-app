import { CreateInspectionForm } from '@/components/CreateInspectionForm';

export default function CreateInspectionPage() {
  return (
    <div className='w-11/12 md:w-5/6 py-4'>
      <h1 className='title'>Create a new Inspection</h1>
      <CreateInspectionForm />
    </div>
  );
}
