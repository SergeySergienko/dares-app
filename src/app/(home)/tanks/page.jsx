import { getTankList } from '@/actions/tank';
import { TankListTable } from '@/components/TankListTable';
import { formatToHeader } from '@/lib/utils';

export default async function TankList() {
  const tanks = await getTankList();

  const {
    id,
    createdAt,
    updatedAt,
    valve,
    grade,
    firstHydrotestDate,
    lastHydrotestDate,
    lastInspectionDate,
    ...keysObject
  } = tanks[0];
  const headers = Object.keys(keysObject);
  headers.push(
    'valve',
    'grade',
    'firstHydrotestDate',
    'lastHydrotestDate',
    'lastInspectionDate'
  );
  headers.forEach((header, index) => {
    headers[index] = `${formatToHeader(header)}`;
  });

  const rows = tanks.map((tank) => {
    const {
      id,
      createdAt,
      updatedAt,
      valve,
      grade,
      firstHydrotestDate,
      lastHydrotestDate,
      lastInspectionDate,
      ...valuesObject
    } = tank;
    const values = Object.values(valuesObject);
    values.push(
      valve,
      grade,
      new Date(firstHydrotestDate).toLocaleDateString('uk'),
      new Date(lastHydrotestDate).toLocaleDateString('uk'),
      new Date(lastInspectionDate).toLocaleDateString('uk')
    );
    return values;
  });

  return (
    <div className='w-11/12'>
      <TankListTable headers={headers} rows={rows} title='List of tanks' />
    </div>
  );
}
