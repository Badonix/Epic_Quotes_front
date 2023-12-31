import { editQuote, fetchCSRFToken } from '@/services';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { PostType } from '@/types';
import { checkAuth } from '@/helpers';
export const useEditQuote = (quote: PostType | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm();
  const router = useRouter();
  const banner = useWatch({ control, name: 'image' });
  useEffect(() => {
    setValue('body.ka', quote?.body?.ka);
    setValue('body.en', quote?.body?.en);
  }, []);
  const onSubmit = async (data: any) => {
    try {
      data.movie_id = router.query.id;
      await fetchCSRFToken();
      const res = await editQuote(Number(quote?.id), data);
      res.status === 200 && router.reload();
    } catch (e) {
      checkAuth(e, router);
      setLoading(false);
    }
  };

  useEffect(() => {
    let objectUrl: any;
    if (banner) {
      objectUrl = URL.createObjectURL(banner[0]);
      setPreview(objectUrl);
    }

    return () => URL.revokeObjectURL(objectUrl);
  }, [banner]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    banner,
    preview,
    setValue,
  };
};
