'use client';

import { ChangeEvent, useActionState, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createFormAction } from './form-utils';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createRepair } from '@/actions/repair-actions';
import { PartOutputDTO } from '@/models/PartModel';
import Image from 'next/image';
import parts_schema from '/public/parts_schema.png';

export const CreateRepairForm = ({
  tankNumber,
  parts,
}: {
  tankNumber: string;
  parts: PartOutputDTO[];
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [checkedParts, setCheckedParts] = useState<{ [x: string]: boolean }>(
    {}
  );

  const handleFormAction = createFormAction(
    createRepair,
    '/repairs',
    toast,
    router.push
  );

  const [state, formAction, isPending] = useActionState(
    handleFormAction,
    undefined
  );

  const toggleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCheckedParts((prev) => ({ ...prev, [value]: !prev[value] }));
  };

  const isChecked = Object.values(checkedParts).some(Boolean);

  return (
    <form action={formAction} className='space-y-4'>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div>
          <Label htmlFor='tankNumber'>Internal tank number</Label>
          <Input
            type='number'
            id='tankNumber'
            name='tankNumber'
            min='1'
            defaultValue={tankNumber}
            required
            readOnly
          />
        </div>
        <div>
          <Label htmlFor='date'>Date</Label>
          <Input type='date' id='date' name='date' required />
        </div>
        <div>
          <Label htmlFor='executor'>Executor</Label>
          <Input
            type='text'
            id='executor'
            name='executor'
            defaultValue='Deripalov Andrii'
            required
          />
        </div>
      </div>

      <div className='flex'>
        <div className='bg-slate-50 px-2 w-full md:w-1/2 lg:w-1/3'>
          <div className='text-xl font-medium'>Parts</div>
          {parts.map(({ id, itemNumber, title, alias }) => (
            <div key={id} className='flex items-center gap-4 h-11'>
              <span className='w-52 font-semibold space-x-4'>
                <span>{itemNumber}</span>
                <Label>{title}</Label>
              </span>
              <Input
                type='checkbox'
                value={alias}
                onChange={toggleCheck}
                className='w-4'
              />
              <Input
                type='number'
                id={alias}
                name={`parts.${alias}`}
                defaultValue={1}
                min={1}
                className='w-16'
                hidden={!checkedParts[alias]}
                disabled={!checkedParts[alias]}
              />
            </div>
          ))}
        </div>
        <div className='hidden md:block relative'>
          <Image
            src={parts_schema}
            alt='scrapped'
            placeholder='blur'
            width={1000}
          />
        </div>
      </div>

      <Button disabled={!isChecked || isPending} type='submit'>
        {isPending ? 'Loading...' : 'Submit'}
      </Button>
    </form>
  );
};
