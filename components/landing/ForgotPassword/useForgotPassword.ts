import { useFormContext } from 'react-hook-form';
import { useModal } from '@/hooks';
import { fetchCSRFToken, sendPasswordReset } from '@/services';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
export const useForgotPassword = () => {
  const { setOpenModal } = useModal();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [userError, setUserError] = useState<string | null>();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useFormContext();
  const formFields = useWatch();
  const formData = useWatch({ control });
  useEffect(() => {
    userError && setUserError(null);
  }, [formFields]);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    fetchCSRFToken();
    try {
      const res = await sendPasswordReset(data);
      if (res.status === 200) {
        setOpenModal('passwordResetCheck');
        setIsLoading(false);
      }
    } catch (e: any) {
      setIsLoading(false);
      setUserError('User not found');
    }
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    reset,
    userError,
    loading,
    formData,
  };
};
