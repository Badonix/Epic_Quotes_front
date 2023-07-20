import { useContext, useState } from 'react';
import { ModalContext } from '@/context';
import { useFormContext, useWatch } from 'react-hook-form';
import { fetchCSRFToken, signUp } from '@/services';
export const useSignup = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [usernameError, setUsernameError] = useState<null | string>(null);
  const [emailError, setEmailError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    control,
    setError,
  } = useFormContext();
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setEmailError(null);
    setUsernameError(null);
    try {
      await fetchCSRFToken();
      const res = await signUp(data);
      if (res.status == 201) {
        setIsLoading(false);
        reset();
        setOpenModal('checkEmail');
      }
    } catch (e: any) {
      if (e.response?.status == 422) {
        setIsLoading(false);
        e.response.data?.data?.email &&
          setError('email', { message: e.response.data?.data?.email[0] });
        e.response.data?.data?.username &&
          setError('username', { message: e.response.data?.data?.username[0] });
      }
      setIsLoading(false);
    }
  };
  const password = useWatch({ control, name: 'password' });
  return {
    handleSubmit,
    onSubmit,
    password,
    errors,
    reset,
    usernameError,
    emailError,
    isLoading,
    register,
  };
};
