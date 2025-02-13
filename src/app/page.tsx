'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';

export default function HomePage() {
  const [tankNumber, setTankNumber] = useState('');

  const handleChange = async (e) => {
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
        <Button
          disabled={!tankNumber}
          onClick={() => redirect(`/inspections/create/${tankNumber}`)}
        >
          Create Inspection
        </Button>
        <Button
          disabled={!tankNumber}
          onClick={() =>
            redirect(`/reports/tanks/${tankNumber}/last-inspection`)
          }
        >
          View Last Inspection
        </Button>
      </div>
    </div>
  );
}
