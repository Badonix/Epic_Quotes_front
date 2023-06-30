import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
export const useEditQuote = (quote: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm();
  const banner = useWatch({ control, name: 'image' });
  useEffect(() => {
    setValue('body.ka', quote?.body.ka);
    setValue('body.en', quote?.body.en);
  });
  const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    let objectUrl: any;
    if (banner) {
      objectUrl = URL.createObjectURL(banner[0]);
      console.log(objectUrl);
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
