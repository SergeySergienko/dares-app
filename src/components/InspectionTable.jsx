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
          <TableHead>Verdict</TableHead>
          <TableHead className='text-right'>Inspector</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ id, date, tankNumber, tankVerdict, inspector }) => (
          <TableRow key={id}>
            <TableCell>{new Date(date).toLocaleDateString('uk')}</TableCell>
            <TableCell>{tankNumber}</TableCell>
            <TableCell>{tankVerdict}</TableCell>
            <TableCell className='text-right'>{inspector.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className='text-right'>
          <TableCell colSpan={3}>Total:</TableCell>
          <TableCell>{data.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
