import { MovieType, UserType } from '@/types';

export type PropsType = {
  setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>;
  user: UserType;
  movies: MovieType[];
};
