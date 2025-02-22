'use client';

import { DataTableFacetedFilter } from '@/components/ui/data-table/data-table-faceted-filter';
import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';
import { InspectionOutputDTO } from '@/models/InspectionModel';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<InspectionOutputDTO>[] = [
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
    filterFn: (row, id, value) => +value === row.getValue(id),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'tankVerdict',
    header: ({ column }) => (
      <DataTableFacetedFilter column={column} title='Verdict' />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },
  {
    accessorKey: 'inspector',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Inspector' />
    ),
    cell: ({ row }) => row.original.inspector.name,
    enableColumnFilter: false,
  },
];
