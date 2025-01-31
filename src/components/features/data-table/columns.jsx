'use client';

import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

const formatDate =
  (accessorKey) =>
  ({ row }) =>
    new Date(row.original[accessorKey]).toLocaleDateString('uk');

const sortifyHeader =
  (headerName) =>
  ({ column }) => {
    return (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        {headerName}
        <ArrowUpDown className='ml-1 h-4 w-4' />
      </Button>
    );
  };

export const columns = [
  {
    accessorKey: 'internalNumber',
    header: sortifyHeader('Internal Number'),
  },
  {
    accessorKey: 'serialNumber',
    header: 'Serial Number',
  },
  {
    accessorKey: 'manufacturer',
    header: 'Manufacturer',
  },
  {
    accessorKey: 'workPressure',
    header: 'Work Pressure',
  },
  {
    accessorKey: 'volume',
    header: 'Volume',
  },
  {
    accessorKey: 'material',
    header: 'Material',
  },
  {
    accessorKey: 'color',
    header: 'Color',
  },
  {
    accessorKey: 'status',
    header: sortifyHeader('Status'),
  },
  {
    accessorKey: 'fillingType',
    header: 'Filling Type',
  },
  {
    accessorKey: 'valve',
    header: sortifyHeader('Valve'),
  },
  {
    accessorKey: 'grade',
    header: 'Grade',
  },
  {
    accessorKey: 'firstHydrotestDate',
    header: 'First Hydrotest Date',
    cell: formatDate('firstHydrotestDate'),
  },
  {
    accessorKey: 'lastHydrotestDate',
    header: 'Last Hydrotest Date',
    cell: formatDate('lastHydrotestDate'),
  },
  {
    accessorKey: 'lastInspectionDate',
    header: 'Last Inspection Date',
    cell: formatDate('lastInspectionDate'),
  },
];
