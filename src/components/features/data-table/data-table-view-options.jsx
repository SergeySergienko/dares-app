import { useState } from 'react';

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

export function DataTableViewOptions({ table }) {
  const [open, setOpen] = useState(false);

  return (
    <Menubar className='p-0'>
      <MenubarMenu open={open}>
        <MenubarTrigger
          variant='outline'
          className='cursor-pointer py-1 px-2 data-[state=open]:bg-white focus: bg-white'
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Select columns'}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Toggle columns</MenubarLabel>
          <MenubarSeparator />
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
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
