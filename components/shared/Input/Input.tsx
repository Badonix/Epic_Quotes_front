import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputProps } from './types';
const Input: React.FC<InputProps> = ({
  label,
  required,
  name,
  validation,
  ...props
}) => {
  const { register } = useFormContext();
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
      <input
        className='px-3 py-2 bg-gray-300 text-gray-500 text-base rounded-4 outline-none focus:ring-4 focus:ring-gray-700'
        {...register(name, validation)}
        {...props}
      />
    </div>
  );
};

export default Input;
