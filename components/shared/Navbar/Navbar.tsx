import React from 'react';
import { LanguageDropdown } from '../LanguageDropdown';
import { Bell } from '@/components/icons';
import Menu from '@/components/icons/Menu';
import Search from '@/components/icons/Search';

const Navbar: React.FC<{
  setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setSidebarActive, setSearchActive }) => {
  return (
    <nav className='fixed z-200 w-full bg-navbar py-7 px-16 flex items-center justify-between shadow-sm'>
      <div
        className='lg:hidden block'
        onClick={() => setSidebarActive((prev) => !prev)}
      >
        <Menu />
      </div>
      <h2 className='hidden lg:block text-orange-200 font-bold cursor-pointer'>
        MOVIE QUOTES
      </h2>
      <div className='flex items-center gap-9'>
        <div className='block lg:hidden' onClick={() => setSearchActive(true)}>
          <Search />
        </div>
        <div className='relative cursor-pointer'>
          <div className='-right-2 -top-2 absolute w-6 h-6 bg-red-600 rounded-full flex items-center justify-center'>
            <p className='text-white'>3</p>
          </div>
          <Bell />
        </div>
        <LanguageDropdown />
        <button className='hidden lg:block hover:text-black hover:bg-white transition-all py-2 px-5 text-white border border-white rounded-md'>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
