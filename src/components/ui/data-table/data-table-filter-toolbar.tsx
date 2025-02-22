import { Badge } from '@/components/ui/badge';
import { Table } from '@tanstack/react-table';

export function DataTableFilterToolbar<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  const selectedValues = table
    .getAllColumns()
    .filter((column) => column.getCanFilter() && column.getFilterValue())
    .flatMap((column) => column.getFilterValue()) as string[];

  if (selectedValues.length === 0) return;

  return (
    <>
      <span className='font-semibold'>Filters: </span>
      <div className='hidden md:flex'>
        {selectedValues.length > 4 ? (
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
      </div>

      <div className='flex md:hidden'>
        <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
          {selectedValues.length} selected
        </Badge>
      </div>
    </>
  );
}
