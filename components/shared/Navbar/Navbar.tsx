import React from 'react';
import { Bell, Menu, LanguageDropdown, Notifications } from '@/components';
import { PropsType } from './types';
import Link from 'next/link';
import { useNavbar } from './useNavbar';

const Navbar: React.FC<PropsType> = ({ setSidebarActive }) => {
  const {
    notificationsActive,
    setNotificationsActive,
    notifCount,
    t,
    handleLogout,
  } = useNavbar();
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
        <div
          onClick={() => setNotificationsActive((prev) => !prev)}
          className='relative cursor-pointer h-full'
        >
          {notifCount != 0 && (
            <div className='-right-2 -top-2 absolute w-6 h-6 bg-red-600 rounded-full flex items-center justify-center'>
              <p className='text-white'>{notifCount}</p>
            </div>
          )}
          <Bell />
          {notificationsActive && (
            <div className='w-0 h-0 lg:-bottom-full -bottom-6 translate-y-1 border-16 border-l-transparent border-r-transparent border-t-transparent border-b-black bg-transparent absolute'></div>
          )}
        </div>
        <LanguageDropdown />
        <button
          onClick={handleLogout}
          className='hidden lg:block hover:text-black hover:bg-white transition-all py-2 px-5 text-white border border-white rounded-md'
        >
          {t('logout')}
        </button>
      </div>
      {notificationsActive && (
        <div className='lg:right-24 right-0 w-full max-w-5xl fixed lg:top-24 top-22'>
          <Notifications setNotificationsActive={setNotificationsActive} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
