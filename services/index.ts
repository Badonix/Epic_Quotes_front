import { addMovie as AddMovieType } from '@/types';
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
export const me = async () => {
  const response = await instance.get('api/me');
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
  console.log(response);
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
  console.log(movieData);
  const response = await instance.post('/api/movies', movieData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const fetchMovies = async (cookie: any) => {
  const response = await instance.get('/api/movies', {
    headers: {
      Origin: process.env.NEXT_PUBLIC_API_ORIGIN,
      Referer: process.env.NEXT_PUBLIC_API_REFERER,
      Cookie: cookie,
    },
  });
  return response;
};

export const fetchMovie = async (id: number) => {
  const response = await instance.get(`/api/movies/${id}`);
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
  console.log(movieData);

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
