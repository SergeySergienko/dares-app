'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableFacetedFilter } from '@/components/ui/data-table/data-table-faceted-filter';
import { TankOutputDTO } from '@/models/TankModel';
import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<TankOutputDTO>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'internalNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='I/N' />
    ),
    filterFn: (row, id, value) => +value === row.getValue(id),
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
    accessorKey: 'nextInspectionDeadline',
    header: () => 'Next Inspection Deadline',
    cell: ({ row }) => {
      if (!row.original.lastInspectionDate) return;

      const lastInspectionDate = new Date(
        row.original.lastInspectionDate.getTime()
      );

      const deadLine = new Date(lastInspectionDate);
      deadLine.setFullYear(deadLine.getFullYear() + 1);

      const deadLine11Months = new Date(lastInspectionDate);
      deadLine11Months.setMonth(deadLine11Months.getMonth() + 11);

      const now = Date.now();
      const isPastDeadline = deadLine.getTime() < now;
      const isNearDeadline =
        deadLine11Months.getTime() < now && !isPastDeadline;

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
];
