import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const TextareaField = ({ id, title }: { id: string; title: string }) => (
  <div>
    <Label htmlFor={id}>{title}</Label>
    <Textarea id={id} name={id} />
  </div>
);
