'use client';

import { useActionState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TextareaField } from '../composites/TextareaField';
import { createTermination } from '@/actions/termination-actions';
import { createFormAction } from './form-utils';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export const CreateTerminationForm = ({
  tankNumber,
}: {
  tankNumber: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleFormAction = createFormAction(
    createTermination,
    '/tanks/scrapped',
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
      <TextareaField id='reason' title='Reason' required />

      <div className='grid grid-cols-2 gap-4'>
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
        <div>
          <Label htmlFor='approver'>Approver</Label>
          <Input
            type='text'
            id='approver'
            name='approver'
            defaultValue='Deripalov Andrii'
            required
          />
        </div>
      </div>

      <Button disabled={isPending} type='submit'>
        {isPending ? 'Loading...' : 'Submit'}
      </Button>
    </form>
  );
};
