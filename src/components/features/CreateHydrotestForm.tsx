'use client';

import { useActionState } from 'react';
import { createHydrotest } from '@/actions/hydrotest-actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TextareaField } from '../composites/TextareaField';
import { RadioField } from '../composites/RadioField';
import { createFormAction } from './form-utils';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export const CreateHydrotestForm = ({ tankNumber }: { tankNumber: string }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleFormAction = createFormAction(
    createHydrotest,
    '/hydrotests',
    toast,
    router.push
  );

  const [state, formAction, isPending] = useActionState(
    handleFormAction,
    undefined
  );

  return (
    <form action={formAction} className='space-y-4'>
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
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='startDate'>Start date</Label>
          <Input type='date' id='startDate' name='startDate' required />
        </div>
        <div>
          <Label htmlFor='endDate'>End date</Label>
          <Input type='date' id='endDate' name='endDate' />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <RadioField
          name='tankVerdict'
          title='Cylinder condition'
          defaultValue='Acceptable'
          options={[
            {
              value: 'Acceptable',
              label: 'Acceptable',
              optionId: 'tankVerdictAcceptable',
            },
            {
              value: 'Marginal',
              label: 'Marginal',
              optionId: 'tankVerdictMarginal',
            },
            {
              value: 'Condemn',
              label: 'Condemn',
              optionId: 'tankVerdictCondemn',
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
