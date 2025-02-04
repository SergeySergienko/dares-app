import { useState } from 'react';

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';

export function DataTableViewOptions({ table }) {
  const [open, setOpen] = useState(false);
  const [isColumnBulk, setColumnBulk] = useState(false);

  const handleColumnBulk = () => {
    table
      .getAllColumns()
      .filter((column) => !column.getCanFilter())
      .forEach((column) => {
        column.toggleVisibility(!column.getIsVisible());
      });
    setColumnBulk((prev) => !prev);
  };

  return (
    <Menubar className='p-0'>
      <MenubarMenu open={open}>
        <MenubarTrigger asChild>
          <Button
            variant='outline'
            className='cursor-pointer w-28'
            onClick={() => setOpen(!open)}
          >
            {open ? 'Close panel' : 'Toggle columns'}
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
          <MenubarCheckboxItem
            className='cursor-pointer'
            checked={isColumnBulk}
            onClick={handleColumnBulk}
          >
            <span className='font-semibold'>Only filtered columns</span>
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
