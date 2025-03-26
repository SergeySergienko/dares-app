'use client';

import { useActionState, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { updateHydrotest } from '@/actions/hydrotest-actions';
import { Cylinder } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TextareaField } from '../composites/TextareaField';
import Link from 'next/link';
import { createFormAction } from './form-utils';
import { RadioField } from '../composites/RadioField';

export const UpdateHydrotestsPackageForm = ({
  tanksString,
}: {
  tanksString: string;
}) => {
  const [tanksArray, setTanksArray] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (tanksString) {
      const tanks = tanksString.split(',');
      setTanksArray(tanks);
    }
  }, [tanksString]);

  const handleUpdatePackage = async (state: any, formData: FormData) => {
    try {
      const promises = tanksArray.map((tankNumber) => {
        // Create a NEW formData object for each call
        const newFormData = new FormData();
        newFormData.append('tankNumber', tankNumber);
        newFormData.append('endDate', formData.get('endDate') as string);
        newFormData.append('executor', formData.get('executor') as string);
        newFormData.append('tankVerdict', formData.get(tankNumber) as string);
        newFormData.append(
          'description',
          formData.get('description') as string
        );
        return updateHydrotest(null, newFormData);
      });
      await Promise.all(promises);
      return { message: 'Hydrotests have been successfully updated!' };
    } catch (e) {
      throw e instanceof Error ? e : new Error('Something went wrong!');
    }
  };

  const handleFormAction = createFormAction(
    handleUpdatePackage,
    '/hydrotests',
    toast,
    router.push
  );

  const [state, formAction, isPending] = useActionState(
    handleFormAction,
    undefined
  );

  return (
    <div className='mt-8'>
      {tanksArray.length > 0 ? (
        <div className='flex flex-col gap-4'>
          <div className='text-center font-semibold md:text-xl'>
            Selected Tanks
          </div>

          <ul className='flex justify-center flex-wrap gap-4'>
            {tanksArray.map((tankNumber) => (
              <Link key={tankNumber} href={`/tanks/${tankNumber}`}>
                <li className='relative'>
                  <Cylinder size={40} className='bg-gray-100 rounded-full' />
                  <span className='flex items-center justify-center relative'>
                    <span className='absolute text-sm font-bold text-black bottom-1'>
                      {tankNumber}
                    </span>
                  </span>
                </li>
              </Link>
            ))}
          </ul>

          <form action={formAction} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='endDate'>End date</Label>
                <Input
                  type='date'
                  id='endDate'
                  name='endDate'
                  defaultValue={new Date().toISOString().split('T')[0]}
                  required
                />
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

            <div className='flex flex-col gap-4'>
              {tanksArray.map((tank) => (
                <RadioField
                  key={tank}
                  name={tank}
                  title={`Tank ${tank}`}
                  defaultValue='Acceptable'
                  options={[
                    {
                      value: 'Acceptable',
                      label: 'Acceptable',
                      optionId: 'acceptable',
                    },
                    {
                      value: 'Condemn',
                      label: 'Condemn',
                      optionId: 'condemn',
                    },
                  ]}
                />
              ))}
            </div>

            <TextareaField id='description' title='Description' />

            <Button disabled={isPending} type='submit'>
              {isPending ? 'Loading...' : 'Submit'}
            </Button>
          </form>
        </div>
      ) : (
        <p className='text-center'>No tanks selected.</p>
      )}
    </div>
  );
};
