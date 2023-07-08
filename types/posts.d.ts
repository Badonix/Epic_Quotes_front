export type MovieType = {
  id?: number;
  title: {
    en: string;
    ka: string;
  };
  banner: string;
  genre: string;
  budget: number;
  release_year: number;
  description: {
    en: string;
    ka: string;
  };
  director: {
    en: string;
    ka: string;
  };
};

export type UserType = {
  id?: number;
  username: string;
  email: string;
  google_id?: number;
  avatar: string;
};

export type PostType = {
  id: number;
  user_id: number;
  movie_id: number;
  body: {
    en: string;
    ka: string;
  };
  image: string;
  movie: MovieType;
  user: UserType;
};
