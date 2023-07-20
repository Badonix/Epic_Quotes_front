import { useFormContext } from 'react-hook-form';
import { useModal } from '@/hooks';
import { useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { fetchCSRFToken, resetPassword } from '@/services';
export const usePasswordReset = () => {
  const { setOpenModal } = useModal();
  const router = useRouter();
  const email = router.query.email;
  const token = router.query.token;
  const password = useWatch({ name: 'password' });
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useFormContext();
  const formData = useWatch({ control });
  const onSubmit = async (data: any) => {
    try {
      await fetchCSRFToken();
      const response = await resetPassword({ ...data, token, email });
      if (response.status === 200) {
        router.push('/');
        setOpenModal('resetSuccess');
      }
    } catch (e) {}
  };

  return {
    handleSubmit,
    onSubmit,
    password,
    router,
    errors,
    reset,
    setOpenModal,
    formData,
  };
};
