import React from 'react';
import { InputProps } from './types';
import { Correct, Invalid } from '@/components';
import { useInput } from './useInput';
const Input: React.FC<InputProps> = ({
  label,
  required,
  name,
  validation,
  lowercase,
  ...props
}) => {
  const { register, errors, formData } = useInput();
  return (
    <div className='flex flex-col gap-1 w-full'>
      <div>
        <label className='relative'>
          {label}
          {required && (
            <p className='text-sm absolute top-0 text-red-600 -right-2'>*</p>
          )}
        </label>
      </div>
      <div className='w-full relative'>
        <input
          className={`px-3 py-2 w-full bg-gray-300 border-2  text-gray-500 text-base rounded-4 outline-none focus:ring-4 focus:ring-gray-700 ${
            lowercase && 'lowercase'
          } ${
            errors[name] && 'border-2 border-red-600 focus:border-transparent'
          } ${
            !errors[name] &&
            formData[name]?.length > 0 &&
            'border-green-600 focus:border-transparent'
          }`}
          {...register(name, validation)}
          {...props}
        />
        {errors[name] && (
          <div className='absolute top-1/2 -translate-y-1/2 right-3'>
            <Invalid />
          </div>
        )}
        {!errors[name] && formData[name]?.length > 0 && (
          <div className='absolute top-1/2 -translate-y-1/2 right-3'>
            <Correct />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
