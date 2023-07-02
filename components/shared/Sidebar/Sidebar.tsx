import { Movie } from '@/components/icons';
import Home from '@/components/icons/Home';
import Image from 'next/image';
import React from 'react';
import { PropsType } from './types';
import Link from 'next/link';

const Sidebar: React.FC<PropsType> = ({ sidebarActive, currentPage }) => {
  return (
    <>
      <div
        className={`z-30 lg:w-530 block lg:mt-0 lg:translate-x-0 pl-16 pt-9 transition-all lg:static h-4/5 rounded-r-xl w-11/12 max-w-lg absolute top-0 left-0 bg-sidebar lg:bg-transparent ${
          sidebarActive ? 'translate-x-0 mt-20' : '-translate-x-full'
        } `}
      >
        <div className='flex gap-6 items-center'>
          <Image
            alt='pfp'
            width={60}
            height={60}
            src='/assets/images/default-pfp.png'
            className={
              currentPage === 'profile'
                ? 'rounded-full border border-red-600'
                : 'rounded-full'
            }
          />
          <div className='h-60 flex flex-col justify-between items-between text-white'>
            <h2 className='text-2xl'>Nino Tabagari</h2>
            <div className='text-gray-300'>
              <a href='#'>Edit your profile</a>
            </div>
          </div>
        </div>
        <div className='mt-10 flex flex-col gap-11'>
          <Link href={'/news-feed'} className='flex items-center gap-11'>
            <Home active={currentPage == 'news-feed'} />
            <p className='text-2xl text-white'>News feed</p>
          </Link>
          <Link href='/movies' className='flex items-center gap-11'>
            <Movie active={currentPage == 'movies'} />
            <p className='text-2xl text-white'>List of movies</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
