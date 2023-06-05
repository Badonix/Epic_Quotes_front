import { ModalContext } from '@/context';
import { useContext, useEffect, useRef } from 'react';

export const useCheckEmail = () => {
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

  return {
    wrapperRef,
    setOpenModal,
  };
};
