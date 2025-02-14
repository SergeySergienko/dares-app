'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className='text-red-500'>
        {error.message || 'Something went wrong'}
      </h2>
      <Button onClick={() => redirect('/')}>Try again</Button>
    </div>
  );
}
