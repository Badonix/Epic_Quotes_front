import { useContext, useRef, useEffect, useState } from 'react';
import { ModalContext } from '@/context';
import { useFormContext, useWatch } from 'react-hook-form';
import { register } from '@/services';
export const useSignup = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [usernameError, setUsernameError] = useState<null | string>(null);
  const [emailError, setEmailError] = useState<null | string>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenModal(null);
        reset();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpenModal]);

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
      console.log(res);
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
    wrapperRef,
    handleSubmit,
    onSubmit,
    password,
    setOpenModal,
    errors,
    reset,
    usernameError,
    emailError,
  };
};
