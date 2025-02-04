'use client';

import { useState } from 'react';

import {
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
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

import { DataTableViewOptions } from './data-table-view-options';
import { Badge } from '@/components/ui/badge';

export function DataTable({ columns, data, title }) {
  const [sorting, setSorting] = useState([
    { id: 'internalNumber', desc: false },
  ]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  const selectedValues = table
    .getAllColumns()
    .filter((column) => column.getCanFilter())
    .map((column) => column.getFilterValue())
    .filter(Boolean)
    .flat();

  const rows = table.getRowModel().rows;

  return (
    <div>
      <h2 className='title mb-0'>{title}</h2>
      <div className='text-center text-sm h-5'>
        {rows?.length > 0 && <span>Result records: {rows.length}</span>}
      </div>
      <div className='flex justify-between items-center pb-4'>
        <div>
          {selectedValues.length > 0 && (
            <span>
              <span className='font-semibold'>Filters: </span>
              {selectedValues.length > 10 ? (
                <Badge
                  variant='secondary'
                  className='rounded-sm px-1 font-normal'
                >
                  {selectedValues.length} selected
                </Badge>
              ) : (
                selectedValues.map((option) => (
                  <Badge
                    variant='secondary'
                    key={option}
                    className='rounded-sm px-0.5 mx-0.5 font-normal'
                  >
                    {option}
                  </Badge>
                ))
              )}
            </span>
          )}
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 px-3'
            >
              Reset
              <X />
            </Button>
          )}
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
                      className='[&_button]:whitespace-normal [&_button]:gap-0 px-0 text-center border-r'
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
