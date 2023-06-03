import { Google } from '@/components/icons';
import { Input } from '@/components/shared';
import React from 'react';
import { useSignup } from './useSignup';
const Signup = () => {
  const { wrapperRef, handleSubmit, onSubmit, password } = useSignup();

  return (
    <div className='bg-modal-transparent backdrop-blur fixed h-screen w-screen flex items-center justify-center z-50'>
      <div
        ref={wrapperRef}
        className='w-full max-w-xl px-28 py-12 flex flex-col justify-center text-white bg-modal rounded-lg gap-4'
      >
        <div className='flex flex-col items-center gap-3'>
          <h2 className='text-3xl'>Create an account</h2>
          <p className='text-base text-gray-500'>Start your journey!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <Input
            placeholder='At least 3 & max.15 lower case characters'
            label='Name'
            type='text'
            required={true}
            name='name'
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
          <Input
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
          <div className='flex flex-col gap-4'>
            <button
              type='submit'
              className='w-full text-center py-2 text-base bg-red-600 rounded-4'
            >
              Get started
            </button>
            <button className='flex items-center justify-center gap-3 w-full text-center py-2 text-base bg-transparent border border-gray-300 rounded-4'>
              <Google />
              Sign up with Google
            </button>
          </div>
        </form>

        <p className='text-center text-gray-500'>
          Already have an account?{' '}
          <span className='text-blue-600 underline cursor-pointer'>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
