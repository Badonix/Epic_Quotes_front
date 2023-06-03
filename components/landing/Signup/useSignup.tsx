import { useContext, useRef, useEffect } from 'react';
import { ModalContext } from '@/context';
import { useFormContext, useWatch } from 'react-hook-form';
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
  } = useFormContext();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const password = useWatch({ name: 'password' });
  console.log(errors);

  return { wrapperRef, handleSubmit, onSubmit, password };
};
