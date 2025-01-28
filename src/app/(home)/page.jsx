import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function HomePage() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center mx-auto space-y-8'>
      <div className='w-full flex justify-between items-end gap-4'>
        <Label htmlFor='tankNumber' className='text-2xl xs:text-3xl'>
          Tank Number
        </Label>
        <Input
          type='number'
          id='tankNumber'
          min='1'
          max='999'
          className='w-20 h-auto text-xl px-2 md:text-2xl font-bold rounded-none border-0 border-b-2 border-gray-600 focus:outline-none focus-visible:ring-0'
        />
      </div>
      <div className='w-full flex justify-between gap-4'>
        <Button>Tank Card</Button>
        <Button>Last Inspection</Button>
      </div>
    </div>
  );
}
