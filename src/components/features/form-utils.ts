'use client';

export const createFormAction = (
  formActionFn: (state: any, formData: FormData) => Promise<string>,
  successRedirectPath: string,
  toast: (config: any) => void,
  push: (path: string) => void
) => {
  return async (state: any, formData: FormData) => {
    try {
      const message = await formActionFn(state, formData);
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
      push(successRedirectPath);
    }
  };
};
