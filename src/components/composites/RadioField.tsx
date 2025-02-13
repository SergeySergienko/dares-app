import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { externalRadioFieldsType } from '../features/CreateInspectionForm';

export const RadioField = ({
  name,
  title,
  defaultValue,
  options,
}: externalRadioFieldsType) => {
  return (
    <div className='gap-4'>
      <Label htmlFor={name}>{title}</Label>
      <RadioGroup
        id={name}
        name={name}
        defaultValue={defaultValue}
        className='flex'
      >
        {options.map(({ value, label, optionId }) => (
          <div key={value} className='flex items-center space-x-2'>
            <RadioGroupItem value={value} id={optionId} />
            <Label htmlFor={optionId}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
