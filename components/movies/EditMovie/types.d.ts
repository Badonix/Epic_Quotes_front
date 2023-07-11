import { MovieType, UserType } from '@/types';

export type PropsType = {
  movies?: MovieType[];
  movie: MovieType;
  user?: UserType;
  setMovies?: React.Dispatch<React.SetStateAction<MovieType[]>>;
};
