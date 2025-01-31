import { fetchTanksByHydrotestDate } from '@/app/api/tank-api';
import { ScheduledTanksTable } from '@/components/features/ScheduledTanksTable';

export default async function HydrotestSection({ monthsAgo = 57 }) {
  const data = await fetchTanksByHydrotestDate(monthsAgo);

  return (
    <ScheduledTanksTable
      data={data}
      title='List of tanks scheduled for Hydro Testing'
      lastDateKey='lastHydrotestDate'
      deadlineYears={5}
      lastDateLabel='Last Hydro Test Date'
      deadlineLabel='Next Hydro Test Deadline'
    />
  );
}
