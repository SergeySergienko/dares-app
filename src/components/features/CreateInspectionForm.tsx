'use client';

import { useActionState, useState } from 'react';
import { createInspection } from '@/actions/inspection-actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RadioField } from '@/components/composites/RadioField';
import { TextareaField } from '@/components/composites/TextareaField';
import { TankOutputDTO } from '@/models/TankModel';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createFormAction } from './form-utils';

export type RadioFieldType = {
  name: string;
  title: string;
  defaultValue?: string;
  options: { value: string; label: string; optionId: string }[];
};

const externalRadioFields: RadioFieldType[] = [
  {
    name: 'heatDamage',
    title: 'Evidence of heat damage',
    options: [
      { value: 'true', label: 'Yes', optionId: 'heatDamageYes' },
      { value: 'false', label: 'No', optionId: 'heatDamageNo' },
    ],
  },
  {
    name: 'repainting',
    title: 'Repainting',
    options: [
      { value: 'true', label: 'Yes', optionId: 'repaintingYes' },
      { value: 'false', label: 'No', optionId: 'repaintingNo' },
    ],
  },
  {
    name: 'odor',
    title: 'Odor',
    options: [
      { value: 'true', label: 'Yes', optionId: 'odorYes' },
      { value: 'false', label: 'No', optionId: 'odorNo' },
    ],
  },
  {
    name: 'bow',
    title: 'Bow',
    options: [
      { value: 'true', label: 'Yes', optionId: 'bowYes' },
      { value: 'false', label: 'No', optionId: 'bowNo' },
    ],
  },
  {
    name: 'bulges',
    title: 'Bulges',
    options: [
      { value: 'true', label: 'Yes', optionId: 'bulgesYes' },
      { value: 'false', label: 'No', optionId: 'bulgesNo' },
    ],
  },
  {
    name: 'hammerToneTest',
    title: 'Hummer tone test',
    options: [
      { value: 'true', label: 'Yes', optionId: 'hammerToneTestYes' },
      { value: 'false', label: 'No', optionId: 'hammerToneTestNo' },
    ],
  },
];
const valveRadioFields: RadioFieldType[] = [
  {
    name: 'burstDiskReplaced',
    title: 'Burst disk replaced',
    options: [
      { value: 'true', label: 'Yes', optionId: 'burstDiskReplacedYes' },
      { value: 'false', label: 'No', optionId: 'burstDiskReplacedNo' },
    ],
  },
  {
    name: 'oRingReplaced',
    title: '0-ring replaced',
    defaultValue: 'true',
    options: [
      { value: 'true', label: 'Yes', optionId: 'oRingReplacedYes' },
      { value: 'false', label: 'No', optionId: 'oRingReplacedNo' },
    ],
  },
  {
    name: 'dipTubeReplaced',
    title: 'Deep tube replaced',
    options: [
      { value: 'true', label: 'Yes', optionId: 'dipTubeReplacedYes' },
      { value: 'false', label: 'No', optionId: 'dipTubeReplacedNo' },
    ],
  },
];

