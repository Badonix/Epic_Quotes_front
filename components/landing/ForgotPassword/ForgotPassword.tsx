import { Back } from '@/components/icons';
import { Input } from '@/components/shared';
import { useModal } from '@/hooks';
import React from 'react';
import { useForgotPassword } from './useForgotPassword';
import { ErrorMessage } from '@hookform/error-message';

const ForgotPassword = () => {
  const { wrapperRef, setOpenModal } = useModal();
  const { handleSubmit, onSubmit, reset } = useForgotPassword();
  return (
    <div className='px-2 sm:px-0 bg-gradient  sm:backdrop-blur fixed h-screen w-screen flex items-center justify-center z-50'>
      <div
        ref={wrapperRef}
        className='bg-horizontal-gradient bg-modal relative max-w-xl sm:px-20 sm:py-12 px-8 py-16 flex flex-col justify-center items-center text-white rounded-lg gap-4'
      >
        <h2 className='text-4xl'>Forgot password?</h2>
        <p className='text-center text-gray-600 w-80'>
          Enter the email and we’ll send an email with instructions to reset
          your password
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-7'
        >
          <div className='relative'>
            <Input
              label='Email'
              name='email'
              placeholder='Enter your email'
              validation={{
                required: 'Email field is required',
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email address',
                },
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage name='email' />
            </p>
          </div>

          <button
            type='submit'
            className='w-full text-center py-2 text-base bg-red-600 rounded-4'
          >
            Send Instructions
          </button>
        </form>
        <div
          onClick={() => {
            reset();
            setOpenModal('login');
          }}
          className='flex mt-3 items-center gap-2 text-gray-600 cursor-pointer'
        >
          <Back />
          <p>Back to log in</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
