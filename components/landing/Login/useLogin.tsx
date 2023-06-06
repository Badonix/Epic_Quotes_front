import { useFormContext, useWatch } from 'react-hook-form';
export const useLogin = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const password = useWatch({ name: 'password' });

  return {
    handleSubmit,
    onSubmit,
    password,
    errors,
    reset,
  };
};
