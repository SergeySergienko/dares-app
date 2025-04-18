import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const TextareaField = ({
  id,
  title,
  defaultValue,
  required = false,
}: {
  id: string;
  title: string;
  defaultValue?: string;
  required?: boolean;
}) => (
  <div>
    <Label htmlFor={id}>{title}</Label>
    <Textarea
      id={id}
      name={id}
      defaultValue={defaultValue}
      required={required}
    />
  </div>
);
