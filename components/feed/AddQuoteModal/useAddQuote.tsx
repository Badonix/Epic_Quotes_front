import { addQuote, fetchCSRFToken } from '@/services';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useModal } from '@/hooks';
import { useDropzone } from 'react-dropzone';
import { PostType, addQuote as addQuoteType } from '@/types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { checkAuth } from '@/helpers';
export const useAddQuote = (setPosts: SetStateAction<any>) => {
  const { locale } = useRouter();
  const router = useRouter();
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

  const banner = useWatch({ control, name: 'image' });

  const onDrop = useCallback((acceptedFiles: any) => {
    setValue('image', acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const onSubmit = async (data: addQuoteType) => {
    try {
      setLoading(true);
      await fetchCSRFToken();
      const response = await addQuote(data);
      setOpenModal('');
      setPosts((prevPosts: [PostType]) => [...[response.data], ...prevPosts]);
      setLoading(false);
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

  const validateBanner = (value: FileList) => {
    if (!value || value.length === 0) {
      return t('addquote.quote_image_required');
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
    locale,
  };
};
