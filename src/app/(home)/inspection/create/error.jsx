'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className='text-red-500'>
        {error.message || 'Something went wrong'}
      </h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
