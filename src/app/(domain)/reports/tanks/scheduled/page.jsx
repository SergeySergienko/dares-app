import InspectionSection from '@/components/sections/InspectionSection';
import HydrotestSection from '@/components/sections/HydrotestSection';

export const dynamic = 'force-dynamic'; // TODO: implement revalidatePath('/tanks')

export default function ScheduledTanksPage() {
  return (
    <div className='w-11/12 md:w-3/4'>
      <InspectionSection monthsAgo={11} />
      <div className='py-4' />
      <HydrotestSection monthsAgo={57} />
    </div>
  );
}
