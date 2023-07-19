import { MovieType, UserType } from '@/types';
import { SetStateAction } from 'react';

export type PropsType = {
  user: UserType;
  movies?: MovieType[];
  setNewMovies: React.Dispatch<SetStateAction<MovieType[]>>;
};
