'use client';

import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { DataTableFacetedFilter } from '@/components/ui/data-table/data-table-faceted-filter';
import { InventoryOutputDTO } from '@/models/InventoryModel';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<InventoryOutputDTO>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => row.original.date.toLocaleDateString('uk'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'tankNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tank Number' />
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'tankStatus',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Tank Status' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'executor',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Executor' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
];
