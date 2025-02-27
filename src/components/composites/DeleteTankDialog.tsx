'use client';

import { useEffect, useState } from 'react';
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
import { deleteTank } from '@/actions/tank-actions';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export const DeleteTankDialog = ({ id }: { id: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById('custom-container'));
  }, []);

  const handleClick = async () => {
    try {
      const message = await deleteTank(id);
      toast({
        title: 'SUCCESS!',
        description: message,
        duration: 5000,
        style: { color: 'white', backgroundColor: 'green' },
      });
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
      router.push('/tanks');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>
          <Trash2 />
          Delete
        </Button>
      </AlertDialogTrigger>
      {container && (
        <AlertDialogContent container={container}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className='text-primary'>
              <span className='block text-destructive font-semibold'>
                There is no backup for the Tank!
              </span>
              This action cannot be undone. This will permanently delete this
              Tank and and remove the associated data from DB.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex-row justify-between items-center'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={handleClick}>Confirm</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
