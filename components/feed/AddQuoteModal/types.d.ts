import { MovieType, PostType } from '@/types';

export type PropsType = {
  movies: MovieType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};
