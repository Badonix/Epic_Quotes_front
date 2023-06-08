import { useFormContext } from 'react-hook-form';
import { useModal } from '@/hooks';
import { useState } from 'react';
import { useRouter } from 'next/router';
export const useResetPassword = () => {
  const router = useRouter();
  const { setOpenModal } = useModal();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [userError, setUserError] = useState<string | null>();
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext();
  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return { handleSubmit, router, onSubmit, errors, reset, userError, loading };
};
