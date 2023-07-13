import React from 'react';
import { LanguageDropdown } from '@/components';
import { Bell, Menu } from '@/components';
import { PropsType } from './types';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Navbar: React.FC<PropsType> = ({ setSidebarActive }) => {
  const { t } = useTranslation();
  return (
    <nav className='fixed z-40 w-full bg-navbar py-7 px-16 flex items-center justify-between shadow-sm'>
      <div
        className='lg:hidden block'
        onClick={() => setSidebarActive((prev) => !prev)}
      >
        <Menu />
      </div>
      <Link
        href='/news-feed'
        className='hidden lg:block text-orange-200 font-bold cursor-pointer'
      >
        MOVIE QUOTES
      </Link>
      <div className='flex items-center gap-9'>
        <div className='relative cursor-pointer'>
          <div className='-right-2 -top-2 absolute w-6 h-6 bg-red-600 rounded-full flex items-center justify-center'>
            <p className='text-white'>3</p>
          </div>
          <Bell />
        </div>
        <LanguageDropdown />
        <button className='hidden lg:block hover:text-black hover:bg-white transition-all py-2 px-5 text-white border border-white rounded-md'>
          {t('logout')}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
