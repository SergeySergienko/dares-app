'use client';

import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';
import { RepairOutputDTO } from '@/models/RepairModel';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';

export const columns: ColumnDef<RepairOutputDTO>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Date' />
    ),
    cell: ({ row }) => row.original.date.toLocaleDateString('uk'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'tankNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Tank' />
    ),
    cell: ({ row }) => (
      <Link href={`/tanks/${row.original.tankNumber}`}>
        <span className='p-1 underline hover:no-underline hover:font-bold hover:bg-slate-300 print:no-underline'>
          {row.original.tankNumber}
        </span>
      </Link>
    ),
    filterFn: (row, id, value) => +value === row.getValue(id),
  },
  {
    accessorKey: 'executor',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Executor' />
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'parts',
    header: () => 'Parts',
    cell: ({ row }) => {
      return (
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Link
              href={`/repairs/${row.original.id}`}
              className='flex justify-center [&_svg]:stroke-[1] [&_svg]:hover:stroke-[3]'
            >
              <Ellipsis />
            </Link>
          </HoverCardTrigger>
          <HoverCardContent align='end' className='max-w-fit'>
            {Object.entries(row.original.parts).map(([alias, amount]) => (
              <div key={alias} className='flex justify-center gap-5'>
                <span className='w-5/6 text-end'>{alias}:</span>
                <span>{amount}</span>
              </div>
            ))}
          </HoverCardContent>
        </HoverCard>
      );
    },
    // filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
    enableColumnFilter: false,
  },
];
