import { addMovie, fetchCSRFToken } from '@/services';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useAddMovie = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await fetchCSRFToken();
      const response = await addMovie(data);
      console.log(response);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return { register, handleSubmit, onSubmit, errors, loading };
};
