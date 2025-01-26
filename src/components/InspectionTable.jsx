import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const InspectionTable = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Inspection Date</TableHead>
          <TableHead>Tank Number</TableHead>
          <TableHead className='text-right'>Verdict</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ id, date, tankNumber, tankVerdict }) => (
          <TableRow key={id}>
            <TableCell>{new Date(date).toLocaleDateString('uk')}</TableCell>
            <TableCell>{tankNumber}</TableCell>
            <TableCell className='text-right'>{tankVerdict}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className='text-right'>
          <TableCell colSpan={2}>Total:</TableCell>
          <TableCell>{data.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
