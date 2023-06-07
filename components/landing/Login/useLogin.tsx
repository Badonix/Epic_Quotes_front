import { useFormContext, useWatch } from 'react-hook-form';
import { login, fetchCSRFToken } from '@/services';
import { useRouter } from 'next/router';
import { useState } from 'react';
export const useLogin = () => {
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext();
  const onSubmit = (data: any) => {
    fetchCSRFToken();
    login(data)
      .then((res) => {
        console.log(res);
        router.push('/news-feed');
      })
      .catch((e) => e.response.status == 401 && setError('Wrong credentials'));
  };
  const password = useWatch({ name: 'password' });
  return {
    handleSubmit,
    onSubmit,
    password,
    errors,
    reset,
    error,
  };
};
