import { Close, Google } from '@/components/icons';
import { Input } from '@/components/shared';
import React from 'react';
import { useSignup } from './useSignup';
import { ErrorMessage } from '@hookform/error-message';
import { useModal } from '@/hooks';
import { useTranslation } from 'next-i18next';

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
    register,
    formData,
  } = useSignup();
  const { setOpenModal, wrapperRef } = useModal();
  const { t } = useTranslation();

  return (
    <div className='bg-modal-transparent backdrop-blur fixed h-screen w-screen flex items-center justify-center z-50'>
      <div
        ref={wrapperRef}
        className='relative w-full h-full sm:h-auto max-w-xl sm:px-28 sm:py-12 px-8 py-20 flex flex-col sm:justify-center justify-start text-white lowres-profile-modal sm:bg-modal sm:rounded-lg gap-4'
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
          <h2 className='text-3xl'>{t('landing.signup.create_profile')}</h2>
          <p className='text-base text-gray-500'>
            {t('landing.signup.start_journey')}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <div className='relative'>
            <Input
              formData={formData}
              register={register}
              disabled={isLoading}
              placeholder={t('landing.signup.username_placeholder')}
              label={t('form.username')}
              type='text'
              required={true}
              errors={errors}
              name='username'
              lowercase={true}
              validation={{
                required: t('form.username_required'),
                minLength: {
                  value: 3,
                  message: t('form.username_short'),
                },
                maxLength: {
                  value: 15,
                  message: t('form.username_long'),
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
              placeholder={t('landing.signup.email_placeholder')}
              label={t('form.email')}
              formData={formData}
              errors={errors}
              register={register}
              required={true}
              name='email'
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
              <ErrorMessage errors={errors} name='email' />
            </p>
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              {emailError}
            </p>
          </div>
          <div className='relative'>
            <Input
              disabled={isLoading}
              placeholder={t('landing.signup.password_placeholder')}
              label={t('form.password')}
              type='password'
              formData={formData}
              errors={errors}
              register={register}
              required={true}
              name='password'
              validation={{
                required: t('form.password_required'),
                minLength: {
                  value: 8,
                  message: t('form.password_short'),
                },
                maxLength: {
                  value: 15,
                  message: t('form.password_long'),
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
              placeholder={t(
                'landing.signup.password_confirmation_placeholder'
              )}
              formData={formData}
              errors={errors}
              register={register}
              label={t('form.password_confirmation')}
              type='password'
              required={true}
              name='password_confirmation'
              validation={{
                required: t('form.password_confirmation_required'),
                validate: (value: string) =>
                  value == password || t('form.password_confirmation_mismatch'),
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
              {t('landing.get_started')}
            </button>
            <a
              href={process.env.NEXT_PUBLIC_API_URL + '/api/auth/redirect'}
              type='button'
              className='flex items-center justify-center gap-3 w-full text-center py-2 text-base bg-transparent border border-gray-300 rounded-4'
            >
              <Google />
              {t('landing.signup.google_signup')}
            </a>
          </div>
        </form>

        <p className='text-center text-gray-500'>
          {t('landing.signup.already_account')}
          <span
            onClick={() => {
              setOpenModal('login');
              reset();
            }}
            className='text-blue-600 underline cursor-pointer'
          >
            {t('landing.signup.log_in')}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
