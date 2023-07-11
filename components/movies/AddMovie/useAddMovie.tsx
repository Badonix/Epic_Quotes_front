import { addMovie, fetchCSRFToken } from '@/services';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useModal } from '@/hooks';
import { useDropzone } from 'react-dropzone';
import { MovieType } from '@/types';
export const useAddMovie = (
  setMovies: React.Dispatch<SetStateAction<MovieType[]>>,
  movies: MovieType[]
) => {
  const { setOpenModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm();

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
      const response = await addMovie(data);
      let updatedMovies = [response.data, ...movies];
      setMovies(updatedMovies);
      setOpenModal('');
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const validateBanner = (value: FileList) => {
    if (!value || value.length === 0) {
      return 'Movie banner is required';
    }
    return true;
  };

  useEffect(() => {
    let objectUrl: any;
    if (banner) {
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
    validateBanner,
    banner,
    preview,
  };
};
