import { addMovie, fetchCSRFToken, getGenres } from '@/services';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useModal } from '@/hooks';
import { useDropzone } from 'react-dropzone';
import { GenreType, MovieType } from '@/types';
import { useTranslation } from 'next-i18next';
import { checkAuth } from '@/helpers';
import { useRouter } from 'next/router';
import { GenreOptions } from './types';
export const useAddMovie = (
  setNewMovies: React.Dispatch<SetStateAction<MovieType[]>>,
  movies?: MovieType[]
) => {
  const { setOpenModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState('');
  const [genres, setGenres] = useState<GenreType[]>();
  const [genreOptions, setGenreOptions] = useState<GenreOptions[]>();
  const router = useRouter();
  const { locale } = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm();
  const { t } = useTranslation();
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
      const updatedGenres = data.genre.map((genre: any) => {
        return genre.name;
      });
      data.genre = updatedGenres;
      console.log(data);
      const response = await addMovie(data);
      let updatedMovies;
      if (movies) {
        setNewMovies((prev) => [response.data, ...prev]);
      }
      movies = updatedMovies;
      setOpenModal('');
      setLoading(false);
    } catch (e) {
      checkAuth(e, router);
      setLoading(false);
    }
  };

  const validateBanner = (value: FileList) => {
    if (!value || value.length === 0) {
      return t('movies.addmovie.banner_required');
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
  useEffect(() => {
    const fetchGenresData = async () => {
      try {
        const genreData = await getGenres();
        setGenres(genreData.data);
      } catch (error) {}
    };

    fetchGenresData();
  }, []);
  useEffect(() => {
    let genresData = genres?.map((genre) => {
      return {
        name: { en: genre?.name?.en, ka: genre?.name?.ka },
        value: { en: genre?.name?.en, ka: genre?.name?.ka },
        label: { en: genre?.name?.en, ka: genre?.name?.ka },
        isFixed: true,
      };
    });
    setGenreOptions(genresData);
  }, [genres]);
  const customStyles = {
    option: () => ({
      backgroundColor: '#24222F',
      cursor: 'pointer',
      padding: '5px',
      color: 'white',
      '&:hover': {
        backgroundColor: '#4A475D',
      },
    }),
    multiValue: () => ({
      backgroundColor: 'gray',
      borderRadius: '3px',
      display: 'inline-flex',
      marginRight: '10px',
      color: 'white',
    }),
    multiValueLabel: () => ({
      color: 'white',
    }),
    noOptionsMessage: () => ({
      display: 'none',
    }),
  };

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
    customStyles,
    locale,
    setValue,
    genreOptions,
  };
};
