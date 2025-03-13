import { getTanksByProcedureDate } from '@/actions/tank-actions';
import { ScheduledTanksTable } from '@/components/features/ScheduledTanksTable';

export const dynamic = 'force-dynamic';

export default async function InspectionSection({ monthsAgo = 11 }) {
  const data = await getTanksByProcedureDate('inspection', monthsAgo);

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
