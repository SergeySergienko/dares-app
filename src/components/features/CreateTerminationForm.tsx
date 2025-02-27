'use client';

import { useActionState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TextareaField } from '../composites/TextareaField';
import { createTermination } from '@/actions/termination-actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export const CreateTerminationForm = ({
  tankNumber,
}: {
  tankNumber: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleTermination = async (state: any, formData: FormData) => {
    try {
      const message = await createTermination(state, formData);
      toast({
        title: 'SUCCESS!',
        description: message,
        duration: 5000,
        style: { color: 'white', backgroundColor: 'green' },
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong';
      toast({
        title: 'Oops...',
        description: errorMessage,
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      router.push('/tanks');
    }
  };
  const [state, action, isPending] = useActionState(
    handleTermination,
    undefined
  );

  return (
    <form action={action} className='space-y-4'>
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
          <Input
            type='date'
            id='date'
            name='date'
            // defaultValue={new Date().toISOString().split('T')[0]}
            required
          />
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
