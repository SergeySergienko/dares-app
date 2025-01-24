import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const RequiredHydrotestTanks = ({ data }) => {
  const tanksWithNextDeadline = data.map((tank) => ({
    ...tank,
    nextHydrotestDeadline: new Date(tank.lastHydrotestDate).setFullYear(
      new Date(tank.lastHydrotestDate).getFullYear() + 5
    ),
  }));

  return (
    <>
      <h2 className='title'>List of tanks required for Hydro Testing</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Internal Number</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Last Hydro Test Date</TableHead>
            <TableHead>Next Hydro Test Deadline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tanksWithNextDeadline.map(
            ({
              id,
              internalNumber,
              serialNumber,
              lastHydrotestDate,
              nextHydrotestDeadline,
            }) => (
              <TableRow key={id} className='text-center'>
                <TableCell>{internalNumber}</TableCell>
                <TableCell>{serialNumber}</TableCell>
                <TableCell className='text-right'>
                  {new Date(lastHydrotestDate).toLocaleDateString('uk')}
                </TableCell>
                <TableCell
                  className={`${
                    nextHydrotestDeadline < Date.now() ? 'text-red-500' : ''
                  } text-right`}
                >
                  {new Date(nextHydrotestDeadline).toLocaleDateString('uk')}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className='text-right' colSpan={3}>
              Total:
            </TableCell>
            <TableCell className='text-right'>{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};
