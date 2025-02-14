'use client';

import { Column, ColumnDef, Row } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

type Tank = {
  firstHydrotestDate: string;
  lastHydrotestDate: string;
  lastInspectionDate: string;
};

const formatDate =
  (
    accessorKey:
      | 'firstHydrotestDate'
      | 'lastHydrotestDate'
      | 'lastInspectionDate'
  ) =>
  ({ row }: { row: Row<Tank> }) =>
    new Date(row.original[accessorKey]).toLocaleDateString('uk');

const filterFn = (row: Row<Tank>, id: string, value: Array<any>) =>
  value.includes(row.getValue(id));

const sortifyHeader =
  (headerName: string, type?: 'filter') =>
  ({ column }: { column: Column<Tank, unknown> }) => {
    return (
      <div className='flex items-center justify-between'>
        {type === 'filter' ? (
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

export const columns: ColumnDef<Tank>[] = [
  {
    accessorKey: 'internalNumber',
    header: sortifyHeader('Internal Number'),
  },
  {
    accessorKey: 'serialNumber',
    header: sortifyHeader('Serial Number'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'manufacturer',
    header: 'Manufacturer',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'workPressure',
    header: sortifyHeader('Work Pressure'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'volume',
    header: sortifyHeader('Volume', 'filter'),
    filterFn,
  },
  {
    accessorKey: 'material',
    header: sortifyHeader('Material', 'filter'),
    filterFn,
  },
  {
    accessorKey: 'color',
    header: sortifyHeader('Color'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'status',
    header: sortifyHeader('Status', 'filter'),
    filterFn,
  },
  {
    accessorKey: 'fillingType',
    header: sortifyHeader('Filling Type', 'filter'),
    filterFn,
  },
  {
    accessorKey: 'valve',
    header: sortifyHeader('Valve', 'filter'),
    filterFn,
  },
  {
    accessorKey: 'grade',
    header: sortifyHeader('Grade', 'filter'),
    filterFn,
  },
  {
    accessorKey: 'firstHydrotestDate',
    header: 'First Hydrotest Date',
    cell: formatDate('firstHydrotestDate'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'lastHydrotestDate',
    header: 'Last Hydrotest Date',
    cell: formatDate('lastHydrotestDate'),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'lastInspectionDate',
    header: 'Last Inspection Date',
    cell: formatDate('lastInspectionDate'),
    enableColumnFilter: false,
  },
];
