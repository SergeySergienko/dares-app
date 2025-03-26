'use client';

export const createFormAction = (
  formActionFn: (
    state: any,
    formData: FormData
  ) => Promise<{ error?: string; message?: string }>,
  successRedirectPath: string,
  toast: (config: any) => void,
  push: (path: string) => void
) => {
  return async (state: any, formData: FormData) => {
    const result = await formActionFn(state, formData);
    if (result.error) {
      toast({
        title: 'Oops...',
        description: result.error,
        variant: 'destructive',
        duration: 5000,
      });
    } else if (result.message) {
      toast({
        title: 'SUCCESS!',
        description: result.message,
        duration: 5000,
        style: { color: 'white', backgroundColor: 'green' },
      });
      push(successRedirectPath);
    }
  };
};
