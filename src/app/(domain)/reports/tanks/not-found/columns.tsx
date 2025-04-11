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
    cell: ({ row }) => (
      <Link href={`/tanks/${row.original.internalNumber}`}>
        <span className='p-1 underline hover:no-underline hover:font-bold hover:bg-slate-300 print:no-underline'>
          {row.original.internalNumber}
        </span>
      </Link>
    ),
    filterFn: (row, id, value) => +value === row.getValue(id),
  },
  {
    accessorKey: 'serialNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='S/N' />
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'status',
    header: () => 'Status',
    cell: ({ row }) => {
      if (!row.original.lastInventoryDate) return;
      const lastInventoryDate = new Date(
        row.original.lastInventoryDate.getTime()
      );

      const deadLine = new Date(lastInventoryDate);
      deadLine.setFullYear(deadLine.getFullYear() + 1);

      const now = Date.now();
      const isPastDeadline = deadLine.getTime() < now;

      return (
        <span
          className={`px-2 py-1 ${
            isPastDeadline ? 'bg-primary text-muted' : ''
          }`}
        >
          {row.original.status}
        </span>
      );
    },
  },
  {
    accessorKey: 'lastInventoryDate',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Last Inventory Date' />
    ),
    cell: ({ row }) => row.original.lastInventoryDate?.toLocaleDateString('uk'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'lastHydrotestDate',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Last Hydrotest Date' />
    ),
    cell: ({ row }) => {
      const lastHydrotestDate = new Date(
        row.original.lastHydrotestDate.getTime()
      );

      const deadLine = new Date(lastHydrotestDate);
      deadLine.setFullYear(deadLine.getFullYear() + 5);

      const deadLine57Months = new Date(lastHydrotestDate);
      deadLine57Months.setMonth(deadLine57Months.getMonth() + 57);

      const now = Date.now();
      const isPastDeadline = deadLine.getTime() < now;
      const isNearDeadline =
        deadLine57Months.getTime() < now && !isPastDeadline;

      return (
        <span
          className={`px-2 py-1 ${
            isPastDeadline
              ? 'bg-primary text-muted'
              : isNearDeadline
              ? 'border-2 border-primary'
              : ''
          }`}
        >
          {row.original.lastHydrotestDate.toLocaleDateString('uk')}
        </span>
      );
    },
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
    accessorKey: 'volume',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Volume' />
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
    accessorKey: 'actions',
    header: () => 'Actions',
    cell: ({ row }) => (
      <Link
        href={`/terminations/create/${row.original.internalNumber}`}
        className='flex justify-center underline hover:font-bold'
      >
        Send to scrap
      </Link>
    ),
  },
];
