import { fetchTanksByHydrotestDate } from '@/app/api/tank-api';
import { TankTable } from '@/components/TankTable';

export default async function HydrotestSection({ monthsAgo = 57 }) {
  const data = await fetchTanksByHydrotestDate(monthsAgo);

  return (
    <section>
      <TankTable
        data={data}
        title='List of tanks required for Hydro Testing'
        lastDateKey='lastHydrotestDate'
        deadlineYears={5}
        lastDateLabel='Last Hydro Test Date'
        deadlineLabel='Next Hydro Test Deadline'
      />
    </section>
  );
}
