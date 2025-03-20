'use client';

import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';
import { DataTableFacetedFilter } from '@/components/ui/data-table/data-table-faceted-filter';
import { HydrotestOutputDTO } from '@/models/HydrotestModel';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<HydrotestOutputDTO>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Date' />
    ),
    cell: ({ row }) => row.original.endDate?.toLocaleDateString('uk'),
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
    accessorKey: 'tankVerdict',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Verdict' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'description',
    header: () => 'Description',
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: 'executor',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Executor' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
];
