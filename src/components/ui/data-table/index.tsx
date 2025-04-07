'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
  PaginationState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFilterToolbar } from './data-table-filter-toolbar';
import { DataTableSearchInput } from './data-table-search-input';
import { DataTableResetButton } from './data-table-reset-button';
import { DataTablePagination } from './data-table-pagination';
import { DataTableHandlePackage } from './data-table-handle-package';
import { DateRange } from 'react-day-picker';
import { DataTableSelectDates } from './data-table-select-dates';
import { DataTableLoader } from './data-table-loader';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
  initialSorting: ColumnSort;
  searchBy?: string;
  packageEntity?: 'inventories' | 'hydrotests';
  handleDates?: (range: DateRange) => void;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  initialSorting,
  searchBy,
  packageEntity,
  handleDates,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState([initialSorting]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: Number.MAX_SAFE_INTEGER,
  });
  const [inputValue, setInputValue] = useState('');

  const reset = () => {
    setInputValue('');
    table.resetColumnFilters();
  };

  const onChange = (value: string) => setInputValue(value);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const rows = table.getRowModel().rows;
  const isFiltered = table.getState().columnFilters.length > 0;
  const isSelected = Object.keys(rowSelection).length > 0;

  return (
    <div>
      <h2 className='title mb-0'>{title}</h2>
      <div className='text-center text-sm h-5 mb-2'>
        {rows?.length > 0 && <span>Result records: {rows.length}</span>}
      </div>
      <div className='flex justify-between items-center pb-4 print:hidden'>
        <div className='flex items-center gap-2 md:gap-4'>
          <DataTableSearchInput
            table={table}
            inputValue={inputValue}
            onChange={onChange}
            searchBy={searchBy}
          />
          {isSelected && (
            <DataTableHandlePackage
              table={table}
              packageEntity={packageEntity}
            />
          )}
          <DataTableFilterToolbar table={table} />
          {isFiltered && <DataTableResetButton reset={reset} />}
          {handleDates && <DataTableSelectDates handleDates={handleDates} />}
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='[&_button]:whitespace-normal [&_button]:gap-0 px-0.5 text-center border-r'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <DataTableLoader columns={columns} />
            ) : rows?.length ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='text-center'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='mt-4 print:hidden'>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
