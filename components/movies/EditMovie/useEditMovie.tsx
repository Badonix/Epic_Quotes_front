import { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { editMovie, fetchCSRFToken } from '@/services';
import { useRouter } from 'next/router';
import { MovieType } from '@/types';
export const useEditMovie = (movie: MovieType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [preview, setPreview] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: movie.title,
      genre: movie.genre,
      year: movie.release_year,
      budget: movie.budget,
      director: movie.director,
      description: movie.description,
      banner: '',
    },
  });

  const banner = useWatch({ control, name: 'banner' });

  const onDrop = useCallback((acceptedFiles: any) => {
    setValue('banner', acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await fetchCSRFToken();
      const response = await editMovie(data, Number(movie.id));
      response.status === 200 && router.reload();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    let objectUrl: any;
    if (banner && typeof banner[0] !== 'string') {
      objectUrl = URL.createObjectURL(banner[0]);
      setPreview(objectUrl);
    }

    return () => URL.revokeObjectURL(objectUrl);
  }, [banner]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    getRootProps,
    getInputProps,
    banner,
    preview,
  };
};
