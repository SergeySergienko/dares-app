'use client';

import { ColumnDef, Row, Cell } from '@tanstack/react-table';
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
    accessorKey: 'serialNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='S/N' />
    ),
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
    accessorKey: 'lastInspectionDate',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Last Inspection Date' />
    ),
    cell: ({ row }) => row.original.lastInspectionDate.toLocaleDateString('uk'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'nextInspectionDeadline',
    header: () => 'Next Inspection Deadline',
    cell: ({ row }) => {
      const deadLine = new Date(row.original.lastInspectionDate).setFullYear(
        row.original.lastInspectionDate.getFullYear() + 1
      );

      return (
        <span
          className={`${
            deadLine < Date.now() ? 'px-2 py-1 bg-primary text-muted' : ''
          }`}
        >
          {new Date(deadLine).toLocaleDateString('uk')}
        </span>
      );
    },
    enableColumnFilter: false,
  },
];
