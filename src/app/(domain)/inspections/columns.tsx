'use client';

import { DataTableFacetedFilter } from '@/components/ui/data-table/data-table-faceted-filter';
import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';
import { InspectionOutputDTO } from '@/models/InspectionModel';
import { ColumnDef } from '@tanstack/react-table';
import { CircleArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    cell: ({ row }) => (
      <Link href={`/tanks/${row.original.tankNumber}`}>
        <span className='p-1 underline hover:no-underline hover:font-bold hover:bg-slate-300 print:no-underline'>
          {row.original.tankNumber}
        </span>
      </Link>
    ),
    filterFn: (row, id, value) => +value === row.getValue(id),
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
  {
    accessorKey: 'evaluationForm',
    header: () => 'Evaluation form',
    cell: ({ row }) => (
      <Link
        href={`/inspections/${row.original.id}`}
        className='flex justify-center [&_svg]:stroke-[1] [&_svg]:hover:stroke-[2]'
      >
        <CircleArrowRight />
      </Link>
    ),
  },
];
