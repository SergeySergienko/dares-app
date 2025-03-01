import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Props {
  reset: () => void;
}
export function DataTableResetButton({ reset }: Props) {
  return (
    <Button variant='ghost' onClick={reset} className='p-0 gap-1'>
      Reset
      <X />
    </Button>
  );
}
