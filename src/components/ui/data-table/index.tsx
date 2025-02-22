'use client';

import { useState } from 'react';

import {
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
  initialSorting: ColumnSort;
  searchBy?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  initialSorting,
  searchBy,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState([initialSorting]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
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
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const rows = table.getRowModel().rows;

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div>
      <h2 className='title mb-0'>{title}</h2>
      <div className='text-center text-sm h-5 mb-2'>
        {rows?.length > 0 && <span>Result records: {rows.length}</span>}
      </div>
      <div className='flex justify-between items-center pb-4 print:hidden'>
        <div className='flex items-center'>
          <DataTableSearchInput
            table={table}
            inputValue={inputValue}
            onChange={onChange}
            searchBy={searchBy}
          />
          <DataTableFilterToolbar table={table} />
          {isFiltered && <DataTableResetButton reset={reset} />}
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
            {rows?.length ? (
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
    </div>
  );
}
