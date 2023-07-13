import { addQuote, fetchCSRFToken } from '@/services';
import { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useModal } from '@/hooks';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
export const useAddMovieQuote = (movieId: number) => {
  const { setOpenModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState('');
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm();
  const router = useRouter();
  const banner = useWatch({ control, name: 'image' });

  const onDrop = useCallback((acceptedFiles: any) => {
    setValue('image', acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const onSubmit = async (data: any) => {
    try {
      data.movie_id = movieId;
      setLoading(true);
      await fetchCSRFToken();
      const response = await addQuote(data);
      response.status === 201 && router.reload();
      setOpenModal('');
      setLoading(false);
    } catch (e) {
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

  const validateBanner = (value: FileList) => {
    if (!value || value.length === 0) {
      return t('addquote.image_required');
    }
    return true;
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    getRootProps,
    getInputProps,
    banner,
    validateBanner,
    preview,
    setValue,
  };
};
