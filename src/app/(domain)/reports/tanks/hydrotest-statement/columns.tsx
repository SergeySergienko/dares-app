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
    accessorKey: 'serialNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='S/N' />
    ),
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
