import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const RequiredInspectionTanks = ({ data }) => {
  const tanksWithNextDeadline = data.map((tank) => ({
    ...tank,
    nextInspectionDeadline: new Date(tank.lastInspectionDate).setFullYear(
      new Date(tank.lastInspectionDate).getFullYear() + 1
    ),
  }));

  return (
    <>
      <h2 className='title'>List of tanks required for Visual Inspection</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Internal Number</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Last Inspection Date</TableHead>
            <TableHead>Next Inspection Deadline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tanksWithNextDeadline.map(
            ({
              id,
              internalNumber,
              serialNumber,
              lastInspectionDate,
              nextInspectionDeadline,
            }) => (
              <TableRow key={id} className='text-center'>
                <TableCell>{internalNumber}</TableCell>
                <TableCell>{serialNumber}</TableCell>
                <TableCell className='text-right'>
                  {new Date(lastInspectionDate).toLocaleDateString('uk')}
                </TableCell>
                <TableCell
                  className={`${
                    nextInspectionDeadline < Date.now() ? 'text-red-500' : ''
                  } text-right`}
                >
                  {new Date(nextInspectionDeadline).toLocaleDateString('uk')}
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
