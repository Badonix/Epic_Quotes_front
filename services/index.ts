import {
  addMovie as AddMovieType,
  addCommentType,
  updateProfileType,
} from '@/types';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  async (response) => {
    return response;
  },

  async (error) => {
    const status = error?.response?.status;
    if (status === 404) {
    } else if (status === 403 || status === 401) {
    }

    return Promise.reject(error);
  }
);

export const register = async (data: any) => {
  const response = await instance.post('/api/register', data);
  return response;
};

export const fetchCSRFToken = async () => {
  const response = await instance.get('/sanctum/csrf-cookie', {
    headers: {
      Origin: process.env.NEXT_PUBLIC_API_ORIGIN,
      Referer: process.env.NEXT_PUBLIC_API_REFERER,
    },
  });
  return response;
};

export const login = async (data: any) => {
  const response = await instance.post('/api/login', data);
  const { email, username } = response.data.user;
  localStorage.setItem('user', JSON.stringify({ email, username }));
  return response;
};

export const sendPasswordReset = async (data: any) => {
  const response = await instance.post('/api/forgot-password', data);
  return response;
};

export const resetPassword = async (data: any) => {
  const response = await instance.post('/api/reset-password', data);
  return response;
};
export const me = async (cookie?: any) => {
  const response = await instance.get('api/me', {
    headers: {
      Origin: process.env.NEXT_PUBLIC_API_ORIGIN,
      Referer: process.env.NEXT_PUBLIC_API_REFERER,
      Cookie: cookie,
    },
  });
  return response;
};

export const googleSignIn = async (data: any, cookie: any) => {
  const response = await instance.post('/api/auth/callback', data, {
    headers: {
      Origin: process.env.NEXT_PUBLIC_API_ORIGIN,
      Referer: process.env.NEXT_PUBLIC_API_REFERER,
      cookie: cookie,
    },
  });
  return response;
};

export const addMovie = async (data: AddMovieType) => {
  const { description, director, title, genre, banner, budget, year } = data;
  const movieData = {
    description,
    director,
    title,
    genre,
    banner: banner[0],
    release_year: year,
    budget,
  };
  const response = await instance.post('/api/movies', movieData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const fetchMovies = async (cookie?: any) => {
  const headers = {
    Origin: process.env.NEXT_PUBLIC_API_ORIGIN,
    Referer: process.env.NEXT_PUBLIC_API_REFERER,
    Cookie: null,
  };
  if (cookie) headers.Cookie = cookie;
  const response = await instance.get('/api/movies', { headers });
  return response;
};

export const fetchMovie = async (id: number, cookie: any) => {
  const response = await instance.get(`/api/movies/${id}`, {
    headers: {
      Origin: process.env.NEXT_PUBLIC_API_ORIGIN,
      Referer: process.env.NEXT_PUBLIC_API_REFERER,
      Cookie: cookie,
    },
  });
  return response;
};

export const deleteMovie = async (id: number) => {
  const response = await instance.delete(`/api/movies/${id}`);
  return response;
};

export const editMovie = async (data: any, id: number) => {
  const { description, director, title, genre, banner, budget, year } = data;
  const movieData = {
    description,
    director,
    title,
    genre,
    banner: banner[0],
    release_year: year,
    budget,
  };

  const response = await instance.post(`/api/movies/${id}/edit`, movieData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const addQuote = async (data: any) => {
  const { body, movie_id, image } = data;
  const quoteData = {
    body,
    movie_id,
    image: image[0],
  };
  const response = await instance.post('/api/quotes', quoteData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const fetchQuote = async (id: number, cookie: any) => {
  const response = await instance.get('/api/quotes/' + id, {
    headers: {
      Origin: process.env.NEXT_PUBLIC_API_ORIGIN,
      Referer: process.env.NEXT_PUBLIC_API_REFERER,
      Cookie: cookie,
    },
  });
  return response;
};

export const deleteQuote = async (id: number) => {
  const response = await instance.delete('/api/quotes/' + id);
  return response;
};

export const editQuote = async (quoteId: number, data: any) => {
  const { body, image, movie_id } = data;
  const quoteData = {
    body,
    image: image[0],
    movie_id,
  };
  const response = await instance.post(
    '/api/quotes/' + quoteId + '/edit',
    quoteData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response;
};

export const updateProfile = async (data: updateProfileType) => {
  const response = await instance.post('/api/profile', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const fetchPosts = async (page: number) => {
  const response = await instance.get('/api/quotes' + `?page=${page}`);
  return response;
};

export const addComment = async (data: addCommentType) => {
  const response = await instance.post('/api/comments', data);
  return response;
};

export const addLike = async (id: Number) => {
  const response = await instance.post('/api/like/' + id);
  return response;
};

export const removeLike = async (id: Number) => {
  const response = await instance.post('/api/unlike/' + id);
  return response;
};

export const search = async (body: { search: string }) => {
  const response = await instance.post('/api/search', body);
  return response;
};
