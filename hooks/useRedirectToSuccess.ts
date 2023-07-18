import { useContext, useEffect } from 'react';
import { ModalContext } from '@/context';
import { useRouter } from 'next/router';
export const useRedirectToSuccess = () => {
  const { setOpenModal } = useContext(ModalContext);
  const router = useRouter();
  useEffect(() => {
    setOpenModal('verified');
    router.push('/');
  });
};
