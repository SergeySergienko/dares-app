'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableFacetedFilter } from '@/components/ui/data-table/data-table-faceted-filter';
import { TankOutputDTO } from '@/models/TankModel';
import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';
import Link from 'next/link';

export const columns: ColumnDef<TankOutputDTO>[] = [
  {
    accessorKey: 'internalNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='I/N' />
    ),
    filterFn: (row, id, value) => +value === row.getValue(id),
    cell: ({ row }) => (
      <Link href={`/tanks/${row.original.internalNumber}`}>
        <span className='p-1 underline hover:no-underline hover:font-bold hover:bg-slate-300'>
          {row.original.internalNumber}
        </span>
      </Link>
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'serialNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='S/N' />
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
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Status' />
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
  {
    accessorKey: 'valve',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Valve' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'grade',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Grade' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'firstHydrotestDate',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='First Hydrotest Date' />
    ),
    cell: ({ row }) => row.original.firstHydrotestDate.toLocaleDateString('uk'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'lastHydrotestDate',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Last Hydrotest Date' />
    ),
    cell: ({ row }) => row.original.lastHydrotestDate.toLocaleDateString('uk'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'lastInspectionDate',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Last Inspection Date' />
    ),
    cell: ({ row }) =>
      row.original.lastInspectionDate?.toLocaleDateString('uk'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'lastInventoryDate',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Last Inventory Date' />
    ),
    cell: ({ row }) => row.original.lastInventoryDate?.toLocaleDateString('uk'),
    enableColumnFilter: false,
  },
];
