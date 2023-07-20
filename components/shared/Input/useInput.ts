import { useFormContext, useWatch } from 'react-hook-form';

export const useInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const formData = useWatch();
  return {
    register,
    errors,
    formData,
  };
};
