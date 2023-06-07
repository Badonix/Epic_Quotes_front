import { useFormContext, useWatch } from 'react-hook-form';
import { login, fetchCSRFToken } from '@/services';
import { useRouter } from 'next/router';
import { useState } from 'react';
export const useLogin = () => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext();
  const onSubmit = (data: any) => {
    setLoading(true);
    fetchCSRFToken();
    login(data)
      .then((res) => {
        console.log(res);
        router.push('/news-feed');
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        e.response.status == 401 && setError('Wrong credentials');
      });
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
