import InspectionSection from '@/components/InspectionSection';
import HydrotestSection from '@/components/HydrotestSection';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className='w-11/12 md:w-3/4'>
      <InspectionSection monthsAgo={11} />
      <div className='py-4' />
      <HydrotestSection monthsAgo={57} />
    </div>
  );
}
