'use client';

import { ChangeEvent, useActionState, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createFormAction } from './form-utils';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createRepair, updateRepair } from '@/actions/repair-actions';
import { PartOutputDTO } from '@/models/PartModel';
import Image from 'next/image';
import parts_schema from '/public/parts_schema.jpg';
import { RepairOutputDTO } from '@/models/RepairModel';

// const kitAliases = [
//   'copper_gasket',
//   'thick_teflon_ring',
//   'thin_teflon_ring',
//   'stem',
//   'plug_assembly',
// ];

const getInitialCheckedState = (partsData: {
  [key: string]: number;
}): { [key: string]: boolean } => {
  return Object.keys(partsData).reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {} as { [key: string]: boolean });
};

export const RepairForm = ({
  tankNumber,
  parts,
  repair = {
    parts: {},
  },
}: {
  tankNumber: number;
  parts: PartOutputDTO[];
  repair?: Partial<RepairOutputDTO> & { parts?: { [key: string]: number } };
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [checkedParts, setCheckedParts] = useState<{ [x: string]: boolean }>(
    () => getInitialCheckedState(repair.parts ?? {})
  );
  // const [isKitChecked, setIsKitChecked] = useState(false);

  // useEffect(() => {
  //   const newCheckedParts = { ...checkedParts };
  //   kitAliases.forEach((alias) => {
  //     newCheckedParts[alias] = isKitChecked || checkedParts[alias];
  //   });
  //   setCheckedParts(newCheckedParts);
  // }, [isKitChecked]);
  const repairAction = repair.id ? updateRepair : createRepair;

  const handleFormAction = createFormAction(
    repairAction,
    '/repairs',
    toast,
    router.push
  );

  const [state, formAction, isPending] = useActionState(
    handleFormAction,
    undefined
  );

  const toggleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCheckedParts((prev) => ({ ...prev, [value]: checked }));
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
        <Input type='hidden' name='id' value={repair.id} />
        <div>
          <Label htmlFor='date'>Date</Label>
          <Input
            type='date'
            id='date'
            name='date'
            defaultValue={repair.date?.toISOString().split('T')[0]}
            required
          />
        </div>
        <div>
          <Label htmlFor='executor'>Executor</Label>
          <Input
            type='text'
            id='executor'
            name='executor'
            defaultValue={repair.executor || 'Deripalov Andrii'}
            required
          />
        </div>
      </div>

      <div className='flex'>
        <div className='bg-slate-50 px-2 w-full md:w-1/2 lg:w-1/3'>
          <div className='text-xl font-medium flex justify-between items-center'>
            <span className='w-56'>Parts</span>
            {/* {!repair.id && (
              <Button
                type='button'
                variant='outline'
                size='sm'
                className='w-24'
                onClick={() => setIsKitChecked(!isKitChecked)}
              >
                {isKitChecked ? 'Unselect' : 'Select a Kit'}
              </Button>
            )} */}
          </div>
          {parts.map(({ id, itemNumber, title, alias }) => (
            <div key={id} className='flex items-center gap-4 h-8'>
              <span className='w-52 font-semibold space-x-4'>
                <span>{itemNumber}</span>
                <Label>{title}</Label>
              </span>
              <Input
                type='checkbox'
                value={alias}
                onChange={toggleCheck}
                className='w-4'
                checked={checkedParts[alias] || false}
              />
              <Input
                type='number'
                id={alias}
                name={`parts.${alias}`}
                defaultValue={repair.parts?.[alias] || 1}
                min={1}
                className='w-[56px] h-6'
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
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};
