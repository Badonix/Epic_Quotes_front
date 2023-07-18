import { NotificationsContext } from '@/context';
import { fetchMovies } from '@/services';
import { MovieType, UserType } from '@/types';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export const useMovies = (user: UserType) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
  const { setNotifications } = useContext(NotificationsContext);
  const fetchMoviesData = async (): Promise<any> => {
    const response = await fetchMovies();
    return response?.data;
  };
  const { data: moviesData } = useQuery('movies', fetchMoviesData);
  useEffect(() => {
    if (moviesData) {
      setMovies(moviesData);
    }

    setNotifications(user.notifications);
  }, [moviesData]);

  return {
    sidebarActive,
    setSidebarActive,
    movies,
    setMovies,
    searchOpen,
    setSearchOpen,
    searchResults,
    setSearchResults,
  };
};
