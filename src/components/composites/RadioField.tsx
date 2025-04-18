import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export type RadioFieldType<T> = {
  name: T;
  title: string;
  defaultValue?: string;
  options: { value: string; label: string; optionId: string }[];
};

export const RadioField = <T extends string>({
  name,
  title,
  defaultValue,
  options,
}: RadioFieldType<T>) => {
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
