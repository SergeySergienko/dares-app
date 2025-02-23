'use client';

import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';
import { DataTableFacetedFilter } from '@/components/ui/data-table/data-table-faceted-filter';
import { InventoryOutputDTO } from '@/models/InventoryModel';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<InventoryOutputDTO>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Date' />
    ),
    cell: ({ row }) => row.original.date.toLocaleDateString('uk'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'tankNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Tank' />
    ),
  },
  {
    accessorKey: 'tankStatus',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Tank Status' />
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
