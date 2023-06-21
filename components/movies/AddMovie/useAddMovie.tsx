import { addMovie, fetchCSRFToken } from '@/services';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from '@/hooks';
export const useAddMovie = (setMovies: any, movies: any) => {
  const { setOpenModal } = useModal();
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
      let updatedMovies = [response.data, ...movies];
      setMovies(updatedMovies);
      setOpenModal('');
      console.log(response);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return { register, handleSubmit, onSubmit, errors, loading };
};
