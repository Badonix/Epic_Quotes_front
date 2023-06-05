import { useContext, useRef, useEffect } from 'react';
import { ModalContext } from '@/context';
import { useFormContext, useWatch } from 'react-hook-form';
import { register } from '@/services';
export const useSignup = () => {
  const { setOpenModal } = useContext(ModalContext);
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
    try {
      const res = await register(data);
      console.log(res);
    } catch (e) {
      console.log(e);
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
  };
};
