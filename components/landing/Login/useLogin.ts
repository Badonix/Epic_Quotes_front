import { useForm, useFormContext, useWatch } from 'react-hook-form';
import { login, fetchCSRFToken } from '@/services';
import { useRouter } from 'next/router';
import { useState } from 'react';
export const useLogin = () => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { locale } = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    register,
  } = useForm({ mode: 'onChange' });
  const formData = useWatch({ control });

  const onSubmit = async (data: any) => {
    try {
      await fetchCSRFToken();
      await login(data);
      router.push('/news-feed');
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      if (e.response && e.response.status === 401) {
        locale == 'en'
          ? setError('Wrong credentials')
          : setError('არასწორი ინფო');
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
    formData,
    register,
  };
};
