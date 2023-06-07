import { useFormContext, useWatch } from 'react-hook-form';
import { login, fetchCSRFToken } from '@/services';
import { useRouter } from 'next/router';
import { useState } from 'react';
export const useLogin = () => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext();
  const onSubmit = async (data: any) => {
    try {
      await fetchCSRFToken();
      const res = await login(data);
      console.log(res);
      router.push('/news-feed');
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      console.log(e);
      if (e.response && e.response.status === 401) {
        setError('Wrong credentials');
      }
    }
  };
  const password = useWatch({ name: 'password' });
  return {
    handleSubmit,
    onSubmit,
    password,
    errors,
    reset,
    error,
    loading,
  };
};
