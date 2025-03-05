'use client';

import { ChevronDown } from 'lucide-react';

export const HomePageStub = () => (
  <div className='flex-1 flex flex-col justify-center items-center mx-auto space-y-8'>
    <div className='w-full flex justify-center items-end gap-4 font-medium mb-4'>
      <div className='text-2xl xs:text-3xl'>Tank Number</div>
      <div className='w-20 h-auto text-xl px-2 md:text-2xl font-bold rounded-none border-0 border-b-2 border-gray-600 focus:outline-none focus-visible:ring-0' />
    </div>
    {['Inspection', 'Inventory'].map((action) => (
      <div key={action} className='w-80 space-y-2'>
        <div className='w-full px-2 flex justify-between items-center font-semibold text-2xl text-muted-foreground'>
          <div>{action}</div>
          <ChevronDown className='h-4 w-4 text-muted-foreground' />
        </div>
        <div className='h-0.5 w-full bg-primary/10' />
      </div>
    ))}
  </div>
);
