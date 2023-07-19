import { NotificationsContext } from '@/context';
import { fetchMovies, getUser } from '@/services';
import { MovieType, UserType } from '@/types';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export const useMovies = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
  const [newMovies, setNewMovies] = useState<MovieType[]>([]);
  const { data: moviesData } = useQuery<MovieType[]>('movies', async () => {
    const res = await fetchMovies();
    return res.data;
  });
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser();
      return res.data;
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
