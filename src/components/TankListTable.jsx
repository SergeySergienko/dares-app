import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const TankListTable = ({ headers, rows, title }) => {
  return (
    <>
      <h2 className='title'>{title}</h2>
      <Table>
        <TableHeader>
          <TableRow className='text-center'>
            {headers.map((header, index) => (
              <TableHead key={index} className='text-center'>
                <div>- {index + 1} -</div>
                <div>{header}</div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((t, i) => (
            <TableRow key={i} className='text-center'>
              {t.map((value, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className='text-right' colSpan={13}>
              Total records:
            </TableCell>
            <TableCell className='text-right'>{rows.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};
