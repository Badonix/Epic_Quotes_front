import { Close, Google } from '@/components/icons';
import { Input } from '@/components/shared';
import React from 'react';
import { useLogin } from './useLogin';
import { ErrorMessage } from '@hookform/error-message';

const Login = () => {
  const { wrapperRef, handleSubmit, onSubmit, setOpenModal, errors, reset } =
    useLogin();

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
          <h2 className='text-3xl'>Log in to your account</h2>
          <p className='text-base text-gray-500'>
            Welcome back! Please enter your details.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <div className='relative'>
            <Input
              placeholder='Enter your email'
              label='Email'
              required={true}
              name='email'
              validation={{
                required: 'Email is required',
                minLength: {
                  value: 3,
                  message: 'Email must be at least 3 characters ',
                },
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage errors={errors} name='email' />
            </p>
          </div>
          <div className='relative'>
            <Input
              placeholder='At least 8 & max.15 lower case characters'
              label='Password'
              type='password'
              required={true}
              name='password'
              validation={{
                required: 'Password is required',
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage errors={errors} name='password' />
            </p>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <input
                  className='rounded-sm outline-none'
                  type='checkbox'
                  id='remember_me'
                />
                <label htmlFor='remember_me'>Remember me</label>
              </div>
              <p className='text-blue-600 underline cursor-pointer'>
                Forgot password?
              </p>
            </div>
            <button
              type='submit'
              className='w-full text-center py-2 text-base bg-red-600 rounded-4'
            >
              Sign in
            </button>
            <button className='flex items-center justify-center gap-3 w-full text-center py-2 text-base bg-transparent border border-gray-300 rounded-4'>
              <Google />
              Sign in with Google
            </button>
          </div>
        </form>

        <p className='text-center text-gray-500'>
          Dont have an account?
          <span
            onClick={() => {
              setOpenModal('signup');
              reset();
            }}
            className='text-blue-600 underline cursor-pointer'
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
