import { fetchMovies } from '@/services';
import { MovieType } from '@/types';
import { useEffect, useState } from 'react';

export const useMovies = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
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
