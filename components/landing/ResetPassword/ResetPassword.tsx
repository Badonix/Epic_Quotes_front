import { Back } from '@/components/icons';
import { Input } from '@/components/shared';
import { useModal } from '@/hooks';
import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useResetPassword } from './useResetPassword';

const ResetPassword = () => {
  const { wrapperRef, setOpenModal } = useModal();
  const { handleSubmit, onSubmit, reset, loading } = useResetPassword();
  return (
    <div className='px-2 sm:px-0 bg-gradient  sm:backdrop-blur fixed h-screen w-screen flex items-center justify-center z-50'>
      <div
        ref={wrapperRef}
        className='bg-horizontal-gradient bg-modal relative max-w-xl sm:px-20 sm:py-12 px-8 py-16 flex flex-col justify-center items-center text-white rounded-lg gap-4'
      >
        <h2 className='text-4xl'>Create new password</h2>
        <p className='text-center text-gray-600 w-80'>
          Your new password must be different from previous used passwords
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-7'
        >
          <div className='relative'>
            <Input
              disabled={loading}
              label='Password'
              required={true}
              name='password'
              placeholder='At least 8 & max.15 lower case characters'
              validation={{
                required: 'Password field is required',
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage name='password' />
            </p>
          </div>
          <div className='relative'>
            <Input
              disabled={loading}
              label='Confirm password'
              required={true}
              name='password_confirmation'
              placeholder='Confirm password'
              validation={{
                required: 'Confirm password field is required',
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage name='password' />
            </p>
          </div>
          <button
            type='submit'
            disabled={loading}
            className='disabled:bg-red-800 w-full text-center py-2 text-base bg-red-600 rounded-4'
          >
            Reset Password
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

export default ResetPassword;
