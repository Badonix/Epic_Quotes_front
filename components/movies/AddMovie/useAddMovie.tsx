import { useForm } from 'react-hook-form';

export const useAddMovie = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return { register, handleSubmit, onSubmit, errors };
};
