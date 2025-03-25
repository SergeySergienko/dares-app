import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='report animate-pulse'>
      {/* Header Section */}
      <div className='flex justify-between items-center mb-4'>
        <Skeleton className='h-20 w-96' />
      </div>

      {/* Title Section */}
      <div className='flex justify-between items-center'>
        <Skeleton className='h-8 w-[500px] mb-4' />
      </div>

      {/* Owner Information */}
      <div className='grid grid-cols-2 xs:grid-cols-3 gap-x-6 p-1 mb-4'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className='h-6 col-span-1' />
        ))}
      </div>

      {/* Tank Information */}
      <div className='grid grid-cols-2 xs:grid-cols-3 gap-x-6 mb-4'>
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton key={index} className='h-6 col-span-1' />
        ))}
      </div>

      {/* External Surface */}
      <Skeleton className='h-6 w-48 mb-2' />
      <div className='grid grid-cols-2 xs:grid-cols-3 gap-x-6 mb-4'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className='h-6 col-span-1' />
        ))}
      </div>
      <Skeleton className='h-6 w-full mb-2' />
      <Skeleton className='h-6 w-full mb-2' />
      <Skeleton className='h-6 w-full mb-4' />

      {/* Internal Surface */}
      <Skeleton className='h-6 w-48 mb-2' />
      <Skeleton className='h-6 w-full mb-2' />
      <Skeleton className='h-6 w-full mb-4' />

      {/* Threading */}
      <Skeleton className='h-6 w-48 mb-2' />
      <Skeleton className='h-6 w-full mb-2' />
      <Skeleton className='h-6 w-full mb-4' />

      {/* Valve */}
      <Skeleton className='h-6 w-48 mb-2' />
      <Skeleton className='h-6 w-24 mb-2' />
      <div className='grid grid-cols-2 xs:grid-cols-3 gap-x-6 mb-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className='h-6 col-span-1' />
        ))}
      </div>
      <Skeleton className='h-6 w-full mb-4' />

      {/* Final Conclusion */}
      <Skeleton className='h-6 w-48 mb-2' />
      <Skeleton className='h-6 w-full mb-4' />
      <div className='grid grid-cols-2 gap-6 mb-4'>
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className='h-6 col-span-1' />
        ))}
      </div>
      <div className='grid grid-cols-2 gap-6 mb-4'>
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className='h-6 col-span-1' />
        ))}
      </div>
    </div>
  );
}
