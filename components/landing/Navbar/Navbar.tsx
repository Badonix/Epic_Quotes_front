import React from 'react';
import { LanguageDropdown } from '@/components/shared';
function Navbar() {
  return (
    <nav className='w-full fixed flex items-center justify-between z-50 sm:px-16 px-7 py-7'>
      <h1 className='text-orange-200 text-sm sm:text-base'>MOVIE QUOTES</h1>
      <div className='flex items-center gap-3'>
        <LanguageDropdown />
        <button className='pointer text-sm sm:text-base hover:bg-red-700 transition-all py-2 sm:px-6 px-3 bg-red-600 rounded-md text-white'>
          Sign Up
        </button>
        <button className='pointer text-sm sm:text-base hover:bg-white hover:text-black transition-all py-2 sm:px-6 px-3 border border-white rounded-md text-white'>
          Log in
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
