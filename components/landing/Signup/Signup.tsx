import { Close, Google } from '@/components/icons';
import { Input } from '@/components/shared';
import React from 'react';
import { useSignup } from './useSignup';
import { ErrorMessage } from '@hookform/error-message';
import { useModal } from '@/hooks';

const Signup = () => {
  const {
    handleSubmit,
    onSubmit,
    password,
    errors,
    reset,
    usernameError,
    emailError,
    isLoading,
  } = useSignup();
  const { setOpenModal, wrapperRef } = useModal();

  return (
    <div className='bg-modal-transparent backdrop-blur fixed h-screen w-screen flex items-center justify-center z-50'>
      <div
        ref={wrapperRef}
        className='relative w-full h-full sm:h-auto max-w-xl sm:px-28 sm:py-12 px-8 py-16 flex flex-col sm:justify-center justify-around text-white bg-modal sm:rounded-lg gap-4'
      >
        <div
          className='block sm:hidden w-6'
          onClick={() => {
            setOpenModal(null);
            reset();
          }}
        >
          <Close />
        </div>
        <div className='flex flex-col items-center gap-3'>
          <h2 className='text-3xl'>Create an account</h2>
          <p className='text-base text-gray-500'>Start your journey!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <div className='relative'>
            <Input
              disabled={isLoading}
              placeholder='At least 3 & max.15 lower case characters'
              label='Name'
              type='text'
              required={true}
              name='username'
              lowercase={true}
              validation={{
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username should be at least 3 characters long',
                },
                maxLength: {
                  value: 15,
                  message: 'Username should not exceed 15 characters',
                },
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage errors={errors} name='username' />
            </p>
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              {usernameError}
            </p>
          </div>
          <div className='relative'>
            <Input
              disabled={isLoading}
              placeholder='Enter your email'
              label='Email'
              required={true}
              name='email'
              validation={{
                required: 'Email is required',
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email address',
                },
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage errors={errors} name='email' />
            </p>
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              {emailError}
            </p>
          </div>
          <div className='relative'>
            <Input
              disabled={isLoading}
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
              disabled={isLoading}
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

          <div className='flex flex-col gap-4'>
            <button
              disabled={isLoading}
              type='submit'
              className='w-full disabled:bg-red-800 text-center py-2 text-base bg-red-600 rounded-4'
            >
              Get started
            </button>
            <button
              disabled={isLoading}
              type='button'
              className='flex items-center justify-center gap-3 w-full text-center py-2 text-base bg-transparent border border-gray-300 rounded-4'
            >
              <Google />
              Sign up with Google
            </button>
          </div>
        </form>

        <p className='text-center text-gray-500'>
          Already have an account?
          <span
            onClick={() => {
              setOpenModal('login');
              reset();
            }}
            className='text-blue-600 underline cursor-pointer'
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
