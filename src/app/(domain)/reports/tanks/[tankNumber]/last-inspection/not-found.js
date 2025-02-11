import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white text-black dark:bg-black dark:text-white'>
      <div className='text-center'>
        <div className='flex items-center justify-center'>
          <h1 className='next-error-h1 border-r border-black/30 pr-6 text-3xl font-medium leading-[49px] dark:border-white/30'>
            404
          </h1>
          <h2 className='ml-6 text-lg font-normal leading-[49px]'>
            Could not find requested resource
          </h2>
        </div>
        <Link
          href='/'
          className='mt-6 inline-block rounded bg-black px-6 py-2 text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
