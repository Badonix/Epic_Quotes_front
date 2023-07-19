import { MovieType, UserType } from '@/types';
import { SetStateAction } from 'react';

export type PropsType = {
  user: UserType;
  movies?: MovieType[];
  setNewMovies: React.Dispatch<SetStateAction<MovieType[]>>;
};

export type GenreOptions = {
  value?: {
    en: string;
    ka: string;
  };
  name?: {
    en: string;
    ka: string;
  };
  label: {
    en: string;
    ka: string;
  };
  isFixed: boolean;
};
