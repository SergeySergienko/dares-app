import { getTanksList } from '@/actions/tank';
import { TanksTable } from '@/components/features/TanksTable';
import { formatToHeader } from '@/lib/utils';

export default async function TanksPage() {
  const tanks = await getTanksList();

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
      <TanksTable headers={headers} rows={rows} title='List of tanks' />
    </div>
  );
}
