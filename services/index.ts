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
  const {
    description_en,
    description_ka,
    director_en,
    director_ka,
    title_en,
    title_ka,
    genre,
    banner,
    budget,
    year,
  } = data;
  const description = JSON.stringify({ description_en, description_ka });
  const director = JSON.stringify({ director_en, director_ka });
  const title = JSON.stringify({ title_en, title_ka });
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
