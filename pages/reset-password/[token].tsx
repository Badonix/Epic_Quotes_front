import { Back } from '@/components/icons';
import { Input } from '@/components/shared';
import { useModal } from '@/hooks';
import { ErrorMessage } from '@hookform/error-message';
import { usePasswordReset } from '@/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { useTranslation } from 'next-i18next';
const Token = () => {
  const { setOpenModal } = useModal();
  const { handleSubmit, onSubmit, reset, errors, password, router, formData } =
    usePasswordReset();
  const { t } = useTranslation();
  return (
    <div className='px-2 bg-default sm:px-0 fixed h-screen w-screen flex items-center justify-center z-50'>
      <div className='bg-horizontal-gradient bg-modal relative max-w-xl sm:px-20 sm:py-12 px-8 py-16 flex flex-col justify-center items-center text-white rounded-lg gap-4'>
        <h2 className='text-4xl text-center'>{t('reset.create_new')}</h2>
        <p className='text-center text-gray-600 w-80'>{t('reset.different')}</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-7'
        >
          <div className='relative'>
            <Input
              formData={formData}
              placeholder={t('reset.password_validation')}
              label={t('reset.password')}
              type='password'
              required={true}
              name='password'
              validation={{
                required: t('reset.password_required'),
                minLength: {
                  value: 8,
                  message: t('reset.password_short'),
                },
                maxLength: {
                  value: 15,
                  message: t('reset.password_long'),
                },
              }}
            />
            <p className='text-red-500 absolute -bottom-5 text-sm'>
              <ErrorMessage errors={errors} name='password' />
            </p>
          </div>
          <div className='relative'>
            <Input
              formData={formData}
              placeholder={t('reset.confirm_password')}
              label={t('reset.confirm_password')}
              type='password'
              required={true}
              name='password_confirmation'
              validation={{
                required: t('reset.password_confirmation_required'),
                validate: (value: string) =>
                  value == password || t('reset.password_mismatch'),
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
            {t('reset.reset')}
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
          <p>{t('reset.back')}</p>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale = 'en' } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Token;
