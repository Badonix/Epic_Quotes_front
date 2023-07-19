import { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { editMovie, fetchCSRFToken, getGenres } from '@/services';
import { useRouter } from 'next/router';
import { GenreType, MovieType } from '@/types';
import { checkAuth } from '@/helpers';
import { GenreOptions } from '../AddMovie/types';
export const useEditMovie = (movie: MovieType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { locale } = useRouter();
  const [preview, setPreview] = useState('');
  const [genres, setGenres] = useState<GenreType[]>();
  const [genreOptions, setGenreOptions] = useState<GenreOptions[]>();
  const [genreValue, setGenreValue] = useState<any>();
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
      const updatedGenres = data.genre.map((genre: any) => {
        return genre.name;
      });
      data.genre = updatedGenres;
      const response = await editMovie(data, Number(movie.id));
      response.status === 200 && router.reload();
      setLoading(false);
    } catch (e) {
      checkAuth(e, router);
      setLoading(false);
    }
  };

  useEffect(() => {
    const chosen = movie.genre.map((genre) => {
      return {
        name: genre,
        value: genre,
        label: genre,
        isFixed: true,
      };
    });
    setGenreValue(chosen);
  }, [movie]);
  useEffect(() => {
    let objectUrl: any;
    if (banner && typeof banner[0] !== 'string') {
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
    banner,
    preview,
    setValue,
    customStyles,
    genreOptions,
    genreValue,
    setGenreValue,
    locale,
  };
};
