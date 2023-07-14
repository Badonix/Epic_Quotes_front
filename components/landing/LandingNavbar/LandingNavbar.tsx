import React from 'react';
import { LanguageDropdown } from '@/components/shared';
import { useContext } from 'react';
import { ModalContext } from '@/context';
import { useTranslation } from 'next-i18next';
function LandingNavbar() {
  const { setOpenModal } = useContext(ModalContext);
  const { t } = useTranslation();
  return (
    <nav className='w-full fixed flex items-center justify-between z-20 sm:px-16 px-7 py-7'>
      <h1 className='text-orange-200 text-sm sm:text-base'>MOVIE QUOTES</h1>
      <div className='flex items-center gap-3'>
        <LanguageDropdown />
        <button
          onClick={() => setOpenModal('signup')}
          className='pointer text-sm sm:text-base hover:bg-red-700 transition-all py-2 sm:px-6 px-3 bg-red-600 rounded-md text-white'
        >
          {t('landing.sign_up')}
        </button>
        <button
          onClick={() => setOpenModal('login')}
          className='pointer text-sm sm:text-base hover:bg-white hover:text-black transition-all py-2 sm:px-6 px-3 border border-white rounded-md text-white'
        >
          {t('landing.log_in')}
        </button>
      </div>
    </nav>
  );
}

export default LandingNavbar;
