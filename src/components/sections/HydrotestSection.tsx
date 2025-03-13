import { getTanksByProcedureDate } from '@/actions/tank-actions';
import { ScheduledTanksTable } from '@/components/features/ScheduledTanksTable';

export const dynamic = 'force-dynamic';

export default async function HydrotestSection({ monthsAgo = 57 }) {
  const data = await getTanksByProcedureDate('hydrotest', monthsAgo);

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
