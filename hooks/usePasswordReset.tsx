import { useFormContext } from 'react-hook-form';
import { useModal } from '@/hooks';
import { useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
export const usePasswordReset = () => {
  const { setOpenModal } = useModal();
  const router = useRouter();
  const password = useWatch({ name: 'password' });
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext();
  const fields = useWatch();
  console.log(fields);
  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return {
    handleSubmit,
    onSubmit,
    password,
    router,
    errors,
    reset,
    setOpenModal,
  };
};
