import { useContext, useState } from 'react';
import { ModalContext } from '@/context';
import { useFormContext, useWatch } from 'react-hook-form';
import { register } from '@/services';
export const useSignup = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [usernameError, setUsernameError] = useState<null | string>(null);
  const [emailError, setEmailError] = useState<null | string>(null);

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext();
  const onSubmit = async (data: any) => {
    setEmailError(null);
    setUsernameError(null);
    try {
      const res = await register(data);
      if (res.status == 201) {
        reset();
        setOpenModal('checkEmail');
      }
    } catch (e: any) {
      if (e.response.status == 422) {
        e.response.data?.data?.email &&
          setEmailError(e.response.data?.data?.email[0]);
        e.response.data?.data?.username &&
          setUsernameError(e.response.data?.data?.username[0]);
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
    usernameError,
    emailError,
  };
};
