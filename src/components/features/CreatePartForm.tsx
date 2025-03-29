'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createFormAction } from './form-utils';
import { createPart } from '@/actions/part-actions';

export const CreatePartForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handleFormAction = createFormAction(
    createPart,
    '/parts',
    toast,
    router.push
  );

  const [state, action, isPending] = useActionState(
    handleFormAction,
    undefined
  );

  return (
    <form action={action} className='space-y-4'>
      <div>
        <Label htmlFor='itemNumber'>Item number</Label>
        <Input
          type='number'
          id='itemNumber'
          name='itemNumber'
          min='1'
          required
        />
      </div>
      <div>
        <Label htmlFor='catalogNumber'>Catalog number</Label>
        <Input id='catalogNumber' name='catalogNumber' required />
      </div>
      <div>
        <Label htmlFor='title'>Title</Label>
        <Input id='title' name='title' required />
      </div>
      <div>
        <Label htmlFor='alias'>Alias</Label>
        <Input id='alias' name='alias' required />
      </div>

      <Button disabled={isPending} type='submit'>
        {isPending ? 'Loading...' : 'Submit'}
      </Button>
    </form>
  );
};
