import { fetchTanksByInspectionDate } from '@/app/api/tank-api';
import { ScheduledTanksTable } from '@/components/features/ScheduledTanksTable';

export default async function InspectionSection({ monthsAgo = 11 }) {
  const data = await fetchTanksByInspectionDate(monthsAgo);

  return (
    <ScheduledTanksTable
      data={data}
      title='List of tanks scheduled for Visual Inspection'
      lastDateKey='lastInspectionDate'
      deadlineYears={1}
      lastDateLabel='Last Inspection Date'
      deadlineLabel='Next Inspection Deadline'
    />
  );
}
