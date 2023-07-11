import { MovieType, PostType, UserType } from '@/types';

export type PropsType = {
  movies: MovieType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  user: UserType;
};
