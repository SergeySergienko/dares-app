import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const TextareaField = ({
  id,
  title,
  required = false,
}: {
  id: string;
  title: string;
  required?: boolean;
}) => (
  <div>
    <Label htmlFor={id}>{title}</Label>
    <Textarea id={id} name={id} required={required} />
  </div>
);
