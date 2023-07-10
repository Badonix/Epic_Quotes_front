export type addMovie = {
  description: {
    en: string;
    ka: string;
  };
  director: {
    en: string;
    ka: string;
  };
  genre: string;
  title: {
    en: string;
    ka: string;
  };
  budget: number;
  year: number;
  banner: Array;
};

export type updateProfileType = {
  username?: string;
  password?: string;
  password_confirmation?: string;
  email?: string;
  avatar?: File;
};

export type addQuote = {
  body?: {
    en: string;
    ka: string;
  };
  image?: string;
  movie_id?: number;
};

export type addCommentType = {
  post_id?: number;
  body?: string;
};
