import * as React from 'react';

export const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<'span'>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className='absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [-webkit-clip-path:inset(100%)] [clip-path:inset(100%)]'
      {...props}
    />
  );
});
VisuallyHidden.displayName = 'VisuallyHidden';
