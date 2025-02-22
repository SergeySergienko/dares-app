import { useState } from 'react';

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import { Settings2, SquareMousePointer, X } from 'lucide-react';
import { Table } from '@tanstack/react-table';

export function DataTableViewOptions<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  const [open, setOpen] = useState(false);
  const [isFilterVisible, setFilterVisible] = useState(false);

  const handleColumnBulk = () => {
    table.getAllColumns().forEach((column) => {
      column.toggleVisibility(isFilterVisible || column.getCanFilter());
    });
    setFilterVisible((prev) => !prev);
  };

  return (
    <Menubar className='p-0'>
      <MenubarMenu open={open}>
        <MenubarTrigger asChild>
          <Button
            variant='outline'
            className='cursor-pointer'
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <>
                <X className='h-4' />
                <span className='hidden md:block w-32'>Close panel</span>
              </>
            ) : (
              <>
                <Settings2 className='h-4' />
                <span className='hidden md:block w-32'>Columns selector</span>
              </>
            )}
          </Button>
        </MenubarTrigger>
        <MenubarContent>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <MenubarCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </MenubarCheckboxItem>
              );
            })}
          <MenubarSeparator />
          <MenubarItem
            className='cursor-pointer flex justify-evenly font-semibold'
            onClick={handleColumnBulk}
          >
            <SquareMousePointer className='h-4' />
            <span>
              {isFilterVisible ? 'Select all columns' : 'Select filter columns'}
            </span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
