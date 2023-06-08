import { useFormContext } from 'react-hook-form';

export const useForgotPassword = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return { handleSubmit, onSubmit, errors, reset };
};
