'use client';

import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';
import { PartOutputDTO } from '@/models/PartModel';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<PartOutputDTO>[] = [
  {
    accessorKey: 'itemNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='I/N' />
    ),
    cell: ({ row }) => (
      <Link href={`/parts/${row.original.itemNumber}`}>
        <span className='p-1 underline hover:no-underline hover:font-bold hover:bg-slate-300 print:no-underline'>
          {row.original.itemNumber}
        </span>
      </Link>
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Title' />
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'alias',
    header: () => 'Alias',
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'catalogNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Catalog Number' />
    ),
    enableColumnFilter: false,
  },
];
