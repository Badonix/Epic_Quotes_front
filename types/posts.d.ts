export type MovieType = {
  id?: number;
  title: {
    en: string;
    ka: string;
  };
  banner: string;
  genre: GenreType[];
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
  quotes?: PostType[];
};

export type GenreType = {
  id: number;
  value: {
    en: string;
    ka: string;
  };
  name: {
    en: string;
    ka: string;
  };
};

export type NotificationType = {
  id: number;
  sender_id: number;
  receiver_id: number;
  type: string;
  sender: UserType;
  receiver: UserType;
  read: boolean;
  created_at: string;
};

export type UserType = {
  id?: number;
  username: string;
  email: string;
  google_id?: number;
  avatar?: string;
  notifications: NotificationType[];
};

export type CommentType = {
  id?: number;
  body: string;
  user_id: number;
  post_id: number;
  user: UserType;
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
  comments: CommentType[];
  likes: LikesType[];
};

export type LikesType = {
  id: number;
  user_id: number;
  quote_id: number;
};
