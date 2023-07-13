import { EmailSent } from '@/components/icons';
import { useModal } from '@/hooks';
import React from 'react';
import { useTranslation } from 'next-i18next';

const CheckEmail = () => {
  const { wrapperRef, setOpenModal } = useModal();
  const { t } = useTranslation();
  return (
    <div className='px-2 sm:px-0 bg-gradient  sm:backdrop-blur fixed h-screen w-screen flex items-center justify-center z-50'>
      <div
        ref={wrapperRef}
        className='bg-horizontal-gradient bg-modal relative max-w-xl sm:px-20 sm:py-12 px-8 py-16 flex flex-col justify-center items-center text-white rounded-lg gap-4'
      >
        <EmailSent />
        <h2 className='text-4xl'>{t('landing.email_check.thanks')}</h2>
        <p className='text-center'>
          {t('landing.email_check.follow_instructions')}
        </p>
        <button
          onClick={() => setOpenModal('login')}
          className='w-full text-center py-2 text-base bg-red-600 rounded-4'
        >
          {t('landing.email_check.go_login')}
        </button>
      </div>
    </div>
  );
};

export default CheckEmail;