export const CreateInspectionForm = ({ tank }: { tank: TankOutputDTO }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleFormAction = createFormAction(
    createInspection,
    '/inspections',
    toast,
    router.push
  );

  const [state, action, isPending] = useActionState(
    handleFormAction,
    undefined
  );
  const [pciNumber, setPciNumber] = useState('35823');

  const handleInspectorChange = (name: string) => {
    if (name === 'Deripalov Andrii') {
      setPciNumber('35823');
    } else if (name === 'Shai Karny') {
      setPciNumber('U29418');
    }
  };

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
            defaultValue={tank.internalNumber}
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

        <RadioField
          name='stickerAffixed'
          title='Visual inspections sticker affixed'
          defaultValue='false'
          options={[
            {
              value: 'true',
              label: 'Yes',
              optionId: 'stickerAffixedYes',
            },
            {
              value: 'false',
              label: 'No',
              optionId: 'stickerAffixedNo',
            },
          ]}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <RadioField
          name='valve.type'
          title='Valve type'
          defaultValue={tank.valve}
          options={[
            {
              value: 'YOKE',
              label: 'YOKE',
              optionId: 'valveTypeYoke',
            },
            {
              value: 'DIN',
              label: 'DIN',
              optionId: 'valveTypeDin',
            },
            {
              value: 'Other',
              label: 'Other',
              optionId: 'valveTypeOther',
            },
          ]}
        />

        <div className='md:w-5/6'>
          <Label htmlFor='grade'>Grade</Label>
          <Input type='number' id='grade' name='grade' min='1' max='10' />
        </div>

        <RadioField
          name='inspector.name'
          title="Inspector's name"
          defaultValue='Deripalov Andrii'
          options={[
            {
              value: 'Deripalov Andrii',
              label: 'Deripalov Andrii',
              optionId: 'deripalov',
            },
            {
              value: 'Shai Karny',
              label: 'Shai Karny',
              optionId: 'shai',
            },
          ]}
        />
      </div>
      <Input type='hidden' name='inspector.pciNumber' value={pciNumber} />
      <Input type='hidden' name='tankId' value={tank.id} />

      <Accordion type='single' collapsible>
        <AccordionItem value='Condemn'>
          <AccordionTrigger className='bg-slate-50 px-2 text-md hover:no-underline'>
            Optional fields
          </AccordionTrigger>
          <AccordionContent className='bg-slate-50 px-2 space-y-4'>
            <div className='section-title'>EXTERNAL SURFACE</div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {externalRadioFields.map(
                ({ name, title, defaultValue = 'false', options }) => (
                  <RadioField
                    key={name}
                    name={`external.${name}`}
                    title={title}
                    defaultValue={defaultValue}
                    options={options}
                  />
                )
              )}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <TextareaField
                id='external.description'
                title='Description of external surface'
              />
              <TextareaField
                id='external.damageLocation'
                title='Gouges, Pits, Marks more than 0.015" (location)'
              />
            </div>
            <RadioField
              name='external.verdict'
              title='Comparison to PSI Standarts/Manufacturers'
              defaultValue='Acceptable'
              options={[
                {
                  value: 'Acceptable',
                  label: 'Acceptable',
                  optionId: 'externalVerdictAcceptable',
                },
                {
                  value: 'Marginal',
                  label: 'Marginal',
                  optionId: 'externalVerdictMarginal',
                },
                {
                  value: 'Condemn',
                  label: 'Condemn',
                  optionId: 'externalVerdictCondemn',
                },
              ]}
            />
            <div className='section-title'>INTERNAL SURFACE</div>
            <TextareaField
              id='internal.description'
              title='Description (dept and location of pits or cracks)'
            />
            <RadioField
              name='internal.verdict'
              title='Comparison to PSI Standarts/Manufacturers'
              defaultValue='Acceptable'
              options={[
                {
                  value: 'Acceptable',
                  label: 'Acceptable',
                  optionId: 'internalVerdictAcceptable',
                },
                {
                  value: 'Marginal',
                  label: 'Marginal',
                  optionId: 'internalVerdictMarginal',
                },
                {
                  value: 'Condemn',
                  label: 'Condemn',
                  optionId: 'internalVerdictCondemn',
                },
              ]}
            />
            <div className='section-title'>THREADING</div>
            <TextareaField
              id='threading.description'
              title='Description (cracks assessment, 0-ring gland surface, number of threads damage)'
            />
            <RadioField
              name='threading.verdict'
              title='Comparison to PSI Standarts/Manufacturers'
              defaultValue='Acceptable'
              options={[
                {
                  value: 'Acceptable',
                  label: 'Acceptable',
                  optionId: 'threadingVerdictAcceptable',
                },
                {
                  value: 'Marginal',
                  label: 'Marginal',
                  optionId: 'threadingVerdictMarginal',
                },
                {
                  value: 'Condemn',
                  label: 'Condemn',
                  optionId: 'threadingVerdictCondemn',
                },
              ]}
            />
            <div className='section-title'>VALVE</div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {valveRadioFields.map(
                ({ name, title, defaultValue = 'false', options }) => (
                  <RadioField
                    key={name}
                    name={`valve.${name}`}
                    title={title}
                    defaultValue={defaultValue}
                    options={options}
                  />
                )
              )}
            </div>
            <TextareaField id='valve.description' title='Description' />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button disabled={isPending} type='submit'>
        {isPending ? 'Loading...' : 'Submit'}
      </Button>
    </form>
  );
};
