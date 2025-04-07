import { ColumnDef } from '@tanstack/react-table';
import { TableCell, TableRow } from '../table';
import { Skeleton } from '../skeleton';

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTableLoader<TData, TValue>({
  columns,
}: Props<TData, TValue>) {
  return columns.map((_, index) => (
    <TableRow key={`row-${index}`}>
      {columns.map((_, index) => (
        <TableCell key={`cell-${index}`}>
          <div className='grid'>
            <Skeleton className='h-5' />
          </div>
        </TableCell>
      ))}
    </TableRow>
  ));
}
