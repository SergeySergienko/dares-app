import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='w-full p-4 space-y-2'>
      <div className='flex flex-col items-center space-y-1'>
        <Skeleton className='h-8 w-60' />
        <Skeleton className='h-4 w-24' />
      </div>
      <div className='flex justify-between items-center space-y-0.5'>
        <Skeleton className='h-10 w-24 md:w-48' />
        <Skeleton className='h-10 w-24 md:w-48' />
      </div>
      <div className='space-y-2'>
        {Array.from({ length: 16 }).map((_, index) => (
          <Skeleton key={index} className='h-10 w-full' />
        ))}
      </div>
    </div>
  );
}
