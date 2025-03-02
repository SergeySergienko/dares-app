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
      <span>{title}</span>
      <ArrowUpDown
        id={title}
        className='h-5 min-w-4 hover:text-primary cursor-pointer print:hidden'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    </div>
  );
}
