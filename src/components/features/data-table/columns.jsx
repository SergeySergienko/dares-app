'use client';

import { ArrowUpDown } from 'lucide-react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

const formatDate =
  (accessorKey) =>
  ({ row }) =>
    new Date(row.original[accessorKey]).toLocaleDateString('uk');

const sortifyHeader =
  (headerName, isFilter) =>
  ({ column }) => {
    return (
      <div className='flex items-center justify-between'>
        {isFilter ? (
          <DataTableFacetedFilter column={column} title={headerName} />
        ) : (
          <span className='pl-1'>{headerName}</span>
        )}
        <ArrowUpDown
          className='h-5 min-w-4 hover:bg-gray-200 cursor-pointer'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      </div>
    );
  };

export const columns = [
  {
    accessorKey: 'internalNumber',
    header: sortifyHeader('Internal Number'),
  },
  {
    accessorKey: 'serialNumber',
    header: sortifyHeader('Serial Number'),
  },
  {
    accessorKey: 'manufacturer',
    header: 'Manufacturer',
  },
  {
    accessorKey: 'workPressure',
    header: sortifyHeader('Work Pressure'),
  },
  {
    accessorKey: 'volume',
    header: sortifyHeader('Volume', true),
  },
  {
    accessorKey: 'material',
    header: sortifyHeader('Material', true),
  },
  {
    accessorKey: 'color',
    header: sortifyHeader('Color'),
  },
  {
    accessorKey: 'status',
    header: sortifyHeader('Status', true),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'fillingType',
    header: sortifyHeader('Filling Type', true),
  },
  {
    accessorKey: 'valve',
    header: sortifyHeader('Valve', true),
  },
  {
    accessorKey: 'grade',
    header: sortifyHeader('Grade', true),
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
