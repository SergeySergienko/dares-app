'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableFacetedFilter } from '@/components/ui/data-table/data-table-faceted-filter';
import { TankOutputDTO } from '@/models/TankModel';
import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';

export const columns: ColumnDef<TankOutputDTO>[] = [
  {
    accessorKey: 'internalNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='I/N' />
    ),
  },
  {
    accessorKey: 'serialNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='S/N' />
    ),
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
    accessorKey: 'nextHydrotestDeadline',
    header: () => 'Next Hydrotest Deadline',
    cell: ({ row }) => {
      if (!row.original.lastHydrotestDate) return;

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
          {deadLine.toLocaleDateString('uk')}
        </span>
      );
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Status' />
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
];
