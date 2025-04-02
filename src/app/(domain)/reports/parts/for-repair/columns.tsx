'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';
import { PartsUsageReportOutputDTO } from '@/models/PartModel';

export const columns: ColumnDef<PartsUsageReportOutputDTO>[] = [
  {
    accessorKey: 'itemNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='I/N' />
    ),
    filterFn: (row, id, value) => +value === row.getValue(id),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Title' />
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'catalogNumber',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Catalog Number' />
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'total',
    header: () => 'Total',
    enableSorting: false,
    enableColumnFilter: false,
  },
];
