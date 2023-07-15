import { checkAuth } from '@/helpers';
import { searchMovie } from '@/services';
import { MovieType } from '@/types';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

export const useSearchMovie = (
  setSearchResults: React.Dispatch<SetStateAction<MovieType[]>>,
  setSearchOpen: React.Dispatch<SetStateAction<boolean>>,
  searchResult: MovieType[]
) => {
  const [windowWidth, setWindowWidth] = useState<number>(1);
  const { register, handleSubmit, control } = useForm<{ search: string }>();
  const { search } = useWatch({ control });
  const router = useRouter();
  const onSubmit = async (data: { search: string }) => {
    try {
      if (search) {
        let res = await searchMovie(data);
        setSearchResults(res.data);
        setSearchOpen(false);
      }
    } catch (e) {
      checkAuth(e, router);
    }
  };
  useEffect(() => {
    if (searchResult && !search) {
      setSearchResults([]);
    }
  }, [search]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return { windowWidth, register, onSubmit, handleSubmit };
};
