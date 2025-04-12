'use client';

import { ReactNode, useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface DeleteDialogButtonProps {
  id: string;
  action: (id: string) => Promise<string>;
  redirectPath: string;
  dialogDescription: ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  triggerButtonContent?: ReactNode;
  triggerButtonClassName?: string;
}

export const DeleteDialogButton = ({
  id,
  action,
  redirectPath,
  dialogDescription,
  disabled,
  variant = 'destructive',
  size = 'default',
  triggerButtonContent = (
    <>
      <Trash2 />
      Delete
    </>
  ),
  triggerButtonClassName,
}: DeleteDialogButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setContainer(document.getElementById('custom-container'));
  }, []);

  const handleClick = async () => {
    setIsSubmitting(true);
    try {
      const message = await action(id);
      toast({
        title: 'SUCCESS!',
        description: message,
        duration: 5000,
        style: { color: 'white', backgroundColor: 'green' },
      });
      router.push(redirectPath);
      router.refresh();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong';
      toast({
        title: 'Oops...',
        description: errorMessage,
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={disabled || isSubmitting}
          className={triggerButtonClassName}
        >
          {triggerButtonContent}
        </Button>
      </AlertDialogTrigger>
      {container && (
        <AlertDialogContent container={container}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className='text-primary'>
              {dialogDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex-row justify-between items-center'>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={handleClick} disabled={isSubmitting}>
                {isSubmitting ? 'Deleting...' : 'Confirm'}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
