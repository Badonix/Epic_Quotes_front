import { fetchMovies } from '@/services';
import { useEffect, useState } from 'react';

export const useMovies = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const [movies, setMovies] = useState<any[]>([]);
  const getMovies = async () => {
    try {
      const res = await fetchMovies();
      return res.data;
    } catch (e) {
      console.log(e);
    }
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
  };
};
