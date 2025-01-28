import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const TankTable = ({
  data,
  title,
  lastDateKey,
  deadlineYears,
  lastDateLabel,
  deadlineLabel,
}) => {
  const tanksWithDeadlines = data.map((tank) => ({
    ...tank,
    deadline: new Date(tank[lastDateKey]).setFullYear(
      new Date(tank[lastDateKey]).getFullYear() + deadlineYears
    ),
  }));

  return (
    <>
      <h2 className='title'>{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Internal Number</TableHead>
            <TableHead className='hidden xs:table-cell'>
              Serial Number
            </TableHead>
            <TableHead className='hidden xs:table-cell'>
              {lastDateLabel}
            </TableHead>
            <TableHead>{deadlineLabel}</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Valve</TableHead>
            <TableHead>Filling Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tanksWithDeadlines.map(
            ({
              id,
              internalNumber,
              serialNumber,
              [lastDateKey]: lastDate,
              deadline,
              volume,
              valve,
              fillingType,
            }) => (
              <TableRow key={id} className='text-center'>
                <TableCell>{internalNumber}</TableCell>
                <TableCell className='hidden xs:table-cell'>
                  {serialNumber}
                </TableCell>
                <TableCell className='hidden xs:table-cell'>
                  {new Date(lastDate).toLocaleDateString('uk')}
                </TableCell>
                <TableCell
                  className={`${deadline < Date.now() ? 'text-red-500' : ''}`}
                >
                  {new Date(deadline).toLocaleDateString('uk')}
                </TableCell>
                <TableCell>{volume}</TableCell>
                <TableCell>{valve}</TableCell>
                <TableCell>{fillingType}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className='text-right' colSpan={6}>
              Total:
            </TableCell>
            <TableCell className='text-right'>{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};
