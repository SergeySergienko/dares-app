import { fetchTanksByInspectionDate } from '@/app/api/tank-api';
import { TankTable } from '@/components/TankTable';

export default async function InspectionSection({ monthsAgo = 11 }) {
  const data = await fetchTanksByInspectionDate(monthsAgo);

  return (
    <section>
      <TankTable
        data={data}
        title='List of tanks required for Visual Inspection'
        lastDateKey='lastInspectionDate'
        deadlineYears={1}
        lastDateLabel='Last Inspection Date'
        deadlineLabel='Next Inspection Deadline'
      />
    </section>
  );
}
