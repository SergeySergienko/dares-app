'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableFacetedFilter } from '@/components/ui/data-table/data-table-faceted-filter';
import { BackupOutputDTO } from '@/models/TankModel';
import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';
import Link from 'next/link';

export const columns: ColumnDef<BackupOutputDTO>[] = [
  {
    accessorKey: 'serialNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='S/N' />
    ),
    cell: ({ row }) => (
      <Link href={`/tanks/scrapped/${row.original.serialNumber}`}>
        <span className='p-1 underline hover:no-underline hover:font-bold hover:bg-slate-300 print:no-underline'>
          {row.original.serialNumber}
        </span>
      </Link>
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'manufacturer',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Manufacturer' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'workPressure',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Work Pressure' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'volume',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Volume' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'material',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Material' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'color',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Color' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'fillingType',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Filling Type' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
];
