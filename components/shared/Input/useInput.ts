import { useFormContext } from 'react-hook-form';

export const useInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return {
    register,
    errors,
  };
};
