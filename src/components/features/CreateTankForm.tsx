'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioField, RadioFieldType } from '../composites/RadioField';
import { useActionState } from 'react';
import { createTank } from '@/actions/tank-actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createFormAction } from './form-utils';

type tankFieldsTypes = 'manufacturer' | 'material' | 'color' | 'fillingType';

const tankRadioFields: RadioFieldType<tankFieldsTypes>[] = [
  {
    name: 'manufacturer',
    title: 'Manufacturer',
    defaultValue: 'Catalina',
    options: [
      { value: 'Catalina', label: 'Catalina', optionId: 'catalina' },
      { value: 'Faber', label: 'Faber', optionId: 'faber' },
    ],
  },
  {
    name: 'material',
    title: 'Material',
    defaultValue: 'Aluminium',
    options: [
      { value: 'Aluminium', label: 'Aluminium', optionId: 'aluminium' },
      { value: 'Steel', label: 'Steel', optionId: 'steel' },
      { value: 'FRP', label: 'FRP', optionId: 'frp' },
      {
        value: 'Carbon Composite',
        label: 'Carbon Composite',
        optionId: 'carbon',
      },
    ],
  },
  {
    name: 'color',
    title: 'Color',
    defaultValue: 'Not painted',
    options: [
      { value: 'Not painted', label: 'Not painted', optionId: 'not_painted' },
      { value: 'Black/White', label: 'Black/White', optionId: 'black_white' },
      {
        value: 'Black/Yellow',
        label: 'Black/Yellow',
        optionId: 'black_yellow',
      },
    ],
  },
  {
    name: 'fillingType',
    title: 'FillingType',
    defaultValue: 'Air',
    options: [
      { value: 'Air', label: 'Air', optionId: 'air' },
      { value: 'Nitrox', label: 'Nitrox', optionId: 'nitrox' },
    ],
  },
];

export const CreateTankForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handleFormAction = createFormAction(
    createTank,
    '/tanks',
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
        <Label htmlFor='internalNumber'>Internal tank number</Label>
        <Input
          type='number'
          id='internalNumber'
          name='internalNumber'
          min='1'
          max='5'
          required
        />
      </div>
      <div>
        <Label htmlFor='serialNumber'>Serial tank number</Label>
        <Input id='serialNumber' name='serialNumber' required />
      </div>
      <div>
        <Label htmlFor='workPressure'>Work Pressure</Label>
        <Input
          type='number'
          id='workPressure'
          name='workPressure'
          min='1'
          max='500'
          defaultValue={207}
          required
        />
      </div>
      <div>
        <Label htmlFor='volume'>Volume</Label>
        <Input id='volume' name='volume' defaultValue='11.7' required />
      </div>

      {tankRadioFields.map(({ name, title, defaultValue, options }) => (
        <RadioField
          key={name}
          name={name}
          title={title}
          defaultValue={defaultValue}
          options={options}
        />
      ))}

      <div>
        <Label htmlFor='firstHydrotestDate'>First Hydrotest Date</Label>
        <Input
          type='date'
          id='firstHydrotestDate'
          name='firstHydrotestDate'
          required
        />
      </div>
      <div>
        <Label htmlFor='lastHydrotestDate'>Last Hydrotest Date</Label>
        <Input
          type='date'
          id='lastHydrotestDate'
          name='lastHydrotestDate'
          required
        />
      </div>

      <Button disabled={isPending} type='submit'>
        {isPending ? 'Loading...' : 'Submit'}
      </Button>
    </form>
  );
};
