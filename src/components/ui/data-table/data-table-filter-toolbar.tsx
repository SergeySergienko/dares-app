import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Table } from '@tanstack/react-table';

export function DataTableFilterToolbar<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const selectedValues = table
    .getAllColumns()
    .filter((column) => column.getCanFilter() && column.getFilterValue())
    .flatMap((column) => column.getFilterValue()) as string[];

  return (
    <div>
      {selectedValues.length > 0 && (
        <>
          <span className='font-semibold'>Filters: </span>
          {selectedValues.length > 10 ? (
            <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
              {selectedValues.length} selected
            </Badge>
          ) : (
            selectedValues.map((option) => (
              <Badge
                variant='secondary'
                key={option}
                className='rounded-sm px-0.5 mx-0.5 font-normal'
              >
                {option}
              </Badge>
            ))
          )}
        </>
      )}
      {isFiltered && (
        <Button
          variant='ghost'
          onClick={() => table.resetColumnFilters()}
          className='h-8 px-3'
        >
          Reset
          <X />
        </Button>
      )}
    </div>
  );
}
