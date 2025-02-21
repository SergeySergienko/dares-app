import { cn } from '@/lib/utils';
import { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

interface Props<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableSortingHeader<TData, TValue>({
  column,
  title,
  className,
}: Props<TData, TValue>) {
  return (
    <div className={cn('flex items-center justify-evenly', className)}>
      <span className='pl-1'>{title}</span>
      <ArrowUpDown
        className='h-5 min-w-4 hover:bg-gray-200 cursor-pointer'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    </div>
  );
}
