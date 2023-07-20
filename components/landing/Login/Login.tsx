import { Close, Google } from '@/components/icons';
import { Input } from '@/components/shared';
import React from 'react';
import { useLogin } from './useLogin';
import { ErrorMessage } from '@hookform/error-message';
import { useModal } from '@/hooks';
import { useTranslation } from 'next-i18next';

const Login = () => {
  const { handleSubmit, onSubmit, errors, reset, error, loading } = useLogin();
  const { wrapperRef, setOpenModal } = useModal();
  const { t } = useTranslation();
  return (
    <div className='lowres-profile-modal sm:bg-modal-transparent backdrop-blur fixed h-screen w-screen flex items-center justify-center z-50'>
      <div
        ref={wrapperRef}
        className='relative w-full h-full sm:h-auto max-w-xl sm:px-28 sm:py-12 px-8 py-20 flex flex-col sm:justify-center justify-start text-white sm:bg-modal sm:rounded-lg gap-4'
      >
        <div
          className='absolute top-5 left-5 sm:hidden w-6'
          onClick={() => {
            setOpenModal(null);
            reset();
          }}
        >
          <Close />
        </div>
        <div className='flex flex-col items-center gap-3'>
          <h2 className='text-3xl'>{t('landing.login.login_to_account')}</h2>
          <p className='text-base text-gray-500 text-center'>
            {t('landing.login.welcome_back')}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <div className='relative'>
            <Input
              disabled={loading}
              placeholder={t('landing.login.email_placeholder')}
              label={t('form.email')}
              required={true}
              name='login'
              validation={{
                required: t('form.email_required'),
                minLength: {
                  value: 3,
                  message: t('form.email_short'),
                },
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage errors={errors} name='login' />
            </p>
          </div>
          <div className='relative'>
            <Input
              disabled={loading}
              placeholder={t('form.password_validation')}
              label={t('form.password')}
              type='password'
              required={true}
              name='password'
              validation={{
                required: t('form.password_required'),
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage errors={errors} name='password' />
            </p>
            <p className='text-red-500 absolute -bottom-5 text-sm'>{error}</p>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <input
                  className='rounded-sm outline-none'
                  type='checkbox'
                  id='remember_me'
                />
                <label htmlFor='remember_me'>
                  {t('landing.login.remember_me')}
                </label>
              </div>
              <p
                onClick={() => {
                  setOpenModal('forgotPassword');
                  reset();
                }}
                className='text-blue-600 underline cursor-pointer'
              >
                {t('landing.login.forgot_password')}
              </p>
            </div>
            <button
              disabled={loading}
              type='submit'
              className='w-full disabled:bg-red-800 text-center py-2 text-base bg-red-600 rounded-4'
            >
              {t('landing.login.signin')}
            </button>
            <a
              href={process.env.NEXT_PUBLIC_API_URL + '/api/auth/redirect'}
              type='button'
              className='flex items-center justify-center gap-3 w-full text-center py-2 text-base bg-transparent border border-gray-300 rounded-4'
            >
              <Google />
              {t('landing.login.google_signin')}
            </a>
          </div>
        </form>

        <p className='text-center text-gray-500'>
          {t('landing.login.no_account')}
          <span
            onClick={() => {
              setOpenModal('signup');
              reset();
            }}
            className='text-blue-600 underline cursor-pointer'
          >
            {t('landing.login.signup')}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
