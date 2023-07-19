import { NotificationsContext } from '@/context';
import { checkAuth } from '@/helpers';
import { fetchMovies, getUser } from '@/services';
import { MovieType, UserType } from '@/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

export const useMovies = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
  const [newMovies, setNewMovies] = useState<MovieType[]>([]);
  const router = useRouter();
  const { locale } = useRouter();
  const { data: moviesData } = useQuery<MovieType[]>({
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await fetchMovies();
      return res.data;
    },
    retry: 0,
    onError(err) {
      checkAuth(err, router, locale);
    },
  });
  const { data: userData } = useQuery({
    queryKey: ['user'],
    retry: 0,
    queryFn: async () => {
      const res = await getUser();
      return res.data;
    },
    onError(err) {
      checkAuth(err, router, locale);
    },
  });

  return {
    sidebarActive,
    setSidebarActive,
    searchOpen,
    setSearchOpen,
    searchResults,
    setSearchResults,
    moviesData,
    userData,
    setNewMovies,
    newMovies,
  };
};
