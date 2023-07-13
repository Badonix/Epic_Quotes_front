import { Back } from '@/components/icons';
import { Input } from '@/components/shared';
import { useModal } from '@/hooks';
import React from 'react';
import { useForgotPassword } from './useForgotPassword';
import { ErrorMessage } from '@hookform/error-message';
import { useTranslation } from 'next-i18next';

const ForgotPassword = () => {
  const { wrapperRef, setOpenModal } = useModal();
  const { handleSubmit, onSubmit, reset, userError, loading } =
    useForgotPassword();
  const { t } = useTranslation();
  return (
    <div className='px-2 sm:px-0 bg-gradient  sm:backdrop-blur fixed h-screen w-screen flex items-center justify-center z-50'>
      <div
        ref={wrapperRef}
        className='bg-horizontal-gradient bg-modal relative max-w-xl sm:px-20 sm:py-12 px-8 py-16 flex flex-col justify-center items-center text-white rounded-lg gap-4'
      >
        <h2 className='text-4xl'>
          {t('landing.forgot_password.forgot_password')}
        </h2>
        <p className='text-center text-gray-600 w-80'>
          {t('landing.forgot_password.instructions')}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-7'
        >
          <div className='relative'>
            <Input
              disabled={loading}
              label={t('form.email')}
              name='email'
              placeholder={t('landing.login.email_placeholder')}
              validation={{
                required: t('form.email_required'),
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: t('form.email_invalid'),
                },
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage name='email' />
            </p>
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              {userError}
            </p>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='disabled:bg-red-800 w-full text-center py-2 text-base bg-red-600 rounded-4'
          >
            {t('landing.forgot_password.send')}
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
          <p>{t('landing.forgot_password.back')}</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
