'use client';

import { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function HomePage() {
  const [tankNumber, setTankNumber] = useState('');

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const internalNumber = e.target.value;
    if (+internalNumber > 0 && +internalNumber < 1000) {
      setTankNumber(internalNumber);
    } else {
      setTankNumber('');
    }
  };

  return (
    <div className='flex-1 flex flex-col justify-center items-center mx-auto space-y-8'>
      <div className='w-full flex justify-center items-end gap-4'>
        <Label htmlFor='tankNumber' className='text-2xl xs:text-3xl'>
          Tank Number
        </Label>
        <Input
          type='number'
          id='tankNumber'
          min='1'
          max='999'
          onChange={handleChange}
          className='w-20 h-auto text-xl px-2 md:text-2xl font-bold rounded-none border-0 border-b-2 border-gray-600 focus:outline-none focus-visible:ring-0'
        />
      </div>
      <div className='w-full flex justify-between gap-4'>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button disabled={!tankNumber}>Inspection</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent data-testid='inspection'>
            <DropdownMenuItem
              onClick={() => redirect(`/inspections/create/${tankNumber}`)}
              className='cursor-pointer'
            >
              Create New
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                redirect(`/reports/tanks/${tankNumber}/last-inspection`)
              }
              className='cursor-pointer'
            >
              View Last
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button disabled={!tankNumber}>Inventory</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => redirect(`/inventory/create/${tankNumber}`)}
              className='cursor-pointer'
            >
              Create New
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                redirect(`/reports/tanks/${tankNumber}/last-inventory`)
              }
              className='cursor-pointer'
              disabled
            >
              View Last
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* <Button
          disabled={!tankNumber}
          onClick={() => redirect(`/inspections/create/${tankNumber}`)}
        >
          <CreditCard />
          Create Inspection
        </Button>
        <Button
          disabled={!tankNumber}
          onClick={() =>
            redirect(`/reports/tanks/${tankNumber}/last-inspection`)
          }
        >
          View Last Inspection
        </Button> */}
        <Accordion type='single' collapsible className='w-80'>
          <AccordionItem value='item-1'>
            <AccordionTrigger
              disabled={!tankNumber}
              className='px-2 text-xl hover:no-underline disabled:opacity-50'
            >
              Inspection
            </AccordionTrigger>
            <AccordionContent className='flex justify-between'>
              <Button
                variant='outline'
                disabled={!tankNumber}
                onClick={() => redirect(`/inspections/create/${tankNumber}`)}
              >
                Create New
              </Button>
              <Button
                variant='outline'
                disabled={!tankNumber}
                onClick={() =>
                  redirect(`/reports/tanks/${tankNumber}/last-inspection`)
                }
              >
                View Last
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger
              disabled={!tankNumber}
              className='px-2 text-xl hover:no-underline disabled:opacity-50'
            >
              Inventory
            </AccordionTrigger>
            <AccordionContent className='flex justify-between'>
              <Button
                variant='outline'
                disabled={!tankNumber}
                onClick={() => redirect(`/inventory/create/${tankNumber}`)}
              >
                Create New
              </Button>
              <Button variant='outline' disabled onClick={() => {}}>
                View Last
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
