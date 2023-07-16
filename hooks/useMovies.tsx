import { NotificationsContext } from '@/context';
import { fetchMovies } from '@/services';
import { MovieType, UserType } from '@/types';
import { useContext, useEffect, useState } from 'react';

export const useMovies = (user: UserType) => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
  const { setNotifications } = useContext(NotificationsContext);
  const getMovies = async () => {
    try {
      const res = await fetchMovies();
      return res.data;
    } catch (e) {}
  };

  useEffect(() => {
    const fetchMoviesData = async () => {
      const moviesData = await getMovies();
      if (moviesData) {
        setMovies(moviesData);
      }
    };
    fetchMoviesData();

    setNotifications(user.notifications);
  }, []);

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
