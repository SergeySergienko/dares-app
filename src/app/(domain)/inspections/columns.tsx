'use client';

import { deleteInspection } from '@/actions/inspection-actions';
import { DeleteDialogButton } from '@/components/composites/DeleteDialogButton';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/data-table/data-table-faceted-filter';
import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';
import { InspectionOutputDTO } from '@/models/InspectionModel';
import { ColumnDef } from '@tanstack/react-table';
import { Info, Pencil, Trash2 } from 'lucide-react';
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
    accessorKey: 'actions',
    header: () => 'Actions',
    cell: ({ row }) => (
      <div className='flex justify-center items-center gap-4 md:gap-8'>
        <Link href={`/inspections/${row.original.id}`}>
          <Button size='sm' className='h-6 w-6 md:w-fit'>
            <Info className='md:hidden' />
            <span className='hidden md:block'>View</span>
          </Button>
        </Link>

        <Link href={`/inspections/update/${row.original.id}`}>
          <Button
            size='sm'
            className='h-6 w-6 md:w-fit bg-blue-500 hover:bg-blue-600'
          >
            <Pencil className='md:hidden' />
            <span className='hidden md:block'>Edit</span>
          </Button>
        </Link>

        <DeleteDialogButton
          id={row.original.id}
          action={deleteInspection}
          redirectPath='/inspections'
          dialogDescription={
            <>
              <span className='block text-destructive font-semibold'>
                This action cannot be undone. This will permanently delete this
                Inspection.
              </span>
            </>
          }
          variant='destructive'
          size='sm'
          triggerButtonContent={
            <>
              <Trash2 className='md:hidden' />
              <span className='hidden md:block'>Delete</span>
            </>
          }
          triggerButtonClassName='h-6 w-6 md:w-fit hover:bg-red-600'
        />
      </div>
    ),
  },
];
