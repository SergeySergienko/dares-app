import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='report animate-pulse gap-y-8'>
      {/* Header Section */}
      <div className='flex justify-between items-center'>
        <Skeleton className='h-20 w-48' />
      </div>

      {/* Title Section */}
      <div className='flex justify-between items-center'>
        <Skeleton className='h-8 w-48' />
      </div>

      {/* Main Information */}
      <div className='grid grid-cols-2 gap-x-6 xs:gap-y-6'>
        <div className='field'>
          <Skeleton className='h-6 w-48' />
        </div>
        <div className='field'>
          <Skeleton className='h-6 w-48' />
        </div>
        <div className='field'>
          <Skeleton className='h-6 w-48' />
        </div>
      </div>

      {/* Used Parts */}
      <div className='bg-slate-50 md:max-w-xl'>
        <Skeleton className='h-6 w-48 mb-2' />
        <table className='w-full'>
          <thead>
            <tr>
              <th className='font-medium'>
                <Skeleton className='h-4 w-16' />
              </th>
              <th className='font-medium'>
                <Skeleton className='h-4 w-16' />
              </th>
              <th className='font-medium'>
                <Skeleton className='h-4 w-24' />
              </th>
              <th className='font-medium'>
                <Skeleton className='h-4 w-16' />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className='text-center'>
                  <Skeleton className='h-6 w-16' />
                </td>
                <td className='text-center'>
                  <Skeleton className='h-6 w-48' />
                </td>
                <td className='text-center'>
                  <Skeleton className='h-6 w-24' />
                </td>
                <td className='text-center'>
                  <Skeleton className='h-6 w-16' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex flex-row gap-x-4 mt-16'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-32' />
        </div>
      </div>
    </div>
  );
}
