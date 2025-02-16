import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RadioFieldType } from '../features/CreateInspectionForm';

export const RadioField = ({
  name,
  title,
  defaultValue,
  options,
}: RadioFieldType) => {
  return (
    <div>
      <Label htmlFor={name}>{title}</Label>
      <RadioGroup
        id={name}
        name={name}
        defaultValue={defaultValue}
        className='flex gap-4'
        required
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
