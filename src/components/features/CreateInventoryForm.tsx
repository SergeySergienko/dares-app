'use client';

import { useActionState } from 'react';
import { createInventory } from '@/actions/inventory-actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TextareaField } from '../composites/TextareaField';
import { RadioField } from '../composites/RadioField';
import { createFormAction } from './form-utils';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export const CreateInventoryForm = ({ tankNumber }: { tankNumber: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const handleFormAction = createFormAction(
    createInventory,
    '/inventories',
    toast,
    router.push
  );

  const [state, formAction, isPending] = useActionState(
    handleFormAction,
    undefined
  );

  return (
    <form action={formAction} className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
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
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <RadioField
          name='tankStatus'
          title='Tank Status'
          options={[
            {
              value: 'In use',
              label: 'In use',
              optionId: 'inUse',
            },
            {
              value: 'In testing',
              label: 'In testing',
              optionId: 'inTesting',
            },
            {
              value: 'Not found',
              label: 'Not found',
              optionId: 'notFound',
            },
            {
              value: 'Lost',
              label: 'Lost',
              optionId: 'lost',
            },
          ]}
        />
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

      <TextareaField id='description' title='Description' />

      <Button disabled={isPending} type='submit'>
        {isPending ? 'Loading...' : 'Submit'}
      </Button>
    </form>
  );
};
