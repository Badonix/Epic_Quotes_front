import { MovieType, PostType, UserType } from './posts';

export type FeedPropsType = {
  movies: MovieType[];
  quotes: PostType[];
  user: UserType;
};
