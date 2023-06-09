import { Expired } from '@/components/icons';
import { useModal } from '@/hooks';
import { useRouter } from 'next/router';
import React from 'react';
const ExpiredToken = () => {
  const { setOpenModal } = useModal();
  const router = useRouter();
  return (
    <div className='px-2 bg-default sm:px-0 fixed h-screen w-screen flex items-center justify-center z-50'>
      <div className='bg-horizontal-gradient bg-modal relative max-w-xl sm:px-20 sm:py-12 px-8 py-16 flex flex-col justify-center items-center text-white rounded-lg gap-4'>
        <Expired />
        <h2 className='text-4xl'>Link expired!</h2>
        <p className='text-center w-80'>
          Login link has expired, because you haven’t used it
        </p>

        <button
          onClick={() => {
            router.push('/');
            setOpenModal('forgotPassword');
          }}
          type='submit'
          className='w-full disabled:bg-red-800 text-center py-2 text-base bg-red-600 rounded-4'
        >
          Request another link
        </button>
      </div>
    </div>
  );
};

export default ExpiredToken;
