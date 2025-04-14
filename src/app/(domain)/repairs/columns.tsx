'use client';

import { DataTableSortingHeader } from '@/components/ui/data-table/data-table-sorting-header';
import { RepairOutputDTO } from '@/models/RepairModel';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { DeleteDialogButton } from '@/components/composites/DeleteDialogButton';
import { deleteRepair } from '@/actions/repair-actions';
import { Info, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<RepairOutputDTO>[] = [
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
    accessorKey: 'executor',
    header: ({ column }) => (
      <DataTableSortingHeader column={column} title='Executor' />
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'actions',
    header: () => 'Actions',
    cell: ({ row }) => (
      <div className='flex justify-center items-center gap-4 md:gap-8'>
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Link href={`/repairs/${row.original.id}`}>
              <Button size='sm' className='h-6 w-6 md:w-fit'>
                <Info className='md:hidden' />
                <span className='hidden md:block'>View</span>
              </Button>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent align='end' className='max-w-fit'>
            {Object.entries(row.original.parts).map(([alias, amount]) => (
              <div key={alias} className='flex justify-center gap-5'>
                <span className='w-5/6 text-end'>{alias}:</span>
                <span>{amount}</span>
              </div>
            ))}
            <div className='text-[12px] text-slate-400 mt-4'>
              click to view Repair Card
            </div>
          </HoverCardContent>
        </HoverCard>

        <Link href={`/repairs/update/${row.original.id}`}>
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
          action={deleteRepair}
          redirectPath='/repairs'
          dialogDescription={
            <>
              <span className='block text-destructive font-semibold'>
                This action cannot be undone. This will permanently delete this
                Repair.
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
    enableSorting: false,
    enableColumnFilter: false,
  },
];
