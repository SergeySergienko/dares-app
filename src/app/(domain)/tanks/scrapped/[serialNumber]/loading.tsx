import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='report xs:gap-y-8'>
      <div className='flex justify-between items-center'>
        <Skeleton className='h-16 w-48' />
      </div>
      <div>
        <Skeleton className='h-10 w-48' />
      </div>
      <div className='grid grid-cols-2 md:grid-row-3 md:grid-cols-3 gap-x-6 xs:gap-y-6'>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className='field'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-6 w-32 mt-2' />
          </div>
        ))}
      </div>
      <div className='flex flex-row gap-x-4 mt-16'>
        <Skeleton className='h-10 w-32' />
        <Skeleton className='h-10 w-32' />
      </div>
    </div>
  );
}
