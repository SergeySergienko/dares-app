import { cn } from '@/lib/utils';
import { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
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
