import { Back } from '@/components/icons';
import { Input } from '@/components/shared';
import { useModal } from '@/hooks';
import { ErrorMessage } from '@hookform/error-message';
import { usePasswordReset } from '@/hooks';
import React from 'react';
const Token = () => {
  const { setOpenModal } = useModal();
  const { handleSubmit, onSubmit, reset, errors, password, router } =
    usePasswordReset();
  return (
    <div className='px-2 bg-default sm:px-0 fixed h-screen w-screen flex items-center justify-center z-50'>
      <div className='bg-horizontal-gradient bg-modal relative max-w-xl sm:px-20 sm:py-12 px-8 py-16 flex flex-col justify-center items-center text-white rounded-lg gap-4'>
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
              placeholder='At least 8 & max.15 lower case characters'
              label='Password'
              type='password'
              required={true}
              name='password'
              validation={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password should be at least 8 characters',
                },
                maxLength: {
                  value: 15,
                  message: 'Password should not exceede 15 characters',
                },
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage errors={errors} name='password' />
            </p>
          </div>
          <div className='relative'>
            <Input
              placeholder='Confirm password'
              label='Confirm Password'
              type='password'
              required={true}
              name='password_confirmation'
              validation={{
                required: 'Password confirmation is required',
                validate: (value: string) =>
                  value == password || 'Passwords do not match',
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage errors={errors} name='password_confirmation' />
            </p>
          </div>
          <button
            type='submit'
            className='disabled:bg-red-800 w-full text-center py-2 text-base bg-red-600 rounded-4'
          >
            Reset Password
          </button>
        </form>
        <div
          onClick={() => {
            reset();
            router.push('/');
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

export default Token;
