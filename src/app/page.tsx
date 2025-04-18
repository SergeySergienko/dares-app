'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HomePageStub } from '@/components/composites/HomePageStub';
import { useSidebar } from '@/components/ui/sidebar';

export default function HomePage() {
  const { setOpen, setOpenMobile } = useSidebar();

  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [tankNumber, setTankNumber] = useState('');

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const internalNumber = e.target.value;
    if (+internalNumber > 0 && +internalNumber < 1000) {
      setTankNumber(internalNumber);
    } else {
      setTankNumber('');
    }
  };

  useEffect(() => {
    setOpen(true);
    setOpenMobile(true);
  }, [setOpen, setOpenMobile]);

  if (!isSignedIn) return <HomePageStub />;

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

      <Accordion type='single' collapsible className='w-80'>
        <AccordionItem value='inspection'>
          <AccordionTrigger
            disabled={!tankNumber}
            className='px-2 text-2xl hover:no-underline disabled:opacity-50'
          >
            Inspection
          </AccordionTrigger>
          <AccordionContent className='flex justify-between'>
            <Button
              variant='ghost'
              disabled={!tankNumber}
              onClick={() => router.push(`/inspections/create/${tankNumber}`)}
              className='text-lg'
            >
              Create New
            </Button>
            <Button
              variant='ghost'
              disabled={!tankNumber}
              onClick={() =>
                router.push(`/reports/tanks/${tankNumber}/last-inspection`)
              }
              className='text-lg'
            >
              View Last
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='inventory'>
          <AccordionTrigger
            disabled={!tankNumber}
            className='px-2 text-2xl hover:no-underline disabled:opacity-50'
          >
            Inventory
          </AccordionTrigger>
          <AccordionContent className='flex justify-between'>
            <Button
              variant='ghost'
              disabled={!tankNumber}
              onClick={() => router.push(`/inventories/create/${tankNumber}`)}
              className='text-lg'
            >
              Create New
            </Button>
            <Button variant='ghost' className='text-lg' disabled>
              View Last
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='repair'>
          <AccordionTrigger
            disabled={!tankNumber}
            className='px-2 text-2xl hover:no-underline disabled:opacity-50'
          >
            Repair
          </AccordionTrigger>
          <AccordionContent className='flex justify-between'>
            <Button
              variant='ghost'
              disabled={!tankNumber}
              onClick={() => router.push(`/repairs/create/${tankNumber}`)}
              className='text-lg'
            >
              Create New
            </Button>
            <Button variant='ghost' className='text-lg' disabled>
              View Last
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
