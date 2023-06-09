import { Verified } from '@/components/icons';
import React from 'react';
import { useModal } from '@/hooks';

const ResetSuccess = () => {
  const { wrapperRef, setOpenModal } = useModal();

  return (
    <div className='px-2 sm:px-0 bg-gradient  sm:backdrop-blur fixed h-screen w-screen flex items-center justify-center z-50'>
      <div
        ref={wrapperRef}
        className='bg-horizontal-gradient bg-modal relative max-w-xl sm:px-20 sm:py-12 px-8 py-16 flex flex-col justify-center items-center text-white rounded-lg gap-8'
      >
        <Verified />
        <h2 className='text-4xl'>Success!</h2>
        <p className='text-center'>Your Password changed successfully</p>
        <button
          onClick={() => setOpenModal('login')}
          className='w-full text-center py-2 text-base bg-red-600 rounded-4'
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default ResetSuccess;
